import { NextRequest, NextResponse } from "next/server";
import type { FlightResult } from "@/types";
import { asyncPool } from "@/lib/asyncPool";
import { airports } from "@/data/airports";
import countryGeo from "@/data/countryGeo.json";
import {
  CONTINENT_OPTIONS,
  pickDestinationsForSearch,
  type ContinentFilter,
  type SearchableDestination,
} from "@/data/searchDestinations";
import { HUB_CODES } from "@/data/hubCodes";

const DETAIL_TOP_N = 5;
const DETAIL_CONCURRENCY = 2;
const DETAIL_TIMEOUT_MS = 2500;
const TRAVELPAYOUTS_TIMEOUT_MS = 1800;
const TRAVELPAYOUTS_MAX_RETRIES = 1;
const SERP_CANDIDATE_CONCURRENCY = 3;
const MAX_RESULTS = 100;
const DUFFEL_SUPPLEMENT_MAX_DESTINATIONS = 180;
const DUFFEL_SUPPLEMENT_FAST_DESTINATIONS = 20;
const DUFFEL_SUPPLEMENT_CONCURRENCY = 4;
const DUFFEL_OFFERS_LIMIT = 60;
const TRAVELPAYOUTS_SUPPLEMENT_MAX_DESTINATIONS = 120;
const TRAVELPAYOUTS_SUPPLEMENT_FAST_DESTINATIONS = 20;
const TRAVELPAYOUTS_SUPPLEMENT_CONCURRENCY = 6;
const FIRECRAWL_TIMEOUT_MS = 30000;
const FIRECRAWL_LIMIT_PER_SITE = 5;
const DUFFEL_FULL_BUDGET_MS = 12000;
const TRAVELPAYOUTS_FULL_BUDGET_MS = 8000;
const FAST_STAGE_MIN_PROVIDER_RESULTS = 4;
const DUFFEL_FAST_FIRST_PASS_DESTINATIONS = 8;
const TRAVELPAYOUTS_FAST_FIRST_PASS_DESTINATIONS = 8;
const SUPPLEMENT_FLEX_MAX_DATES = 5;
const SEARCH_CACHE_TTL_MS = 10 * 60 * 1000;
const SEARCH_CACHE_MAX_ENTRIES = 300;

type SearchBody = {
  origin?: string;
  departureDate?: string;
  returnDate?: string | null;
  tripType?: "round-trip" | "one-way";
  continent?: string;
  region?: string;
  month?: string;
  currency?: string;
  budget?: number | string;
  flexibleDates?: boolean;
  includeNearbyAirports?: boolean;
  dateFlexDays?: 1 | 3 | 5;
  searchStage?: "fast" | "full";
};

type SerpDestination = {
  name?: string;
  country?: string;
  destination_airport?: {
    code?: string;
  };
  flight_price?: number;
  number_of_stops?: number;
  airline?: string;
  start_date?: string;
  end_date?: string;
};

type SerpResponse = {
  destinations?: SerpDestination[];
  error?: string;
};

type Geo = { continent: string; region: string };
const airportByCode = new Map(
  airports.map((a) => [a.code.toUpperCase(), a] as const)
);
const LOCAL_AIRLINE_LOGOS: Record<string, string> = {
  "qatar airways": "/airlines/qatar-airways.svg",
  emirates: "/airlines/emirates.svg",
  lufthansa: "/airlines/lufthansa.svg",
  "british airways": "/airlines/british-airways.svg",
  "air france": "/airlines/air-france.svg",
  klm: "/airlines/klm.svg",
  "turkish airlines": "/airlines/turkish-airlines.svg",
  "south african": "/airlines/south-african.svg",
  "air china": "/airlines/air-china.svg",
  "china eastern": "/airlines/china-eastern.svg",
  "china southern": "/airlines/china-southern.svg",
  "hainan airlines": "/airlines/hainan-airlines.svg",
  xiamenair: "/airlines/xiamenair.svg",
  "xiamen air": "/airlines/xiamenair.svg",
  "shenzhen airlines": "/airlines/shenzhen-airlines.svg",
  "sichuan airlines": "/airlines/sichuan-airlines.svg",
  "cathay pacific": "/airlines/cathay-pacific.svg",
  cathay: "/airlines/cathay-pacific.svg",
  "hong kong express": "/airlines/hk-express.svg",
  "hk express": "/airlines/hk-express.svg",
  "spring airlines": "/airlines/spring-airlines.svg",
  spring: "/airlines/spring-airlines.svg",
  airasia: "/airlines/airasia.svg",
  "air asia": "/airlines/airasia.svg",
  "indonesia airasia": "/airlines/airasia.svg",
  "thai airasia": "/airlines/airasia.svg",
  "philippines airasia": "/airlines/airasia.svg",
  "airasia x": "/airlines/airasia.svg",
};

/** Two-letter IATA (or digit+letter) → local `/public/airlines/*.svg` when name lookup misses. */
const AIRLINE_LOGO_BY_IATA: Record<string, string> = {
  CX: "/airlines/cathay-pacific.svg",
  UO: "/airlines/hk-express.svg",
  "9C": "/airlines/spring-airlines.svg",
  AK: "/airlines/airasia.svg",
  D7: "/airlines/airasia.svg",
  FD: "/airlines/airasia.svg",
  Z2: "/airlines/airasia.svg",
};
const AIRLINE_IATA_TO_NAME: Record<string, string> = {
  // Middle East / Africa
  EK: "Emirates",
  QR: "Qatar Airways",
  EY: "Etihad Airways",
  MS: "EgyptAir",
  ET: "Ethiopian Airlines",
  KQ: "Kenya Airways",
  AT: "Royal Air Maroc",
  WY: "Oman Air",
  SV: "Saudia",
  GF: "Gulf Air",
  ME: "Middle East Airlines",
  // Europe
  BA: "British Airways",
  LH: "Lufthansa",
  AF: "Air France",
  KL: "KLM",
  TK: "Turkish Airlines",
  LX: "SWISS",
  OS: "Austrian Airlines",
  SN: "Brussels Airlines",
  IB: "Iberia",
  VY: "Vueling",
  TP: "TAP Air Portugal",
  SK: "Scandinavian Airlines",
  AY: "Finnair",
  LO: "LOT Polish Airlines",
  OK: "Czech Airlines",
  OU: "Croatia Airlines",
  A3: "Aegean Airlines",
  AZ: "ITA Airways",
  FI: "Icelandair",
  EI: "Aer Lingus",
  // Americas
  B6: "JetBlue",
  NK: "Spirit Airlines",
  F9: "Frontier Airlines",
  AS: "Alaska Airlines",
  WS: "WestJet",
  AM: "Aeromexico",
  AV: "Avianca",
  CM: "Copa Airlines",
  LA: "LATAM Airlines",
  G3: "GOL",
  AD: "Azul",
  SA: "South African",
  FR: "Ryanair",
  U2: "easyJet",
  W6: "Wizz Air",
  VS: "Virgin Atlantic",
  UA: "United Airlines",
  DL: "Delta Air Lines",
  AA: "American Airlines",
  AC: "Air Canada",
  // Asia Pacific
  SQ: "Singapore Airlines",
  CX: "Cathay Pacific",
  NH: "All Nippon Airways",
  JL: "Japan Airlines",
  OZ: "Asiana Airlines",
  KE: "Korean Air",
  MU: "China Eastern",
  CZ: "China Southern",
  CA: "Air China",
  HU: "Hainan Airlines",
  MF: "XiamenAir",
  ZH: "Shenzhen Airlines",
  "3U": "Sichuan Airlines",
  FM: "Shanghai Airlines",
  GA: "Garuda Indonesia",
  MH: "Malaysia Airlines",
  TG: "Thai Airways",
  VN: "Vietnam Airlines",
  PR: "Philippine Airlines",
  QF: "Qantas",
  JQ: "Jetstar",
  VA: "Virgin Australia",
  NZ: "Air New Zealand",
  // India / low-cost global
  AI: "Air India",
  "6E": "IndiGo",
  UK: "Vistara",
  SG: "SpiceJet",
  // Common charter/unknown fallback examples
  DP: "Pobeda",
  S7: "S7 Airlines",
};

