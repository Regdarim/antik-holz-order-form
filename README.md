# 🪵 ANTIK-HOLZ - Formularz Zamówień

Nowoczesny, responsywny formularz zamówień dla ANTIK-HOLZ - stare deski rustykalne ze stodoły.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-3.4.0-38bdf8.svg)

## 📋 Opis

Kompleksowy formularz zamówień dla firmy ANTIK-HOLZ oferującej oryginalne drewno z odzysku z polskich stodół i budynków gospodarczych. Formularz umożliwia:

- ✅ Wybór koloru drewna (11 opcji)
- ✅ Wybór pakietu długości (3 opcje)
- ✅ Konfigurator szerokości desek
- ✅ Opcje dodatkowe (krawędzie żywe, fazowanie)
- ✅ Automatyczna kalkulacja ceny
- ✅ Kalkulacja kosztów wysyłki
- ✅ Pełny formularz kontaktowy
- ✅ Kopiowanie podsumowania do schowka

## 🎨 Design

Formularz został zaprojektowany w **jasnym, minimalistycznym stylu** zgodnym z brandingiem antikholzprofis.com:

- **Paleta kolorów**: Naturalne brązy (#2C2420), białe tła, subtelne szarości
- **Typografia**: Inter, system fonts
- **Responsywność**: Pełne wsparcie mobile/tablet/desktop
- **Interaktywność**: Smooth transitions, hover effects, focus states

### Przed i Po

**PRZED**: Ciemny, futurystyczny design z złotymi akcentami
**PO**: Jasny, minimalistyczny design z naturalnymi brązami ✨

## 🚀 Funkcjonalności

### Produkty
- 11 wariantów kolorystycznych starego drewna
- 3 pakiety długości (50-100cm, 100-200cm, 200+cm)
- Opcja losowej lub stałej szerokości (8-14cm)
- Opcje dodatkowe: krawędzie żywe, fazowanie

### Kalkulator ceny
- Automatyczne obliczanie ceny bazowej pakietu
- Dopłaty za kolory premium
- Dopłaty za opcje dodatkowe
- Kalkulacja kosztów wysyłki (25 zł/3m²)
- Podgląd szczegółowego podsumowania

### Formularz
- Walidacja wszystkich pól wymaganych
- Responsywne komunikaty błędów
- Automatyczne formatowanie danych
- Export do schowka w formacie tekstowym

## 🛠️ Technologie

- **React** 18.2.0 - UI framework
- **TailwindCSS** 3.4.0 - Utility-first CSS
- **Vite** 5.0.8 - Build tool
- **CSS-in-JS** - Inline styles dla customowych kolorów

## 📦 Instalacja

```bash
# Sklonuj repozytorium
git clone https://github.com/YOUR_USERNAME/antik-holz-order-form.git

# Przejdź do katalogu
cd antik-holz-order-form

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev
```

## 🎯 Użycie

### Rozwój lokalny
```bash
npm run dev
```
Otwórz [http://localhost:5173](http://localhost:5173) w przeglądarce.

### Build produkcyjny
```bash
npm run build
```
Pliki produkcyjne znajdą się w katalogu `dist/`.

### Podgląd buildu
```bash
npm run preview
```

## 📁 Struktura projektu

```
antik-holz-order-form/
├── src/
│   └── AntikHolzOrderForm.jsx    # Główny komponent formularza
├── .gitignore                     # Ignorowane pliki Git
├── package.json                   # Zależności projektu
└── README.md                      # Dokumentacja
```

## 🎨 Konfiguracja kolorów

Kolory brandowe zdefiniowane w `customStyles`:

```javascript
{
  primaryColor: '#2C2420',      // Główny brąz
  bgLight: '#FFFFFF',           // Czysta biel
  bgOffWhite: '#FAFAF9',        // Złamana biel
  bgGray: '#F5F5F4',            // Jasny szary
  textPrimary: '#1A1512',       // Ciemny brąz (tekst)
  textSecondary: '#57534E',     // Średni szary
  textMuted: '#A8A29E',         // Jasny szary
}
```

## 🌐 Dane firmy

- **Nazwa**: ANTIK-HOLZ Sp. z o.o.
- **Od**: 2011 roku
- **Certyfikat**: FSC® SGSCH-COC-070438
- **Email**: biuro@antikholzprofis.com
- **Instagram**: [@antik_holz_old_wood_poland](https://instagram.com/antik_holz_old_wood_poland)

## 📝 Licencja

MIT License - zobacz plik LICENSE dla szczegółów.

## 🤝 Wkład

Projekt stworzony dla ANTIK-HOLZ Sp. z o.o.

## 📞 Kontakt

W razie pytań dotyczących projektu:
- Email: biuro@antikholzprofis.com
- Telefon: +48 XXX XXX XXX

---

**Wykonane z ❤️ dla ANTIK-HOLZ** | 100% Recykling | FSC® Certyfikat
