/**
 * ============================================================================
 * Card Component
 * ============================================================================
 *
 * Reusable card component following ANTIK-HOLZ design system (CLAUDE.md).
 *
 * Variants:
 * - default: White background with border
 * - selected: Beige background with primary border and shadow
 * - gray: Light gray background
 *
 * Features:
 * - Hover effects (subtle shadow on default cards)
 * - Click handler support
 * - Badge/label support (e.g., "NAJPOPULARNIEJSZY")
 * - Selection indicator (checkmark icon)
 *
 * @see ../../CLAUDE.md - Design system specifications
 * ============================================================================
 */

import React, { useState } from 'react';
import { customStyles } from '../../config/theme';

const Card = ({
  children,
  onClick,
  selected = false,
  variant = 'default', // 'default' | 'selected' | 'gray'
  badge = null,
  showCheckmark = false,
  className = '',
  padding = '1.5rem', // p-6
  hoverable = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Base styles
  const baseStyles = {
    position: 'relative',
    transition: 'all 200ms',
    cursor: onClick ? 'pointer' : 'default',
  };

  // Variant styles
  const getVariantStyles = () => {
    if (selected) {
      return {
        backgroundColor: customStyles.bgBeige,
        border: `2px solid ${customStyles.primaryColor}`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        padding: padding,
      };
    }

    switch (variant) {
      case 'gray':
        return {
          backgroundColor: isHovered && hoverable ? '#FFFFFF' : customStyles.bgGray,
          border: '1px solid #E5E5E5',
          boxShadow: isHovered && hoverable ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
          padding: padding,
        };

      case 'default':
      default:
        return {
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E5E5',
          boxShadow: isHovered && hoverable ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
          padding: padding,
        };
    }
  };

  // Merge all styles
  const cardStyles = {
    ...baseStyles,
    ...getVariantStyles(),
  };

  // Checkmark icon for selected state
  const CheckmarkIcon = () => (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center"
      style={{ backgroundColor: customStyles.primaryColor }}
    >
      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );

  return (
    <div
      className={className}
      style={cardStyles}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Badge (e.g., "NAJPOPULARNIEJSZY") */}
      {badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1"
          style={{
            backgroundColor: customStyles.primaryColor,
            color: '#FFFFFF',
          }}
        >
          {badge}
        </div>
      )}

      {/* Checkmark for selected state */}
      {selected && showCheckmark && (
        <div className="absolute top-4 right-4">
          <CheckmarkIcon />
        </div>
      )}

      {/* Card content */}
      {children}
    </div>
  );
};

export default Card;