type GoogleFlightsLeg = {
  departure_airport?: { time?: string };
  arrival_airport?: { time?: string };
  airline_logo?: string;
};

type GoogleFlightsItinerary = {
  total_duration?: number;
  flights?: GoogleFlightsLeg[];
};

type GoogleFlightsResponse = {
  best_flights?: GoogleFlightsItinerary[];
  other_flights?: GoogleFlightsItinerary[];
  error?: string;
};

type TravelpayoutsFare = {
  airline?: string;
  departure_at?: string;
  return_at?: string;
  price?: number;
  duration?: number;
  duration_to?: number;
  duration_back?: number;
};

type TravelpayoutsResponse = {
  success?: boolean;
  currency?: string;
  data?: Record<string, Record<string, TravelpayoutsFare>>;
};

type SearchResponsePayload = {
  results: FlightResult[];
  meta: {
    stage: "fast" | "full";
    hasMore: boolean;
    flexDaysUsed: 0 | 1 | 3 | 5 | 7;
    cacheHit: boolean;
    timingsMs?: {
      total?: number;
      serp?: number;
      nearbySerp?: number;
      duffel?: number;
      travelpayouts?: number;
      firecrawl?: number;
      enrich?: number;
    };
    providerErrors?: Partial<Record<"serp" | "duffel" | "travelpayouts" | "firecrawl", number>>;
  };
};

type CacheEntry = {
  expiresAt: number;
  payload: Omit<SearchResponsePayload, "meta"> & {
    meta: Omit<SearchResponsePayload["meta"], "cacheHit">;
  };
};

type FirecrawlOffer = {
  destination?: string;
  destinationCity?: string;
  destinationAirportCode?: string;
  destinationCountry?: string;
  price?: number | string;
  currency?: string;
  airline?: string;
  stops?: number | string;
  departureDate?: string;
  returnDate?: string | null;
};

type FirecrawlSearchResult = {
  url?: string;
  title?: string;
  description?: string;
  json?: unknown;
};

type FirecrawlResponse = {
  success?: boolean;
  data?: {
    web?: FirecrawlSearchResult[];
  };
  error?: string;
};

const responseCache = new Map<string, CacheEntry>();
const inFlight = new Map<string, Promise<SearchResponsePayload>>();

function pruneResponseCache(now = Date.now()): void {
  for (const [key, entry] of responseCache) {
    if (entry.expiresAt <= now) responseCache.delete(key);
  }
  while (responseCache.size > SEARCH_CACHE_MAX_ENTRIES) {
    const oldestKey = responseCache.keys().next().value as string | undefined;
    if (!oldestKey) break;
    responseCache.delete(oldestKey);
  }
}

const ALLOWED_CONTINENTS = new Set<ContinentFilter>(
  CONTINENT_OPTIONS.map((o) => o.value)
);

function deriveDepartureDate(month?: string): string | null {
  if (!month || typeof month !== "string") return null;
  const m = month.trim();
  if (!/^\d{4}-\d{2}$/.test(m)) return null;
  return `${m}-01`;
}

function parseBudget(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string") {
    const n = parseFloat(raw);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function shiftIsoDateByDays(iso: string, dayDelta: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + dayDelta));
  return date.toISOString().slice(0, 10);
}

function buildCandidateDates(baseIso: string, flexDays: 0 | 1 | 3 | 5 | 7): string[] {
  if (flexDays === 0) return [baseIso];
  const out: string[] = [];
  for (let delta = -flexDays; delta <= flexDays; delta++) {
    out.push(shiftIsoDateByDays(baseIso, delta));
  }
  return out;
}

function buildStagedCandidateDates(
  baseIso: string,
  flexDays: 0 | 1 | 3 | 5 | 7,
  stage: "fast" | "full"
): string[] {
  if (stage === "full" || flexDays <= 1) return buildCandidateDates(baseIso, flexDays);
  const candidates = new Set<string>([
    baseIso,
    shiftIsoDateByDays(baseIso, -1),
    shiftIsoDateByDays(baseIso, 1),
  ]);
  return [...candidates].sort();
}

function pickSupplementCandidateDates(
  candidates: string[],
  maxDates: number
): string[] {
  if (candidates.length <= maxDates) return candidates;
  const center = Math.floor(candidates.length / 2);
  const idx = new Set<number>([0, center, candidates.length - 1]);
  let step = 1;
  while (idx.size < maxDates) {
    const left = center - step;
    const right = center + step;
    if (left >= 0) idx.add(left);
    if (idx.size >= maxDates) break;
    if (right < candidates.length) idx.add(right);
    if (left < 0 && right >= candidates.length) break;
    step++;
  }
  return [...idx]
    .sort((a, b) => a - b)
    .map((i) => candidates[i]);
}

function normalizedCacheKey(input: {
  origin: string;
  departureDate: string;
  returnDate: string | null;
  tripType: "round-trip" | "one-way";
  continent: string;
  region: string;
  currency: string;
  budget: number | null;
  flexDays: 0 | 1 | 3 | 5 | 7;
  stage: "fast" | "full";
}): string {
  return JSON.stringify(input);
}

function geoForAirportCode(code: string): Geo | null {
  const airport = airportByCode.get(code.toUpperCase());
  if (!airport) return null;
  const row = countryGeo[airport.country as keyof typeof countryGeo];
  if (!row) return null;
  return { continent: row.continent, region: row.region };
}

