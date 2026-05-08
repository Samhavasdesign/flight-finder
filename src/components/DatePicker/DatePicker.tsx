'use client';

import React, { useState } from 'react';
import styles from './DatePicker.module.css';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface DatePickerProps {
  /** Controlled selected date */
  value?: Date | null;
  /** Default selected date (uncontrolled) */
  defaultValue?: Date | null;
  /** Called when a date is confirmed with DONE */
  onConfirm?: (date: Date) => void;
  /** Called when CANCEL is pressed */
  onCancel?: () => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  className?: string;
}

/**
 * DatePicker — The Sommelier Editorial System
 *
 * Inline calendar widget. Selected date shown with a circular indicator
 * (explicit Figma note: "soft contrast to the system's prevailing rectilinear geometry").
 * Navigation: prev/next month via chevron buttons.
 * Actions: DONE (black, full width half) | CANCEL (ghost outline).
 * Today's date shown with a cross/dot icon (Figma: icon on day 15 in April 2026).
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value: controlledValue,
  defaultValue = null,
  onConfirm,
  onCancel,
  minDate,
  maxDate,
  className,
}) => {
  const today = new Date();
  const isControlled = controlledValue !== undefined;

  const [internalDate, setInternalDate] = useState<Date | null>(defaultValue);
  const selectedDate = isControlled ? controlledValue : internalDate;

  // View state — which month/year the calendar is showing
  const [viewYear, setViewYear] = useState(
    selectedDate?.getFullYear() ?? today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    selectedDate?.getMonth() ?? today.getMonth()
  );

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const handleDayClick = (day: number) => {
    const clicked = new Date(viewYear, viewMonth, day);
    if (minDate && clicked < minDate) return;
    if (maxDate && clicked > maxDate) return;
    if (!isControlled) setInternalDate(clicked);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const isSelected = (day: number) =>
    selectedDate?.getFullYear() === viewYear &&
    selectedDate?.getMonth() === viewMonth &&
    selectedDate?.getDate() === day;

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  // Build calendar grid cells
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className={`${styles.root} ${className ?? ''}`}>
      {/* Month/Year header */}
      <div className={styles.header}>
        <span className={styles.monthLabel}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <div className={styles.navButtons}>
          <button
            onClick={prevMonth}
            className={styles.navBtn}
            aria-label="Previous month"
            type="button"
          >
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" aria-hidden="true">
              <path d="M5 1L1 5.5L5 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className={styles.navBtn}
            aria-label="Next month"
            type="button"
          >
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" aria-hidden="true">
              <path d="M1 1L5 5.5L1 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className={styles.grid}>
        {DAYS.map((d, i) => (
          <div key={`header-${i}`} className={styles.dayHeader}>
            {d}
          </div>
        ))}

        {/* Day cells */}
        {cells.map((day, i) =>
          day === null ? (
            <div key={`empty-${i}`} className={styles.emptyCell} />
          ) : (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => handleDayClick(day)}
              disabled={isDisabled(day)}
              aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}`}
              aria-pressed={isSelected(day)}
              className={[
                styles.dayCell,
                isSelected(day) ? styles['dayCell--selected'] : '',
                isToday(day) && !isSelected(day) ? styles['dayCell--today'] : '',
                isDisabled(day) ? styles['dayCell--disabled'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {isToday(day) && !isSelected(day) ? (
                /* Today indicator — small cross mark per Figma */
                <span className={styles.todayMark} aria-hidden="true">
                  <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
                    <path d="M1 4.5H9M5 0.5V8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </span>
              ) : (
                day
              )}
            </button>
          )
        )}
      </div>

      {/* Divider + action buttons */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.doneBtn}
          onClick={() => selectedDate && onConfirm?.(selectedDate)}
        >
          DONE
        </button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
        >
          CANCEL
        </button>
      </div>

      {/* Selected date display (input-style trigger) */}
      {selectedDate && (
        <div className={styles.dateDisplay}>
          <span className={styles.dateDisplayLabel}>SELECTED DATE</span>
          <div className={styles.dateDisplayInput}>
            <span>{formatDate(selectedDate)}</span>
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true">
              <rect x="0.5" y="1.5" width="9" height="9" rx="0" stroke="currentColor" strokeWidth="1" />
              <path d="M3 0.5V2.5M7 0.5V2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
