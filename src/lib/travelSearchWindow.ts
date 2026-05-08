export type RouteDistanceCategory = "short-haul" | "medium-haul" | "long-haul";

export type TravelTimingLabel = "Leave Soon" | "Worth Planning" | "Big Escape";

export type SuggestedTripLengths = { minDays: number; maxDays: number };

export type TravelSearchWindowResult = {
  category: RouteDistanceCategory;
  earliestDepartureDate: string;
  latestDepartureDate: string;
  suggestedTripLengths: SuggestedTripLengths;
  displayLabel: TravelTimingLabel;
};

function formatIsoDateUtc(y: number, m: number, d: number): string {
  const mm = String(m + 1).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

function addDaysUtc(date: Date, days: number): Date {
  const next = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

/**
 * Default deal-surf windows by great-circle distance (km).
 * Short: &lt; 1,500 · Medium: 1,500–5,500 · Long: &gt; 5,500
 */
export function getTravelSearchWindow(
  routeDistanceKm: number | null,
  currentDate: Date
): TravelSearchWindowResult {
  const d = routeDistanceKm ?? 3500;

  let category: RouteDistanceCategory;
  let offsetEarliest: number;
  let offsetLatest: number;
  let displayLabel: TravelTimingLabel;
  let suggestedTripLengths: SuggestedTripLengths;

  if (d < 1500) {
    category = "short-haul";
    offsetEarliest = 14;
    offsetLatest = 60;
    displayLabel = "Leave Soon";
    suggestedTripLengths = { minDays: 3, maxDays: 5 };
  } else if (d <= 5500) {
    category = "medium-haul";
    offsetEarliest = 30;
    offsetLatest = 120;
    displayLabel = "Worth Planning";
    suggestedTripLengths = { minDays: 5, maxDays: 10 };
  } else {
    category = "long-haul";
    offsetEarliest = 60;
    offsetLatest = 180;
    displayLabel = "Big Escape";
    suggestedTripLengths = { minDays: 10, maxDays: 21 };
  }

  const earliest = addDaysUtc(currentDate, offsetEarliest);
  const latest = addDaysUtc(currentDate, offsetLatest);

  return {
    category,
    earliestDepartureDate: formatIsoDateUtc(
      earliest.getUTCFullYear(),
      earliest.getUTCMonth(),
      earliest.getUTCDate()
    ),
    latestDepartureDate: formatIsoDateUtc(
      latest.getUTCFullYear(),
      latest.getUTCMonth(),
      latest.getUTCDate()
    ),
    suggestedTripLengths,
    displayLabel,
  };
}

export function parseIsoDateUtc(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  const dt = new Date(Date.UTC(y, mo, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo || dt.getUTCDate() !== d)
    return null;
  return dt;
}

const utcFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** e.g. June 30 – July 14, 2026 */
export function formatApiTravelSpan(departureIso: string, returnIso: string): string {
  const a = parseIsoDateUtc(departureIso);
  const b = parseIsoDateUtc(returnIso);
  if (!a || !b) return "";
  const left = utcFmt.format(a);
  const right = utcFmt.format(b);
  return `${left} – ${right}`;
}

/** Plain month span (no “late” qualifier); kept for non-UI helpers. */
export function formatMonthRangeFromIso(isoStart: string, isoEnd: string): string {
  const a = parseIsoDateUtc(isoStart);
  const b = parseIsoDateUtc(isoEnd);
  if (!a || !b) return "";
  const mo = (x: Date) =>
    x.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
  const yr = (x: Date) => x.getUTCFullYear();
  const ma = mo(a);
  const mb = mo(b);
  const ya = yr(a);
  const yb = yr(b);
  if (ma === mb && ya === yb) return `${ma} ${ya}`;
  if (ya === yb) return `${ma}–${mb} ${ya}`;
  return `${ma} ${ya}–${mb} ${yb}`;
}

/**
 * Readable seasonal-style range for email fallback, e.g. “late June–July 2026”.
 * Used when we show the category search window instead of API outbound/return dates.
 */
export function formatTravelWindowHumanRange(isoStart: string, isoEnd: string): string {
  const a = parseIsoDateUtc(isoStart);
  const b = parseIsoDateUtc(isoEnd);
  if (!a || !b) return "";

  const monthLong = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });

  const ma = monthLong(a);
  const mb = monthLong(b);
  const ya = a.getUTCFullYear();
  const yb = b.getUTCFullYear();
  const da = a.getUTCDate();

  const startPart = da >= 15 ? `late ${ma}` : ma;

  if (ma === mb && ya === yb) {
    return da >= 15 ? `late ${ma} ${ya}` : `${ma} ${ya}`;
  }

  if (ya === yb) {
    return `${startPart}–${mb} ${ya}`;
  }

  return `${startPart} ${ya}–${mb} ${yb}`;
}

export function formatBestForPhrase(
  category: RouteDistanceCategory,
  lengths: SuggestedTripLengths
): string {
  const { minDays, maxDays } = lengths;
  if (category === "short-haul") {
    return `Best for: ${minDays}–${maxDays} day city break`;
  }
  if (category === "medium-haul") {
    return `Best for: ${minDays}–${maxDays} day trip`;
  }
  return `Best for: ${minDays}–${maxDays} day escape`;
}

/** Compact trip dates for scanning, e.g. Mar 12–19, 2026 */
export function formatCompactRoundTripDates(depIso: string, retIso: string): string | null {
  const a = parseIsoDateUtc(depIso);
  const b = parseIsoDateUtc(retIso);
  if (!a || !b) return null;

  const moShort = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });

  const da = a.getUTCDate();
  const db = b.getUTCDate();
  const ma = a.getUTCMonth();
  const mb = b.getUTCMonth();
  const ya = a.getUTCFullYear();
  const yb = b.getUTCFullYear();

  if (ma === mb && ya === yb) {
    return `${moShort(a)} ${da}–${db}, ${ya}`;
  }
  if (ya === yb) {
    return `${moShort(a)} ${da} – ${moShort(b)} ${db}, ${ya}`;
  }
  return `${moShort(a)} ${da}, ${ya} – ${moShort(b)} ${db}, ${yb}`;
}

/** Calendar span between outbound and return (e.g. 7-day trip). Uses UTC dates only. */
export function formatTripSpanDaysPhrase(depIso: string, retIso: string): string | null {
  const a = parseIsoDateUtc(depIso);
  const b = parseIsoDateUtc(retIso);
  if (!a || !b) return null;
  const span = Math.round((b.getTime() - a.getTime()) / 86400000);
  if (span <= 0) return null;
  return `${span}-day trip`;
}
