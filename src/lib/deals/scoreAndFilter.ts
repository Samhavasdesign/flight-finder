import type { HubFare } from "@/lib/deals/fetchFares";
import { scoreFare, type FareHistory, type ScoreResult } from "@/lib/dealScore";
import { createClient } from "@supabase/supabase-js";

const MAX_DEALS_PER_ORIGIN = 5;

export type ScoredDeal = {
  hubFare: HubFare;
  scoreResult: ScoreResult;
  isFeatured: boolean;
  /** Set by validateWithRSS; false until RSS cross-check runs. */
  rssConfirmed: boolean;
};

export type DealsByOrigin = Record<string, ScoredDeal[]>;

type FareHistoryRow = {
  airport_code: string;
  price: number;
  source: "seed" | "bootstrap" | "live";
  recorded_at: string;
};

type PendingDeal = {
  hubFare: HubFare;
  scoreResult: ScoreResult;
};

function isEuropeToSouthAmericaDeal(hubFare: HubFare): boolean {
  return (
    hubFare.hub.originContinent.trim() === "Europe" &&
    hubFare.destinationContinent.trim() === "South America"
  );
}

function finalizeDealsForOrigin(deals: PendingDeal[]): ScoredDeal[] {
  const nonstop = deals
    .filter((d) => d.hubFare.stops === 0)
    .sort((a, b) => a.hubFare.price - b.hubFare.price);
  const connecting = deals
    .filter((d) => d.hubFare.stops !== 0)
    .sort((a, b) => a.hubFare.price - b.hubFare.price);
  const ordered = [...nonstop, ...connecting].slice(0, MAX_DEALS_PER_ORIGIN);
  return ordered.map((d) => ({
    hubFare: d.hubFare,
    scoreResult: d.scoreResult,
    isFeatured: d.hubFare.stops === 0 && d.hubFare.price < 150,
    rssConfirmed: false,
  }));
}

export async function scoreAndFilter(hubFares: HubFare[]): Promise<DealsByOrigin> {
  if (hubFares.length === 0) return {};

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase env vars are missing: SUPABASE_URL and SUPABASE_ANON_KEY");
    return {};
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const airportCodes = [...new Set(hubFares.map((fare) => fare.destination.toUpperCase()))];

  const { data, error } = await supabase
    .from("fare_history")
    .select("airport_code, price, source, recorded_at")
    .in("airport_code", airportCodes);

  if (error) {
    console.error("Failed to fetch fare history:", error);
    return {};
  }

  const rows: FareHistoryRow[] = Array.isArray(data) ? (data as FareHistoryRow[]) : [];
  const history: FareHistory[] = rows.map((row) => ({
    airportCode: row.airport_code,
    price: row.price,
    source: row.source,
    recordedAt: row.recorded_at,
  }));

  const pendingByOrigin: Record<string, PendingDeal[]> = {};

  for (const hubFare of hubFares) {
    const scoreResult = scoreFare(hubFare.price, hubFare.destination, history);
    if (!scoreResult.isGenuineDeal) continue;
    if (!isEuropeToSouthAmericaDeal(hubFare)) continue;
    if (hubFare.price > 700) continue;

    const origin = hubFare.hub.origin;
    const pending: PendingDeal = { hubFare, scoreResult };

    const existing = pendingByOrigin[origin];
    if (existing) {
      existing.push(pending);
    } else {
      pendingByOrigin[origin] = [pending];
    }
  }

  const dealsByOrigin: DealsByOrigin = {};
  for (const [origin, pendingList] of Object.entries(pendingByOrigin)) {
    const finalized = finalizeDealsForOrigin(pendingList);
    if (finalized.length > 0) {
      dealsByOrigin[origin] = finalized;
    }
  }

  return dealsByOrigin;
}
