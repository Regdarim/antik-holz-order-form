/**
 * ============================================================================
 * SpecRow Component
 * ============================================================================
 *
 * Reusable specification row for technical specifications.
 * Displays label-value pairs with separator border.
 *
 * @see ../../CLAUDE.md - Design system specifications
 * ============================================================================
 */

import React from 'react';
import { customStyles } from '../../config/theme';

const SpecRow = ({ label, value, className = '' }) => {
  return (
    <div
      className={`flex justify-between items-center py-3 ${className}`}
      style={{ borderBottom: '1px solid #E5E5E5' }}
    >
      <span style={{ color: customStyles.textSecondary }}>{label}</span>
      <span
        className="font-medium text-right"
        style={{ color: customStyles.textPrimary }}
      >
        {value}
      </span>
    </div>
  );
};

export default SpecRow;
