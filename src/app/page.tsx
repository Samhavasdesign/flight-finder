"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { ResultCard } from "@/components/ResultCard/ResultCard";
import { SavedTripsPanel } from "@/components/SavedTripsPanel/SavedTripsPanel";
import {
  HomeDestinations,
  HomeFooter,
  HomeHero,
  HomeHowItWorks,
} from "@/components/home";
import homeStyles from "./homePage.module.css";
import { tripFingerprint } from "@/lib/matchSavedFlight";
import { loadSavedTrips, removeSavedTrip, upsertSavedTrip } from "@/lib/savedTripsStorage";
import type { FlightResult, SearchParams } from "@/types";
import type { SavedTrip } from "@/types/savedTrip";

type StopFilter = "all" | "direct" | "oneStop" | "twoPlusStops";

type SortBy = "price" | "durationShortest";
type SearchApiResponse =
  | FlightResult[]
  | {
      results: FlightResult[];
      meta?: {
        stage?: "fast" | "full";
        hasMore?: boolean;
        flexDaysUsed?: 0 | 1 | 3 | 5 | 7;
        cacheHit?: boolean;
        timingsMs?: {
          total?: number;
          serp?: number;
          nearbySerp?: number;
          duffel?: number;
          travelpayouts?: number;
          firecrawl?: number;
          enrich?: number;
        };
        providerErrors?: {
          serp?: number;
          duffel?: number;
          travelpayouts?: number;
          firecrawl?: number;
        };
      };
    };

type SearchApiMeta =
  | {
      stage?: "fast" | "full";
      hasMore?: boolean;
      flexDaysUsed?: 0 | 1 | 3 | 5 | 7;
      cacheHit?: boolean;
      timingsMs?: {
        total?: number;
        serp?: number;
        nearbySerp?: number;
        duffel?: number;
        travelpayouts?: number;
        firecrawl?: number;
        enrich?: number;
      };
      providerErrors?: {
        serp?: number;
        duffel?: number;
        travelpayouts?: number;
        firecrawl?: number;
      };
    }
  | undefined;

function normalizeSearchResponse(data: SearchApiResponse): {
  results: FlightResult[];
  meta: SearchApiMeta;
} {
  if (Array.isArray(data)) {
    return { results: data, meta: undefined };
  }
  return { results: data.results, meta: data.meta };
}

function resultIdentity(r: FlightResult): string {
  return [
    r.originAirportCode,
    r.airportCode,
    r.departureDate,
    r.returnDate ?? "",
    r.airlineIataCode ?? r.airline,
    String(r.price),
    String(r.stops),
  ].join("|");
}

function mergeUniqueResults(base: FlightResult[], incoming: FlightResult[]): FlightResult[] {
  if (base.length === 0) return incoming;
  const seen = new Set(base.map((r) => resultIdentity(r)));
  const merged = [...base];
  for (const row of incoming) {
    const key = resultIdentity(row);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(row);
  }
  return merged;
}

function matchesStopFilter(r: FlightResult, filter: StopFilter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "direct":
      return r.stops === 0;
    case "oneStop":
      return r.stops === 1;
    case "twoPlusStops":
      return r.stops >= 2;
    default:
      return true;
  }
}

