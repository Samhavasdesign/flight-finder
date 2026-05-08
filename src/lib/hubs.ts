export type Hub = {
  origin: string;
  originCity: string;
  originContinent: string;
};

export const MVP_HUBS: Hub[] = [
  { origin: "LHR", originCity: "London", originContinent: "Europe" },
  { origin: "CDG", originCity: "Paris", originContinent: "Europe" },
  { origin: "AMS", originCity: "Amsterdam", originContinent: "Europe" },
  { origin: "FCO", originCity: "Rome", originContinent: "Europe" },
  { origin: "MAD", originCity: "Madrid", originContinent: "Europe" },
  { origin: "LIS", originCity: "Lisbon", originContinent: "Europe" },
  { origin: "BCN", originCity: "Barcelona", originContinent: "Europe" },
  { origin: "DUB", originCity: "Dublin", originContinent: "Europe" },
  { origin: "VIE", originCity: "Vienna", originContinent: "Europe" },
  { origin: "ZRH", originCity: "Zurich", originContinent: "Europe" },
  { origin: "CPH", originCity: "Copenhagen", originContinent: "Europe" },
  { origin: "ARN", originCity: "Stockholm", originContinent: "Europe" },
  { origin: "HEL", originCity: "Helsinki", originContinent: "Europe" },
  { origin: "WAW", originCity: "Warsaw", originContinent: "Europe" },
  { origin: "PRG", originCity: "Prague", originContinent: "Europe" },
  { origin: "BUD", originCity: "Budapest", originContinent: "Europe" },
  { origin: "ATH", originCity: "Athens", originContinent: "Europe" },
  { origin: "IST", originCity: "Istanbul", originContinent: "Europe" },
];

export const FULL_HUBS: Hub[] = MVP_HUBS;

export function getHubs(): Hub[] {
  return process.env.DEALS_PHASE === "mvp" ? MVP_HUBS : FULL_HUBS;
}
