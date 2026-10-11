import { Button, Typography } from "@heroui/react";
import { useRef } from "react";
import { useWizardStore } from "../store/useWizardStore";

export default function SelectFileStage() {
  const input = useRef<HTMLInputElement>(null);
  const selectFile = useWizardStore((state) => state.selectFile);
  return (
    <div className="flex flex-col items-start gap-4">
      <Typography.Paragraph color="muted">Choose a file to import.</Typography.Paragraph>
      <input
        ref={input}
        type="file"
        className="hidden"
        aria-label="Choose file"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) selectFile(file);
          event.target.value = "";
        }}
      />
      <Button onPress={() => input.current?.click()}>Choose file</Button>
    </div>
  );
}
