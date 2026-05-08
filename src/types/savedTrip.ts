import type { FlightResult, SearchParams } from "./index";

export type SavedTrip = {
  id: string;
  /** ISO timestamp when the user saved this trip */
  savedAt: string;
  /** Exact params used for the search that produced this result */
  searchParams: SearchParams;
  /** Row as shown when saved (price is historical after refresh) */
  snapshot: FlightResult;
};
