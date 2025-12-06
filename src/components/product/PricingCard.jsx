/**
 * ============================================================================
 * PricingCard Component
 * ============================================================================
 *
 * Reusable pricing card for package/product selection.
 * Displays name, price, description, and optional "popular" badge.
 *
 * Features:
 * - Selected state with checkmark
 * - Hover effects
 * - Popular badge
 * - Flexible content (supports any pricing structure)
 *
 * @see ../../CLAUDE.md - Design system specifications
 * ============================================================================
 */

import React from 'react';
import { customStyles } from '../../config/theme';
import Card from '../ui/Card';

const PricingCard = ({
  name,
  price,
  priceUnit = 'zł/m²',
  range,
  description,
  isSelected = false,
  isPopular = false,
  onClick,
  className = '',
}) => {
  return (
    <Card
      selected={isSelected}
      variant="gray"
      badge={isPopular ? 'NAJPOPULARNIEJSZY' : null}
      showCheckmark={false}
      onClick={onClick}
      className={`text-left ${className}`}
      padding="1.5rem"
    >
      {/* Header: Name and Checkmark */}
      <div className="flex items-center justify-between mb-2">
        <h4
          className="text-xl font-bold"
          style={{ color: customStyles.textPrimary }}
        >
          {name}
        </h4>
        {isSelected && (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: customStyles.primaryColor }}
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Range/Subtitle */}
      {range && (
        <p
          className="text-sm mb-4"
          style={{ color: customStyles.textSecondary }}
        >
          {range}
        </p>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-3">
        <span
          className="text-3xl font-bold"
          style={{ color: customStyles.primaryColor }}
        >
          {price}
        </span>
        <span
          className="text-sm"
          style={{ color: customStyles.textMuted }}
        >
          {priceUnit}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p
          className="text-sm"
          style={{ color: customStyles.textSecondary }}
        >
          {description}
        </p>
      )}
    </Card>
  );
};

export default PricingCard;
