/**
 * ============================================================================
 * FeatureCard Component
 * ============================================================================
 *
 * Reusable feature/benefit card with icon, title, and description.
 * Used for highlighting product features and benefits.
 *
 * Features:
 * - Icon support (emoji or SVG)
 * - Hover effect (border color change)
 * - Clean, minimal design
 *
 * @see ../../CLAUDE.md - Design system specifications
 * ============================================================================
 */

import React, { useState } from 'react';
import { customStyles } from '../../config/theme';

const FeatureCard = ({
  icon,
  title,
  description,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyles = {
    backgroundColor: customStyles.bgLight,
    border: `1px solid ${isHovered ? customStyles.textMuted : '#E5E5E5'}`,
    padding: '1.25rem', // p-5
    transition: 'border-color 200ms',
  };

  return (
    <div
      className={className}
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div className="text-3xl mb-3">{icon}</div>

      {/* Title */}
      <h4
        className="font-semibold mb-1 text-sm"
        style={{ color: customStyles.textPrimary }}
      >
        {title}
      </h4>

      {/* Description */}
      <p
        className="text-xs"
        style={{ color: customStyles.textSecondary }}
      >
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
