import { Card, Typography } from "@heroui/react";
import ImportList from "./ImportList.tsx";
import { importTypes } from "./importTypes.ts";
import { useWizardStore } from "./store/useWizardStore.ts";
import SelectImportStage from "./stages/SelectImportStage.tsx";
import SelectFileStage from "./stages/SelectFileStage.tsx";

export default function UploadWizard() {
  const stage = useWizardStore((state) => state.stage);
  const selectedTypeId = useWizardStore((state) => state.selectedTypeId);
  const selectedType = importTypes.find((type) => type.id === selectedTypeId);

  const title = stage === "select-import-type" ? "Select an import type" : selectedType?.name;

  return (
    <Card className="w-3/4 max-w-5xl min-h-[75vh] p-0">
      <div className="grid flex-1 grid-cols-1 md:grid-cols-[1fr_3fr]">
        <aside className="border-b border-border p-8 md:border-b-0 md:border-r">
          <ImportList importTypes={importTypes} />
        </aside>

        <section className="min-w-0 flex flex-col gap-6 p-8">
          <header>
            <Typography.Heading level={4}>{title}</Typography.Heading>
          </header>

          <div>
            {stage === "select-import-type" && <SelectImportStage />}
            {stage === "select-file" && selectedType && <SelectFileStage />}
          </div>
        </section>
      </div>
    </Card>
  );
}
