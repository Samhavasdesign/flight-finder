"use client";

import type { FlightResult } from "@/types";
import styles from "./ResultCard.module.css";

export type ResultCardProps = {
  result: FlightResult;
  tripType: "round-trip" | "one-way";
  /** When set, shows a Save control (parent supplies last search context). */
  onSave?: () => void;
  /** True when this row is already in the user's saved list */
  saved?: boolean;
};

function sourceLabel(source: FlightResult["source"]): string | null {
  if (source == null) return null;
  if (source === "duffel") return "Duffel";
  if (source === "travelpayouts") return "Travelpayouts";
  if (source === "serp") return "SerpAPI";
  if (source === "firecrawl") return "Firecrawl";
  return null;
}

function formatDateRange(departure: string, ret: string): string {
  const fmt = (iso: string) => {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
  return `${fmt(departure)} – ${fmt(ret)}`;
}

function stopsLabel(stops: number): string {
  if (stops === 0) return "Non-stop";
  if (stops === 1) return "1 stop";
  return `${stops} stops`;
}

function formatOutboundTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function AirlineGlyph({ result }: { result: FlightResult }) {
  if (result.airlineLogoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- Duffel-hosted SVG logos; tiny mark, no next/image benefit
      <img
        src={result.airlineLogoUrl}
        alt=""
        width={24}
        height={24}
        className={styles.airlineLogo}
        loading="lazy"
        decoding="async"
      />
    );
  }
  if (result.airlineIataCode) {
    return (
      <span className={styles.airlineIataBadge} aria-hidden>
        {result.airlineIataCode}
      </span>
    );
  }
  return (
    <span className={styles.airlinePlaneWrap} aria-hidden>
      <svg className={styles.airlinePlane} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L16 22v-1.5L14 19v-5.5l7 3.5z" />
      </svg>
    </span>
  );
}

function shouldShowDestinationCountry(destination: string, country: string | null | undefined): boolean {
  if (!country || country.trim() === "") return false;
  const c = country.trim();
  const d = destination.trim().toLowerCase();
  if (d.includes(c.toLowerCase())) return false;
  return true;
}

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
    return `${code} ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
}

export function ResultCard({ result, tripType, onSave, saved = false }: ResultCardProps) {
  const showDateHint =
    result.source !== "travelpayouts" &&
    typeof result.requestedDepartureDate === "string" &&
    result.requestedDepartureDate !== "" &&
    result.requestedDepartureDate !== result.departureDate;

  const showCountry = shouldShowDestinationCountry(result.destination, result.destinationCountry);
  const provider = sourceLabel(result.source);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleStack}>
          <h2 className={styles.destination}>
            <span>{result.destination}</span>
            {showCountry ? (
              <span className={styles.destinationCountry}>, {result.destinationCountry}</span>
            ) : null}
          </h2>
          <div className={styles.airportCode}>
            {result.originAirportCode} - {result.airportCode}
          </div>
        </div>
        {provider ? (
          <span className={styles.providerBadge} title={`${provider} option`} aria-label={`${provider} option`}>
            {provider}
          </span>
        ) : null}
      </div>

      <div className={styles.priceRow}>
        <span className={styles.price}>
          {formatMoney(result.price, result.currency)}
        </span>
      </div>

      <div className={styles.timingRow}>
        <span className={styles.timingItem}>
          {result.outboundDuration != null && result.outboundDuration !== ""
            ? result.outboundDuration
            : "—"}
        </span>
        <span className={styles.dot}>·</span>
        <span className={styles.timingItem}>
          {stopsLabel(result.stops)}
        </span>
      </div>

      <div className={styles.scheduleRow}>
        <span className={styles.timingItem}>
          Departs {formatOutboundTime(result.outboundDepartsAt)}
        </span>
        <span className={styles.scheduleArrow}>→</span>
        <span className={styles.timingItem}>
          Arrives {formatOutboundTime(result.outboundArrivesAt)}
        </span>
      </div>
      {showDateHint && (
        <p className={styles.flexDateHint}>
          Best fare on{" "}
          {new Date(result.departureDate + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
      )}

      <div className={styles.details}>
        <span className={styles.airlineWithMark}>
          <AirlineGlyph result={result} />
          <span className={styles.detailItem}>{result.airline}</span>
        </span>
        <span className={styles.dot}>·</span>
        <span className={styles.detailItem}>
          {tripType === "round-trip" && result.returnDate
            ? formatDateRange(result.departureDate, result.returnDate)
            : new Date(result.departureDate + "T00:00:00").toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
        </span>
      </div>

      {onSave != null && (
        <div className={styles.saveRow}>
          <button
            type="button"
            className={styles.saveBtn}
            onClick={onSave}
            disabled={saved}
            aria-label={
              saved
                ? "This trip is already saved"
                : `Save trip to ${result.destination} for later`
            }
          >
            {saved ? "Saved" : "Save trip"}
          </button>
        </div>
      )}

      {result.flexibleAlternative != null && (
        <p className={styles.flexBanner}>
          {"💡 Fly in "}
          {result.flexibleAlternative.month}
          {" instead — save "}
          <span className={styles.flexSaving}>
            {formatMoney(result.flexibleAlternative.saving, result.currency)}
          </span>
        </p>
      )}
    </article>
  );
}
