export interface ValidationResult {
  canImport: boolean;
  warnings: string[];
  errors: string[];
}

export async function dryRun(
  typeId: string,
  file: File,
  attemptId: string,
): Promise<ValidationResult> {
  const params = new URLSearchParams({ typeId, filename: file.name, attemptId });
  const response = await fetch(`https://api.example.com/dry-run?${params}`);
  if (!response.ok) throw new Error("Validation failed. Please try again.");
  return response.json();
}

export async function importFile(typeId: string, file: File, attemptId: string) {
  const body = new FormData();
  body.append("typeId", typeId);
  body.append("file", file);
  body.append("attemptId", attemptId);
  const response = await fetch("https://api.example.com/import", { method: "POST", body });
  if (!response.ok) throw new Error("Import failed. Please retry.");
}
