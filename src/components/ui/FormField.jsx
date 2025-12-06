/**
 * ============================================================================
 * FormField Component
 * ============================================================================
 *
 * Reusable form field component with label, input/textarea, error, and help text.
 * Follows ANTIK-HOLZ design system (CLAUDE.md).
 *
 * Supports:
 * - Text, email, tel, number, textarea inputs
 * - Error states with red border and error message
 * - Help text below input
 * - Optional/required field indicators
 *
 * @see ../../CLAUDE.md - Design system specifications
 * ============================================================================
 */

import React from 'react';
import { customStyles } from '../../config/theme';

const FormField = ({
  label,
  type = 'text', // 'text' | 'email' | 'tel' | 'number' | 'textarea'
  name,
  value,
  onChange,
  placeholder = '',
  error = null,
  helpText = null,
  required = false,
  disabled = false,
  className = '',
  rows = 4, // for textarea
  min,
  max,
  step,
  ...props
}) => {
  const inputStyles = {
    backgroundColor: error ? '#FEF2F2' : '#FFFFFF',
    borderColor: error ? '#EF4444' : '#D1D5DB',
    color: customStyles.textPrimary,
    padding: '0.75rem 1rem', // py-3 px-4
    fontSize: '1rem',
    borderWidth: '1px',
    outline: 'none',
    transition: 'all 200ms',
    width: '100%',
  };

  const labelStyles = {
    color: customStyles.textPrimary,
  };

  const InputElement = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={`${error ? 'error-field' : ''} ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium mb-2"
          style={labelStyles}
        >
          {label} {required && '*'}
        </label>
      )}

      {/* Input/Textarea */}
      <InputElement
        id={name}
        name={name}
        type={type !== 'textarea' ? type : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all"
        style={inputStyles}
        rows={type === 'textarea' ? rows : undefined}
        min={min}
        max={max}
        step={step}
        {...props}
      />

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-red-500 text-sm">{error}</p>
      )}

      {/* Help Text */}
      {helpText && !error && (
        <p className="mt-1 text-xs" style={{ color: customStyles.textMuted }}>
          {helpText}
        </p>
      )}
    </div>
  );
};

export default FormField;
