import { airports } from "./airports";
import countryGeo from "./countryGeo.json";
import { HUB_CODES } from "./hubCodes";

export type ContinentFilter =
  | "worldwide"
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Oceania";

export type DestinationTier = "hub" | "regional";

export type SearchableDestination = {
  code: string;
  city: string;
  country: string;
  continent: string;
  region: string;
  tier: DestinationTier;
};

type Geo = { continent: string; region: string };

function geoForCountry(country: string): Geo {
  const row = countryGeo[country as keyof typeof countryGeo];
  return row ?? { continent: "Other", region: "Other" };
}

function tierForCode(code: string): DestinationTier {
  return HUB_CODES.has(code) ? "hub" : "regional";
}

/** Every airport in `airports.ts` enriched with geography + hub tier. */
export const ALL_SEARCHABLE: SearchableDestination[] = airports.map((a) => {
  const { continent, region } = geoForCountry(a.country);
  return {
    code: a.code,
    city: a.city,
    country: a.country,
    continent,
    region,
    tier: tierForCode(a.code),
  };
});

export const CONTINENT_OPTIONS: { value: ContinentFilter; label: string }[] = [
  { value: "worldwide", label: "Worldwide" },
  { value: "Europe", label: "Europe" },
  { value: "Asia", label: "Asia" },
  { value: "Africa", label: "Africa" },
  { value: "North America", label: "North America" },
  { value: "South America", label: "South America" },
  { value: "Oceania", label: "Oceania" },
];

export function regionsForContinent(
  continent: Exclude<ContinentFilter, "worldwide">
): string[] {
  const set = new Set<string>();
  for (const d of ALL_SEARCHABLE) {
    if (d.continent === continent) set.add(d.region);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/** Group destinations; order of keys is not used for filtering. */
function bucketByKey(
  items: SearchableDestination[],
  keyFn: (d: SearchableDestination) => string
): SearchableDestination[][] {
  const map = new Map<string, SearchableDestination[]>();
  for (const d of items) {
    const k = keyFn(d);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(d);
  }
  return [...map.values()];
}

/**
 * Spread selections across buckets (e.g. continents) in round-robin order so a
 * hard cap does not skew toward the start of an alphabetical IATA-code sort.
 */
function pickRoundRobinFromBuckets(
  buckets: SearchableDestination[][],
  max: number
): SearchableDestination[] {
  const sorted = [...buckets].sort((a, b) => {
    const ka = a[0] ? keyForSort(a[0]) : "";
    const kb = b[0] ? keyForSort(b[0]) : "";
    return ka.localeCompare(kb);
  });
  const out: SearchableDestination[] = [];
  let round = 0;
  while (out.length < max) {
    let progress = false;
    for (const bucket of sorted) {
      if (round < bucket.length) {
        out.push(bucket[round]);
        progress = true;
        if (out.length >= max) return out;
      }
    }
    if (!progress) break;
    round++;
  }
  return out;
}

function keyForSort(d: SearchableDestination): string {
  return `${d.continent}\0${d.region}\0${d.code}`;
}

/**
 * When over `max`, pick a geographically diverse subset instead of the first
 * `max` rows by IATA code (which clusters on "A..." codes).
 */
function pickDiverseSubset(
  items: SearchableDestination[],
  max: number,
  groupKey: (d: SearchableDestination) => string
): SearchableDestination[] {
  if (items.length <= max) return items;
  const buckets = bucketByKey(items, groupKey);
  for (const b of buckets) {
    shuffleInPlace(b);
  }
  return pickRoundRobinFromBuckets(buckets, max);
}

/**
 * Destinations to query for this search. Caps how many Duffel calls run per request;
 * for continent searches, hubs are kept first when the filtered pool exceeds `max`.
 * Worldwide uses the full airport list and only the per-search `max` cap.
 */
export function pickDestinationsForSearch(options: {
  continent: ContinentFilter;
  region: string;
  max: number;
}): SearchableDestination[] {
  let pool: SearchableDestination[];

  if (options.continent === "worldwide") {
    pool = ALL_SEARCHABLE;
  } else {
    pool = ALL_SEARCHABLE.filter((d) => d.continent === options.continent);
    if (options.region !== "any") {
      pool = pool.filter((d) => d.region === options.region);
    }
  }

  if (pool.length <= options.max) return pool;

  if (options.continent === "worldwide") {
    return pickDiverseSubset(pool, options.max, (d) => d.continent);
  }

  const hubs = pool.filter((d) => d.tier === "hub");
  const regional = pool.filter((d) => d.tier !== "hub");

  const hubPick = pickDiverseSubset(hubs, options.max, (d) => d.region);
  if (hubPick.length >= options.max) return hubPick;

  const regPick = pickDiverseSubset(
    regional,
    options.max - hubPick.length,
    (d) => d.region
  );
  return [...hubPick, ...regPick];
}
