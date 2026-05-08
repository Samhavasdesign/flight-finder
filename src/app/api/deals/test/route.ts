import { NextResponse } from "next/server";
import { getHubs } from "@/lib/hubs";
import { fetchDealSurfFaresForHubs } from "@/lib/deals/fetchFares";
import { scoreAndFilter, type DealsByOrigin } from "@/lib/deals/scoreAndFilter";
import { deduplicateDeals } from "@/lib/deals/deduplicate";
import { validateWithRSS } from "@/lib/deals/validateWithRSS";
import { sendDigest } from "@/lib/deals/sendDigest";

export async function GET() {
  const today = new Date();
  const hubs = getHubs();
  const hubFares = await fetchDealSurfFaresForHubs(hubs, today);
  const deals: DealsByOrigin = await scoreAndFilter(hubFares);

  let deduplicatedDeals: DealsByOrigin = deals;
  try {
    deduplicatedDeals = await deduplicateDeals(deals);
  } catch (error: unknown) {
    console.error("[test] Failed to deduplicate deals:", error);
  }

  let rssValidatedDeals: DealsByOrigin = deduplicatedDeals;
  try {
    rssValidatedDeals = await validateWithRSS(deduplicatedDeals);
  } catch (error: unknown) {
    console.error("[test] Failed to validate deals with RSS:", error);
  }

  console.log("[test] Calling sendDigest with deals:" + JSON.stringify(rssValidatedDeals));
  await sendDigest(rssValidatedDeals);

  return NextResponse.json({
    hubs,
    fares: hubFares,
    deals: rssValidatedDeals,
  });
}
