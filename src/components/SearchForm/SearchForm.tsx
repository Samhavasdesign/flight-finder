"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { airports } from "@/data/airports";
import {
  CONTINENT_OPTIONS,
  type ContinentFilter,
} from "@/data/searchDestinations";
import type { Airport, SearchParams } from "@/types";
import styles from "./SearchForm.module.css";

type SearchFormProps = {
  onSearch: (params: SearchParams) => void;
  /** Merged onto the root shell (e.g. homepage width tweaks). */
  className?: string;
};

/** 0 = exact dates; otherwise outbound ±window (API `dateFlexDays`). */
type DateFlexDays = 0 | 1 | 3 | 5;

// ── Airport helpers ───────────────────────────────────────────────────────────

function formatAirportOption(a: Airport): string {
  return `${a.city} (${a.code})`;
}

function filterAirports(query: string): Airport[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return airports
    .filter(
      (a) =>
        a.code.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q),
    )
    .slice(0, 6);
}

// ── Calendar helpers ──────────────────────────────────────────────────────────

function toIsoString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function addDaysToIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return toIsoString(dt.getFullYear(), dt.getMonth(), dt.getDate());
}

function formatDisplayDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function CalendarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, opacity: 0.6 }}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function SearchForm({ onSearch, className }: SearchFormProps) {
  const [tripType, setTripType] = useState<"round-trip" | "one-way">(
    "round-trip",
  );

  // Destination scope (continent; all regions within it)
  const [continent, setContinent] = useState<ContinentFilter>("worldwide");

  // Origin autocomplete
  const [originDisplay, setOriginDisplay] = useState("");
  const [originCode, setOriginCode] = useState("");
  const [originError, setOriginError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Date picker state
  const [departureDate, setDepartureDate] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  /** Outbound date flexibility; configured inside the calendar (Kayak-style). */
  const [dateFlexDays, setDateFlexDays] = useState<DateFlexDays>(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarTarget, setCalendarTarget] = useState<"departure" | "return">(
    "departure",
  );
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Calendar view: left month
  const now = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  const rightMonth = (viewMonth + 1) % 12;
  const rightMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  const canGoPrev =
    viewYear > now.getFullYear() ||
    (viewYear === now.getFullYear() && viewMonth > now.getMonth());

  const originMatches = useMemo(
    () => filterAirports(originDisplay),
    [originDisplay],
  );

  // ── Outside-click handlers ──────────────────────────────────────────────

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      const el = autocompleteRef.current;
      if (!el || !(e.target instanceof Node) || el.contains(e.target)) return;
      setDropdownOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      const el = calendarRef.current;
      if (!el || !(e.target instanceof Node) || el.contains(e.target)) return;
      setCalendarOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  // ── Origin autocomplete handlers ────────────────────────────────────────

  function handleOriginChange(value: string) {
    setOriginDisplay(value);
    setOriginCode("");
    const nextMatches = filterAirports(value);
    setDropdownOpen(value.trim() !== "" && nextMatches.length > 0);
  }

  function handleOriginFocus() {
    if (originDisplay.trim() !== "" && originMatches.length > 0) {
      setDropdownOpen(true);
    }
  }

  function selectAirport(a: Airport) {
    setOriginDisplay(formatAirportOption(a));
    setOriginCode(a.code);
    setOriginError(null);
    setDropdownOpen(false);
  }

  // ── Trip type (primary header control) ──────────────────────────────────

  function handleTripTypeChange(next: "round-trip" | "one-way") {
    if (next === tripType) return;
    setTripType(next);
    if (next === "one-way") {
      setReturnDate(null);
      if (calendarOpen && calendarTarget === "return") setCalendarOpen(false);
    } else {
      setReturnDate((prev) => {
        if (prev != null) return prev;
        if (departureDate == null) return null;
        return addDaysToIso(departureDate, 7);
      });
    }
  }

  // ── Calendar handlers ───────────────────────────────────────────────────

  function openCalendar(target: "departure" | "return") {
    setCalendarTarget(target);
    setCalendarOpen(true);
  }

  function handlePrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function handleNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function handleDayClick(iso: string) {
    if (calendarTarget === "departure") {
      setDepartureDate(iso);
      setReturnDate(null);
      if (tripType === "round-trip") {
        setCalendarTarget("return");
      } else {
        setCalendarOpen(false);
        setHoverDate(null);
      }
    } else {
      if (!departureDate || iso >= departureDate) {
        setReturnDate(iso);
        setCalendarOpen(false);
        setHoverDate(null);
      } else {
        // Clicked before departure — reset to this date and wait for return
        setDepartureDate(iso);
        setReturnDate(null);
      }
    }
  }

  // ── Calendar rendering ──────────────────────────────────────────────────

  const todayStr = toIsoString(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  function renderMonth(year: number, month: number) {
    const days = getCalendarDays(year, month);
    const title = new Date(year, month, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    // Effective range end: committed returnDate, or hovered date when picking return
    const rangeEndStr =
      returnDate ??
      (calendarTarget === "return" &&
      hoverDate &&
      departureDate &&
      hoverDate >= departureDate
        ? hoverDate
        : null);

    return (
      <div className={styles.calendarMonth}>
        <div className={styles.calendarMonthTitle}>{title}</div>
        <div className={styles.calendarGrid}>
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className={styles.calendarDayHeader}>
              {d}
            </div>
          ))}
          {days.map((day, i) => {
            if (day === null) {
              return (
                <div key={`empty-${i}`} className={styles.calendarDayCell} />
              );
            }

            const iso = toIsoString(year, month, day);
            const isPast = iso < todayStr;
            const isSelected = iso === departureDate || iso === returnDate;
            const isInRange = !!(
              departureDate &&
              rangeEndStr &&
              iso > departureDate &&
              iso < rangeEndStr
            );
            const isRangeStart = !!(
              departureDate &&
              rangeEndStr &&
              iso === departureDate &&
              iso < rangeEndStr
            );
            const isRangeEnd = !!(
              rangeEndStr &&
              departureDate &&
              iso === rangeEndStr &&
              iso > departureDate
            );
            const isToday = iso === todayStr;

            const cellClass = [
              styles.calendarDayCell,
              isInRange ? styles.calendarDayCellInRange : "",
              isRangeStart ? styles.calendarDayCellRangeStart : "",
              isRangeEnd ? styles.calendarDayCellRangeEnd : "",
            ]
              .filter(Boolean)
              .join(" ");

            const dayClass = [
              styles.calendarDay,
              isPast ? styles.calendarDayPast : "",
              isSelected ? styles.calendarDaySelected : "",
              isToday && !isSelected ? styles.calendarDayToday : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={iso} className={cellClass}>
                <button
                  type="button"
                  className={dayClass}
                  disabled={isPast}
                  onMouseEnter={() => !isPast && setHoverDate(iso)}
                  onMouseLeave={() => setHoverDate(null)}
                  onClick={() => !isPast && handleDayClick(iso)}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Submit ──────────────────────────────────────────────────────────────

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!departureDate) {
      openCalendar("departure");
      return;
    }
    if (tripType === "round-trip" && !returnDate) {
      openCalendar("return");
      return;
    }
    let originValue = originCode.trim().toUpperCase();
    if (!originValue) {
      const lone = filterAirports(originDisplay);
      if (lone.length === 1) {
        originValue = lone[0].code;
        setOriginCode(lone[0].code);
      }
    }
    if (!originValue) {
      setOriginError("Choose an airport from the suggestions list.");
      return;
    }
    setOriginError(null);

    const flexActive = dateFlexDays > 0;
    const flexWindow: 1 | 3 | 5 | undefined = flexActive
      ? (dateFlexDays as 1 | 3 | 5)
      : undefined;
    onSearch({
      origin: originValue,
      departureDate,
      returnDate: tripType === "round-trip" ? returnDate : null,
      tripType,
      continent,
      region: "any",
      flexibleDates: flexActive,
      dateFlexDays: flexWindow,
      includeNearbyAirports: true,
    });
  }

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <div className={[styles.shell, className].filter(Boolean).join(" ")}>
      <div className={styles.modeRow}>
        <fieldset className={styles.tripTypeFieldset}>
          <legend className={styles.tripTypeLegend}>Trip type</legend>
          <label className={styles.tripTypeRadioLabel}>
            <input
              type="radio"
              name="search-trip-type"
              className={styles.tripTypeRadio}
              checked={tripType === "round-trip"}
              onChange={() => handleTripTypeChange("round-trip")}
            />
            <span>Round-trip</span>
          </label>
          <label className={styles.tripTypeRadioLabel}>
            <input
              type="radio"
              name="search-trip-type"
              className={styles.tripTypeRadio}
              checked={tripType === "one-way"}
              onChange={() => handleTripTypeChange("one-way")}
            />
            <span>One-way</span>
          </label>
        </fieldset>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.rail}>
          <div
            className={`${styles.segment} ${styles.autocompleteField}`}
            ref={autocompleteRef}
          >
            <label htmlFor="origin" className={styles.segmentLabel}>
              From
            </label>
            <input
              id="origin"
              type="text"
              value={originDisplay}
              onChange={(e) => handleOriginChange(e.target.value)}
              onFocus={handleOriginFocus}
              placeholder="City or airport"
              className={styles.input}
              autoComplete="off"
            />
            {dropdownOpen && originMatches.length > 0 && (
              <ul className={styles.autocompleteDropdown} role="listbox">
                {originMatches.map((a) => (
                  <li
                    key={`${a.code}-${a.name}`}
                    role="option"
                    aria-selected={originCode === a.code}
                  >
                    <button
                      type="button"
                      className={styles.autocompleteOption}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectAirport(a);
                      }}
                    >
                      {formatAirportOption(a)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.segment}>
            <label htmlFor="continent" className={styles.segmentLabel}>
              To
            </label>
            <select
              id="continent"
              value={continent}
              onChange={(e) => setContinent(e.target.value as ContinentFilter)}
              className={styles.select}
              aria-label="Region or worldwide destination scope"
            >
              {CONTINENT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className={`${styles.segment} ${styles.segmentDates}`}>
            <span className={styles.segmentLabel}>Dates</span>
            <div className={styles.dateInputsWrapper} ref={calendarRef}>
              <div className={styles.dateInputRow}>
                <button
                  type="button"
                  className={[
                    styles.dateInput,
                    departureDate ? styles.dateInputFilled : "",
                    calendarOpen && calendarTarget === "departure"
                      ? styles.dateInputActive
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => openCalendar("departure")}
                  aria-label="Select departure date"
                >
                  <CalendarIcon />
                  {departureDate
                    ? formatDisplayDate(departureDate)
                    : "Add date"}
                </button>
                {tripType === "round-trip" && (
                  <button
                    type="button"
                    className={[
                      styles.dateInput,
                      returnDate ? styles.dateInputFilled : "",
                      calendarOpen && calendarTarget === "return"
                        ? styles.dateInputActive
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => openCalendar("return")}
                    aria-label="Select return date"
                  >
                    {returnDate ? formatDisplayDate(returnDate) : "Return"}
                  </button>
                )}
              </div>

              {calendarOpen && (
                <div className={styles.calendarModal}>
                  <div className={styles.calendarModalToolbar}>
                    <span className={styles.calendarLegLabel}>
                      {calendarTarget === "departure" ? "Departure" : "Return"}
                    </span>
                    <select
                      id="calendar-date-flex"
                      className={styles.calendarFlexSelect}
                      value={dateFlexDays}
                      onChange={(e) =>
                        setDateFlexDays(Number(e.target.value) as DateFlexDays)
                      }
                      aria-label="Date flexibility around selected day"
                    >
                      <option value={0}>Exact</option>
                      <option value={1}>±1 day</option>
                      <option value={3}>±3 days</option>
                      <option value={5}>±5 days</option>
                    </select>
                  </div>
                  <div className={styles.calendarNavRow}>
                    <button
                      type="button"
                      className={styles.calendarNavBtn}
                      onClick={handlePrevMonth}
                      disabled={!canGoPrev}
                      aria-label="Previous month"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className={styles.calendarNavBtn}
                      onClick={handleNextMonth}
                      aria-label="Next month"
                    >
                      ›
                    </button>
                  </div>

                  <div className={styles.calendarMonths}>
                    {renderMonth(viewYear, viewMonth)}
                    {renderMonth(rightMonthYear, rightMonth)}
                  </div>

                  <div className={styles.calendarFooter}>
                    <button
                      type="button"
                      className={styles.calendarDoneBtn}
                      onClick={() => setCalendarOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.searchWrap}>
            <button
              type="submit"
              className={styles.searchCircle}
              aria-label="Search flights"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4.3-4.3" />
              </svg>
            </button>
          </div>
        </div>

        {originError != null && (
          <p className={styles.fieldError} role="alert">
            {originError}
          </p>
        )}
      </form>
    </div>
  );
}
