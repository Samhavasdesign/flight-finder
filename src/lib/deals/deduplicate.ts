import { createClient } from "@supabase/supabase-js";
import type { DealsByOrigin } from "@/lib/deals/scoreAndFilter";

type DedupRow = {
  airport_code: string;
  last_surfaced_at: string;
};

export async function deduplicateDeals(
  deals: DealsByOrigin
): Promise<DealsByOrigin> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Dedup skipped: missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return deals;
  }

  const airportCodes = Object.values(deals)
    .flatMap((originDeals) => originDeals.map((deal) => deal.hubFare.destination.trim().toUpperCase()))
    .filter((code) => code.length > 0);

  if (airportCodes.length === 0) return deals;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const cutoffIso = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("dedup_index")
    .select("airport_code, last_surfaced_at")
    .in("airport_code", airportCodes)
    .gte("last_surfaced_at", cutoffIso);

  if (error) {
    console.error("Dedup query failed:", error);
    return deals;
  }

  const recentRows: DedupRow[] = Array.isArray(data) ? (data as DedupRow[]) : [];
  const recentCodes = new Set(recentRows.map((row) => row.airport_code.trim().toUpperCase()));

  const filtered: DealsByOrigin = {};
  for (const [origin, originDeals] of Object.entries(deals)) {
    const keptDeals = originDeals.filter((deal) => {
      const airportCode = deal.hubFare.destination.trim().toUpperCase();
      return !recentCodes.has(airportCode);
    });
    if (keptDeals.length > 0) {
      filtered[origin] = keptDeals;
    }
  }

  return filtered;
}
