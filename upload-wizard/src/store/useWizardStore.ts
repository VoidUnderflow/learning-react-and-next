import { create } from "zustand/react";
import { importTypes } from "../importTypes.ts";

type WizardStage = "select-import-type" | "select-file";

interface WizardState {
  selectedTypeId: string | null;
  stage: WizardStage;
  selectImportType: (id: string) => void;
}

export const useWizardStore = create<WizardState>()((set) => ({
  selectedTypeId: null,
  stage: "select-import-type",

  selectImportType: (id) => {
    const selectedTypes = importTypes.filter((type) => type.id === id);
    if (selectedTypes.length > 0) {
      set({
        selectedTypeId: id,
        stage: "select-file",
      });
    }
  },
}));
