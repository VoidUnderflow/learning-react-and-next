import { http, HttpResponse } from "msw/http";
import type { RequestHandler } from "msw";
import { delay } from "msw/utils/delay";

// Repeated requests for one selection share the same scenario.
const validationAttempts = new Map<string, boolean>();
const importAttempts = new Map<string, number>();

export const handlers: RequestHandler[] = [
  http.get("https://api.example.com/dry-run", async ({ request }) => {
    const id = new URL(request.url).searchParams.get("attemptId") ?? "default";
    if (!validationAttempts.has(id)) validationAttempts.set(id, validationAttempts.size % 2 === 0);
    const hasIssues = validationAttempts.get(id);
    await delay(2500);
    return HttpResponse.json({
      canImport: !hasIssues,
      errors: hasIssues ? ["The file contains an invalid record."] : [],
      warnings: hasIssues
        ? ["Some optional fields are missing.", "Some records may be duplicates."]
        : [],
    });
  }),
  http.post("https://api.example.com/import", async ({ request }) => {
    const body = await request.formData();
    const id = String(body.get("attemptId"));
    const count = (importAttempts.get(id) ?? 0) + 1;
    importAttempts.set(id, count);
    await delay(2500);
    if (count === 1)
      return HttpResponse.json({ message: "Import failed. Please retry." }, { status: 500 });
    return HttpResponse.json({ success: true });
  }),
];
