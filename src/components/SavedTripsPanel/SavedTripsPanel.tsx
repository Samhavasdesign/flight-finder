"use client";

import { useCallback, useEffect, useState } from "react";
import type { FlightResult } from "@/types";
import type { SavedTrip } from "@/types/savedTrip";
import { findMatchingResult } from "@/lib/matchSavedFlight";
import { fetchSearchStage } from "@/lib/searchClient";
import styles from "./SavedTripsPanel.module.css";

type RefreshState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; match: FlightResult | null; checkedAt: string }
  | { status: "error"; message: string };

function formatMoney(amount: number, currency: string): string {
  const code = currency.trim().toUpperCase() || "USD";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${code} ${amount}`;
  }
}

function formatSavedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export type SavedTripsPanelProps = {
  trips: SavedTrip[];
  onRemove: (id: string) => void;
};

export function SavedTripsPanel({ trips, onRemove }: SavedTripsPanelProps) {
  const [refreshById, setRefreshById] = useState<Record<string, RefreshState>>({});

  useEffect(() => {
    const ids = new Set(trips.map((t) => t.id));
    setRefreshById((prev) => {
      const next: Record<string, RefreshState> = {};
      for (const id of Object.keys(prev)) {
        if (ids.has(id)) next[id] = prev[id]!;
      }
      return next;
    });
  }, [trips]);

  const handleRefresh = useCallback(async (trip: SavedTrip) => {
    setRefreshById((prev) => ({ ...prev, [trip.id]: { status: "loading" } }));
    try {
      const results = await fetchSearchStage(trip.searchParams, "fast");
      const match = findMatchingResult(trip.snapshot, results);
      setRefreshById((prev) => ({
        ...prev,
        [trip.id]: {
          status: "done",
          match,
          checkedAt: new Date().toISOString(),
        },
      }));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Refresh failed";
      setRefreshById((prev) => ({
        ...prev,
        [trip.id]: { status: "error", message },
      }));
    }
  }, []);

  if (trips.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="saved-trips-heading">
      <h2 id="saved-trips-heading" className={styles.heading}>
        Saved trips ({trips.length})
      </h2>
      <p className="mb-3 text-xs text-slate-500">
        Prices change often. Saved amounts are a snapshot; use Check current prices to see today&apos;s
        results for the same search.
      </p>
      <ul className={styles.list}>
        {trips.map((trip) => {
          const { snapshot } = trip;
          const refresh = refreshById[trip.id] ?? { status: "idle" as const };
          return (
            <li key={trip.id} className={styles.row}>
              <div className={styles.rowTop}>
                <div>
                  <p className={styles.title}>
                    {snapshot.destination} ({snapshot.originAirportCode} → {snapshot.airportCode})
                  </p>
                  <p className={styles.meta}>
                    Saved {formatSavedAt(trip.savedAt)} · was{" "}
                    {formatMoney(snapshot.price, snapshot.currency)}
                  </p>
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() => handleRefresh(trip)}
                    disabled={refresh.status === "loading"}
                    aria-busy={refresh.status === "loading"}
                  >
                    {refresh.status === "loading" ? "Checking…" : "Check current prices"}
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnDanger}`}
                    onClick={() => {
                      setRefreshById((prev) => {
                        const next = { ...prev };
                        delete next[trip.id];
                        return next;
                      });
                      onRemove(trip.id);
                    }}
                    aria-label={`Remove saved trip to ${snapshot.destination}`}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {refresh.status === "error" && (
                <p className={styles.error} role="alert">
                  {refresh.message}
                </p>
              )}

              {refresh.status === "done" && (
                <div className={styles.refreshNote}>
                  {refresh.match ? (
                    <>
                      <span className="text-slate-400">Current from this search: </span>
                      <span className="font-semibold text-white">
                        {formatMoney(refresh.match.price, refresh.match.currency)}
                      </span>
                      {refresh.match.price !== snapshot.price ? (
                        refresh.match.price > snapshot.price ? (
                          <span className={styles.priceUp}>
                            {" "}
                            (↑{" "}
                            {formatMoney(
                              refresh.match.price - snapshot.price,
                              refresh.match.currency,
                            )}
                            )
                          </span>
                        ) : (
                          <span className={styles.priceDown}>
                            {" "}
                            (↓{" "}
                            {formatMoney(
                              snapshot.price - refresh.match.price,
                              refresh.match.currency,
                            )}
                            )
                          </span>
                        )
                      ) : (
                        <span className={styles.muted}> (unchanged)</span>
                      )}
                      <span className={styles.muted}>
                        {" "}
                        · checked {formatSavedAt(refresh.checkedAt)}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-amber-200/90">
                        We couldn&apos;t find this exact option in the latest results (same route, dates,
                        stops, airline).
                      </span>
                      <span className={styles.muted}>
                        {" "}
                        Checked {formatSavedAt(refresh.checkedAt)} — run a new search from the form for
                        similar deals.
                      </span>
                    </>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
