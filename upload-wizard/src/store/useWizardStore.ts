import { create } from "zustand/react";
import { importTypes } from "../importTypes.ts";

type WizardStage = "select-import-type" | "select-file" | "validation-stage" | "success";

interface WizardState {
  selectedTypeId: string | null;
  stage: WizardStage;
  file: File | null;
  attemptId: string | null;
  isImporting: boolean;
  selectFile: (file: File) => void;
  returnToFileSelection: () => void;
  setImporting: (value: boolean) => void;
  finishImport: (attemptId: string) => void;
  reset: () => void;
  selectImportType: (id: string) => void;
}

export const useWizardStore = create<WizardState>()((set, get) => ({
  selectedTypeId: null,
  stage: "select-import-type",
  file: null,
  attemptId: null,
  isImporting: false,
  selectFile: (file) => set({ file, attemptId: crypto.randomUUID(), stage: "validation-stage" }),
  returnToFileSelection: () => set({ file: null, attemptId: null, stage: "select-file" }),
  setImporting: (isImporting) => set({ isImporting }),
  finishImport: (attemptId) =>
    set((state) => (state.attemptId === attemptId ? { stage: "success", isImporting: false } : {})),
  reset: () =>
    set({
      selectedTypeId: null,
      file: null,
      attemptId: null,
      stage: "select-import-type",
      isImporting: false,
    }),

  selectImportType: (id) => {
    if (get().isImporting) return;
    const selectedTypes = importTypes.filter((type) => type.id === id);
    if (selectedTypes.length > 0) {
      set({
        selectedTypeId: id,
        stage: "select-file",
        file: null,
        attemptId: null,
      });
    }
  },
}));
