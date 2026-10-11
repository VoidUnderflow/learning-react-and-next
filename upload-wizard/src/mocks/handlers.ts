import { http, HttpResponse } from "msw/http";
import type { RequestHandler } from "msw";

export const handlers: RequestHandler[] = [
  http.get("https://api.example.com/dry-run", () => {
    return HttpResponse.json({
      canImport: false,
      errors: ["Extension not supported."],
      warnings: ["I'm really scared of importing this file, man."],
    });
  }),
];
