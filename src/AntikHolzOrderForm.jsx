/**
 * ============================================================================
 * ANTIK-HOLZ - Interaktywny Formularz Zamówień z Infografiką
 * ============================================================================
 * 
 * Autor: Claude AI dla ANTIK-HOLZ Sp. z o.o.
 * Wersja: 1.0.0
 * 
 * STRUKTURA KOMPONENTU:
 * 1. Stałe konfiguracyjne (kolory, pakiety, opcje)
 * 2. Główny komponent z zarządzaniem stanem
 * 3. Sekcje: Hero, Galeria kolorów, Cennik, Specyfikacja, Formularz, FAQ
 * 
 * UŻYTE BIBLIOTEKI:
 * - React (hooks: useState, useMemo, useEffect)
 * - Tailwind CSS (utility classes)
 * - Lucide React (ikony) - opcjonalnie
 * 
 * EDYCJA:
 * - Kolory i pakiety: edytuj obiekty COLORS i PACKAGES
 * - Style: modyfikuj klasy Tailwind lub obiekt customStyles
 * - Walidacja: funkcja validateForm()
 * ============================================================================
 */

import React, { useState, useMemo, useEffect } from 'react';

// ============================================================================
// SEKCJA 1: STAŁE KONFIGURACYJNE
// ============================================================================

/**
 * Dostępne kolory desek
 * @property {number} id - Numer koloru do zamówienia
 * @property {string} name - Nazwa wyświetlana
 * @property {string} color - Kod HEX koloru do podglądu
 * @property {string} gradient - Opcjonalny gradient CSS
 * @property {number} extraCost - Dodatkowy koszt za m² (0 jeśli brak)
 */
const COLORS = [
  { id: 1, name: 'Jasny brąz', color: '#C4A269', gradient: null, extraCost: 0 },
  { id: 2, name: 'Naturalny mix brąz', color: '#8B6914', gradient: null, extraCost: 0 },
  { id: 3, name: 'Szary / Popielaty', color: '#9CA3AF', gradient: null, extraCost: 0 },
  { id: 4, name: 'Mix brąz + szary', color: null, gradient: 'linear-gradient(135deg, #8B6914 0%, #9CA3AF 100%)', extraCost: 0 },
  { id: 5, name: 'Ciemny brąz', color: '#4A3728', gradient: null, extraCost: 10 },
];

/**
 * Pakiety długości desek
 * @property {string} id - Identyfikator pakietu
 * @property {string} name - Nazwa pakietu
 * @property {string} range - Zakres długości
 * @property {number} price - Cena za m²
 * @property {boolean} popular - Czy wyróżniony jako popularny
 * @property {string} description - Krótki opis zastosowania
 */
const PACKAGES = [
  { id: 'mini', name: 'MINI', range: '50-70 cm', price: 135, popular: false, description: 'Idealne do małych powierzchni' },
  { id: 'standard', name: 'STANDARD', range: '50-100 cm', price: 145, popular: false, description: 'Uniwersalne zastosowanie' },
  { id: 'standard-plus', name: 'STANDARD+', range: '50-150 cm', price: 155, popular: true, description: 'Najczęściej wybierany' },
  { id: 'komfort', name: 'KOMFORT', range: '100-150 cm', price: 165, popular: false, description: 'Dłuższe deski, mniej łączeń' },
  { id: 'komfort-plus', name: 'KOMFORT+', range: '100-190 cm', price: 175, popular: false, description: 'Premium dla wymagających' },
  { id: 'long', name: 'DŁUGIE', range: '190-400 cm', price: 285, popular: false, description: 'Maksymalna długość' },
];

/**
 * Dodatkowe opcje do zamówienia
 * Każda opcja dodaje 10 zł/m² do ceny końcowej
 */
const EXTRA_OPTIONS = [
  { id: 'tongue-groove', name: 'Pióro-wpust', price: 10, description: 'Łatwiejszy montaż, stabilne połączenie' },
  { id: 'fixed-width', name: 'Stała szerokość', price: 10, description: 'Jedna wybrana szerokość desek' },
  { id: 'fixed-length', name: 'Stała długość', price: 10, description: 'Jedna wybrana długość desek' },
  { id: 'impregnation', name: 'Dodatkowa impregnacja', price: 10, description: 'Zalecana na zewnątrz' },
];

/**
 * Koszt wysyłki kurierskiej
 */
const SHIPPING_COST_PER_PACKAGE = 25; // zł za paczkę (3m²)
const SQM_PER_PACKAGE = 3; // m² na paczkę

/**
 * Style niestandardowe (CSS-in-JS)
 * Dopasowane do designu antikholzprofis.com - jasne, minimalistyczne, naturalne
 */