function normalizeGeoKey(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const GEO_BY_COUNTRY = new Map<string, Geo>(
  Object.entries(countryGeo).map(([country, geo]) => [
    normalizeGeoKey(country),
    { continent: geo.continent, region: geo.region },
  ])
);

function geoForCountryName(country: string | null | undefined): Geo | null {
  if (!country || typeof country !== "string") return null;
  return GEO_BY_COUNTRY.get(normalizeGeoKey(country)) ?? null;
}

function geoForDestinationCity(
  city: string | null | undefined,
  country: string | null | undefined
): Geo | null {
  if (!city || typeof city !== "string") return null;
  const normalizedCity = normalizeGeoKey(city);
  const normalizedCountry = country ? normalizeGeoKey(country) : null;
  for (const airport of airports) {
    if (normalizeGeoKey(airport.city) !== normalizedCity) continue;
    if (normalizedCountry && normalizeGeoKey(airport.country) !== normalizedCountry) continue;
    const geo = geoForAirportCode(airport.code);
    if (geo) return geo;
  }
  return null;
}

function localLogoForAirline(name: string | null | undefined): string | null {
  if (!name || typeof name !== "string") return null;
  const raw = name.trim();
  const key = raw.toLowerCase();
  const byName = LOCAL_AIRLINE_LOGOS[key];
  if (byName) return byName;
  const iata = asAirlineIataCode(raw);
  if (iata) {
    const byIata = AIRLINE_LOGO_BY_IATA[iata];
    if (byIata) return byIata;
  }
  return null;
}

function normalizeCity(value: string): string {
  return normalizeGeoKey(value);
}

function getNearbyOriginCodes(baseOrigin: string, maxNearby = 2): string[] {
  const base = airportByCode.get(baseOrigin);
  if (!base) return [];
  const targetCity = normalizeCity(base.city);
  const targetCountry = base.country.toLowerCase();
  return airports
    .filter((a) => a.code !== baseOrigin)
    .filter(
      (a) => normalizeCity(a.city) === targetCity && a.country.toLowerCase() === targetCountry
    )
    .slice(0, maxNearby)
    .map((a) => a.code);
}

function shouldUseNearbyOriginFallback(rows: FlightResult[]): boolean {
  if (rows.length === 0) return true;
  const nonStopCount = rows.filter((r) => r.stops === 0).length;
  if (rows.length < 12 || nonStopCount < 4) return true;
  const bestPrice = rows.reduce((min, r) => Math.min(min, r.price), Number.POSITIVE_INFINITY);
  return Number.isFinite(bestPrice) && bestPrice > 900;
}

function asAirlineIataCode(value: string | null | undefined): string | null {
  if (!value || typeof value !== "string") return null;
  const code = value.trim().toUpperCase();
  return /^[A-Z0-9]{2}$/.test(code) ? code : null;
}

function resolveAirlineName(value: string | null | undefined): string {
  if (!value || typeof value !== "string") return "";
  const raw = value.trim();
  const code = asAirlineIataCode(raw);
  if (!code) return raw;
  return AIRLINE_IATA_TO_NAME[code] ?? raw;
}

function formatMinutesDuration(total: number): string {
  const mins = Math.max(0, Math.floor(total));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

function monthFromIso(iso: string): string {
  return iso.slice(0, 7);
}

function buildTravelpayoutsMonthPairs(params: {
  candidateDepartures: string[];
  departureDate: string;
  returnDate: string | null;
  flexDays: 0 | 1 | 3 | 5 | 7;
}): Array<{ departureDate: string; returnDate: string | null }> {
  const seen = new Set<string>();
  const pairs: Array<{ departureDate: string; returnDate: string | null }> = [];
  for (const depDate of params.candidateDepartures) {
    const retForThisQuery =
      params.returnDate && params.flexDays > 0
        ? shiftIsoDateByDays(
            params.returnDate,
            Math.round(
              (Date.parse(depDate + "T00:00:00Z") - Date.parse(params.departureDate + "T00:00:00Z")) /
                (24 * 60 * 60 * 1000)
            )
          )
        : params.returnDate;
    const depMonth = monthFromIso(depDate);
    const retMonth = retForThisQuery ? monthFromIso(retForThisQuery) : "";
    const key = `${depMonth}|${retMonth}`;
    if (seen.has(key)) continue;
    seen.add(key);
    pairs.push({ departureDate: depDate, returnDate: retForThisQuery });
  }
  return pairs;
}

function isoDurationToMinutes(iso: string | undefined | null): number | null {
  if (!iso || typeof iso !== "string") return null;
  let mins = 0;
  const d = iso.match(/(\d+)D/);
  const h = iso.match(/(\d+)H/);
  const m = iso.match(/(\d+)M/);
  if (d) mins += parseInt(d[1], 10) * 24 * 60;
  if (h) mins += parseInt(h[1], 10) * 60;
  if (m) mins += parseInt(m[1], 10);
  return mins > 0 ? mins : null;
}

function asContinentFilter(raw: string): ContinentFilter {
  return ALLOWED_CONTINENTS.has(raw as ContinentFilter)
    ? (raw as ContinentFilter)
    : "worldwide";
}

function asIsoDate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : null;
}

function asCurrencyCode(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim().toUpperCase();
  return /^[A-Z]{3}$/.test(trimmed) ? trimmed : fallback;
}

function asPrice(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function asStops(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.floor(value));
  if (typeof value === "string") {
    const numeric = Number.parseInt(value.replace(/[^\d]/g, ""), 10);
    if (Number.isFinite(numeric)) return Math.max(0, numeric);
    if (value.toLowerCase().includes("nonstop") || value.toLowerCase().includes("direct")) return 0;
  }
  return 0;
}

function readOffersFromFirecrawlJson(raw: unknown): FirecrawlOffer[] {
  if (Array.isArray(raw)) return raw as FirecrawlOffer[];
  if (!raw || typeof raw !== "object") return [];
  const candidate = raw as { offers?: unknown; flights?: unknown };
  if (Array.isArray(candidate.offers)) return candidate.offers as FirecrawlOffer[];
  if (Array.isArray(candidate.flights)) return candidate.flights as FirecrawlOffer[];
  return [];
}

function toFlightResultFromFirecrawlOffer(args: {
  offer: FirecrawlOffer;
  origin: string;
  departureDate: string;
  returnDate: string | null;
  fallbackCurrency: string;
}): FlightResult | null {
  const price = asPrice(args.offer.price);
  if (price == null) return null;
  const destination = args.offer.destinationCity ?? args.offer.destination;
  if (!destination || typeof destination !== "string" || destination.trim() === "") return null;
  const airportCodeRaw =
    typeof args.offer.destinationAirportCode === "string"
      ? args.offer.destinationAirportCode.trim().toUpperCase()
      : "";
  if (airportCodeRaw && airportCodeRaw === args.origin) return null;
  const geo =
    (airportCodeRaw ? geoForAirportCode(airportCodeRaw) : null) ??
    geoForCountryName(args.offer.destinationCountry ?? null) ??
    geoForDestinationCity(destination, args.offer.destinationCountry ?? null);
  const airportMeta = airportCodeRaw ? airportByCode.get(airportCodeRaw) : null;
  const departureDate = asIsoDate(args.offer.departureDate) ?? args.departureDate;
  const returnDate = asIsoDate(args.offer.returnDate) ?? args.returnDate;
  const airline = typeof args.offer.airline === "string" ? args.offer.airline.trim() : "";
  const stops = asStops(args.offer.stops);

  return {
    destination: destination.trim(),
    destinationCountry: args.offer.destinationCountry ?? airportMeta?.country ?? null,
    originAirportCode: args.origin,
    airportCode: airportCodeRaw,
    price,
    currency: asCurrencyCode(args.offer.currency, args.fallbackCurrency),
    departureDate,
    requestedDepartureDate: args.departureDate,
    outboundDepartsAt: null,
    outboundArrivesAt: null,
    outboundDuration: null,
    outboundDurationMinutes: null,
    returnDate,
    airline,
    airlineIataCode: asAirlineIataCode(airline),
    airlineLogoUrl: localLogoForAirline(airline),
    stops,
    routeType: stops === 0 ? "direct" : "standard",
    fareType: "Economy",
    continent: geo?.continent ?? "",
    region: geo?.region ?? "",
    tier: "regional",
    source: "firecrawl",
  };
}

async function fetchFirecrawlRows(args: {
  apiKey: string;
  origin: string;
  departureDate: string;
  returnDate: string | null;
  currency: string;
  continent: ContinentFilter;
}): Promise<FlightResult[]> {
  const searchIntents = ["cheap flights", "flight deals"];

  const rowsBySite = await asyncPool(searchIntents, 2, async (intent) => {
    try {
      const destinationScope =
        args.continent === "worldwide" ? "anywhere" : args.continent.replace("-", " ");
      const query = `${args.origin} flights to ${destinationScope} ${intent}`;
      const response = await fetchWithTimeout(
        "https://api.firecrawl.dev/v2/search",
        FIRECRAWL_TIMEOUT_MS,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${args.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            limit: FIRECRAWL_LIMIT_PER_SITE,
            sources: ["web"],
            scrapeOptions: {
              formats: [
                {
                  type: "json",
                  prompt:
                    "Extract flight offers. Return { offers: [{ destinationCity, destinationAirportCode, destinationCountry, airline, price, currency, stops, departureDate, returnDate }] }. Use ISO dates YYYY-MM-DD and numeric price where possible.",
                },
              ],
              onlyMainContent: true,
            },
          }),
        }
      );
      if (!response.ok) return [] as FlightResult[];
      const json = (await response.json()) as FirecrawlResponse;
      if (!json.success || json.error) return [] as FlightResult[];
      const webItems = Array.isArray(json.data?.web) ? json.data?.web : [];
      const offers = webItems.flatMap((item) => readOffersFromFirecrawlJson(item.json));
      return offers
        .map((offer) =>
          toFlightResultFromFirecrawlOffer({
            offer,
            origin: args.origin,
            departureDate: args.departureDate,
            returnDate: args.returnDate,
            fallbackCurrency: args.currency,
          })
        )
        .filter((row): row is FlightResult => row !== null);
    } catch {
      // Keep partial results when one provider query times out/fails.
      return [] as FlightResult[];
    }
  });

  return rowsBySite.flat();
}

