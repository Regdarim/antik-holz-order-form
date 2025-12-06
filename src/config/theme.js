/**
 * ============================================================================
 * ANTIK-HOLZ Design System
 * ============================================================================
 *
 * Centralna konfiguracja kolorów, gradientów i stylów zgodna z CLAUDE.md.
 * Wszystkie komponenty powinny importować stałe z tego pliku zamiast
 * hardkodować wartości kolorów.
 *
 * Użycie:
 * import { customStyles } from '@/config/theme';
 *
 * @see ../CLAUDE.md - Pełna specyfikacja design systemu
 * ============================================================================
 */

export const customStyles = {
  // Główne kolory brandowe - naturalne, stonowane
  primaryColor: '#2C2420',      // ciemny brąz (prawie czarny) - główny akcent
  primaryLight: '#8B7355',      // jasny brąz drewniany
  primaryDark: '#1A1512',       // bardzo ciemny brąz
  accentWood: '#A68B6C',        // naturalny odcień drewna

  // Tło - jasne, białe
  bgLight: '#FFFFFF',           // czysta biel
  bgOffWhite: '#FAFAF9',        // lekko złamana biel
  bgGray: '#F5F5F4',            // bardzo jasny szary
  bgBeige: '#FAF8F5',           // ciepła biel z beżowym odcieniem

  // Tekst
  textPrimary: '#1A1512',       // bardzo ciemny brąz (prawie czarny)
  textSecondary: '#57534E',     // średni szary
  textMuted: '#A8A29E',         // jasny szary

  // Gradienty - subtelne, naturalne
  heroGradient: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
  cardGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F4 100%)',
};

/**
 * Export jako default dla wygody importu
 */
export default customStyles;
