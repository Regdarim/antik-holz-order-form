/**
 * ============================================================================
 * Button Component
 * ============================================================================
 *
 * Reusable button component following ANTIK-HOLZ design system (CLAUDE.md).
 *
 * Variants:
 * - primary: Dark background (default CTA button)
 * - secondary: Transparent with border (outline button)
 * - tab: Tab-style button with conditional styling
 *
 * @see ../../CLAUDE.md - Design system specifications
 * ============================================================================
 */

import React, { useState } from 'react';
import { customStyles } from '../../config/theme';

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary', // 'primary' | 'secondary' | 'tab'
  type = 'button',
  className = '',
  isActive = false, // for tab variant
  isLoading = false,
  icon = null, // Optional icon element
  iconPosition = 'right', // 'left' | 'right'
  fullWidth = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Base styles
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: variant === 'primary' ? 600 : variant === 'tab' ? 500 : 500,
    fontSize: '0.875rem', // text-sm
    transition: 'all 200ms',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
  };

  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? '#D1D5DB' : customStyles.primaryColor,
          color: '#FFFFFF',
          padding: '0.75rem 2rem', // py-3 px-8
          opacity: disabled ? 0.6 : isHovered ? 0.9 : 1,
        };

      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: customStyles.textPrimary,
          border: `1px solid ${isHovered ? customStyles.textSecondary : customStyles.textMuted}`,
          padding: '0.75rem 2rem',
          opacity: disabled ? 0.5 : 1,
        };

      case 'tab':
        return {
          color: isActive ? '#FFFFFF' : isHovered ? customStyles.textPrimary : customStyles.textSecondary,
          backgroundColor: isActive ? customStyles.primaryColor : 'transparent',
          padding: '0.5rem 1rem', // px-4 py-2
        };

      default:
        return {};
    }
  };

  // Merge all styles
  const buttonStyles = {
    ...baseStyles,
    ...getVariantStyles(),
    ...(fullWidth && { width: '100%' }),
  };

  // Loading spinner SVG
  const LoadingSpinner = () => (
    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={className}
      style={buttonStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          Przetwarzanie...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  );
};

export default Button;
