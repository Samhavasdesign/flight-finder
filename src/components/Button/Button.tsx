import React from 'react';
import styles from './Button.module.css';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'tonal';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant — maps to the four Sommelier hierarchy levels */
  variant?: ButtonVariant;
  /** Size scale — sm (32px), md (48px, default), lg (64px) */
  size?: ButtonSize;
  /** Icon rendered to the left of the label */
  iconLeft?: React.ReactNode;
  /** Icon rendered to the right of the label */
  iconRight?: React.ReactNode;
  /** Icon-only mode — renders a square button, ignores children */
  iconOnly?: React.ReactNode;
  /** Fills the full width of its container */
  fullWidth?: boolean;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

/**
 * Button — The Sommelier Editorial System
 *
 * Four variants reflecting the button hierarchy:
 *   primary   → Solid black / ink fill — the "confident cut" anchor
 *   secondary → Ghost / 1px outline — subordinate action
 *   tertiary  → Text only with inline arrow indicator
 *   tonal     → Surface-3 fill — low-emphasis / destructive-adjacent
 *
 * Three sizes: sm (32px), md (48px), lg (64px)
 * States: default, hover, active (scale 0.98), disabled
 * No border radius — 0px corners are intentional.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  iconOnly,
  fullWidth = false,
  className,
  children,
  disabled,
  ...rest
}) => {
  const classNames = [
    styles.button,
    styles[`variant--${variant}`],
    styles[`size--${size}`],
    fullWidth ? styles['full-width'] : '',
    iconOnly ? styles['icon-only'] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (iconOnly) {
    return (
      <button className={classNames} disabled={disabled} {...rest}>
        <span className={styles.iconWrap}>{iconOnly}</span>
      </button>
    );
  }

  return (
    <button className={classNames} disabled={disabled} {...rest}>
      {iconLeft && (
        <span className={`${styles.iconWrap} ${styles.iconLeft}`}>
          {iconLeft}
        </span>
      )}
      <span className={styles.label}>{children}</span>
      {iconRight && (
        <span className={`${styles.iconWrap} ${styles.iconRight}`}>
          {iconRight}
        </span>
      )}
      {variant === 'tertiary' && !iconRight && (
        <span className={styles.tertiaryArrow} aria-hidden="true">
          →
        </span>
      )}
    </button>
  );
};

export default Button;
