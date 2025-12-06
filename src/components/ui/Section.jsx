/**
 * ============================================================================
 * Section Component
 * ============================================================================
 *
 * Reusable section wrapper with container, padding, and background options.
 * Follows ANTIK-HOLZ design system (CLAUDE.md).
 *
 * Features:
 * - Responsive container with max-width
 * - Configurable padding (vertical and horizontal)
 * - Background color options (white, gray, beige, gradient)
 * - Optional centered content
 *
 * @see ../../CLAUDE.md - Design system specifications
 * ============================================================================
 */

import React from 'react';
import { customStyles } from '../../config/theme';

const Section = ({
  children,
  bgColor = 'white', // 'white' | 'gray' | 'beige' | 'offWhite' | 'gradient' | 'transparent'
  maxWidth = '7xl', // 'full' | '7xl' | '6xl' | '5xl' | '4xl' | '2xl'
  paddingY = 'default', // 'none' | 'sm' | 'default' | 'lg' | 'xl'
  paddingX = true,
  className = '',
  centered = false,
  ...props
}) => {
  // Background color mapping
  const getBgColor = () => {
    switch (bgColor) {
      case 'white':
        return '#FFFFFF';
      case 'gray':
        return customStyles.bgGray;
      case 'beige':
        return customStyles.bgBeige;
      case 'offWhite':
        return customStyles.bgOffWhite;
      case 'gradient':
        return customStyles.heroGradient;
      case 'transparent':
        return 'transparent';
      default:
        return '#FFFFFF';
    }
  };

  // Padding Y mapping
  const getPaddingYClass = () => {
    switch (paddingY) {
      case 'none':
        return '';
      case 'sm':
        return 'py-8';
      case 'default':
        return 'py-12 lg:py-20';
      case 'lg':
        return 'py-16 lg:py-24';
      case 'xl':
        return 'py-20 lg:py-32';
      default:
        return 'py-12 lg:py-20';
    }
  };

  // Max width mapping
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'full':
        return '';
      case '7xl':
        return 'max-w-7xl';
      case '6xl':
        return 'max-w-6xl';
      case '5xl':
        return 'max-w-5xl';
      case '4xl':
        return 'max-w-4xl';
      case '2xl':
        return 'max-w-2xl';
      default:
        return 'max-w-7xl';
    }
  };

  const sectionStyles = {
    background: getBgColor(),
    position: 'relative',
  };

  const containerClasses = [
    maxWidth !== 'full' && getMaxWidthClass(),
    maxWidth !== 'full' && 'mx-auto',
    paddingX && 'px-4 sm:px-6 lg:px-8',
    getPaddingYClass(),
    centered && 'text-center',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={sectionStyles}
      {...props}
    >
      <div className={containerClasses}>{children}</div>
    </section>
  );
};

export default Section;
