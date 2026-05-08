import React, { forwardRef } from 'react';
import styles from './TextInput.module.css';

export type TextInputState = 'default' | 'focus' | 'error' | 'disabled';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label shown above the input */
  label?: string;
  /** Error message — triggers error state when provided */
  errorMessage?: string;
  /** Helper text below the input (non-error) */
  hint?: string;
  /** Icon or element rendered at the trailing edge (e.g. show/hide password) */
  trailingElement?: React.ReactNode;
  /** Use surface-container background instead of transparent (matches Figma textarea style) */
  filled?: boolean;
  /** Multiline textarea variant */
  multiline?: boolean;
  /** Number of visible rows for textarea */
  rows?: number;
}

/**
 * TextInput — The Sommelier Editorial System
 *
 * Variants:
 *   default   → bottom border only (#6b7280)
 *   focus     → full 1px black outline via :focus-within
 *   error     → red label + red text + red bottom border
 *   disabled  → 40% opacity, not-allowed cursor
 *   filled    → surface-1 background (textarea style)
 *   multiline → textarea element, same styling
 */
export const TextInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextInputProps
>(
  (
    {
      label,
      errorMessage,
      hint,
      trailingElement,
      filled = false,
      multiline = false,
      rows = 4,
      disabled,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const hasError = Boolean(errorMessage);
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const wrapperClass = [
      styles.wrapper,
      hasError ? styles['wrapper--error'] : '',
      filled ? styles['wrapper--filled'] : '',
      disabled ? styles['wrapper--disabled'] : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.root}>
        {label && (
          <label
            htmlFor={inputId}
            className={`${styles.label} ${hasError ? styles['label--error'] : ''}`}
          >
            {label}
          </label>
        )}

        <div className={wrapperClass}>
          {multiline ? (
            <textarea
              id={inputId}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={rows}
              disabled={disabled}
              className={styles.field}
              {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              id={inputId}
              ref={ref as React.Ref<HTMLInputElement>}
              disabled={disabled}
              className={styles.field}
              {...rest}
            />
          )}

          {trailingElement && (
            <span className={styles.trailing}>{trailingElement}</span>
          )}
        </div>

        {hasError && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
        {hint && !hasError && (
          <span className={styles.hint}>{hint}</span>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
export default TextInput;