const customStyles = {
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


// ============================================================================
// SEKCJA 2: GŁÓWNY KOMPONENT
// ============================================================================

const AntikHolzOrderForm = () => {
  // --------------------------------------------------------------------------
  // HELPER - STYLE DLA INPUTÓW
  // --------------------------------------------------------------------------

  const getInputStyle = (hasError = false) => ({
    backgroundColor: '#FFFFFF',
    borderColor: hasError ? '#EF4444' : '#D1D5DB',
    color: customStyles.textPrimary
  });

  const getLabelStyle = () => ({ color: customStyles.textPrimary });

  // --------------------------------------------------------------------------
  // STAN FORMULARZA
  // --------------------------------------------------------------------------
  
  /**
   * Stan danych formularza zamówienia
   * Inicjalizowany pustymi wartościami
   */
  const [formData, setFormData] = useState({
    // Dane produktu
    sqm: '',                    // Metraż w m²
    packageId: 'standard-plus', // Wybrany pakiet (domyślnie STANDARD+)
    colorId: 2,                 // Wybrany kolor (domyślnie naturalny mix)
    widthType: 'random',        // 'random' | 'fixed'
    fixedWidth: '',             // Stała szerokość (jeśli wybrana)
    
    // Opcje dodatkowe (tablica ID wybranych opcji)
    extras: [],
    
    // Dane kontaktowe
    address: '',
    postalCode: '',
    city: '',
    invoiceData: '',
    phone: '',
    email: '',
    notes: '',                  // Dodatkowe uwagi
  });

  /**
   * Stan błędów walidacji
   * Klucz = nazwa pola, wartość = komunikat błędu
   */
  const [errors, setErrors] = useState({});

  /**
   * Stan UI
   */
  const [activeSection, setActiveSection] = useState('info'); // 'info' | 'form'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // --------------------------------------------------------------------------
  // OBLICZENIA CENOWE (MEMOIZOWANE)
  // --------------------------------------------------------------------------

  /**
   * Oblicza całkowitą cenę zamówienia
   * Używa useMemo dla optymalizacji - przelicza tylko gdy zmienią się zależności
   */
  const calculatedPrice = useMemo(() => {
    const sqm = parseFloat(formData.sqm) || 0;
    
    // Znajdź wybrany pakiet
    const selectedPackage = PACKAGES.find(p => p.id === formData.packageId);
    const basePrice = selectedPackage ? selectedPackage.price : 0;
    
    // Znajdź wybrany kolor (może mieć dodatkowy koszt)
    const selectedColor = COLORS.find(c => c.id === formData.colorId);
    const colorExtra = selectedColor ? selectedColor.extraCost : 0;
    
    // Oblicz koszt opcji dodatkowych
    const extrasTotal = formData.extras.reduce((sum, extraId) => {
      const extra = EXTRA_OPTIONS.find(e => e.id === extraId);
      return sum + (extra ? extra.price : 0);
    }, 0);
    
    // Cena za m² (podstawa + kolor + opcje)
    const pricePerSqm = basePrice + colorExtra + extrasTotal;
    
    // Całkowita cena produktu
    const productTotal = sqm * pricePerSqm;
    
    // Oblicz koszt wysyłki (zaokrąglij w górę liczbę paczek)
    const packagesNeeded = Math.ceil(sqm / SQM_PER_PACKAGE);
    const shippingTotal = packagesNeeded * SHIPPING_COST_PER_PACKAGE;
    
    // Zwróć obiekt z wszystkimi wartościami
    return {
      sqm,
      pricePerSqm,
      productTotal,
      packagesNeeded,
      shippingTotal,
      grandTotal: productTotal + shippingTotal,
      // Dodatkowe info do wyświetlenia
      breakdown: {
        base: basePrice,
        color: colorExtra,
        extras: extrasTotal,
      }
    };
  }, [formData.sqm, formData.packageId, formData.colorId, formData.extras]);

  // --------------------------------------------------------------------------
  // HANDLERY FORMULARZA
  // --------------------------------------------------------------------------

  /**
   * Uniwersalny handler dla pól tekstowych
   * @param {string} field - Nazwa pola w stanie
   */
  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Usuń błąd dla tego pola przy edycji
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  /**
   * Handler dla wyboru pakietu
   */
  const handlePackageSelect = (packageId) => {
    setFormData(prev => ({ ...prev, packageId }));
  };

  /**
   * Handler dla wyboru koloru
   */
  const handleColorSelect = (colorId) => {
    setFormData(prev => ({ ...prev, colorId }));
  };

  /**
   * Handler dla checkboxów opcji dodatkowych
   */
  const handleExtraToggle = (extraId) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)  // Usuń jeśli jest
        : [...prev.extras, extraId]                  // Dodaj jeśli nie ma
    }));
  };

  // --------------------------------------------------------------------------
  // WALIDACJA
  // --------------------------------------------------------------------------

  /**
   * Waliduje formularz przed wysłaniem
   * @returns {boolean} true jeśli formularz jest poprawny
   */
  const validateForm = () => {
    const newErrors = {};

    // Walidacja metrażu
    if (!formData.sqm || parseFloat(formData.sqm) <= 0) {
      newErrors.sqm = 'Podaj metraż większy od 0';
    }

    // Walidacja danych kontaktowych
    if (!formData.address.trim()) {
      newErrors.address = 'Podaj adres dostawy';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Podaj kod pocztowy';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Podaj miasto';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Podaj numer telefonu';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Podaj adres email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Podaj poprawny adres email';
    }

    // Walidacja stałej szerokości (jeśli wybrana)
    if (formData.widthType === 'fixed' && !formData.fixedWidth) {
      newErrors.fixedWidth = 'Podaj stałą szerokość';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --------------------------------------------------------------------------
  // WYSYŁANIE FORMULARZA
  // --------------------------------------------------------------------------

  /**
   * Handler wysłania formularza
   * Generuje podsumowanie zamówienia do skopiowania/wysłania
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Przewiń do pierwszego błędu
      const firstError = document.querySelector('.error-field');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    // Symulacja wysyłki (w rzeczywistości tu byłby API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  /**
   * Generuje tekst podsumowania zamówienia
   * Do skopiowania lub wysłania mailem
   */
  const generateOrderSummary = () => {
    const pkg = PACKAGES.find(p => p.id === formData.packageId);
    const color = COLORS.find(c => c.id === formData.colorId);
    const selectedExtras = EXTRA_OPTIONS.filter(e => formData.extras.includes(e.id));

    return `
ZAMÓWIENIE - ANTIK-HOLZ
========================

PRODUKT:
Metraż: ${formData.sqm} m²
Pakiet: ${pkg?.name} (${pkg?.range}) - ${pkg?.price} zł/m²
Kolor: ${color?.id}. ${color?.name}${color?.extraCost ? ` (+${color?.extraCost} zł/m²)` : ''}
Szerokość: ${formData.widthType === 'random' ? 'Losowa 8-14 cm' : `Stała: ${formData.fixedWidth} cm`}
${selectedExtras.length > 0 ? `Opcje: ${selectedExtras.map(e => e.name).join(', ')}` : ''}

CENA:
${calculatedPrice.pricePerSqm} zł/m² × ${calculatedPrice.sqm} m² = ${calculatedPrice.productTotal.toFixed(2)} zł
Wysyłka (${calculatedPrice.packagesNeeded} paczek): ${calculatedPrice.shippingTotal} zł
RAZEM: ${calculatedPrice.grandTotal.toFixed(2)} zł

DOSTAWA:
${formData.address}
${formData.postalCode} ${formData.city}

KONTAKT:
Tel: ${formData.phone}
Email: ${formData.email}
${formData.invoiceData ? `\nDANE DO FAKTURY:\n${formData.invoiceData}` : ''}
${formData.notes ? `\nUWAGI:\n${formData.notes}` : ''}
    `.trim();
  };

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  return (
    <div
      className="min-h-screen"
      style={{
        background: customStyles.bgOffWhite,
        fontFamily: "'Inter', -apple-system, system-ui, sans-serif"
      }}
    >
      {/* ================================================================== */}
      {/* HEADER / NAWIGACJA */}
      {/* ================================================================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded flex items-center justify-center"
                style={{ backgroundColor: customStyles.primaryColor }}
              >
                <span className="text-white text-lg font-bold">A</span>
              </div>
              <div>
                <h1
                  className="font-semibold text-lg tracking-tight"
                  style={{ color: customStyles.textPrimary }}
                >
                  ANTIK-HOLZ
                </h1>
                <p className="text-xs" style={{ color: customStyles.textMuted }}>
                  od 2011 roku
                </p>
              </div>
            </div>

            {/* Nawigacja sekcji */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'info', label: 'Informacje' },
                { id: 'form', label: 'Zamów teraz' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className="px-4 py-2 text-sm font-medium transition-all duration-200"
                  style={{
                    color: activeSection === tab.id ? '#FFFFFF' : customStyles.textSecondary,
                    backgroundColor: activeSection === tab.id ? customStyles.primaryColor : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== tab.id) {
                      e.currentTarget.style.color = customStyles.textPrimary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== tab.id) {
                      e.currentTarget.style.color = customStyles.textSecondary;
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <button
              onClick={() => setActiveSection('form')}
              className="hidden sm:flex items-center gap-2 px-5 py-2 text-sm font-medium transition-all duration-200 hover:opacity-80"
              style={{
                backgroundColor: customStyles.primaryColor,
                color: '#FFFFFF'
              }}
            >
              <span>Złóż zamówienie</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Tekst Hero */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 mb-6"
                style={{
                  backgroundColor: customStyles.bgGray,
                  borderRadius: '4px'
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span
                  className="text-xs font-medium"
                  style={{ color: customStyles.textSecondary }}
                >
                  FSC® Certyfikat • 100% Recykling
                </span>
              </div>

              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: customStyles.textPrimary }}
              >
                Stare Deski
                <br />
                Rustykalne
                <br />
                ze Stodoły
              </h2>

              <p
                className="text-lg mb-8 max-w-lg mx-auto lg:mx-0"
                style={{ color: customStyles.textSecondary }}
              >
                Oryginalne drewno z odzysku. Ponad 5 milionów m² przetworzonego polskiego dziedzictwa.
                Idealne na ścianę, sufit, podłogę i elewację.
              </p>

              {/* Statystyki */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { value: '15+', label: 'Lat doświadczenia' },
                  { value: '1000+', label: 'Realizacji w EU' },
                  { value: '5M+', label: 'm² przetworzonego drewna' },
                ].map(stat => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ color: customStyles.primaryColor }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs sm:text-sm"
                      style={{ color: customStyles.textMuted }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setActiveSection('form')}
                  className="px-8 py-3 font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: customStyles.primaryColor,
                    color: '#FFFFFF'
                  }}
                >
                  Zamów teraz
                </button>
                <a
                  href="https://instagram.com/antik_holz_old_wood_poland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    border: `1px solid ${customStyles.textMuted}`,
                    color: customStyles.textPrimary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = customStyles.textSecondary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = customStyles.textMuted;
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                  Zobacz realizacje
                </a>
              </div>
            </div>

            {/* Wizualizacja produktu */}
            <div className="relative">
              <div
                className="aspect-square overflow-hidden shadow-lg"
                style={{
                  background: customStyles.bgGray,
                  border: `1px solid #E5E5E5`
                }}
              >
                {/* Symulacja wzoru drewna */}
                <div className="absolute inset-0 flex flex-col gap-1 p-4">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1"
                      style={{
                        background: `linear-gradient(90deg,
                          ${COLORS[formData.colorId - 1]?.color || '#8B6914'} 0%,
                          ${i % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)'} 50%,
                          ${COLORS[formData.colorId - 1]?.color || '#8B6914'} 100%)`,
                        opacity: 0.7 + (i % 3) * 0.1
                      }}
                    />
                  ))}
                </div>

                {/* Overlay z info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">Wybrany kolor:</span>
                    <span className="text-white font-medium">
                      {COLORS.find(c => c.id === formData.colorId)?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -top-3 -right-3 text-xs font-bold px-4 py-2 shadow-md"
                style={{
                  backgroundColor: customStyles.primaryColor,
                  color: '#FFFFFF'
                }}
              >
                od 135 zł/m²
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SEKCJA KOLORÓW */}
      {/* ================================================================== */}
      <section className="py-16" style={{ backgroundColor: customStyles.bgGray }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: customStyles.textPrimary }}
            >
              Wybierz kolorystykę
            </h3>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: customStyles.textSecondary }}
            >
              Każda deska jest unikatowa. Kolory pochodzą z naturalnego starzenia drewna przez dekady.
            </p>
          </div>

          {/* Grid kolorów */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {COLORS.map(color => {
              const isSelected = formData.colorId === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => handleColorSelect(color.id)}
                  className="group relative flex flex-col items-center p-5 transition-all duration-200 bg-white"
                  style={{
                    border: isSelected
                      ? `2px solid ${customStyles.primaryColor}`
                      : '1px solid #E5E5E5',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {/* Próbka koloru */}
                  <div
                    className="w-20 h-20 mb-3"
                    style={{
                      background: color.gradient || color.color,
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}
                  />

                  {/* Numer i nazwa */}
                  <span
                    className="text-xs mb-1"
                    style={{ color: customStyles.textMuted }}
                  >
                    {color.id}.
                  </span>
                  <span
                    className="text-sm font-medium text-center max-w-[100px]"
                    style={{ color: customStyles.textPrimary }}
                  >
                    {color.name}
                  </span>

                  {/* Badge ceny (jeśli dopłata) */}
                  {color.extraCost > 0 && (
                    <span
                      className="mt-2 text-xs px-2 py-0.5"
                      style={{
                        backgroundColor: customStyles.bgGray,
                        color: customStyles.textSecondary
                      }}
                    >
                      +{color.extraCost} zł/m²
                    </span>
                  )}

                  {/* Checkmark */}
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
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SEKCJA CENNIKA PAKIETÓW */}
      {/* ================================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: customStyles.textPrimary }}
            >
              Pakiety długości
            </h3>
            <p style={{ color: customStyles.textSecondary }}>
              Cena za 1 m² • Losowe długości z podanych zakresów
            </p>
          </div>

          {/* Grid pakietów */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PACKAGES.map(pkg => {
              const isSelected = formData.packageId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg.id)}
                  className="relative text-left p-6 transition-all duration-200"
                  style={{
                    backgroundColor: isSelected ? customStyles.bgBeige : customStyles.bgGray,
                    border: isSelected
                      ? `2px solid ${customStyles.primaryColor}`
                      : '1px solid #E5E5E5',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = customStyles.bgGray;
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {/* Badge popularny */}
                  {pkg.popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1"
                      style={{
                        backgroundColor: customStyles.primaryColor,
                        color: '#FFFFFF'
                      }}
                    >
                      NAJPOPULARNIEJSZY
                    </div>
                  )}

                  {/* Nazwa pakietu */}
                  <div className="flex items-center justify-between mb-2">
                    <h4
                      className="text-xl font-bold"
                      style={{ color: customStyles.textPrimary }}
                    >
                      {pkg.name}
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

                  {/* Zakres długości */}
                  <p
                    className="text-sm mb-4"
                    style={{ color: customStyles.textSecondary }}
                  >
                    {pkg.range}
                  </p>

                  {/* Cena */}
                  <div className="flex items-baseline gap-1 mb-3">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: customStyles.primaryColor }}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: customStyles.textMuted }}
                    >
                      zł/m²
                    </span>
                  </div>

                  {/* Opis */}
                  <p
                    className="text-sm"
                    style={{ color: customStyles.textSecondary }}
                  >
                    {pkg.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Info o negocjacjach */}
          <p
            className="text-center text-sm mt-8"
            style={{ color: customStyles.textMuted }}
          >
            Możliwość negocjacji przy zamówieniach powyżej 50 m²
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SPECYFIKACJA TECHNICZNA */}
      {/* ================================================================== */}
      <section className="py-16" style={{ backgroundColor: customStyles.bgGray }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Specyfikacja */}
            <div
              className="p-8"
              style={{
                backgroundColor: customStyles.bgLight,
                border: '1px solid #E5E5E5'
              }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: customStyles.textPrimary }}
              >
                Specyfikacja techniczna
              </h3>

              <div className="space-y-4">
                {[
                  { label: 'Szerokość', value: '8–14 cm (losowo lub stała)' },
                  { label: 'Grubość', value: '20 mm (inne na zamówienie)' },
                  { label: 'Drewno', value: 'Iglaste (świerk / jodła / sosna)' },
                  { label: 'Wykończenie', value: 'Sztorcowane + szczotkowane' },
                  { label: 'Obróbka', value: 'Termiczna – 100% bez szkodników' },
                  { label: 'Certyfikat', value: 'FSC® SGSCH-COC-070438' },
                ].map(spec => (
                  <div
                    key={spec.label}
                    className="flex justify-between items-center py-3"
                    style={{ borderBottom: '1px solid #E5E5E5' }}
                  >
                    <span style={{ color: customStyles.textSecondary }}>{spec.label}</span>
                    <span
                      className="font-medium text-right"
                      style={{ color: customStyles.textPrimary }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cechy i zalety */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🌡️', title: 'Obróbka termiczna', desc: '100% bez insektów i grzybów' },
                { icon: '♻️', title: '100% Recykling', desc: 'Prawdziwe stare drewno' },
                { icon: '✓', title: 'FSC® Certyfikat', desc: 'Legalne źródło drewna' },
                { icon: '🔊', title: 'Akustyka', desc: 'Tłumienie dźwięków' },
                { icon: '🏠', title: 'Wnętrza', desc: 'Salon, sypialnia, kuchnia' },
                { icon: '🏢', title: 'Komercja', desc: 'Hotele, restauracje, SPA' },
              ].map(feature => (
                <div
                  key={feature.title}
                  className="p-5 transition-colors"
                  style={{
                    backgroundColor: customStyles.bgLight,
                    border: '1px solid #E5E5E5'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = customStyles.textMuted;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E5E5';
                  }}
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4
                    className="font-medium mb-1"
                    style={{ color: customStyles.textPrimary }}
                  >
                    {feature.title}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: customStyles.textSecondary }}
                  >
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FORMULARZ ZAMÓWIENIA */}
      {/* ================================================================== */}
      <section id="order-form" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: customStyles.textPrimary }}
            >
              Złóż zamówienie
            </h3>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: customStyles.textSecondary }}
            >
              Wypełnij formularz lub skopiuj dane i wyślij na{' '}
              <a
                href="mailto:biuro@antikholzprofis.com"
                style={{ color: customStyles.primaryColor }}
                className="hover:underline"
              >
                biuro@antikholzprofis.com
              </a>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formularz - 2 kolumny */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* -------------------------------------------------------- */}
                {/* SEKCJA: Konfiguracja produktu */}
                {/* -------------------------------------------------------- */}
                <div
                  className="p-6"
                  style={{
                    backgroundColor: customStyles.bgGray,
                    border: '1px solid #E5E5E5'
                  }}
                >
                  <h4
                    className="text-lg font-semibold mb-6 flex items-center gap-2"
                    style={{ color: customStyles.textPrimary }}
                  >
                    <span
                      className="w-8 h-8 flex items-center justify-center text-sm text-white"
                      style={{ backgroundColor: customStyles.primaryColor }}
                    >
                      1
                    </span>
                    Konfiguracja produktu
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Metraż */}
                    <div className={errors.sqm ? 'error-field' : ''}>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: customStyles.textPrimary }}
                      >
                        Metraż (m²) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        value={formData.sqm}
                        onChange={handleInputChange('sqm')}
                        placeholder="np. 15"
                        className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: errors.sqm ? '#EF4444' : '#D1D5DB',
                          color: customStyles.textPrimary
                        }}
                      />
                      {errors.sqm && <p className="mt-1 text-red-500 text-sm">{errors.sqm}</p>}
                      <p className="mt-1 text-xs" style={{ color: customStyles.textMuted }}>
                        Zalecamy +10% zapasu na docinki
                      </p>
                    </div>

                    {/* Szerokość */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: customStyles.textPrimary }}
                      >
                        Szerokość desek
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, widthType: 'random', fixedWidth: '' }))}
                          className="flex-1 px-4 py-3 text-sm font-medium transition-all"
                          style={{
                            backgroundColor: formData.widthType === 'random' ? customStyles.primaryColor : '#FFFFFF',
                            color: formData.widthType === 'random' ? '#FFFFFF' : customStyles.textSecondary,
                            border: `1px solid ${formData.widthType === 'random' ? customStyles.primaryColor : '#D1D5DB'}`
                          }}
                        >
                          Losowa 8-14 cm
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, widthType: 'fixed' }))}
                          className="flex-1 px-4 py-3 text-sm font-medium transition-all"
                          style={{
                            backgroundColor: formData.widthType === 'fixed' ? customStyles.primaryColor : '#FFFFFF',
                            color: formData.widthType === 'fixed' ? '#FFFFFF' : customStyles.textSecondary,
                            border: `1px solid ${formData.widthType === 'fixed' ? customStyles.primaryColor : '#D1D5DB'}`
                          }}
                        >
                          Stała (+10 zł)
                        </button>
                      </div>

                      {/* Input dla stałej szerokości */}
                      {formData.widthType === 'fixed' && (
                        <input
                          type="number"
                          min="8"
                          max="14"
                          value={formData.fixedWidth}
                          onChange={handleInputChange('fixedWidth')}
                          placeholder="Podaj szerokość (8-14 cm)"
                          className="w-full mt-2 px-4 py-3 border focus:outline-none focus:ring-2 transition-all"
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: errors.fixedWidth ? '#EF4444' : '#D1D5DB',
                            color: customStyles.textPrimary
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Opcje dodatkowe */}
                  <div className="mt-6">
                    <label
                      className="block text-sm font-medium mb-3"
                      style={{ color: customStyles.textPrimary }}
                    >
                      Opcje dodatkowe (+10 zł/m² każda)
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {EXTRA_OPTIONS.map(option => {
                        const isSelected = formData.extras.includes(option.id);
                        return (
                          <label
                            key={option.id}
                            className="flex items-start gap-3 p-4 cursor-pointer transition-all"
                            style={{
                              backgroundColor: isSelected ? customStyles.bgBeige : '#FFFFFF',
                              border: `1px solid ${isSelected ? customStyles.primaryColor : '#E5E5E5'}`
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleExtraToggle(option.id)}
                              className="mt-1 w-4 h-4"
                              style={{ accentColor: customStyles.primaryColor }}
                            />
                            <div>
                              <span
                                className="text-sm font-medium"
                                style={{ color: customStyles.textPrimary }}
                              >
                                {option.name}
                              </span>
                              <p
                                className="text-xs mt-0.5"
                                style={{ color: customStyles.textSecondary }}
                              >
                                {option.description}
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* -------------------------------------------------------- */}
                {/* SEKCJA: Dane dostawy */}
                {/* -------------------------------------------------------- */}
                <div
                  className="p-6"
                  style={{
                    backgroundColor: customStyles.bgGray,
                    border: '1px solid #E5E5E5'
                  }}
                >
                  <h4
                    className="text-lg font-semibold mb-6 flex items-center gap-2"
                    style={{ color: customStyles.textPrimary }}
                  >
                    <span
                      className="w-8 h-8 flex items-center justify-center text-sm text-white"
                      style={{ backgroundColor: customStyles.primaryColor }}
                    >
                      2
                    </span>
                    Dane dostawy
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Adres */}
                    <div className={`sm:col-span-2 ${errors.address ? 'error-field' : ''}`}>
                      <label className="block text-sm font-medium mb-2" style={getLabelStyle()}>
                        Adres dostawy *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange('address')}
                        placeholder="ul. Przykładowa 123"
                        className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all"
                        style={getInputStyle(!!errors.address)}
                      />
                      {errors.address && <p className="mt-1 text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    {/* Kod pocztowy */}
                    <div className={errors.postalCode ? 'error-field' : ''}>
                      <label className="block text-sm font-medium mb-2" style={getLabelStyle()}>
                        Kod pocztowy *
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={handleInputChange('postalCode')}
                        placeholder="00-000"
                        className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all"
                        style={getInputStyle(!!errors.postalCode)}
                      />
                      {errors.postalCode && <p className="mt-1 text-red-500 text-sm">{errors.postalCode}</p>}
                    </div>

                    {/* Miasto */}
                    <div className={errors.city ? 'error-field' : ''}>
                      <label className="block text-sm font-medium mb-2" style={getLabelStyle()}>
                        Miasto *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange('city')}
                        placeholder="Warszawa"
                        className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all"
                        style={getInputStyle(!!errors.city)}
                      />
                      {errors.city && <p className="mt-1 text-red-500 text-sm">{errors.city}</p>}
                    </div>
                  </div>
                </div>

                {/* -------------------------------------------------------- */}
                {/* SEKCJA: Dane kontaktowe */}
                {/* -------------------------------------------------------- */}
                <div
                  className="p-6"
                  style={{
                    backgroundColor: customStyles.bgGray,
                    border: '1px solid #E5E5E5'
                  }}
                >
                  <h4
                    className="text-lg font-semibold mb-6 flex items-center gap-2"
                    style={{ color: customStyles.textPrimary }}
                  >
                    <span
                      className="w-8 h-8 flex items-center justify-center text-sm text-white"
                      style={{ backgroundColor: customStyles.primaryColor }}
                    >
                      3
                    </span>
                    Dane kontaktowe
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Telefon */}
                    <div className={errors.phone ? 'error-field' : ''}>
                      <label className="block text-sm font-medium mb-2" style={getLabelStyle()}>
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                        placeholder="+48 123 456 789"
                        className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all"
                        style={getInputStyle(!!errors.phone)}
                      />
                      {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div className={errors.email ? 'error-field' : ''}>
                      <label className="block text-sm font-medium mb-2" style={getLabelStyle()}>
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        placeholder="twoj@email.pl"
                        className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all"
                        style={getInputStyle(!!errors.email)}
                      />
                      {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Dane do faktury */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-2" style={getLabelStyle()}>
                        Dane do faktury (opcjonalne)
                      </label>
                      <textarea
                        value={formData.invoiceData}
                        onChange={handleInputChange('invoiceData')}
                        placeholder="Nazwa firmy, NIP, adres..."
                        rows={3}
                        className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all resize-none"
                        style={getInputStyle()}
                      />
                    </div>

                    {/* Uwagi */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-2" style={getLabelStyle()}>
                        Dodatkowe uwagi
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={handleInputChange('notes')}
                        placeholder="Informacje o projekcie, preferencje, pytania..."
                        rows={3}
                        className="w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all resize-none"
                        style={getInputStyle()}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* SIDEBAR: Podsumowanie zamówienia */}
            {/* ------------------------------------------------------------ */}
            <div className="lg:col-span-1">
              <div
                className="sticky top-24 p-6 shadow-lg"
                style={{
                  backgroundColor: customStyles.bgGray,
                  border: '1px solid #E5E5E5'
                }}
              >
                <h4
                  className="text-lg font-semibold mb-6"
                  style={{ color: customStyles.textPrimary }}
                >
                  Podsumowanie
                </h4>

                {/* Wybrany pakiet i kolor */}
                <div className="space-y-4 mb-6 pb-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
                  <div className="flex justify-between">
                    <span style={{ color: customStyles.textSecondary }}>Pakiet</span>
                    <span className="font-medium" style={{ color: customStyles.textPrimary }}>
                      {PACKAGES.find(p => p.id === formData.packageId)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: customStyles.textSecondary }}>Kolor</span>
                    <span className="font-medium" style={{ color: customStyles.textPrimary }}>
                      {COLORS.find(c => c.id === formData.colorId)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: customStyles.textSecondary }}>Szerokość</span>
                    <span className="font-medium" style={{ color: customStyles.textPrimary }}>
                      {formData.widthType === 'random' ? '8-14 cm' : `${formData.fixedWidth || '?'} cm`}
                    </span>
                  </div>
                  {formData.extras.length > 0 && (
                    <div className="flex justify-between">
                      <span style={{ color: customStyles.textSecondary }}>Opcje</span>
                      <span
                        className="font-medium text-right text-sm"
                        style={{ color: customStyles.textPrimary }}
                      >
                        {formData.extras.map(id =>
                          EXTRA_OPTIONS.find(e => e.id === id)?.name
                        ).join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Kalkulacja ceny */}
                <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: customStyles.textSecondary }}>Cena bazowa</span>
                    <span style={{ color: customStyles.textPrimary }}>
                      {calculatedPrice.breakdown.base} zł/m²
                    </span>
                  </div>
                  {calculatedPrice.breakdown.color > 0 && (
                    <div className="flex justify-between text-sm">
                      <span style={{ color: customStyles.textSecondary }}>+ Kolor</span>
                      <span style={{ color: customStyles.textPrimary }}>
                        +{calculatedPrice.breakdown.color} zł/m²
                      </span>
                    </div>
                  )}
                  {calculatedPrice.breakdown.extras > 0 && (
                    <div className="flex justify-between text-sm">
                      <span style={{ color: customStyles.textSecondary }}>+ Opcje</span>
                      <span style={{ color: customStyles.textPrimary }}>
                        +{calculatedPrice.breakdown.extras} zł/m²
                      </span>
                    </div>
                  )}
                  <div
                    className="flex justify-between font-medium pt-2"
                    style={{ borderTop: '1px solid #E5E5E5' }}
                  >
                    <span style={{ color: customStyles.textPrimary }}>Cena za m²</span>
                    <span style={{ color: customStyles.primaryColor }}>
                      {calculatedPrice.pricePerSqm} zł
                    </span>
                  </div>
                </div>

                {/* Podsumowanie kwot */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span style={{ color: customStyles.textSecondary }}>
                      Produkt ({calculatedPrice.sqm || 0} m²)
                    </span>
                    <span style={{ color: customStyles.textPrimary }}>
                      {calculatedPrice.productTotal.toFixed(2)} zł
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: customStyles.textSecondary }}>
                      Wysyłka ({calculatedPrice.packagesNeeded} paczek)
                    </span>
                    <span style={{ color: customStyles.textPrimary }}>
                      {calculatedPrice.shippingTotal} zł
                    </span>
                  </div>
                  <div
                    className="flex justify-between text-xl font-bold pt-3"
                    style={{ borderTop: '1px solid #E5E5E5' }}
                  >
                    <span style={{ color: customStyles.textPrimary }}>RAZEM</span>
                    <span style={{ color: customStyles.primaryColor }}>
                      {calculatedPrice.grandTotal.toFixed(2)} zł
                    </span>
                  </div>
                </div>

                {/* Przyciski akcji */}
                <div className="space-y-3">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.sqm}
                    className="w-full py-4 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: (isSubmitting || !formData.sqm) ? '#D1D5DB' : customStyles.primaryColor,
                      opacity: (isSubmitting || !formData.sqm) ? 0.6 : 1,
                      cursor: (isSubmitting || !formData.sqm) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Przetwarzanie...
                      </>
                    ) : (
                      <>
                        Wyślij zamówienie
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      const summary = generateOrderSummary();
                      navigator.clipboard.writeText(summary);
                      alert('Skopiowano do schowka! Możesz teraz wysłać to mailem.');
                    }}
                    disabled={!formData.sqm}
                    className="w-full py-3 border font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{
                      borderColor: customStyles.textMuted,
                      color: customStyles.textPrimary
                    }}
                    onMouseEnter={(e) => {
                      if (formData.sqm) {
                        e.currentTarget.style.borderColor = customStyles.textSecondary;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = customStyles.textMuted;
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Kopiuj do schowka
                  </button>
                </div>

                {/* Info o wysyłce */}
                <div
                  className="mt-6 p-4 text-xs"
                  style={{
                    backgroundColor: customStyles.bgBeige,
                    border: '1px solid #E5E5E5'
                  }}
                >
                  <p className="flex items-center gap-2 mb-2" style={{ color: customStyles.textSecondary }}>
                    <span>📦</span> Wysyłka 1-3 dni robocze
                  </p>
                  <p className="flex items-center gap-2" style={{ color: customStyles.textSecondary }}>
                    <span>💳</span> Płatność po akceptacji wyceny
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* MODAL SUKCESU */}
      {/* ================================================================== */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className="p-8 max-w-md w-full text-center shadow-2xl"
            style={{
              backgroundColor: customStyles.bgLight,
              border: '1px solid #E5E5E5'
            }}
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: customStyles.textPrimary }}>
              Zamówienie wysłane!
            </h3>
            <p className="mb-6" style={{ color: customStyles.textSecondary }}>
              Otrzymasz wycenę na podany adres email w ciągu 24 godzin.
              W razie pytań dzwoń: +48 XXX XXX XXX
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-6 py-3 text-white font-medium transition-colors"
              style={{ backgroundColor: customStyles.primaryColor }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              Zamknij
            </button>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* FAQ */}
      {/* ================================================================== */}
      <section className="py-16" style={{ backgroundColor: customStyles.bgGray }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3
            className="text-3xl font-bold text-center mb-12"
            style={{ color: customStyles.textPrimary }}
          >
            Najczęściej zadawane pytania
          </h3>

          <div className="space-y-4">
            {[
              { q: 'Czy to prawdziwe stare drewno?', a: 'Tak, 100% oryginalne drewno z odzysku z polskich stodół i budynków gospodarczych. Gwarantuje to certyfikat FSC®.' },
              { q: 'Czy drewno jest bezpieczne (bez szkodników)?', a: 'Tak, każda partia przechodzi obróbkę termiczną w komorach wysokotemperaturowych, która eliminuje insekty i grzyby.' },
              { q: 'Czy mogę wybrać stałą długość lub szerokość?', a: 'Tak, oferujemy opcję stałej szerokości lub długości za dodatkową opłatą 10 zł/m². Skontaktuj się dla indywidualnej wyceny.' },
              { q: 'Jak długo trwa dostawa?', a: 'Standardowo 1-3 dni robocze dla zamówień do 20m². Większe projekty omawiamy indywidualnie.' },
              { q: 'Czy deski nadają się na sufit?', a: 'Tak, nasze deski są idealne zarówno na ściany, jak i sufity. Zalecamy montaż na łaty lub klej (nie wodny).' },
              { q: 'Czy kolory są identyczne jak na zdjęciach?', a: 'Każda deska jest unikatowa. Możliwe są naturalne różnice w odcieniach – to cecha prawdziwego starego drewna.' },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group overflow-hidden"
                style={{
                  backgroundColor: customStyles.bgLight,
                  border: '1px solid #E5E5E5'
                }}
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-medium pr-4" style={{ color: customStyles.textPrimary }}>
                    {faq.q}
                  </span>
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
                <div className="px-5 pb-5" style={{ color: customStyles.textSecondary }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER */}
      {/* ================================================================== */}
      <footer className="py-12 bg-white" style={{ borderTop: '1px solid #E5E5E5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo i opis */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ backgroundColor: customStyles.primaryColor }}
                >
                  <span className="text-white text-lg font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: customStyles.textPrimary }}>
                    ANTIK-HOLZ
                  </h4>
                  <p className="text-xs" style={{ color: customStyles.textMuted }}>
                    Sp. z o.o.
                  </p>
                </div>
              </div>
              <p className="text-sm" style={{ color: customStyles.textSecondary }}>
                Od 2011 roku przetwarzamy polskie dziedzictwo w piękne wnętrza.
                Ponad 5 milionów m² starego drewna otrzymało drugie życie.
              </p>
            </div>

            {/* Kontakt */}
            <div>
              <h5 className="font-medium mb-4" style={{ color: customStyles.textPrimary }}>
                Kontakt
              </h5>
              <ul className="space-y-2 text-sm" style={{ color: customStyles.textSecondary }}>
                <li>📧 biuro@antikholzprofis.com</li>
                <li>📞 +48 XXX XXX XXX</li>
                <li>📍 Polska</li>
              </ul>
            </div>

            {/* Produkty */}
            <div>
              <h5 className="font-medium mb-4" style={{ color: customStyles.textPrimary }}>
                Produkty
              </h5>
              <ul className="space-y-2 text-sm" style={{ color: customStyles.textSecondary }}>
                <li>Deski rustykalne</li>
                <li>Belki i bale</li>
                <li>Panele ścienne</li>
                <li>Panele 3D</li>
                <li>Meble na wymiar</li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h5 className="font-medium mb-4" style={{ color: customStyles.textPrimary }}>
                Obserwuj nas
              </h5>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/antik_holz_old_wood_poland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: customStyles.bgGray,
                    color: customStyles.textSecondary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = customStyles.bgBeige;
                    e.currentTarget.style.color = customStyles.textPrimary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = customStyles.bgGray;
                    e.currentTarget.style.color = customStyles.textSecondary;
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                    <circle cx="12" cy="12" r="3.5"/>
                  </svg>
                </a>
              </div>
              <div className="mt-4">
                <span className="text-xs" style={{ color: customStyles.textMuted }}>
                  FSC® SGSCH-COC-070438
                </span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 text-center" style={{ borderTop: '1px solid #E5E5E5' }}>
            <p className="text-sm" style={{ color: customStyles.textMuted }}>
              © {new Date().getFullYear()} ANTIK-HOLZ Sp. z o.o. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============================================================================
// EKSPORT
// ============================================================================
export default AntikHolzOrderForm;
