export type FareHistory = {
  airportCode: string;
  price: number;
  source: "seed" | "bootstrap" | "live";
  recordedAt: string;
};

export type DealSignal =
  | "historical_delta"
  | "price_cap"
  | "rarity"
  | "route_quality"
  | "none";

export type ScoreResult = {
  score: number;
  isGenuineDeal: boolean;
  dominantSignal: DealSignal;
  label: string;
  conservativeMode: boolean;
};

export function scoreFare(
  price: number,
  airportCode: string,
  history: FareHistory[]
): ScoreResult {
  const normalizedAirportCode = airportCode.trim().toUpperCase();
  const routeHistory = history.filter(
    (record) => record.airportCode.trim().toUpperCase() === normalizedAirportCode
  );

  if (routeHistory.length === 0) {
    return {
      score: 0,
      isGenuineDeal: false,
      dominantSignal: "none",
      label: "Insufficient data",
      conservativeMode: true,
    };
  }

  const nonSeedCount = routeHistory.filter((record) => record.source !== "seed").length;
  const conservativeMode = nonSeedCount < 7;

  const baselinePrice =
    routeHistory.reduce((sum, record) => sum + record.price, 0) / routeHistory.length;

  if (!Number.isFinite(baselinePrice) || baselinePrice <= 0) {
    return {
      score: 0,
      isGenuineDeal: false,
      dominantSignal: "none",
      label: "Insufficient data",
      conservativeMode,
    };
  }

  const priceDelta = (baselinePrice - price) / baselinePrice;
  const threshold = conservativeMode ? 0.05 : 0.05;

  let score = 0;
  if (priceDelta >= threshold) {
    const maxDelta = 0.5;
    const normalizedProgress = Math.min((priceDelta - threshold) / (maxDelta - threshold), 1);
    score = Math.round(65 + normalizedProgress * 35);
  }

  const dominantSignal: DealSignal = score > 0 ? "historical_delta" : "none";
  const label =
    score > 0
      ? `Usually $${Math.round(baselinePrice)} — currently $${Math.round(price)}${
          conservativeMode ? " (early data — treat as indicative)" : ""
        }`
      : "Not a deal at current pricing";

  return {
    score,
    isGenuineDeal: score >= 65,
    dominantSignal,
    label,
    conservativeMode,
  };
}
