/**
 * ============================================================================
 * ANTIK-HOLZ - Kompaktowy Formularz Zamówień (UX Optimized)
 * ============================================================================
 *
 * NOWA STRUKTURA - Priorytet konwersji:
 * 1. [STICKY] Header z live ceną i CTA
 * 2. [TOP] Quick Calculator - Metraż, Kolor, Pakiet w kompakcie
 * 3. [TOP] Live Preview zamówienia
 * 4. [MID] Dane kontaktowe
 * 5. [BOT] Opcje dodatkowe (collapsed)
 * 6. [BOT] Specyfikacja (collapsed)
 * 7. [BOT] FAQ (collapsed)
 * ============================================================================
 */

import React, { useState, useMemo } from 'react';
import { customStyles } from './config/theme';

// Dane z oryginalnego komponentu
const COLORS = [
  {
    id: 1,
    name: 'Jasny brąz',
    color: '#C4A269',
    extraCost: 0,
    gallery: [
      'https://antikholzprofis.com/wp-content/uploads/2024/01/jasny-braz-1.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/jasny-braz-2.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/jasny-braz-3.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/jasny-braz-4.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/jasny-braz-5.jpg',
    ]
  },
  {
    id: 2,
    name: 'Naturalny mix',
    color: '#8B6914',
    extraCost: 0,
    gallery: [
      'https://antikholzprofis.com/wp-content/uploads/2024/01/naturalny-mix-1.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/naturalny-mix-2.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/naturalny-mix-3.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/naturalny-mix-4.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/naturalny-mix-5.jpg',
    ]
  },
  {
    id: 3,
    name: 'Szary',
    color: '#9CA3AF',
    extraCost: 0,
    gallery: [
      'https://antikholzprofis.com/wp-content/uploads/2024/01/szary-1.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/szary-2.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/szary-3.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/szary-4.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/szary-5.jpg',
    ]
  },
  {
    id: 4,
    name: 'Mix',
    gradient: 'linear-gradient(135deg, #8B6914 0%, #9CA3AF 100%)',
    extraCost: 0,
    gallery: [
      'https://antikholzprofis.com/wp-content/uploads/2024/01/mix-1.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/mix-2.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/mix-3.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/mix-4.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/mix-5.jpg',
    ]
  },
  {
    id: 5,
    name: 'Ciemny brąz',
    color: '#4A3728',
    extraCost: 10,
    gallery: [
      'https://antikholzprofis.com/wp-content/uploads/2024/01/ciemny-braz-1.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/ciemny-braz-2.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/ciemny-braz-3.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/ciemny-braz-4.jpg',
      'https://antikholzprofis.com/wp-content/uploads/2024/01/ciemny-braz-5.jpg',
    ]
  },
];

const PACKAGES = [
  { id: 'mini', name: 'MINI 50-70cm', price: 135 },
  { id: 'standard', name: 'STANDARD 50-100cm', price: 145 },
  { id: 'standard-plus', name: 'STANDARD+ 50-150cm', price: 155, popular: true },
  { id: 'komfort', name: 'KOMFORT 100-150cm', price: 165 },
  { id: 'komfort-plus', name: 'KOMFORT+ 100-190cm', price: 175 },
  { id: 'long', name: 'DŁUGIE 190-400cm', price: 285 },
];

const EXTRA_OPTIONS = [
  { id: 'tongue-groove', name: 'Pióro-wpust (+10 zł/m²)' },
  { id: 'fixed-width', name: 'Stała szerokość (+10 zł/m²)' },
  { id: 'fixed-length', name: 'Stała długość (+10 zł/m²)' },
  { id: 'impregnation', name: 'Impregnacja (+10 zł/m²)' },
];

