import type { SavedTrip } from "@/types/savedTrip";
import { tripFingerprint } from "@/lib/matchSavedFlight";

const STORAGE_KEY = "flight-finder:saved-trips:v1";
const MAX_TRIPS = 30;

function safeParse(raw: string | null): SavedTrip[] {
  if (raw == null || raw === "") return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (x): x is SavedTrip =>
        x != null &&
        typeof x === "object" &&
        typeof (x as SavedTrip).id === "string" &&
        typeof (x as SavedTrip).savedAt === "string" &&
        (x as SavedTrip).searchParams != null &&
        (x as SavedTrip).snapshot != null,
    );
  } catch {
    return [];
  }
}

export function loadSavedTrips(): SavedTrip[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export function persistSavedTrips(trips: SavedTrip[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trips.slice(0, MAX_TRIPS)));
}

export function removeSavedTrip(id: string): SavedTrip[] {
  const next = loadSavedTrips().filter((t) => t.id !== id);
  persistSavedTrips(next);
  return next;
}

/**
 * Add or update by fingerprint (same logical trip replaces previous save time).
 */
export function upsertSavedTrip(trip: SavedTrip): SavedTrip[] {
  const existing = loadSavedTrips();
  const fp = tripFingerprint(trip.snapshot, trip.searchParams.origin);
  const withoutDup = existing.filter(
    (t) => tripFingerprint(t.snapshot, t.searchParams.origin) !== fp,
  );
  const next = [trip, ...withoutDup].slice(0, MAX_TRIPS);
  persistSavedTrips(next);
  return next;
}
