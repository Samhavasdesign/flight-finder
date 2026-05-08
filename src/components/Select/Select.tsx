'use client';

import React, { useRef, useState, useId } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** Field label shown above */
  label?: string;
  /** Controlled value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Options list */
  options: SelectOption[];
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder shown when no value selected */
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * Select — The Sommelier Editorial System
 *
 * Custom dropdown. Two states:
 *   closed → white bg, rgba(198,198,198,0.3) border, chevron down
 *   open   → white bg, 1px solid black border, chevron up, dropdown panel below
 *
 * Dropdown panel: 1px black border on left/right/bottom, no top border.
 * Selected item: black bg, #e2e2e2 text.
 * Disabled item: 30% opacity, italic.
 * Instantaneous open/close — no animation.
 */
export const Select: React.FC<SelectProps> = ({
  label,
  value: controlledValue,
  defaultValue,
  options,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  className,
  id,
}) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const selectedOption = options.find((o) => o.value === currentValue);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    if (!isControlled) setInternalValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`${styles.root} ${disabled ? styles['root--disabled'] : ''} ${className ?? ''}`}
      ref={containerRef}
    >
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}

      <div
        id={selectId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={disabled ? -1 : 0}
        className={`${styles.trigger} ${isOpen ? styles['trigger--open'] : ''}`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <span className={`${styles.triggerText} ${!selectedOption ? styles['triggerText--placeholder'] : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Chevron — rotates when open */}
        <svg
          className={`${styles.chevron} ${isOpen ? styles['chevron--open'] : ''}`}
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M1 1L5.5 6L10 1" stroke="#6b7280" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {isOpen && (
        <ul
          role="listbox"
          className={styles.dropdown}
          aria-label={label}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === currentValue}
              aria-disabled={option.disabled}
              className={[
                styles.option,
                option.value === currentValue ? styles['option--selected'] : '',
                option.disabled ? styles['option--disabled'] : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
