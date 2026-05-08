import { createClient } from "@supabase/supabase-js";
import type { DealsByOrigin } from "@/lib/deals/scoreAndFilter";

type RunError = {
  airportCode: string;
  errorMessage: string;
  statusCode?: number;
};

export async function logRun(
  deals: DealsByOrigin,
  errors: RunError[]
): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[logRun] Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const surfacedAt = new Date().toISOString();
  const dealEntries = Object.entries(deals);

  try {
    if (dealEntries.length > 0) {
      const dealRows = dealEntries.flatMap(([, originDeals]) =>
        originDeals.map((deal) => ({
          airport_code: deal.hubFare.destination,
          continent: deal.hubFare.hub.originContinent,
          price: deal.hubFare.price,
          score: deal.scoreResult.score,
          signal: deal.scoreResult.dominantSignal,
          label: deal.scoreResult.label,
          surfaced_at: surfacedAt,
        }))
      );

      const { error } = await supabase.from("deals_log").insert(dealRows);
      if (error) {
        console.error("[logRun] Failed to write deals_log:", error);
      }
    }
  } catch (error: unknown) {
    console.error("[logRun] Failed to write deals_log:", error);
  }

  try {
    if (dealEntries.length > 0) {
      const uniqueDestinations = new Set(
        dealEntries.flatMap(([, originDeals]) =>
          originDeals.map((deal) => deal.hubFare.destination)
        )
      );

      const dedupRows = [...uniqueDestinations].map((destination) => ({
        airport_code: destination,
        last_surfaced_at: surfacedAt,
      }));

      const { error } = await supabase
        .from("dedup_index")
        .upsert(dedupRows, { onConflict: "airport_code" });
      if (error) {
        console.error("[logRun] Failed to upsert dedup_index:", error);
      }
    }
  } catch (error: unknown) {
    console.error("[logRun] Failed to upsert dedup_index:", error);
  }

  try {
    if (errors.length > 0) {
      const errorRows = errors.map((entry) => ({
        airport_code: entry.airportCode,
        error_message: entry.errorMessage,
        status_code: entry.statusCode ?? null,
        run_at: surfacedAt,
      }));

      const { error } = await supabase.from("run_errors").insert(errorRows);
      if (error) {
        console.error("[logRun] Failed to write run_errors:", error);
      }
    }
  } catch (error: unknown) {
    console.error("[logRun] Failed to write run_errors:", error);
  }

  console.log(`[logRun] Logged ${dealEntries.length} deals, ${errors.length} errors`);
}
