/**
 * ============================================================================
 * ColorSwatch Component
 * ============================================================================
 *
 * Reusable color swatch selector for product colors.
 * Displays color preview, name, number, and optional price badge.
 *
 * Features:
 * - Visual color preview (solid color or gradient)
 * - Selection state with checkmark
 * - Hover effects
 * - Extra cost badge
 *
 * @see ../../CLAUDE.md - Design system specifications
 * ============================================================================
 */

import React from 'react';
import { customStyles } from '../../config/theme';
import Badge from '../ui/Badge';

const ColorSwatch = ({
  color,
  isSelected = false,
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const swatchStyles = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 200ms',
    backgroundColor: isSelected ? customStyles.bgBeige : customStyles.bgGray,
    border: isSelected
      ? `2px solid ${customStyles.primaryColor}`
      : '1px solid #E5E5E5',
    boxShadow: isSelected
      ? '0 4px 12px rgba(0,0,0,0.08)'
      : isHovered
      ? '0 2px 8px rgba(0,0,0,0.06)'
      : 'none',
  };

  const colorPreviewStyles = {
    width: '5rem', // w-20
    height: '5rem', // h-20
    marginBottom: '0.75rem',
    background: color.gradient || color.color,
    border: '1px solid rgba(0,0,0,0.1)',
  };

  return (
    <button
      onClick={onClick}
      className={className}
      style={swatchStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Color preview */}
      <div style={colorPreviewStyles} />

      {/* Number */}
      <span
        className="text-xs mb-1"
        style={{ color: customStyles.textMuted }}
      >
        {color.id}.
      </span>

      {/* Name */}
      <span
        className="text-sm font-medium text-center max-w-[100px]"
        style={{ color: customStyles.textPrimary }}
      >
        {color.name}
      </span>

      {/* Extra cost badge */}
      {color.extraCost > 0 && (
        <Badge variant="info" className="mt-2">
          +{color.extraCost} zł/m²
        </Badge>
      )}

      {/* Selection checkmark */}
      {isSelected && (
        <div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: customStyles.primaryColor }}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default ColorSwatch;