function prioritizeHubDestinations(
  destinations: SearchableDestination[],
  max: number
): SearchableDestination[] {
  if (destinations.length <= max) return destinations;
  const hubs = destinations.filter((d) => HUB_CODES.has(d.code));
  const nonHubs = destinations.filter((d) => !HUB_CODES.has(d.code));
  return [...hubs, ...nonHubs].slice(0, max);
}

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
  init?: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...(init ?? {}), signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function withBudget<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<T>((resolve) => {
    timeoutHandle = setTimeout(() => resolve(fallback), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutHandle) clearTimeout(timeoutHandle);
  }
}

async function fetchTravelpayoutsWithRetry(url: string, apiToken: string): Promise<Response | null> {
  for (let attempt = 0; attempt <= TRAVELPAYOUTS_MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(url, TRAVELPAYOUTS_TIMEOUT_MS, {
        headers: {
          "x-access-token": apiToken,
          Accept: "application/json",
        },
      });
      if (res.ok || attempt === TRAVELPAYOUTS_MAX_RETRIES) return res;
    } catch {
      if (attempt === TRAVELPAYOUTS_MAX_RETRIES) return null;
    }
    await new Promise((resolve) => setTimeout(resolve, 120 * (attempt + 1)));
  }
  return null;
}

async function enrichTopResultDetails(
  row: FlightResult,
  args: {
    apiKey: string;
    origin: string;
    currency: string;
  }
): Promise<FlightResult> {
  if (!row.airportCode) return row;

  const q = new URLSearchParams({
    engine: "google_flights",
    departure_id: args.origin,
    arrival_id: row.airportCode,
    outbound_date: row.departureDate,
    type: row.returnDate ? "1" : "2",
    currency: args.currency,
    api_key: args.apiKey,
  });
  if (row.returnDate) q.set("return_date", row.returnDate);

  try {
    const res = await fetchWithTimeout(
      `https://serpapi.com/search.json?${q.toString()}`,
      DETAIL_TIMEOUT_MS
    );
    const json = (await res.json()) as GoogleFlightsResponse;
    if (!res.ok || typeof json.error === "string") return row;

    const itinerary =
      (Array.isArray(json.best_flights) && json.best_flights[0]) ||
      (Array.isArray(json.other_flights) && json.other_flights[0]) ||
      null;
    if (!itinerary) return row;

    const flights = Array.isArray(itinerary.flights) ? itinerary.flights : [];
    const depRaw = flights[0]?.departure_airport?.time ?? null;
    const arrRaw =
      flights.length > 0
        ? flights[flights.length - 1]?.arrival_airport?.time ?? null
        : null;
    let outboundDepartsAt: string | null = row.outboundDepartsAt ?? null;
    let outboundArrivesAt: string | null = row.outboundArrivesAt ?? null;
    const airlineLogoUrl =
      typeof flights[0]?.airline_logo === "string" && flights[0].airline_logo.trim() !== ""
        ? flights[0].airline_logo
        : row.airlineLogoUrl ?? null;
    if (depRaw) {
      const parsed = new Date(depRaw);
      if (!Number.isNaN(parsed.getTime())) {
        outboundDepartsAt = parsed.toISOString();
      }
    }
    if (arrRaw) {
      const parsed = new Date(arrRaw);
      if (!Number.isNaN(parsed.getTime())) {
        outboundArrivesAt = parsed.toISOString();
      }
    }

    const durationMinutes =
      typeof itinerary.total_duration === "number" && Number.isFinite(itinerary.total_duration)
        ? Math.max(0, Math.floor(itinerary.total_duration))
        : null;
    const outboundDuration =
      durationMinutes != null ? formatMinutesDuration(durationMinutes) : row.outboundDuration;

    return {
      ...row,
      outboundDepartsAt,
      outboundArrivesAt,
      airlineLogoUrl,
      outboundDuration,
      outboundDurationMinutes: durationMinutes ?? row.outboundDurationMinutes ?? null,
    };
  } catch {
    return row;
  }
}

