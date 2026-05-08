import React, { forwardRef } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Primary label */
  label: string;
  /** Optional secondary description line */
  description?: string;
}

/**
 * Toggle (Switch) — The Sommelier Editorial System
 *
 * Binary preference switch. 48×24px pill.
 * On:  black track, white thumb aligned to right edge.
 * Off: #c6c6c6 track, white thumb aligned to left edge.
 *
 * Instantaneous state cuts — no transition on thumb movement.
 * Used for: notification preferences, privacy settings, etc.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, description, disabled, className, id, ...rest }, ref) => {
    const inputId = id ?? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={`${styles.root} ${disabled ? styles['root--disabled'] : ''} ${className ?? ''}`}>
        <div className={styles.textGroup}>
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>

        <div className={styles.switchWrap}>
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={inputId}
            disabled={disabled}
            className={styles.hiddenInput}
            {...rest}
          />
          <span className={styles.track} aria-hidden="true">
            <span className={styles.thumb} />
          </span>
        </div>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
export default Toggle;
