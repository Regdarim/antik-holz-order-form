# 🚀 ANTIK-HOLZ - Szybki Start

## Uruchomienie w 1 kliknięcie

### Development (z hot-reload)
```
Kliknij dwukrotnie: START_DEV.bat
```
- Aplikacja uruchomi się na: **http://localhost:3000**
- Wszystkie zmiany w kodzie są widoczne natychmiast
- Aby zatrzymać: `Ctrl+C`

### Build & Test (wersja produkcyjna)
```
Kliknij dwukrotnie: BUILD_AND_TEST.bat
```
- Buduje zoptymalizowaną wersję produkcyjną
- Uruchamia podgląd na: **http://localhost:4173**

---

## Polecenia npm

```bash
npm start          # Uruchom serwer deweloperski (alias dla npm run dev)
npm run dev        # Uruchom serwer deweloperski
npm run build      # Zbuduj wersję produkcyjną
npm run preview    # Podgląd wersji produkcyjnej
npm test           # Build + preview (szybki test)
```

---

## Struktura projektu

```
antik-holz-order-form/
├── src/
│   ├── components/
│   │   ├── ui/              # Podstawowe komponenty UI
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── FormField.jsx
│   │   │   ├── Section.jsx
│   │   │   └── Badge.jsx
│   │   └── product/         # Komponenty produktowe
│   │       ├── ColorSwatch.jsx
│   │       ├── PricingCard.jsx
│   │       ├── FeatureCard.jsx
│   │       ├── SpecRow.jsx
│   │       └── FAQItem.jsx
│   ├── config/
│   │   └── theme.js         # Scentralizowany design system
│   ├── AntikHolzOrderForm.jsx  # Główny komponent
│   ├── main.jsx             # Entry point
│   └── index.css            # Globalne style
├── index.html               # HTML template
├── vite.config.js           # Konfiguracja Vite
├── tailwind.config.js       # Konfiguracja Tailwind
├── CLAUDE.md                # Specyfikacja design systemu
├── IMPLEMENTATION_PLAN.md   # Plan implementacji CMS
└── PROGRESS.md              # Status postępu prac
```

---

## Testowanie zmian

1. **Uruchom serwer deweloperski:**
   ```
   START_DEV.bat
   ```

2. **Edytuj pliki** - np. `src/AntikHolzOrderForm.jsx`

3. **Zobacz zmiany** - przeglądarka odświeży się automatycznie

4. **Testuj build:**
   ```
   BUILD_AND_TEST.bat
   ```

---

## Hot-reload - Co jest obserwowane?

Vite automatycznie przeładowuje przy zmianach w:
- ✅ Wszystkie pliki `.jsx` w `src/`
- ✅ Wszystkie pliki `.js` w `src/`
- ✅ `index.css`
- ✅ `tailwind.config.js`
- ✅ Pliki importowane przez komponenty

**Nie wymaga restartu** - wszystkie zmiany są widoczne natychmiast!

---

## Dodawanie nowych komponentów

```javascript
// 1. Utwórz plik np. src/components/ui/Modal.jsx
import React from 'react';
import { customStyles } from '../../config/theme';

const Modal = ({ children, isOpen, onClose }) => {
  // Twój kod...
};

export default Modal;

// 2. Importuj w głównym komponencie
import Modal from './components/ui/Modal';

// 3. Użyj - zmiany widoczne od razu!
<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  Treść modala
</Modal>
```

---

## Debugowanie

### Vite DevTools
- Otwórz **http://localhost:3000** w przeglądarce
- Naciśnij `F12` - otworzą się Chrome DevTools
- Wszystkie błędy są widoczne w konsoli

### React DevTools
Zainstaluj rozszerzenie do przeglądarki:
- Chrome: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- Firefox: [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

---

## Częste problemy

### Port 3000 jest zajęty
```bash
# Vite automatycznie użyje następnego wolnego portu (3001, 3002, etc.)
# Sprawdź w terminalu który port został użyty
```

### Błędy po zmianach w package.json
```bash
# Usuń node_modules i zainstaluj ponownie
rmdir /s /q node_modules
npm install
```

### Błąd "Cannot find module"
```bash
# Sprawdź czy plik istnieje
# Sprawdźścieżkę importu (case-sensitive!)
# Przykład:
import Button from './components/ui/Button';  # ✅ OK
import button from './components/ui/button';  # ❌ ZŁE
```

---

## Następne kroki

Sprawdź dokumentację:
- [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) - Pełny plan refaktoryzacji
- [PROGRESS.md](PROGRESS.md) - Aktualny status implementacji
- [CLAUDE.md](CLAUDE.md) - Design system i wytyczne

---

**Gotowe do pracy!** 🎉

Kliknij `START_DEV.bat` i zacznij kodować!
