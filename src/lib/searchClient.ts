import type { FlightResult, SearchParams } from "@/types";

type SearchApiResponse =
  | FlightResult[]
  | {
      results: FlightResult[];
      meta?: { hasMore?: boolean };
    };

function normalize(data: SearchApiResponse): FlightResult[] {
  if (Array.isArray(data)) return data;
  return data.results ?? [];
}

export async function fetchSearchStage(
  params: SearchParams,
  searchStage: "fast" | "full",
): Promise<FlightResult[]> {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...params, searchStage }),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Search failed (${res.status})`);
  }
  const raw = (await res.json()) as SearchApiResponse;
  return normalize(raw);
}
