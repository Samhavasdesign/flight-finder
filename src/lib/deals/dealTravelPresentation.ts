import type { HubFare } from "@/lib/deals/fetchFares";
import type { ScoredDeal } from "@/lib/deals/scoreAndFilter";
import { getRouteDistanceKm } from "@/lib/routeDistance";
import {
  formatApiTravelSpan,
  formatBestForPhrase,
  formatCompactRoundTripDates,
  formatTripSpanDaysPhrase,
  formatTravelWindowHumanRange,
  getTravelSearchWindow,
  type TravelSearchWindowResult,
} from "@/lib/travelSearchWindow";

export type DealTravelLines = {
  timingLabel: string;
  travelWindowLine: string;
  bestForLine: string;
  whySurfacedLine: string;
};

export type DealDigestCardModel = {
  destinationCity: string;
  price: number;
  originCity: string;
  originCode: string;
  destinationCode: string;
  airline: string;
  flightMetaLine: string;
  compactTripDates: string | null;
  score: number;
  whyBrief: string;
  showEarlyDataNote: boolean;
  isFeatured: boolean;
};

function isValidIsoDate(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s.trim());
}

function stopsPhrase(stops: number): string {
  if (stops === 0) return "Nonstop";
  if (stops === 1) return "1 stop";
  return `${stops} stops`;
}

/** Clock time from ISO instant (UTC) for compact email display. */
function formatDepartureClock(iso: string | null | undefined): string | null {
  if (!iso?.trim()) return null;
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  const d = new Date(t);
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

/**
 * Airline · optional departure · optional trip span · Nonstop|stops · optional outbound duration.
 * Omits trip span when dates are missing/invalid; omits duration when the feed did not provide it.
 */
function buildFlightMetaLine(fare: HubFare): string {
  const sp = stopsPhrase(fare.stops);
  const parts: string[] = [fare.airline];
  const depClock = formatDepartureClock(fare.outboundDepartsAt ?? undefined);
  if (depClock) parts.push(depClock);
  const dep = fare.departureDate.trim();
  const ret = fare.returnDate.trim();
  const tripSpan =
    isValidIsoDate(dep) && isValidIsoDate(ret) ? formatTripSpanDaysPhrase(dep, ret) : null;
  if (tripSpan) parts.push(tripSpan);
  parts.push(sp);
  const dur = fare.outboundDuration?.trim();
  if (dur) parts.push(dur);
  return parts.join(" · ");
}

function shortenWhySurfaced(deal: ScoredDeal): string {
  const stripped = deal.scoreResult.label
    .replace(/\s*\(early data — treat as indicative\)\s*$/i, "")
    .trim();
  if (!stripped) return "";
  let out = stripped;
  if (/[.!?]/.test(stripped)) {
    const bits = stripped.split(/(?<=[.!?])\s+/).filter(Boolean);
    out = bits.slice(0, 2).join(" ");
  }
  if (out.length > 220) out = `${out.slice(0, 217).trimEnd()}…`;
  return out;
}

function fallbackWindowBody(window: TravelSearchWindowResult): string {
  const range = formatTravelWindowHumanRange(
    window.earliestDepartureDate,
    window.latestDepartureDate
  );
  return range || "see fare details";
}

function buildTravelWindowParts(
  deal: ScoredDeal,
  window: TravelSearchWindowResult
): { body: string; fullLine: string } {
  const dep = deal.hubFare.departureDate.trim();
  const ret = deal.hubFare.returnDate.trim();

  if (isValidIsoDate(dep) && isValidIsoDate(ret)) {
    const span = formatApiTravelSpan(dep, ret);
    if (span) {
      const body = span;
      return { body, fullLine: `Travel window: ${body}` };
    }
  }

  const body = fallbackWindowBody(window);
  return { body, fullLine: `Travel window: ${body}` };
}

export function buildDealDigestCard(deal: ScoredDeal): DealDigestCardModel {
  const compactTripDates = (() => {
    const dep = deal.hubFare.departureDate.trim();
    const ret = deal.hubFare.returnDate.trim();
    return isValidIsoDate(dep) && isValidIsoDate(ret)
      ? formatCompactRoundTripDates(dep, ret)
      : null;
  })();

  return {
    destinationCity: deal.hubFare.destinationCity,
    price: Math.round(deal.hubFare.price),
    originCity: deal.hubFare.hub.originCity,
    originCode: deal.hubFare.hub.origin,
    destinationCode: deal.hubFare.destination,
    airline: deal.hubFare.airline,
    flightMetaLine: buildFlightMetaLine(deal.hubFare),
    compactTripDates,
    score: deal.scoreResult.score,
    whyBrief: shortenWhySurfaced(deal),
    showEarlyDataNote: deal.scoreResult.conservativeMode,
    isFeatured: deal.isFeatured,
  };
}

export function getDealTravelLines(deal: ScoredDeal, referenceDate: Date): DealTravelLines {
  const dist = getRouteDistanceKm(deal.hubFare.hub.origin, deal.hubFare.destination);
  const window = getTravelSearchWindow(dist, referenceDate);
  const { fullLine: travelWindowLine } = buildTravelWindowParts(deal, window);
  const bestForLineFull = formatBestForPhrase(window.category, window.suggestedTripLengths);
  return {
    timingLabel: window.displayLabel,
    travelWindowLine,
    bestForLine: bestForLineFull,
    whySurfacedLine: `Why this surfaced: ${deal.scoreResult.label}`,
  };
}
