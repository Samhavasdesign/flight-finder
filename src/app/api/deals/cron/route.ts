import { NextResponse } from "next/server";
import { getHubs } from "@/lib/hubs";
import { fetchDealSurfFaresForHubs } from "@/lib/deals/fetchFares";
import { scoreAndFilter, type DealsByOrigin } from "@/lib/deals/scoreAndFilter";
import { deduplicateDeals } from "@/lib/deals/deduplicate";
import { validateWithRSS } from "@/lib/deals/validateWithRSS";
import { sendDigest } from "@/lib/deals/sendDigest";
import { logRun } from "@/lib/deals/logRun";

export async function GET() {
  const startedAt = new Date();
  console.log("[cron] Deal alert run started", startedAt.toISOString());

  const hubs = getHubs();

  let fares = await Promise.resolve([] as Awaited<ReturnType<typeof fetchDealSurfFaresForHubs>>);
  try {
    fares = await fetchDealSurfFaresForHubs(hubs, startedAt);
  } catch (error: unknown) {
    console.error("[cron] Failed to fetch fares:", error);
    return NextResponse.json({ error: "Failed to fetch fares" }, { status: 500 });
  }

  let deals: DealsByOrigin = await Promise.resolve({} as Awaited<ReturnType<typeof scoreAndFilter>>);
  try {
    deals = await scoreAndFilter(fares);
  } catch (error: unknown) {
    console.error("[cron] Failed to score/filter deals:", error);
    return NextResponse.json({ error: "Failed to score and filter deals" }, { status: 500 });
  }

  let deduplicatedDeals: DealsByOrigin = deals;
  try {
    deduplicatedDeals = await deduplicateDeals(deals);
  } catch (error: unknown) {
    console.error("[cron] Failed to deduplicate deals:", error);
  }

  let rssValidatedDeals: DealsByOrigin = deduplicatedDeals;
  try {
    rssValidatedDeals = await validateWithRSS(deduplicatedDeals);
  } catch (error: unknown) {
    console.error("[cron] Failed to validate deals with RSS:", error);
  }

  try {
    await sendDigest(rssValidatedDeals);
  } catch (error: unknown) {
    console.error("[cron] Failed to send digest:", error);
  }

  const errors: Array<{ airportCode: string; errorMessage: string; statusCode?: number }> = [];
  await logRun(rssValidatedDeals, errors);

  const dealsFound = Object.keys(rssValidatedDeals).length;
  console.log("[cron] Run complete", { dealsFound });

  return NextResponse.json({ success: true, dealsFound });
}
