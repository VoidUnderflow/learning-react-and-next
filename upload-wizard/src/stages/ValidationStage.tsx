import { Button, Spinner, Typography } from "@heroui/react";
import Issues from "../Issues";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dryRun, importFile } from "../uploadApi";
import { useWizardStore } from "../store/useWizardStore";

export default function ValidationStage({
  typeId,
  file,
  attemptId,
}: {
  typeId: string;
  file: File;
  attemptId: string;
}) {
  const returnToFileSelection = useWizardStore((state) => state.returnToFileSelection);
  const setImporting = useWizardStore((state) => state.setImporting);
  const finishImport = useWizardStore((state) => state.finishImport);

  const validation = useQuery({
    queryKey: ["dry-run", typeId, attemptId],
    queryFn: () => dryRun(typeId, file, attemptId),
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const upload = useMutation({
    mutationFn: () => importFile(typeId, file, attemptId),
    retry: false,
    onMutate: () => setImporting(true),
    onSuccess: () => finishImport(attemptId),
    onSettled: () => setImporting(false),
  });

  const canImport =
    validation.isSuccess && validation.data.canImport && !validation.data.errors.length;

  return (
    <div className="flex flex-col items-start gap-4">
      <Typography.Paragraph weight="semibold" className="break-all">
        {file.name}
      </Typography.Paragraph>

      {validation.isFetching && (
        <div role="status" className="flex items-center gap-2">
          <Spinner />
          <span>Checking file…</span>
        </div>
      )}

      {validation.isError && (
        <div role="alert" className="flex flex-col gap-2">
          <Typography.Paragraph>{validation.error.message}</Typography.Paragraph>
          <Button
            onPress={() => {
              void validation.refetch();
            }}
            isDisabled={validation.isFetching}
          >
            Retry validation
          </Button>
        </div>
      )}

      {validation.isSuccess && (
        <>
          <Typography.Paragraph color="muted">
            {canImport ? "File is ready to import." : "Resolve the errors and re-upload the file."}
          </Typography.Paragraph>
          <div className="flex gap-2">
            <Issues kind="warning" items={validation.data.warnings} />
            <Issues kind="error" items={validation.data.errors} />
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" isDisabled={upload.isPending} onPress={returnToFileSelection}>
          Re-upload file
        </Button>
        <Button
          isDisabled={!canImport || validation.isFetching || upload.isPending}
          onPress={() => upload.mutate()}
        >
          {upload.isPending ? (
            <>
              <Spinner color={"current"} /> Importing…
            </>
          ) : upload.isError ? (
            "Retry import"
          ) : (
            "Import file"
          )}
        </Button>
      </div>

      {upload.isError && (
        <Typography.Paragraph className="text-danger" role="alert">
          {upload.error.message}
        </Typography.Paragraph>
      )}
    </div>
  );
}
