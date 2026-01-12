import { useQuery } from "@tanstack/react-query";
import type { Issue } from "../types/github";

async function fetchIssues(owner: string, repo: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=all`;

  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`Fetch returned error with status ${res.status}`);

  return res.json() as Promise<Issue[]>;
}

export function useIssues(owner: string, repo: string) {
  return useQuery({
    queryKey: ["issues", owner, repo],
    queryFn: () => fetchIssues(owner, repo),
    enabled: Boolean(owner && repo),
  });
}
