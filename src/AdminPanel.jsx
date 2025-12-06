/**
 * ============================================================================
 * ANTIK-HOLZ - Panel Administracyjny CMS
 * ============================================================================
 *
 * Funkcjonalności:
 * - Zarządzanie zdjęciami galerii dla każdego koloru
 * - Edycja cen pakietów
 * - Zarządzanie opcjami dodatkowymi
 * - Podgląd formularza
 *
 * ============================================================================
 */

import React, { useState } from 'react';
import { customStyles } from './config/theme';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('colors');
  const [colors, setColors] = useState([
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
      color: '#8B6914',
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
  ]);

  const [packages, setPackages] = useState([
    { id: 'mini', name: 'MINI 50-70cm', price: 135 },
    { id: 'standard', name: 'STANDARD 50-100cm', price: 145 },
    { id: 'standard-plus', name: 'STANDARD+ 50-150cm', price: 155, popular: true },
    { id: 'komfort', name: 'KOMFORT 100-150cm', price: 165 },
    { id: 'komfort-plus', name: 'KOMFORT+ 100-190cm', price: 175 },
    { id: 'long', name: 'DŁUGIE 190-400cm', price: 285 },
  ]);

  const [selectedColorId, setSelectedColorId] = useState(1);
  const selectedColor = colors.find(c => c.id === selectedColorId);

  const updateGalleryImage = (colorId, imageIndex, newUrl) => {
    setColors(colors.map(color => {
      if (color.id === colorId) {
        const newGallery = [...color.gallery];
        newGallery[imageIndex] = newUrl;
        return { ...color, gallery: newGallery };
      }
      return color;
    }));
  };

  const updatePackagePrice = (packageId, newPrice) => {
    setPackages(packages.map(pkg =>
      pkg.id === packageId ? { ...pkg, price: parseFloat(newPrice) } : pkg
    ));
  };

  const exportData = () => {
    const data = { colors, packages };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'antik-holz-data.json';
    a.click();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: customStyles.bgOffWhite }}>
      {/* Header */}
      <header className="shadow-md" style={{ backgroundColor: customStyles.primaryColor }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">ANTIK-HOLZ - Panel Administracyjny</h1>
          <p className="text-sm text-white opacity-75">Zarządzanie treścią formularza zamówień</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-2 border-b-2" style={{ borderColor: customStyles.primaryColor }}>
          <button
            onClick={() => setActiveTab('colors')}
            className="px-6 py-3 font-medium transition-all"
            style={{
              backgroundColor: activeTab === 'colors' ? customStyles.primaryColor : 'transparent',
              color: activeTab === 'colors' ? '#FFFFFF' : customStyles.textPrimary,
            }}
          >
            Kolory i Galerie
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className="px-6 py-3 font-medium transition-all"
            style={{
              backgroundColor: activeTab === 'packages' ? customStyles.primaryColor : 'transparent',
              color: activeTab === 'packages' ? '#FFFFFF' : customStyles.textPrimary,
            }}
          >
            Pakiety i Ceny
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className="px-6 py-3 font-medium transition-all"
            style={{
              backgroundColor: activeTab === 'export' ? customStyles.primaryColor : 'transparent',
              color: activeTab === 'export' ? '#FFFFFF' : customStyles.textPrimary,
            }}
          >
            Eksport Danych
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* TAB: Kolory i Galerie */}
        {activeTab === 'colors' && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: customStyles.textPrimary }}>
              Zarządzanie Galeriami Zdjęć
            </h2>

            {/* Color Selector */}
            <div className="mb-6 p-4" style={{ backgroundColor: customStyles.bgLight }}>
              <label className="block text-sm font-bold mb-3" style={{ color: customStyles.textPrimary }}>
                Wybierz kolor do edycji:
              </label>
              <div className="flex gap-4">
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColorId(color.id)}
                    className="px-4 py-2 font-medium transition-all"
                    style={{
                      backgroundColor: selectedColorId === color.id ? customStyles.primaryColor : customStyles.bgGray,
                      color: selectedColorId === color.id ? '#FFFFFF' : customStyles.textPrimary,
                      border: `2px solid ${selectedColorId === color.id ? customStyles.primaryColor : '#E5E5E5'}`,
                    }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Editor */}
            {selectedColor && (
              <div className="p-6" style={{ backgroundColor: customStyles.bgLight }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: customStyles.textPrimary }}>
                  Galeria: {selectedColor.name}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedColor.gallery.map((imageUrl, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-medium" style={{ color: customStyles.textSecondary }}>
                        Zdjęcie {index + 1}:
                      </label>
                      <div className="border-2 overflow-hidden" style={{ borderColor: customStyles.primaryColor, height: '200px' }}>
                        <img
                          src={imageUrl}
                          alt={`${selectedColor.name} - ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => updateGalleryImage(selectedColor.id, index, e.target.value)}
                        placeholder="URL zdjęcia"
                        className="w-full px-3 py-2 border focus:outline-none focus:ring-2"
                        style={{ borderColor: customStyles.primaryColor }}
                      />
                      <p className="text-xs" style={{ color: customStyles.textMuted }}>
                        Wklej URL zdjęcia lub ścieżkę do pliku
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4" style={{ backgroundColor: customStyles.bgBeige }}>
                  <h4 className="font-bold mb-2" style={{ color: customStyles.textPrimary }}>
                    Dodatkowe ustawienia koloru:
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1" style={{ color: customStyles.textSecondary }}>
                        Nazwa koloru:
                      </label>
                      <input
                        type="text"
                        value={selectedColor.name}
                        onChange={(e) => setColors(colors.map(c =>
                          c.id === selectedColor.id ? { ...c, name: e.target.value } : c
                        ))}
                        className="w-full px-3 py-2 border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1" style={{ color: customStyles.textSecondary }}>
                        Dopłata (zł/m²):
                      </label>
                      <input
                        type="number"
                        value={selectedColor.extraCost}
                        onChange={(e) => setColors(colors.map(c =>
                          c.id === selectedColor.id ? { ...c, extraCost: parseFloat(e.target.value) } : c
                        ))}
                        className="w-full px-3 py-2 border"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: Pakiety i Ceny */}
        {activeTab === 'packages' && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: customStyles.textPrimary }}>
              Zarządzanie Pakietami i Cenami
            </h2>

            <div className="grid gap-4">
              {packages.map(pkg => (
                <div key={pkg.id} className="p-4 flex items-center justify-between" style={{ backgroundColor: customStyles.bgLight }}>
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ color: customStyles.textPrimary }}>
                      {pkg.name}
                      {pkg.popular && (
                        <span className="ml-2 text-xs px-2 py-1 text-white" style={{ backgroundColor: customStyles.primaryColor }}>
                          NAJPOPULARNIEJSZY
                        </span>
                      )}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={pkg.price}
                      onChange={(e) => updatePackagePrice(pkg.id, e.target.value)}
                      className="w-24 px-3 py-2 text-right font-bold border-2 focus:outline-none"
                      style={{ borderColor: customStyles.primaryColor }}
                    />
                    <span className="font-medium" style={{ color: customStyles.textSecondary }}>zł/m²</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Eksport Danych */}
        {activeTab === 'export' && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: customStyles.textPrimary }}>
              Eksport i Import Danych
            </h2>

            <div className="p-6 space-y-6" style={{ backgroundColor: customStyles.bgLight }}>
              <div>
                <h3 className="font-bold mb-2" style={{ color: customStyles.textPrimary }}>
                  Eksportuj dane do pliku JSON:
                </h3>
                <button
                  onClick={exportData}
                  className="px-6 py-3 text-white font-bold transition-all hover:opacity-90"
                  style={{ backgroundColor: customStyles.primaryColor }}
                >
                  Pobierz antik-holz-data.json
                </button>
                <p className="text-sm mt-2" style={{ color: customStyles.textMuted }}>
                  Plik JSON zawiera wszystkie kolory, galerie i ceny pakietów.
                </p>
              </div>

              <div className="pt-6" style={{ borderTop: '1px solid #E5E5E5' }}>
                <h3 className="font-bold mb-2" style={{ color: customStyles.textPrimary }}>
                  Podgląd danych:
                </h3>
                <pre className="p-4 overflow-auto text-xs" style={{ backgroundColor: customStyles.bgGray, maxHeight: '400px' }}>
                  {JSON.stringify({ colors, packages }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-sm" style={{ backgroundColor: customStyles.primaryColor, color: '#FFFFFF' }}>
        <p>ANTIK-HOLZ CMS © 2025 | Panel Administracyjny</p>
      </footer>
    </div>
  );
};

export default AdminPanel;