async function fetchDuffelCheapestForDestination(
  dest: SearchableDestination,
  apiKey: string,
  params: {
    origin: string;
    tripType: "round-trip" | "one-way";
    departureDate: string;
    returnDate: string | null;
    currency: string;
  }
): Promise<FlightResult | null> {
  const response = await fetch("https://api.duffel.com/air/offer_requests", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Duffel-Version": "v2",
      Accept: "application/json",
    },
    body: JSON.stringify({
      data: {
        slices:
          params.tripType === "one-way"
            ? [
                {
                  origin: params.origin,
                  destination: dest.code,
                  departure_date: params.departureDate,
                },
              ]
            : [
                {
                  origin: params.origin,
                  destination: dest.code,
                  departure_date: params.departureDate,
                },
                {
                  origin: dest.code,
                  destination: params.origin,
                  departure_date: params.returnDate,
                },
              ],
        passengers: [{ type: "adult" }],
        cabin_class: "economy",
        return_offers: false,
      },
    }),
  });
  if (!response.ok) return null;

  const requestJson = (await response.json()) as { data?: { id?: string } };
  const offerRequestId = requestJson.data?.id;
  if (!offerRequestId) return null;

  const offersRes = await fetch(
    `https://api.duffel.com/air/offers?offer_request_id=${offerRequestId}&limit=${DUFFEL_OFFERS_LIMIT}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Duffel-Version": "v2",
        Accept: "application/json",
      },
    }
  );
  if (!offersRes.ok) return null;
  const offersJson = (await offersRes.json()) as { data?: unknown[] };
  const offers = Array.isArray(offersJson.data) ? offersJson.data : [];
  if (offers.length === 0) return null;

  const sorted = [...offers].sort((a, b) => {
    const pa = parseFloat((a as { total_amount?: string }).total_amount ?? "NaN");
    const pb = parseFloat((b as { total_amount?: string }).total_amount ?? "NaN");
    if (!Number.isFinite(pa)) return 1;
    if (!Number.isFinite(pb)) return -1;
    return pa - pb;
  });
  const cheapest = sorted[0] as {
    total_amount?: string;
    total_currency?: string;
    slices?: Array<{
      duration?: string;
      departing_at?: string;
      segments?: Array<{
        departing_at?: string;
        arriving_at?: string;
        marketing_carrier?: { name?: string; iata_code?: string };
        operating_carrier?: { name?: string; iata_code?: string };
      }>;
      fare_brand_name?: string;
    }>;
  };
  const price = parseFloat(cheapest.total_amount ?? "NaN");
  if (!Number.isFinite(price)) return null;

  const outSlice = cheapest.slices?.[0];
  const outSegments = outSlice?.segments ?? [];
  const firstSegment = outSegments[0];
  const lastSegment = outSegments.length > 0 ? outSegments[outSegments.length - 1] : undefined;
  const marketing = firstSegment?.marketing_carrier;
  const operating = firstSegment?.operating_carrier;
  const airline = marketing?.name ?? operating?.name ?? "";
  const airlineIata =
    (marketing?.iata_code || operating?.iata_code || "").trim().toUpperCase() || null;
  const stops = Math.max(0, outSegments.length - 1);
  const outDep = firstSegment?.departing_at ?? outSlice?.departing_at ?? null;
  const outArr = lastSegment?.arriving_at ?? null;
  const outMins = isoDurationToMinutes(outSlice?.duration ?? null);

  return {
    destination: dest.city,
    destinationCountry: dest.country,
    originAirportCode: params.origin,
    airportCode: dest.code,
    price,
    currency: (cheapest.total_currency ?? params.currency).toUpperCase(),
    departureDate: (outDep ?? "").slice(0, 10) || params.departureDate,
    requestedDepartureDate: params.departureDate,
    outboundDepartsAt: outDep,
    outboundArrivesAt: outArr,
    outboundDuration: outMins != null ? formatMinutesDuration(outMins) : null,
    outboundDurationMinutes: outMins,
    returnDate:
      params.tripType === "round-trip"
        ? ((cheapest.slices?.[1]?.departing_at ?? "").slice(0, 10) || params.returnDate)
        : null,
    airline,
    airlineIataCode: airlineIata,
    airlineLogoUrl: localLogoForAirline(airline),
    stops,
    routeType: stops === 0 ? "direct" : "standard",
    fareType: outSlice?.fare_brand_name?.trim() || "Economy",
    continent: dest.continent,
    region: dest.region,
    tier: dest.tier,
    source: "duffel",
  };
}

async function fetchTravelpayoutsCheapestForDestination(
  dest: SearchableDestination,
  apiToken: string,
  params: {
    origin: string;
    tripType: "round-trip" | "one-way";
    departureDate: string;
    returnDate: string | null;
    currency: string;
  }
): Promise<FlightResult | null> {
  const q = new URLSearchParams({
    origin: params.origin,
    destination: dest.code,
    depart_date: monthFromIso(params.departureDate),
    currency: params.currency.toLowerCase(),
  });
  if (params.tripType === "round-trip" && params.returnDate) {
    q.set("return_date", monthFromIso(params.returnDate));
  }

  const res = await fetchTravelpayoutsWithRetry(
    `https://api.travelpayouts.com/v1/prices/cheap?${q.toString()}`,
    apiToken
  );
  if (!res) return null;
  if (!res.ok) return null;
  const json = (await res.json()) as TravelpayoutsResponse;
  const data = json.data;
  if (!data || typeof data !== "object") return null;

  const bucket = data[dest.code] ?? Object.values(data)[0];
  if (!bucket || typeof bucket !== "object") return null;
  const fares = Object.values(bucket);
  const valid = fares.filter(
    (f): f is TravelpayoutsFare & { price: number } =>
      typeof f?.price === "number" && Number.isFinite(f.price)
  );
  if (valid.length === 0) return null;
  valid.sort((a, b) => a.price - b.price);
  const best = valid[0];
  const airlineCode = asAirlineIataCode(best.airline);
  const airlineName = resolveAirlineName(best.airline);

  const outDep = typeof best.departure_at === "string" ? best.departure_at : null;
  const outArr =
    typeof best.duration_to === "number" && outDep
      ? new Date(new Date(outDep).getTime() + best.duration_to * 60 * 1000).toISOString()
      : null;
  const outMins =
    typeof best.duration_to === "number" && Number.isFinite(best.duration_to)
      ? Math.max(0, Math.floor(best.duration_to))
      : null;
  const returnDateFromFare =
    params.tripType === "round-trip" && typeof best.return_at === "string"
      ? best.return_at.slice(0, 10)
      : params.returnDate;

  return {
    destination: dest.city,
    destinationCountry: dest.country,
    originAirportCode: params.origin,
    airportCode: dest.code,
    price: best.price,
    currency: (json.currency ?? params.currency).toUpperCase(),
    departureDate: (outDep ?? "").slice(0, 10) || params.departureDate,
    requestedDepartureDate: params.departureDate,
    outboundDepartsAt: outDep,
    outboundArrivesAt: outArr,
    outboundDuration: outMins != null ? formatMinutesDuration(outMins) : null,
    outboundDurationMinutes: outMins,
    returnDate: returnDateFromFare,
    airline: airlineName,
    // Keep Travelpayouts fallback consistent with other generic icon behavior.
    airlineIataCode: null,
    airlineLogoUrl: localLogoForAirline(airlineName),
    stops: 0,
    routeType: "standard",
    fareType: "Economy",
    continent: dest.continent,
    region: dest.region,
    tier: dest.tier,
    source: "travelpayouts",
  };
}

