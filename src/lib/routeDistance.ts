import coords from "@/data/airportCoordinates.json";

type Coord = { lat: number; lon: number };

const EARTH_RADIUS_KM = 6371;

export function haversineKm(a: Coord, b: Coord): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const h =
    sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return EARTH_RADIUS_KM * c;
}

/** Great-circle distance in km when both airport codes exist in the coordinate dataset; otherwise `null`. */
export function getRouteDistanceKm(originCode: string, destinationCode: string): number | null {
  const o = coords[originCode.toUpperCase() as keyof typeof coords] as Coord | undefined;
  const d = coords[destinationCode.toUpperCase() as keyof typeof coords] as Coord | undefined;
  if (!o || !d) return null;
  return Math.round(haversineKm(o, d) * 10) / 10;
}
