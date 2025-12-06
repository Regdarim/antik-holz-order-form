# 🛠️ Workflow Deweloperski - Jak Claude Code Testuje Zmiany

## Obecna Konfiguracja

### Serwer działa na:
- **Development:** http://localhost:3001 (z hot-reload)
- **Production Preview:** http://localhost:4173 (po build)

### Automatyzacja
✅ Serwer deweloperski uruchomiony w tle
✅ Hot-reload włączony - zmiany widoczne natychmiast
✅ Wszystkie komponenty gotowe do testowania

---

## Szybkie Testowanie przez Claude Code

### 1️⃣ Testowanie w trakcie developmentu

```bash
# Serwer już działa w tle na http://localhost:3001
# Każda zmiana w plikach .jsx/.js/.css jest natychmiast widoczna

# Jeśli serwer nie działa:
npm start  # lub kliknij START_DEV.bat
```

**Co mogę testować:**
- ✅ Zmiany w komponentach UI
- ✅ Nowe komponenty
- ✅ Aktualizacje stylów
- ✅ Zmiany w theme.js
- ✅ Modyfikacje formularza

### 2️⃣ Testowanie build produkcyjnego

```bash
npm run build   # Zbuduj
npm run preview # Uruchom preview

# lub jednym poleceniem:
npm test        # Build + preview
```

**Kiedy testuję build:**
- 🔍 Przed commitem dużych zmian
- 🔍 Po refaktoryzacji
- 🔍 Przed push do GitHub
- 🔍 Weryfikacja bundle size

### 3️⃣ Szybki test funkcjonalności

```bash
# Uruchom serwer, otwórz w przeglądarce, przetestuj flow:
# 1. Wybór koloru
# 2. Wybór pakietu
# 3. Wypełnienie formularza
# 4. Wysłanie zamówienia
```

---

## Typowy Cykl Pracy Claude Code

### Scenariusz: Dodanie nowego komponentu

```javascript
// 1. CREATE - Tworzę nowy komponent
// src/components/ui/Modal.jsx
import React from 'react';
import { customStyles } from '../../config/theme';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        backgroundColor: customStyles.bgLight,
        padding: '2rem',
        maxWidth: '500px',
      }}>
        {children}
        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};

export default Modal;

// 2. TEST - Zmiana widoczna natychmiast na http://localhost:3001
// Sprawdzam czy modal się wyświetla poprawnie

// 3. VERIFY - Testuję interakcje:
// - Czy otwiera się po kliknięciu?
// - Czy zamyka się poprawnie?
// - Czy style są zgodne z CLAUDE.md?

// 4. BUILD TEST - Sprawdzam czy nie ma błędów w buildzie
npm run build

// 5. COMMIT - Jeśli wszystko działa
git add .
git commit -m "Add Modal component"
```

---

## Scenariusze Testowe

### ✅ Test 1: Wybór koloru
1. Otwieram http://localhost:3001
2. Scrolluję do sekcji kolorów
3. Klikam różne kolory
4. Sprawdzam czy:
   - Checkmark pojawia się na wybranym kolorze
   - Cena się aktualizuje (jeśli kolor ma dopłatę)
   - Nie ma błędów w konsoli

### ✅ Test 2: Wybór pakietu
1. Scrolluję do sekcji pakietów
2. Klikam różne pakiety
3. Sprawdzam czy:
   - Karta się podświetla
   - Cena za m² się zmienia
   - Badge "NAJPOPULARNIEJSZY" wyświetla się poprawnie

### ✅ Test 3: Formularz
1. Wypełniam pola formularza
2. Zostawiam puste pole wymagane
3. Klikam "Wyślij"
4. Sprawdzam czy:
   - Walidacja działa
   - Błędy są wyświetlane
   - Formularz nie wysyła się z błędami

### ✅ Test 4: Responsywność
1. Otwieram DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Testuję różne rozdzielczości:
   - 📱 Mobile: 375px
   - 📱 Tablet: 768px
   - 💻 Desktop: 1440px

---

## Debugowanie

### React DevTools
```bash
# Zainstaluj rozszerzenie Chrome:
# https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi

# Używam do:
# - Inspekcji komponentów
# - Sprawdzania props
# - Debugowania state
```

### Console Errors
```javascript
// Sprawdzam konsole przeglądarki (F12):
# - Błędy JavaScript
# - Warningi React
# - Network errors
# - Performance issues
```

---

## Monitoring Performance

### Vite Dev Server
```bash
# Output w terminalu pokazuje:
# - Czas startu serwera (~300ms)
# - Hot Module Replacement (HMR) updates
# - Błędy kompilacji
```

### Production Build
```bash
npm run build

# Sprawdzam output:
# ✓ X modules transformed
# dist/index.html                   X kB
# dist/assets/index-XXX.css        X kB │ gzip: X kB
# dist/assets/index-XXX.js         X kB │ gzip: X kB

# Bundle size powinien być < 200kB (gzipped < 60kB)
```

---

## Checklist przed Commitem

```bash
✅ Serwer deweloperski działa bez błędów
✅ Zmiany widoczne i działają poprawnie
✅ Brak błędów w konsoli przeglądarki
✅ Build produkcyjny przechodzi bez błędów
✅ Bundle size nie wzrósł znacząco
✅ Kod zgodny z CLAUDE.md
✅ Komponenty mają JSDoc komentarze
```

---

## Skróty Klawiszowe w Przeglądarce

- `F12` - Otwórz DevTools
- `Ctrl+Shift+M` - Toggle Device Toolbar (responsive mode)
- `Ctrl+Shift+C` - Element inspector
- `Ctrl+R` - Hard reload (jeśli hot-reload nie zadziałał)
- `Ctrl+Shift+R` - Hard reload z czyszczeniem cache

---

## Polecenia Claude Code

### Podczas developmentu:
```bash
# Sprawdzam status serwera
BashOutput(bash_id="10f085")

# Restartuję serwer jeśli potrzeba
KillShell(shell_id="10f085")
Bash("npm start", run_in_background=true)

# Buduję i testuję
Bash("npm run build")
Bash("npm run preview", run_in_background=true)
```

---

## Przykładowy Flow: Dodanie nowej funkcjonalności

```bash
1. CREATE component
   ↓
2. CHECK http://localhost:3001 (hot-reload auto)
   ↓
3. ITERATE (edytuj → obserwuj zmiany)
   ↓
4. TEST interactions (klikanie, formularze)
   ↓
5. BUILD test
   npm run build
   ↓
6. PREVIEW test
   npm run preview
   ↓
7. COMMIT
   git add .
   git commit -m "..."
   ↓
8. PUSH
   git push
```

---

## Status: Gotowe do Pracy! ✅

Środowisko deweloperskie w pełni skonfigurowane:
- ✅ Hot-reload działa
- ✅ Serwer w tle uruchomiony
- ✅ Build testowany i działający
- ✅ Wszystkie komponenty gotowe
- ✅ MCP servers zidentyfikowane (PostgreSQL dla przyszłości)

**Można rozpocząć Phase 1.3 - ekstrakcję layoutów!**