function asFlightResult(
  item: SerpDestination,
  origin: string,
  requestedDepartureDate: string,
  fallbackDepartureDate: string,
  fallbackReturnDate: string | null,
  currency: string
): FlightResult | null {
  const priceValue = item.flight_price;
  if (typeof priceValue !== "number" || !Number.isFinite(priceValue)) return null;
  if (!item.name || typeof item.name !== "string") return null;
  const stops = typeof item.number_of_stops === "number" ? item.number_of_stops : 0;
  const airline = item.airline ?? "";
  const departureDate = item.start_date ?? fallbackDepartureDate;
  const returnDate = item.end_date ?? fallbackReturnDate;
  const airportCode = item.destination_airport?.code ?? "";
  const geo = airportCode ? geoForAirportCode(airportCode) : null;
  const destAirport = airportCode ? airportByCode.get(airportCode.toUpperCase()) : undefined;
  const countryFromItem =
    typeof item.country === "string" && item.country.trim() !== "" ? item.country.trim() : null;
  const destinationCountry = countryFromItem ?? destAirport?.country ?? null;

  return {
    destination: item.name,
    destinationCountry,
    originAirportCode: origin,
    airportCode,
    price: priceValue,
    currency,
    departureDate,
    requestedDepartureDate,
    outboundDepartsAt: null,
    outboundArrivesAt: null,
    outboundDuration: null,
    outboundDurationMinutes: null,
    returnDate,
    airline,
    airlineIataCode: null,
    airlineLogoUrl: localLogoForAirline(airline),
    stops,
    routeType: stops === 0 ? "direct" : "standard",
    fareType: "Economy",
    continent: geo?.continent ?? "",
    region: geo?.region ?? "",
    tier: "regional",
    source: "serp",
  };
}

