import React, { forwardRef } from 'react';
import styles from './SelectionControl.module.css';

// ─────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────

interface SelectionControlBaseProps {
  label: string;
  /** Renders label in italic — used for disabled state in Figma */
  labelItalic?: boolean;
}

// ─────────────────────────────────────────────
// Checkbox
// ─────────────────────────────────────────────

export interface CheckboxProps
  extends SelectionControlBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

/**
 * Checkbox — The Sommelier Editorial System
 *
 * States:
 *   unchecked  → white bg, #c6c6c6 border
 *   checked    → black bg + white checkmark
 *   disabled   → 40% opacity, not-allowed cursor
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, labelItalic = false, disabled, className, id, ...rest }, ref) => {
    const inputId = id ?? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <label
        htmlFor={inputId}
        className={`${styles.control} ${disabled ? styles['control--disabled'] : ''} ${className ?? ''}`}
      >
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          disabled={disabled}
          className={styles.hiddenInput}
          {...rest}
        />
        <span className={styles.checkbox} aria-hidden="true">
          {/* Checkmark — rendered via CSS, visible when :checked */}
          <svg
            className={styles.checkmark}
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 3.5L3.8 6.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className={`${styles.controlLabel} ${labelItalic ? styles['controlLabel--italic'] : ''}`}>
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// ─────────────────────────────────────────────
// Radio
// ─────────────────────────────────────────────

export interface RadioProps
  extends SelectionControlBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

/**
 * Radio — The Sommelier Editorial System
 *
 * States:
 *   unselected → white bg, #c6c6c6 border
 *   selected   → black dot inside white circle
 *   disabled   → 40% opacity, not-allowed cursor
 *
 * Note: Radio uses a circular indicator — one of the few round elements
 * in the system, by explicit Figma spec.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, labelItalic = false, disabled, className, id, ...rest }, ref) => {
    const inputId = id ?? `radio-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <label
        htmlFor={inputId}
        className={`${styles.control} ${disabled ? styles['control--disabled'] : ''} ${className ?? ''}`}
      >
        <input
          ref={ref}
          type="radio"
          id={inputId}
          disabled={disabled}
          className={styles.hiddenInput}
          {...rest}
        />
        <span className={styles.radio} aria-hidden="true" />
        <span className={`${styles.controlLabel} ${labelItalic ? styles['controlLabel--italic'] : ''}`}>
          {label}
        </span>
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export default { Checkbox, Radio };
