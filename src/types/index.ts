import type { ContinentFilter, DestinationTier } from "@/data/searchDestinations";

export type { Airport } from "@/data/airports";
export type { ContinentFilter, DestinationTier };

export type SearchParams = {
  origin: string;
  departureDate: string;
  returnDate: string | null;
  tripType: "round-trip" | "one-way";
  continent: ContinentFilter;
  region: string;
  flexibleDates?: boolean;
  includeNearbyAirports?: boolean;
  /** Nearby outbound date window in days on each side, e.g. 3 => +/-3 days. */
  dateFlexDays?: 1 | 3 | 5;
};

export type FlightResult = {
  destination: string;
  /** Country of the destination city/airport when known (for display). */
  destinationCountry?: string | null;
  /** Search origin IATA code (outbound from). */
  originAirportCode: string;
  airportCode: string;
  price: number;
  currency: string;
  departureDate: string;
  /** Original user-selected outbound date (for flexible-date hinting). */
  requestedDepartureDate?: string | null;
  /** ISO 8601 outbound departure from origin (first segment). */
  outboundDepartsAt?: string | null;
  /** ISO 8601 outbound arrival at destination (last segment). */
  outboundArrivesAt?: string | null;
  /** Total outbound journey time, e.g. "12h 30m". */
  outboundDuration?: string | null;
  /** Outbound trip length in minutes (for sorting). */
  outboundDurationMinutes?: number | null;
  returnDate: string | null;
  airline: string;
  /** Two-letter IATA airline code when available (marketing carrier). */
  airlineIataCode?: string | null;
  /** Duffel-hosted SVG (symbol or lockup) when the API includes it. */
  airlineLogoUrl?: string | null;
  stops: number;
  routeType: "direct" | "standard";
  /** Fare product name from the airline (Duffel slice), e.g. brand or cabin. */
  fareType: string;
  continent: string;
  region: string;
  tier: DestinationTier;
  /** Debug marker: whether this response used date flexibility. */
  flexSearchUsed?: boolean;
  /** Debug marker: flex day window used by API (0,1,3,5,7). */
  flexDaysUsed?: 0 | 1 | 3 | 5 | 7;
  /** Data source marker for UI/debugging. */
  source?: "serp" | "duffel" | "travelpayouts" | "firecrawl";
  flexibleAlternative?: {
    month: string;
    price: number;
    saving: number;
    departureDate: string;
  };
};