async function fetchSerpRowsForOrigin(args: {
  origin: string;
  requestedDepartureDate: string;
  returnDate: string | null;
  paramsTripType: "round-trip" | "one-way" | undefined;
  candidateDepartures: string[];
  departureDate: string;
  flexDays: 0 | 1 | 3 | 5 | 7;
  currency: string;
  apiKey: string;
}): Promise<FlightResult[]> {
  const rowsByDate = await asyncPool(
    args.candidateDepartures,
    Math.min(SERP_CANDIDATE_CONCURRENCY, args.candidateDepartures.length || 1),
    async (depDate) => {
      const retForThisQuery =
        args.returnDate && args.flexDays > 0
          ? shiftIsoDateByDays(
              args.returnDate,
              Math.round(
                (Date.parse(depDate + "T00:00:00Z") -
                  Date.parse(args.departureDate + "T00:00:00Z")) /
                  (24 * 60 * 60 * 1000)
              )
            )
          : args.returnDate;

      const query = new URLSearchParams({
        engine: "google_travel_explore",
        departure_id: args.origin,
        outbound_date: depDate,
        type: args.paramsTripType === "one-way" || !retForThisQuery ? "2" : "1",
        currency: args.currency,
        api_key: args.apiKey,
      });
      if (retForThisQuery) query.set("return_date", retForThisQuery);

      const response = await fetch(`https://serpapi.com/search.json?${query.toString()}`);
      const json = (await response.json()) as SerpResponse;
      if (!response.ok || typeof json.error === "string") return [] as FlightResult[];

      const list = Array.isArray(json.destinations) ? json.destinations : [];
      return list
        .map((item) =>
          asFlightResult(
            item,
            args.origin,
            args.requestedDepartureDate,
            depDate,
            retForThisQuery,
            args.currency
          )
        )
        .filter((r): r is FlightResult => r !== null);
    }
  );
  return rowsByDate.flat();
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.SERPAPI_KEY;
  const duffelKey = process.env.DUFFEL_API_KEY;
  const travelpayoutsToken = process.env.TRAVELPAYOUTS_API_TOKEN;
  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
  const hasAnyProvider =
    Boolean(apiKey) ||
    Boolean(duffelKey) ||
    Boolean(travelpayoutsToken) ||
    Boolean(firecrawlApiKey);
  if (!hasAnyProvider) {
    return NextResponse.json(
      {
        error:
          "No flight providers are configured. Set at least one of SERPAPI_KEY, DUFFEL_API_KEY, TRAVELPAYOUTS_API_TOKEN, or FIRECRAWL_API_KEY.",
      },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const params = body as SearchBody;
  const origin = typeof params.origin === "string" ? params.origin.trim().toUpperCase() : "";
  if (!origin) {
    return NextResponse.json(
      { error: "Request body is missing required field: origin." },
      { status: 400 }
    );
  }

  const departureDate =
    (typeof params.departureDate === "string" && params.departureDate.trim()) ||
    deriveDepartureDate(params.month);
  if (!departureDate) {
    return NextResponse.json(
      { error: "Request body is missing required date input: departureDate or month." },
      { status: 400 }
    );
  }

  const returnDate =
    typeof params.returnDate === "string" && params.returnDate.trim() !== ""
      ? params.returnDate
      : null;
  const continent =
    typeof params.continent === "string" && params.continent.trim() !== ""
      ? params.continent
      : "worldwide";
  const region =
    typeof params.region === "string" && params.region.trim() !== ""
      ? params.region
      : "any";
  const currency =
    typeof params.currency === "string" && params.currency.trim() !== ""
      ? params.currency.trim().toUpperCase()
      : "USD";
  const budget = parseBudget(params.budget);
  /** Default on: widen thin origin results with nearby airports unless explicitly disabled. */
  const includeNearbyAirports = params.includeNearbyAirports !== false;
  const requestedFlex =
    params.dateFlexDays === 1 ||
    params.dateFlexDays === 3 ||
    params.dateFlexDays === 5
      ? params.dateFlexDays
      : null;
  const useFlexibleDates = params.flexibleDates === true || requestedFlex !== null;
  const flexDays: 0 | 1 | 3 | 5 | 7 = useFlexibleDates ? requestedFlex ?? 3 : 0;
  const stage: "fast" | "full" = params.searchStage === "full" ? "full" : "fast";
  const sourceHasFullTail =
    stage === "fast" &&
    (Boolean(duffelKey) ||
      Boolean(travelpayoutsToken) ||
      Boolean(firecrawlApiKey));
  const hasMore = (flexDays > 1 || sourceHasFullTail) && stage === "fast";
  const candidateDepartures = buildStagedCandidateDates(departureDate, flexDays, stage);
  const supplementCandidateDepartures =
    flexDays > 1
      ? pickSupplementCandidateDates(candidateDepartures, SUPPLEMENT_FLEX_MAX_DATES)
      : candidateDepartures;

  const cacheKey = normalizedCacheKey({
    origin,
    departureDate,
    returnDate,
    tripType: params.tripType === "one-way" || !returnDate ? "one-way" : "round-trip",
    continent,
    region,
    currency,
    budget,
    flexDays,
    stage,
  });
  const now = Date.now();
  pruneResponseCache(now);
  const cached = responseCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return NextResponse.json({
      ...cached.payload,
      meta: { ...cached.payload.meta, cacheHit: true },
    } satisfies SearchResponsePayload);
  }
  const existing = inFlight.get(cacheKey);
  if (existing) {
    return NextResponse.json(await existing);
  }

  const run = async (): Promise<SearchResponsePayload> => {
  const runStartedAt = Date.now();
  const timings: NonNullable<SearchResponsePayload["meta"]["timingsMs"]> = {};
  const providerErrors: Partial<Record<"serp" | "duffel" | "travelpayouts" | "firecrawl", number>> = {};

  const mapped: FlightResult[] = [];
  let serpRows: FlightResult[] = [];
  if (apiKey) {
    const serpStartedAt = Date.now();
    try {
      serpRows = await fetchSerpRowsForOrigin({
        origin,
        requestedDepartureDate: departureDate,
        returnDate,
        paramsTripType: params.tripType,
        candidateDepartures,
        departureDate,
        flexDays,
        currency,
        apiKey,
      });
      mapped.push(...serpRows);
    } catch {
      providerErrors.serp = (providerErrors.serp ?? 0) + 1;
    } finally {
      timings.serp = Date.now() - serpStartedAt;
    }
  } else {
    providerErrors.serp = (providerErrors.serp ?? 0) + 1;
  }

  if (
    apiKey &&
    includeNearbyAirports &&
    shouldUseNearbyOriginFallback(serpRows)
  ) {
    const nearbyOrigins = getNearbyOriginCodes(origin, 2);
    if (nearbyOrigins.length > 0) {
      const nearbyStartedAt = Date.now();
      const nearbyRows = await asyncPool(nearbyOrigins, 2, async (nearbyOrigin) =>
        fetchSerpRowsForOrigin({
          origin: nearbyOrigin,
          requestedDepartureDate: departureDate,
          returnDate,
          paramsTripType: params.tripType,
          candidateDepartures,
          departureDate,
          flexDays,
          currency,
          apiKey,
        })
      );
      mapped.push(...nearbyRows.flat());
      timings.nearbySerp = Date.now() - nearbyStartedAt;
    }
  }

  const tripType: "round-trip" | "one-way" =
    params.tripType === "one-way" || !returnDate ? "one-way" : "round-trip";
  const continentFilter = asContinentFilter(continent);
  const regionFilter = continentFilter === "worldwide" ? "any" : region;
  const supplementTasks: Array<{
    provider: "duffel" | "travelpayouts" | "firecrawl";
    task: Promise<FlightResult[]>;
  }> = [];

  if (duffelKey) {
    const duffelTask = (async () => {
      const startedAt = Date.now();
      const baseDuffelDestinations = pickDestinationsForSearch({
        continent: continentFilter,
        region: regionFilter,
        max: Math.max(DUFFEL_SUPPLEMENT_MAX_DESTINATIONS * 2, 300),
      }).filter((d) => d.code !== origin);
      const duffelCap =
        stage === "fast" ? DUFFEL_SUPPLEMENT_FAST_DESTINATIONS : DUFFEL_SUPPLEMENT_MAX_DESTINATIONS;
      const duffelDestinations = prioritizeHubDestinations(
        baseDuffelDestinations,
        duffelCap
      );

      const runDuffelBatch = async (destinations: SearchableDestination[]) => {
        const duffelRows = await asyncPool(
          destinations,
          DUFFEL_SUPPLEMENT_CONCURRENCY,
          async (dest) => {
            let best: FlightResult | null = null;
            for (const depDate of supplementCandidateDepartures) {
              const retForThisQuery =
                returnDate && flexDays > 0
                  ? shiftIsoDateByDays(
                      returnDate,
                      Math.round(
                        (Date.parse(depDate + "T00:00:00Z") -
                          Date.parse(departureDate + "T00:00:00Z")) /
                          (24 * 60 * 60 * 1000)
                      )
                    )
                  : returnDate;
              try {
                const candidate = await fetchDuffelCheapestForDestination(dest, duffelKey, {
                  origin,
                  tripType,
                  departureDate: depDate,
                  returnDate: retForThisQuery,
                  currency,
                });
                if (!candidate) continue;
                candidate.requestedDepartureDate = departureDate;
                if (!best || candidate.price < best.price) best = candidate;
              } catch {
                providerErrors.duffel = (providerErrors.duffel ?? 0) + 1;
              }
            }
            return best;
          }
        );
        return duffelRows.filter((r): r is FlightResult => r !== null);
      };

      let rows: FlightResult[] = [];
      if (stage === "fast") {
        const firstPassDestinations = duffelDestinations.slice(0, DUFFEL_FAST_FIRST_PASS_DESTINATIONS);
        rows = await runDuffelBatch(firstPassDestinations);
        if (rows.length < FAST_STAGE_MIN_PROVIDER_RESULTS) {
          const remainingDestinations = duffelDestinations.slice(DUFFEL_FAST_FIRST_PASS_DESTINATIONS);
          if (remainingDestinations.length > 0) {
            const tailRows = await runDuffelBatch(remainingDestinations);
            rows = [...rows, ...tailRows];
          }
        }
      } else {
        rows = await runDuffelBatch(duffelDestinations);
      }

      timings.duffel = Date.now() - startedAt;
      return rows;
    })();

    supplementTasks.push({
      provider: "duffel",
      task: stage === "full" ? withBudget(duffelTask, DUFFEL_FULL_BUDGET_MS, []) : duffelTask,
    });
  }

  if (travelpayoutsToken) {
    const travelpayoutsTask = (async () => {
      const startedAt = Date.now();
      const baseTpDestinations = pickDestinationsForSearch({
        continent: continentFilter,
        region: regionFilter,
        max: Math.max(TRAVELPAYOUTS_SUPPLEMENT_MAX_DESTINATIONS * 2, 240),
      }).filter((d) => d.code !== origin);
      const tpCap =
        stage === "fast"
          ? TRAVELPAYOUTS_SUPPLEMENT_FAST_DESTINATIONS
          : TRAVELPAYOUTS_SUPPLEMENT_MAX_DESTINATIONS;
      if (tpCap <= 0) {
        timings.travelpayouts = Date.now() - startedAt;
        return [];
      }
      const tpDestinations = prioritizeHubDestinations(
        baseTpDestinations,
        tpCap
      );

      const runTravelpayoutsBatch = async (destinations: SearchableDestination[]) => {
        const tpRows = await asyncPool(
          destinations,
          TRAVELPAYOUTS_SUPPLEMENT_CONCURRENCY,
          async (dest) => {
            let best: FlightResult | null = null;
            const monthPairs = buildTravelpayoutsMonthPairs({
              candidateDepartures: supplementCandidateDepartures,
              departureDate,
              returnDate,
              flexDays,
            });
            for (const pair of monthPairs) {
              try {
                const candidate = await fetchTravelpayoutsCheapestForDestination(dest, travelpayoutsToken, {
                  origin,
                  tripType,
                  departureDate: pair.departureDate,
                  returnDate: pair.returnDate,
                  currency,
                });
                if (!candidate) continue;
                candidate.requestedDepartureDate = departureDate;
                if (!best || candidate.price < best.price) best = candidate;
              } catch {
                providerErrors.travelpayouts = (providerErrors.travelpayouts ?? 0) + 1;
              }
            }
            return best;
          }
        );
        return tpRows.filter((r): r is FlightResult => r !== null);
      };

      let rows: FlightResult[] = [];
      if (stage === "fast") {
        const firstPassDestinations = tpDestinations.slice(0, TRAVELPAYOUTS_FAST_FIRST_PASS_DESTINATIONS);
        rows = await runTravelpayoutsBatch(firstPassDestinations);
        if (rows.length < FAST_STAGE_MIN_PROVIDER_RESULTS) {
          const remainingDestinations = tpDestinations.slice(TRAVELPAYOUTS_FAST_FIRST_PASS_DESTINATIONS);
          if (remainingDestinations.length > 0) {
            const tailRows = await runTravelpayoutsBatch(remainingDestinations);
            rows = [...rows, ...tailRows];
          }
        }
      } else {
        rows = await runTravelpayoutsBatch(tpDestinations);
      }

      timings.travelpayouts = Date.now() - startedAt;
      return rows;
    })();

    supplementTasks.push({
      provider: "travelpayouts",
      task:
        stage === "full"
          ? withBudget(travelpayoutsTask, TRAVELPAYOUTS_FULL_BUDGET_MS, [])
          : travelpayoutsTask,
    });
  }

  if (firecrawlApiKey) {
    supplementTasks.push({
      provider: "firecrawl",
      task: (async () => {
        const startedAt = Date.now();
        try {
          const rows = await fetchFirecrawlRows({
            apiKey: firecrawlApiKey,
            origin,
            departureDate,
            returnDate,
            currency,
            continent: continentFilter,
          });
          timings.firecrawl = Date.now() - startedAt;
          return rows;
        } catch {
          providerErrors.firecrawl = (providerErrors.firecrawl ?? 0) + 1;
          timings.firecrawl = Date.now() - startedAt;
          return [];
        }
      })(),
    });
  }

  if (supplementTasks.length > 0) {
    const supplements = await Promise.allSettled(
      supplementTasks.map((s) => s.task)
    );
    for (let i = 0; i < supplements.length; i++) {
      const settled = supplements[i];
      const provider = supplementTasks[i].provider;
      if (settled.status === "fulfilled") {
        mapped.push(...settled.value);
      } else {
        providerErrors[provider] = (providerErrors[provider] ?? 0) + 1;
      }
    }
  }

  const scoped = mapped.filter((r) => {
    if (continent === "worldwide") return true;
    if (!r.continent || r.continent !== continent) return false;
    if (region !== "any" && r.region !== region) return false;
    return true;
  });

  const filtered = budget == null ? scoped : scoped.filter((r) => r.price <= budget);
  filtered.sort((a, b) => a.price - b.price);

  const byRoute = new Map<string, FlightResult>();
  for (const row of filtered) {
    const routeKey = (row.airportCode || row.destination).trim().toLowerCase();
    const sourceKey = row.source ?? "unknown";
    const key = `${routeKey}|${sourceKey}`;
    const prev = byRoute.get(key);
    if (!prev || row.price < prev.price) byRoute.set(key, row);
  }
  const collapsed = [...byRoute.values()].sort((a, b) => a.price - b.price);

  const topResults = collapsed.slice(0, MAX_RESULTS);
  const withDebug = topResults.map((r) => ({
    ...r,
    flexSearchUsed: useFlexibleDates,
    flexDaysUsed: flexDays,
  }));
  const enrichCount = Math.min(DETAIL_TOP_N, withDebug.length);
  if (enrichCount === 0) {
    timings.total = Date.now() - runStartedAt;
    const payload: SearchResponsePayload = {
      results: withDebug,
      meta: {
        stage,
        hasMore,
        flexDaysUsed: flexDays,
        cacheHit: false,
        timingsMs: timings,
        providerErrors: Object.keys(providerErrors).length > 0 ? providerErrors : undefined,
      },
    };
    // Do not cache empty results — avoids "stuck" no-results for 10m after a transient failure.
    if (withDebug.length > 0) {
      pruneResponseCache();
      responseCache.set(cacheKey, {
        expiresAt: Date.now() + SEARCH_CACHE_TTL_MS,
        payload: {
          results: payload.results,
          meta: {
            stage: payload.meta.stage,
            hasMore: payload.meta.hasMore,
            flexDaysUsed: payload.meta.flexDaysUsed,
            timingsMs: payload.meta.timingsMs,
            providerErrors: payload.meta.providerErrors,
          },
        },
      });
    }
    return payload;
  }

  const leading: FlightResult[] = withDebug.slice(0, enrichCount);
  const trailing: FlightResult[] = withDebug.slice(enrichCount);
  let enrichedLeading = leading;
  if (apiKey) {
    const enrichStartedAt = Date.now();
    enrichedLeading = await asyncPool(leading, DETAIL_CONCURRENCY, async (row) =>
      enrichTopResultDetails(row, {
        apiKey,
        origin,
        currency,
      })
    );
    timings.enrich = Date.now() - enrichStartedAt;
  }
  timings.total = Date.now() - runStartedAt;

    const payload: SearchResponsePayload = {
      results: [...enrichedLeading, ...trailing],
      meta: {
        stage,
        hasMore,
        flexDaysUsed: flexDays,
        cacheHit: false,
        timingsMs: timings,
        providerErrors: Object.keys(providerErrors).length > 0 ? providerErrors : undefined,
      },
    };
    pruneResponseCache();
    responseCache.set(cacheKey, {
      expiresAt: Date.now() + SEARCH_CACHE_TTL_MS,
      payload: {
        results: payload.results,
        meta: {
          stage: payload.meta.stage,
          hasMore: payload.meta.hasMore,
          flexDaysUsed: payload.meta.flexDaysUsed,
          timingsMs: payload.meta.timingsMs,
          providerErrors: payload.meta.providerErrors,
        },
      },
    });
    return payload;
  };

  const promise = run();
  inFlight.set(cacheKey, promise);
  try {
    const payload = await promise;
    return NextResponse.json(payload);
  } finally {
    inFlight.delete(cacheKey);
  }
}