const AntikHolzOrderFormCompact = () => {
  const [formData, setFormData] = useState({
    sqm: '',
    colorId: 2,
    packageId: 'standard-plus',
    extras: [],
    fixedWidth: '',
    fixedLength: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [showExtras, setShowExtras] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Funkcja kopiowania zamówienia do schowka
  const copyOrderToClipboard = () => {
    const selectedColor = COLORS.find(c => c.id === formData.colorId);
    const selectedPackage = PACKAGES.find(p => p.id === formData.packageId);
    const selectedExtras = formData.extras.map(id =>
      EXTRA_OPTIONS.find(opt => opt.id === id)?.name
    ).filter(Boolean);

    const orderText = `
ZAMÓWIENIE ANTIK-HOLZ
======================

Powierzchnia: ${formData.sqm} m²
Pakiet: ${selectedPackage?.name}
Kolor: ${selectedColor?.name}
${selectedExtras.length > 0 ? `Opcje dodatkowe:\n${selectedExtras.map(e => `  - ${e}`).join('\n')}` : ''}
${formData.fixedWidth ? `Stała szerokość: ${formData.fixedWidth} cm` : ''}
${formData.fixedLength ? `Stała długość: ${formData.fixedLength} cm` : ''}

CENA:
-----
Cena za m²: ${calculatedPrice.pricePerSqm} zł
Powierzchnia: ${formData.sqm} m² × ${calculatedPrice.pricePerSqm} zł = ${calculatedPrice.subtotal.toFixed(2)} zł
Wysyłka: ${calculatedPrice.shipping} zł
RAZEM: ${calculatedPrice.total.toFixed(2)} zł

DANE KONTAKTOWE:
----------------
Email: ${formData.email || '[nie podano]'}
Telefon: ${formData.phone || '[nie podano]'}
Adres: ${formData.address || '[nie podano]'}
${formData.notes ? `Uwagi: ${formData.notes}` : ''}
    `.trim();

    navigator.clipboard.writeText(orderText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Kalkulacja ceny
  const calculatedPrice = useMemo(() => {
    const sqm = parseFloat(formData.sqm) || 0;
    const pkg = PACKAGES.find(p => p.id === formData.packageId);
    const color = COLORS.find(c => c.id === formData.colorId);

    const basePrice = pkg ? pkg.price : 0;
    const colorExtra = color ? color.extraCost : 0;
    const extrasTotal = formData.extras.length * 10;

    const pricePerSqm = basePrice + colorExtra + extrasTotal;
    const total = sqm * pricePerSqm;
    const shipping = Math.ceil(sqm / 3) * 25;

    return {
      pricePerSqm,
      subtotal: total,
      shipping,
      total: total + shipping,
    };
  }, [formData]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: customStyles.bgOffWhite }}>
      {/* ================================================================== */}
      {/* STICKY HEADER - Cena + CTA */}
      {/* ================================================================== */}
      <header
        className="sticky top-0 z-50 shadow-lg"
        style={{
          backgroundColor: customStyles.primaryColor,
          borderBottom: `3px solid ${customStyles.primaryLight}`
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <h1 className="text-white text-xl font-bold">ANTIK-HOLZ</h1>
              <p className="text-xs opacity-75" style={{ color: '#FFFFFF' }}>Stare Deski Rustykalne</p>
            </div>

            {/* Live Cena */}
            {formData.sqm && (
              <div className="text-center">
                <p className="text-xs opacity-75" style={{ color: '#FFFFFF' }}>Twoje zamówienie:</p>
                <p className="text-3xl font-bold text-white">
                  {calculatedPrice.total.toFixed(0)} zł
                </p>
                <p className="text-xs opacity-75" style={{ color: '#FFFFFF' }}>
                  {formData.sqm} m² × {calculatedPrice.pricePerSqm} zł + wysyłka {calculatedPrice.shipping} zł
                </p>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="px-6 py-3 text-sm font-bold bg-white transition-all hover:scale-105"
              style={{ color: customStyles.primaryColor }}
            >
              ZAMÓW TERAZ
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* MAIN CONTENT - Kompaktowy layout */}
      {/* ================================================================== */}
      <main className="max-w-5xl mx-auto px-4 py-8">

        {/* ============================================================ */}
        {/* QUICK CALCULATOR - Wszystko w jednym */}
        {/* ============================================================ */}
        <section
          className="p-6 mb-6 shadow-lg"
          style={{
            backgroundColor: customStyles.bgLight,
            border: `2px solid ${customStyles.primaryColor}`,
          }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: customStyles.textPrimary }}>
            Konfiguracja zamówienia
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 1. METRAŻ */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: customStyles.textPrimary }}>
                1. Ile m²? *
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                value={formData.sqm}
                onChange={(e) => setFormData({...formData, sqm: e.target.value})}
                placeholder="np. 15"
                className="w-full px-4 py-3 text-lg font-bold border-2 focus:outline-none focus:ring-2"
                style={{
                  borderColor: customStyles.primaryColor,
                  color: customStyles.textPrimary,
                }}
              />
              <p className="text-xs mt-1" style={{ color: customStyles.textMuted }}>
                +10% zapasu zalecane
              </p>
            </div>

            {/* 2. KOLOR */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: customStyles.textPrimary }}>
                2. Kolor *
              </label>
              <div className="grid grid-cols-5 gap-2">
                {COLORS.map(color => {
                  const isSelected = formData.colorId === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setFormData({...formData, colorId: color.id})}
                      className="relative h-16 transition-all"
                      style={{
                        background: color.gradient || color.color,
                        border: isSelected ? `3px solid ${customStyles.primaryColor}` : '1px solid #E5E5E5',
                        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                      }}
                      title={color.name}
                    >
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: customStyles.primaryColor }}>
                          <span className="text-white text-xs">•</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs mt-1" style={{ color: customStyles.textMuted }}>
                {COLORS.find(c => c.id === formData.colorId)?.name}
                {COLORS.find(c => c.id === formData.colorId)?.extraCost > 0 && ' (+10 zł/m²)'}
              </p>

              {/* Galeria zdjęć wybranego koloru */}
              {formData.colorId && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {COLORS.find(c => c.id === formData.colorId)?.gallery.map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden border"
                      style={{ borderColor: customStyles.primaryColor }}
                    >
                      <img
                        src={img}
                        alt={`${COLORS.find(c => c.id === formData.colorId)?.name} - ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                        onClick={() => window.open(img, '_blank')}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. PAKIET */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: customStyles.textPrimary }}>
                3. Długość desek *
              </label>
              <select
                value={formData.packageId}
                onChange={(e) => setFormData({...formData, packageId: e.target.value})}
                className="w-full px-4 py-3 text-sm font-medium border-2 focus:outline-none focus:ring-2"
                style={{
                  borderColor: customStyles.primaryColor,
                  color: customStyles.textPrimary,
                }}
              >
                {PACKAGES.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - {pkg.price} zł/m²
                  </option>
                ))}
              </select>
              <p className="text-xs mt-1" style={{ color: customStyles.textMuted }}>
                Losowe długości z zakresu
              </p>
            </div>
          </div>

          {/* Opcje dodatkowe - Collapsed */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E5E5E5' }}>
            <button
              onClick={() => setShowExtras(!showExtras)}
              className="flex items-center justify-between w-full text-left font-medium transition-colors hover:opacity-70"
              style={{ color: customStyles.textPrimary }}
            >
              <span>Opcje dodatkowe (4 dostępne)</span>
              <span className="text-2xl">{showExtras ? '−' : '+'}</span>
            </button>

            {showExtras && (
              <div className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-3">
                  {EXTRA_OPTIONS.map(option => (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 p-3 cursor-pointer transition-all"
                      style={{
                        backgroundColor: formData.extras.includes(option.id) ? customStyles.bgBeige : customStyles.bgGray,
                        border: `1px solid ${formData.extras.includes(option.id) ? customStyles.primaryColor : '#E5E5E5'}`,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.extras.includes(option.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, extras: [...formData.extras, option.id]});
                          } else {
                            setFormData({...formData, extras: formData.extras.filter(id => id !== option.id)});
                          }
                        }}
                        style={{ accentColor: customStyles.primaryColor }}
                      />
                      <span className="text-sm" style={{ color: customStyles.textPrimary }}>
                        {option.name}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Pola dla stałej szerokości */}
                {formData.extras.includes('fixed-width') && (
                  <div className="p-4" style={{ backgroundColor: customStyles.bgBeige, border: `2px solid ${customStyles.primaryColor}` }}>
                    <label className="block text-sm font-bold mb-2" style={{ color: customStyles.textPrimary }}>
                      Podaj stałą szerokość (w cm):
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="8"
                      max="14"
                      value={formData.fixedWidth}
                      onChange={(e) => setFormData({...formData, fixedWidth: e.target.value})}
                      placeholder="np. 10"
                      className="w-full px-4 py-2 border-2 focus:outline-none focus:ring-2"
                      style={{ borderColor: customStyles.primaryColor, color: customStyles.textPrimary }}
                    />
                    <p className="text-xs mt-1" style={{ color: customStyles.textMuted }}>
                      Standardowo: 8-14 cm losowo
                    </p>
                  </div>
                )}

                {/* Pola dla stałej długości */}
                {formData.extras.includes('fixed-length') && (
                  <div className="p-4" style={{ backgroundColor: customStyles.bgBeige, border: `2px solid ${customStyles.primaryColor}` }}>
                    <label className="block text-sm font-bold mb-2" style={{ color: customStyles.textPrimary }}>
                      Podaj stałą długość (w cm):
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="50"
                      max="400"
                      value={formData.fixedLength}
                      onChange={(e) => setFormData({...formData, fixedLength: e.target.value})}
                      placeholder="np. 150"
                      className="w-full px-4 py-2 border-2 focus:outline-none focus:ring-2"
                      style={{ borderColor: customStyles.primaryColor, color: customStyles.textPrimary }}
                    />
                    <p className="text-xs mt-1" style={{ color: customStyles.textMuted }}>
                      Zgodnie z wybranym pakietem
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* LIVE PREVIEW - Podsumowanie */}
        {/* ============================================================ */}
        {formData.sqm && (
          <section
            className="p-6 mb-6 shadow-md"
            style={{ backgroundColor: customStyles.bgBeige }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold" style={{ color: customStyles.textPrimary }}>
                Podsumowanie zamówienia
              </h3>
              <button
                onClick={copyOrderToClipboard}
                className="px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: copySuccess ? '#10B981' : customStyles.primaryColor }}
              >
                {copySuccess ? 'Skopiowano!' : 'Kopiuj do schowka'}
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: customStyles.textSecondary }}>Powierzchnia:</span>
                <span className="font-bold" style={{ color: customStyles.textPrimary }}>{formData.sqm} m²</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: customStyles.textSecondary }}>Pakiet:</span>
                <span className="font-bold" style={{ color: customStyles.textPrimary }}>
                  {PACKAGES.find(p => p.id === formData.packageId)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: customStyles.textSecondary }}>Kolor:</span>
                <span className="font-bold" style={{ color: customStyles.textPrimary }}>
                  {COLORS.find(c => c.id === formData.colorId)?.name}
                </span>
              </div>

              <div className="pt-3 mt-3" style={{ borderTop: '1px solid #E5E5E5' }}>
                <div className="flex justify-between text-lg">
                  <span className="font-bold" style={{ color: customStyles.textPrimary }}>RAZEM:</span>
                  <span className="font-bold text-2xl" style={{ color: customStyles.primaryColor }}>
                    {calculatedPrice.total.toFixed(0)} zł
                  </span>
                </div>
                <p className="text-xs mt-1 text-right" style={{ color: customStyles.textMuted }}>
                  w tym wysyłka: {calculatedPrice.shipping} zł
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* DANE KONTAKTOWE */}
        {/* ============================================================ */}
        <section
          className="p-6 mb-6 shadow-md"
          style={{ backgroundColor: customStyles.bgLight }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: customStyles.textPrimary }}>
            Dane kontaktowe
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email *"
              className="px-4 py-3 border focus:outline-none focus:ring-2"
              style={{ color: customStyles.textPrimary }}
            />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Telefon *"
              className="px-4 py-3 border focus:outline-none focus:ring-2"
              style={{ color: customStyles.textPrimary }}
            />
          </div>

          <textarea
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            placeholder="Adres dostawy *"
            rows={2}
            className="w-full mt-4 px-4 py-3 border focus:outline-none focus:ring-2"
            style={{ color: customStyles.textPrimary }}
          />

          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Uwagi dodatkowe (opcjonalnie)"
            rows={2}
            className="w-full mt-4 px-4 py-3 border focus:outline-none focus:ring-2"
            style={{ color: customStyles.textPrimary }}
          />

          {/* CTA Button */}
          <button
            className="w-full mt-6 py-4 text-white font-bold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: customStyles.primaryColor }}
          >
            WYŚLIJ ZAPYTANIE OFERTOWE
          </button>
        </section>

        {/* ============================================================ */}
        {/* SPECYFIKACJA - Collapsed */}
        {/* ============================================================ */}
        <details className="mb-4" style={{ backgroundColor: customStyles.bgLight }}>
          <summary className="p-4 cursor-pointer font-bold flex justify-between items-center"
            style={{ color: customStyles.textPrimary }}>
            <span>Specyfikacja techniczna</span>
            <span className="text-2xl">+</span>
          </summary>
          <div className="p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: customStyles.textSecondary }}>Szerokość:</span>
              <span style={{ color: customStyles.textPrimary }}>8-14 cm (losowo)</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: customStyles.textSecondary }}>Grubość:</span>
              <span style={{ color: customStyles.textPrimary }}>20 mm</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: customStyles.textSecondary }}>Drewno:</span>
              <span style={{ color: customStyles.textPrimary }}>Iglaste (świerk/jodła)</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: customStyles.textSecondary }}>Obróbka:</span>
              <span style={{ color: customStyles.textPrimary }}>Termiczna 100%</span>
            </div>
          </div>
        </details>

        {/* ============================================================ */}
        {/* FAQ - Collapsed */}
        {/* ============================================================ */}
        <details className="mb-4" style={{ backgroundColor: customStyles.bgLight }}>
          <summary className="p-4 cursor-pointer font-bold flex justify-between items-center"
            style={{ color: customStyles.textPrimary }}>
            <span>Najczęstsze pytania</span>
            <span className="text-2xl">+</span>
          </summary>
          <div className="p-4 space-y-4">
            <div>
              <p className="font-medium mb-1" style={{ color: customStyles.textPrimary }}>
                Czy to prawdziwe stare drewno?
              </p>
              <p className="text-sm" style={{ color: customStyles.textSecondary }}>
                Tak, 100% oryginalne z polskich stodół. Certyfikat FSC®.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1" style={{ color: customStyles.textPrimary }}>
                Jak długo trwa dostawa?
              </p>
              <p className="text-sm" style={{ color: customStyles.textSecondary }}>
                1-3 dni robocze dla zamówień do 20m².
              </p>
            </div>
          </div>
        </details>

      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm" style={{
        backgroundColor: customStyles.primaryColor,
        color: '#FFFFFF'
      }}>
        <p>ANTIK-HOLZ © 2011-2025 | FSC® SGSCH-COC-070438</p>
      </footer>
    </div>
  );
};

export default AntikHolzOrderFormCompact;
