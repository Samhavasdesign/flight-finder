import type { Hub } from "@/lib/hubs";

type FlightResult = {
  destination: string;
  airportCode: string;
  price: number;
  currency: string;
  departureDate: string;
  returnDate: string | null;
  airline: string;
  stops: number;
  continent?: string;
  source?: string;
  /** Outbound journey time when search enrichment returned it (e.g. "2h 15m"). */
  outboundDuration?: string | null;
  /** ISO outbound departure from origin when known. */
  outboundDepartsAt?: string | null;
};

type SearchApiResponse =
  | FlightResult[]
  | {
      results: FlightResult[];
    };

export type HubFare = {
  hub: Hub;
  destination: string;
  destinationCity: string;
  /** Destination region continent from search API (e.g. Europe, Asia). */
  destinationContinent: string;
  price: number;
  airline: string;
  stops: number;
  departureDate: string;
  returnDate: string;
  outboundDuration?: string | null;
  outboundDepartsAt?: string | null;
};

function normalizeSearchResponse(data: SearchApiResponse): FlightResult[] {
  if (Array.isArray(data)) return data;
  return Array.isArray(data.results) ? data.results : [];
}

function formatIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Keep one row per origin→destination IATA code: lowest price (ties → earlier outbound date). */
function collapseCheapestPerDestination(fares: HubFare[]): HubFare[] {
  const byRoute = new Map<string, HubFare>();
  for (const fare of fares) {
    const dest = fare.destination.trim().toUpperCase();
    const key = `${fare.hub.origin}|${dest}`;
    const prev = byRoute.get(key);
    if (!prev) {
      byRoute.set(key, fare);
      continue;
    }
    if (fare.price < prev.price) {
      byRoute.set(key, fare);
      continue;
    }
    if (fare.price === prev.price && fare.departureDate < prev.departureDate) {
      byRoute.set(key, fare);
    }
  }
  return [...byRoute.values()];
}

/**
 * Runs three anchored searches (short / medium / long typical trip anchors) and merges to the
 * cheapest fare per origin→destination pair so deal surf respects distance-appropriate date ranges.
 */
export async function fetchDealSurfFaresForHubs(
  hubs: Hub[],
  referenceDate: Date
): Promise<HubFare[]> {
  const waves = [
    { depPlusDays: 37, tripDays: 4 },
    { depPlusDays: 75, tripDays: 7 },
    { depPlusDays: 120, tripDays: 14 },
  ];

  const batches = await Promise.all(
    waves.map(({ depPlusDays, tripDays }) => {
      const departure = new Date(referenceDate);
      departure.setDate(departure.getDate() + depPlusDays);
      const returning = new Date(departure);
      returning.setDate(returning.getDate() + tripDays);
      return fetchFaresForHubs(hubs, formatIsoDate(departure), formatIsoDate(returning));
    })
  );

  return collapseCheapestPerDestination(batches.flat());
}

export async function fetchFaresForHubs(
  hubs: Hub[],
  departureDate: string,
  returnDate: string
): Promise<HubFare[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

  const results = await Promise.allSettled(
    hubs.map(async (hub) => {
      try {
        // Flexible dates ±5d around anchor so search explores nearby departures; returns cheapest per destination below.
        const response = await fetch(`${baseUrl}/api/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin: hub.origin,
            departureDate,
            returnDate,
            tripType: "round-trip",
            flexibleDates: true,
            dateFlexDays: 5,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch fares (${response.status})`);
        }

        const data = (await response.json()) as SearchApiResponse;
        const searchResults = normalizeSearchResponse(data);

        const mapped = searchResults.map((result) => ({
          hub,
          destination: result.airportCode,
          destinationCity: result.destination,
          destinationContinent: result.continent?.trim() ?? "",
          price: result.price,
          airline: result.airline,
          stops: result.stops,
          departureDate: result.departureDate,
          returnDate: result.returnDate ?? "",
          outboundDuration: result.outboundDuration ?? null,
          outboundDepartsAt: result.outboundDepartsAt ?? null,
        }));
        return collapseCheapestPerDestination(mapped);
      } catch (error) {
        console.error(`[fetchFares] Failed for origin: ${hub.origin}`, error);
        throw error;
      }
    })
  );

  const allFares: HubFare[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allFares.push(...result.value);
    }
  }
  return allFares;
}
