/**
 * ============================================================================
 * FAQItem Component
 * ============================================================================
 *
 * Reusable FAQ accordion item using HTML details/summary elements.
 * Displays question and expandable answer.
 *
 * Features:
 * - Collapsible accordion with chevron icon
 * - Smooth rotation animation for chevron
 * - Clean, minimal design
 *
 * @see ../../CLAUDE.md - Design system specifications
 * ============================================================================
 */

import React from 'react';
import { customStyles } from '../../config/theme';

const FAQItem = ({ question, answer, className = '' }) => {
  const containerStyles = {
    backgroundColor: customStyles.bgLight,
    border: '1px solid #E5E5E5',
  };

  return (
    <details
      className={`group overflow-hidden ${className}`}
      style={containerStyles}
    >
      {/* Question (summary) */}
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
        <span
          className="font-medium pr-4"
          style={{ color: customStyles.textPrimary }}
        >
          {question}
        </span>
        {/* Chevron icon that rotates when open */}
        <svg
          className="w-5 h-5 group-open:rotate-180 transition-transform"
          style={{ color: customStyles.textMuted }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>

      {/* Answer (content) */}
      <div className="px-5 pb-5" style={{ color: customStyles.textSecondary }}>
        {answer}
      </div>
    </details>
  );
};

export default FAQItem;
