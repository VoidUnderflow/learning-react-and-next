import { Button, Typography } from "@heroui/react";
import { useWizardStore } from "../store/useWizardStore";

export default function SuccessStage() {
  const file = useWizardStore((state) => state.file);
  const reset = useWizardStore((state) => state.reset);
  return (
    <div className="flex flex-col items-start gap-4" role="status">
      <Typography.Paragraph className="text-success">Import successful.</Typography.Paragraph>
      <Typography.Paragraph className="break-all">{file?.name}</Typography.Paragraph>
      <Button onPress={reset}>Import another file</Button>
    </div>
  );
}