export default function HomePage() {
  const PAGE_SIZE = 10;
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<FlightResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tripType, setTripType] = useState<SearchParams["tripType"]>("round-trip");
  const [sortBy, setSortBy] = useState<SortBy>("price");
  const [stopFilter, setStopFilter] = useState<StopFilter>("all");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [loadingMoreDeals, setLoadingMoreDeals] = useState<boolean>(false);
  const searchSeq = useRef(0);
  const [lastSearchParams, setLastSearchParams] = useState<SearchParams | null>(null);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [debugFastMeta, setDebugFastMeta] = useState<SearchApiMeta>(undefined);
  const [debugFullMeta, setDebugFullMeta] = useState<SearchApiMeta>(undefined);

  useEffect(() => {
    setSavedTrips(loadSavedTrips());
  }, []);

  const savedFingerprints = useMemo(() => {
    const s = new Set<string>();
    for (const t of savedTrips) {
      s.add(tripFingerprint(t.snapshot, t.searchParams.origin));
    }
    return s;
  }, [savedTrips]);

  const handleSaveResult = useCallback(
    (result: FlightResult) => {
      if (!lastSearchParams) return;
      const trip: SavedTrip = {
        id: crypto.randomUUID(),
        savedAt: new Date().toISOString(),
        searchParams: lastSearchParams,
        snapshot: { ...result },
      };
      setSavedTrips(upsertSavedTrip(trip));
    },
    [lastSearchParams],
  );

  const handleRemoveSaved = useCallback((id: string) => {
    setSavedTrips(removeSavedTrip(id));
  }, []);

  const displayedResults = useMemo(() => {
    if (results == null) return null;
    const filtered = results.filter((r) => matchesStopFilter(r, stopFilter));
    const copy = [...filtered];
    copy.sort((a, b) => {
      if (sortBy === "durationShortest") {
        const ma = a.outboundDurationMinutes ?? Number.POSITIVE_INFINITY;
        const mb = b.outboundDurationMinutes ?? Number.POSITIVE_INFINITY;
        if (ma !== mb) return ma - mb;
        return a.price - b.price;
      }
      return a.price - b.price;
    });
    return copy;
  }, [results, sortBy, stopFilter]);


  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [results, sortBy, stopFilter]);

  async function handleSearch(params: SearchParams) {
    searchSeq.current += 1;
    const seq = searchSeq.current;
    setLastSearchParams(params);
    setTripType(params.tripType);
    setLoading(true);
    setLoadingMoreDeals(false);
    setResults(null);
    setError(null);
    setDebugFastMeta(undefined);
    setDebugFullMeta(undefined);

    try {
      const fastRes = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...params, searchStage: "fast" }),
      });

      if (!fastRes.ok) {
        const data = await fastRes.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error ??
            `Request failed with status ${fastRes.status}`
        );
      }

      const fastRaw = (await fastRes.json()) as SearchApiResponse;
      const fastData = normalizeSearchResponse(fastRaw);
      if (seq !== searchSeq.current) return;

      setStopFilter("all");
      setSortBy("price");
      setResults(fastData.results);
      setDebugFastMeta(fastData.meta);
      setLoading(false);

      let mergedResults = fastData.results;
      const hasMore = Boolean(fastData.meta?.hasMore);
      if (hasMore) {
        setLoadingMoreDeals(true);
        try {
          const fullRes = await fetch("/api/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...params, searchStage: "full" }),
          });
          if (fullRes.ok) {
            const fullRaw = (await fullRes.json()) as SearchApiResponse;
            const fullData = normalizeSearchResponse(fullRaw);
            if (seq !== searchSeq.current) return;
            mergedResults = mergeUniqueResults(mergedResults, fullData.results);
            setResults(mergedResults);
            setDebugFullMeta(fullData.meta);
          }
        } finally {
          if (seq === searchSeq.current) {
            setLoadingMoreDeals(false);
          }
        }
      }

      const alreadyFlexible =
        params.flexibleDates === true ||
        params.dateFlexDays === 1 ||
        params.dateFlexDays === 3 ||
        params.dateFlexDays === 5 ||
        params.dateFlexDays === 7;
      const shouldRunFallback = mergedResults.length === 0 && !alreadyFlexible;

      if (shouldRunFallback) {
        setLoadingMoreDeals(true);
        try {
          const fallbackRes = await fetch("/api/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...params,
              searchStage: "full",
              flexibleDates: true,
              dateFlexDays: 3,
            }),
          });
          if (!fallbackRes.ok) return;
          const fallbackRaw = (await fallbackRes.json()) as SearchApiResponse;
          const fallbackData = normalizeSearchResponse(fallbackRaw);
          if (seq !== searchSeq.current) return;
          mergedResults = mergeUniqueResults(mergedResults, fallbackData.results);
          setResults(mergedResults);
          setDebugFullMeta(fallbackData.meta);
        } finally {
          if (seq === searchSeq.current) {
            setLoadingMoreDeals(false);
          }
        }
      }
    } catch (err) {
      if (seq === searchSeq.current) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      if (seq === searchSeq.current) {
        setLoading(false);
      }
    }
  }

  return (
    <main className={homeStyles.page}>
      <HomeHero>
        <SearchForm onSearch={handleSearch} />
      </HomeHero>

      <div className={homeStyles.canvas}>
        <SavedTripsPanel trips={savedTrips} onRemove={handleRemoveSaved} />

        {loading && (
          <div className={homeStyles.loadingCard}>
            <div className={homeStyles.spinnerTrack}>
              <span className={homeStyles.spinnerRing} />
              <span className={homeStyles.spinnerArc} />
            </div>
            <p className={homeStyles.loadingTitle}>Searching flights…</p>
            <p className={homeStyles.loadingHint}>Comparing fares across providers</p>
          </div>
        )}

        {error != null && (
          <p className={homeStyles.errorBox} role="alert">
            {error}
          </p>
        )}

        {results != null && results.length === 0 && (
          <>
            {loadingMoreDeals && (
              <p className={homeStyles.resultsHint}>No quick matches yet. Fetching deeper provider results...</p>
            )}
            {!loadingMoreDeals && <p className={homeStyles.emptyText}>No results found.</p>}
          </>
        )}

        {results != null && results.length > 0 && displayedResults != null && (
          <section className="mt-10 w-full max-w-5xl">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={homeStyles.resultsMeta}>
                  {displayedResults.length === results.length
                    ? `${results.length} ${results.length === 1 ? "result" : "results"} found`
                    : `${displayedResults.length} of ${results.length} results`}
                </p>
                {lastSearchParams != null && (
                  <p className={homeStyles.resultsHint}>
                    Tip: Save a card to compare prices later without searching again.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <label className="flex items-center gap-2 text-sm text-[var(--color-text-default-secondary)]">
                  <span className="whitespace-nowrap">Filter</span>
                  <select
                    value={stopFilter}
                    onChange={(e) => setStopFilter(e.target.value as StopFilter)}
                    className={homeStyles.select}
                    aria-label="Filter by stops"
                  >
                    <option value="all">All flights</option>
                    <option value="direct">Non-stop</option>
                    <option value="oneStop">1 stop</option>
                    <option value="twoPlusStops">2+ stops</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm text-[var(--color-text-default-secondary)]">
                  <span className="whitespace-nowrap">Sort by</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className={homeStyles.select}
                    aria-label="Sort results"
                  >
                    <option value="price">Price (low to high)</option>
                    <option value="durationShortest">Duration (shortest)</option>
                  </select>
                </label>
              </div>
            </div>
            {displayedResults.length === 0 ? (
              <p className={homeStyles.emptyText}>
                No flights match this filter. Try another stop count or choose All flights.
              </p>
            ) : (
              <>
                {loadingMoreDeals && (
                  <p className="mb-3 text-xs text-[var(--color-text-default-secondary)]">
                    Finding more flexible deals…
                  </p>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedResults.slice(0, visibleCount).map((r) => {
                    const fp =
                      lastSearchParams != null
                        ? tripFingerprint(r, lastSearchParams.origin)
                        : "";
                    return (
                      <ResultCard
                        key={`${r.airportCode}-${r.departureDate}-${r.region}-${r.airlineIataCode ?? r.airline}-${r.price}`}
                        result={r}
                        tripType={tripType}
                        onSave={
                          lastSearchParams != null ? () => handleSaveResult(r) : undefined
                        }
                        saved={fp !== "" && savedFingerprints.has(fp)}
                      />
                    );
                  })}
                </div>
                {displayedResults.length > visibleCount && (
                  <div className="mt-5 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                      className={homeStyles.seeMoreBtn}
                    >
                      See more
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </div>

      <HomeDestinations />
      <HomeHowItWorks />
      <HomeFooter />
    </main>
  );
}
