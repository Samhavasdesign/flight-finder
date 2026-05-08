import type { FlightResult } from "@/types";

function airlineKey(r: FlightResult): string {
  return (r.airlineIataCode ?? r.airline).trim().toUpperCase();
}

/**
 * Find the best current row for a saved snapshot after a new search.
 * Ignores price; matches route, dates, stops, then airline.
 */
export function findMatchingResult(
  snapshot: FlightResult,
  results: FlightResult[],
): FlightResult | null {
  const candidates = results.filter(
    (r) =>
      r.originAirportCode === snapshot.originAirportCode &&
      r.airportCode === snapshot.airportCode &&
      r.departureDate === snapshot.departureDate &&
      (r.returnDate ?? "") === (snapshot.returnDate ?? "") &&
      r.stops === snapshot.stops,
  );
  if (candidates.length === 0) return null;

  const snapAir = airlineKey(snapshot);
  const byAirline = candidates.filter(
    (r) => airlineKey(r) === snapAir || r.airline === snapshot.airline,
  );
  const pool = byAirline.length > 0 ? byAirline : candidates;
  return [...pool].sort((a, b) => a.price - b.price)[0] ?? null;
}

export function tripFingerprint(snapshot: FlightResult, origin: string): string {
  return [
    origin.trim().toUpperCase(),
    snapshot.airportCode,
    snapshot.departureDate,
    snapshot.returnDate ?? "",
    String(snapshot.stops),
    airlineKey(snapshot),
  ].join("|");
}
