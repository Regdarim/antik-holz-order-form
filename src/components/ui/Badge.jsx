/**
 * ============================================================================
 * Badge Component
 * ============================================================================
 *
 * Reusable badge/label component following ANTIK-HOLZ design system (CLAUDE.md).
 *
 * Variants:
 * - primary: Dark background with white text (e.g., "NAJPOPULARNIEJSZY")
 * - info: Light gray background (e.g., "+10 zł/m²")
 * - success: Green indicator (e.g., "FSC® Certyfikat")
 * - number: Circular badge for step numbers
 *
 * @see ../../CLAUDE.md - Design system specifications
 * ============================================================================
 */

import React from 'react';
import { customStyles } from '../../config/theme';

const Badge = ({
  children,
  variant = 'primary', // 'primary' | 'info' | 'success' | 'number'
  size = 'default', // 'sm' | 'default' | 'lg'
  className = '',
  icon = null, // Optional icon element (e.g., green dot)
  ...props
}) => {
  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: customStyles.primaryColor,
          color: '#FFFFFF',
          fontSize: size === 'sm' ? '0.625rem' : '0.75rem', // 10px or 12px
          fontWeight: 700,
          padding: size === 'sm' ? '0.125rem 0.5rem' : '0.25rem 0.75rem',
        };

      case 'info':
        return {
          backgroundColor: customStyles.bgGray,
          color: customStyles.textSecondary,
          fontSize: '0.75rem',
          fontWeight: 500,
          padding: '0.125rem 0.5rem',
        };

      case 'success':
        return {
          backgroundColor: customStyles.bgGray,
          color: customStyles.textSecondary,
          fontSize: '0.75rem',
          fontWeight: 500,
          padding: '0.25rem 0.75rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        };

      case 'number':
        return {
          backgroundColor: customStyles.primaryColor,
          color: '#FFFFFF',
          fontSize: '0.875rem',
          fontWeight: 600,
          width: '2rem', // w-8
          height: '2rem', // h-8
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        };

      default:
        return {};
    }
  };

  const badgeStyles = {
    display: variant === 'number' ? 'inline-flex' : 'inline-block',
    borderRadius: variant === 'number' ? '50%' : '4px',
    ...getVariantStyles(),
  };

  return (
    <span className={className} style={badgeStyles} {...props}>
      {icon && icon}
      {children}
    </span>
  );
};

export default Badge;
