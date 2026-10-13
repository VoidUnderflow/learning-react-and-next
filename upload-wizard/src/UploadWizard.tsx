import { Card, Separator, Typography } from "@heroui/react";
import ImportList from "./ImportList.tsx";
import { importTypes } from "./importTypes.ts";
import { useWizardStore } from "./store/useWizardStore.ts";
import SelectImportStage from "./stages/SelectImportStage.tsx";
import SelectFileStage from "./stages/SelectFileStage.tsx";
import ValidationStage from "./stages/ValidationStage";
import SuccessStage from "./stages/SuccessStage";

export default function UploadWizard() {
  const stage = useWizardStore((state) => state.stage);
  const file = useWizardStore((state) => state.file);
  const attemptId = useWizardStore((state) => state.attemptId);
  const selectedTypeId = useWizardStore((state) => state.selectedTypeId);
  const selectedType = importTypes.find((type) => type.id === selectedTypeId);

  const title = stage === "select-import-type" ? "Select an import type" : selectedType?.name;

  return (
    <Card className="w-3/4 max-w-5xl min-h-[75vh] p-0">
      <div className="grid flex-1 grid-cols-1 md:grid-cols-[1fr_3fr]">
        <aside className="border-b border-border md:border-b-0 md:border-r">
          <ImportList importTypes={importTypes} />
        </aside>

        <section className="min-w-0 flex flex-col">
          <header className="flex h-20 shrink-0 items-center px-8">
            <Typography.Heading level={4}>{title}</Typography.Heading>
          </header>
          <Separator className="h-px" />

          <div className="p-8">
            {stage === "select-import-type" && <SelectImportStage />}
            {stage === "select-file" && selectedType && <SelectFileStage />}
            {stage === "validation-stage" && selectedType && file && attemptId && (
              <ValidationStage
                key={attemptId}
                typeId={selectedType.id}
                file={file}
                attemptId={attemptId}
              />
            )}
            {stage === "success" && <SuccessStage />}
          </div>
        </section>
      </div>
    </Card>
  );
}
