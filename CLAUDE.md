# 🎨 ANTIK-HOLZ - Przewodnik Stylistyczny dla AI

> **Przeznaczenie**: Ten dokument służy jako źródło prawdy dla AI (Claude, ChatGPT, etc.) i deweloperów pracujących nad projektem ANTIK-HOLZ. Zachowaj spójność designu we wszystkich przyszłych modyfikacjach.

---

## 📐 Filozofia Designu

### Główne Założenia
- **Jasny, minimalistyczny design** - inspirowany antikholzprofis.com
- **Naturalne, stonowane kolory** - odcienie brązu, bieli i szarości
- **Czytelność i prostota** - priorytetem jest funkcjonalność
- **Responsywność** - mobile-first approach
- **Brak zbędnych animacji** - subtelne transitions zamiast flashy effects

### Charakterystyka Marki
- **Branża**: Stare drewno, produkty eco-friendly, recykling
- **Ton komunikacji**: Profesjonalny, autentyczny, naturalny
- **Wartości**: Ekologia, tradycja, jakość, polskie dziedzictwo
- **Target**: B2B i B2C - od prywatnych klientów po hotele i restauracje

---

## 🎨 Paleta Kolorów

### Kolory Główne (Primary)

```javascript
primaryColor: '#2C2420'      // Ciemny brąz (prawie czarny) - główny akcent
primaryLight: '#8B7355'      // Jasny brąz drewniany
primaryDark: '#1A1512'       // Bardzo ciemny brąz
accentWood: '#A68B6C'        // Naturalny odcień drewna
```

**Zastosowanie:**
- `#2C2420` - Główny kolor przycisków, nagłówków, logo, checkmarki
- `#8B7355` - Hover states, dodatkowe akcenty
- `#1A1512` - Ciemny tekst, dark mode (future)
- `#A68B6C` - Subtelne akcenty, separatory

### Kolory Tła (Backgrounds)

```javascript
bgLight: '#FFFFFF'           // Czysta biel
bgOffWhite: '#FAFAF9'        // Lekko złamana biel (main background)
bgGray: '#F5F5F4'            // Bardzo jasny szary (sekcje, karty)
bgBeige: '#FAF8F5'           // Ciepła biel z beżowym odcieniem (selected states)
```

**Zastosowanie:**
- `#FFFFFF` - Karty, inputy, modalne
- `#FAFAF9` - Główne tło aplikacji
- `#F5F5F4` - Alternatywne sekcje (co druga)
- `#FAF8F5` - Selected states, subtle highlights

### Kolory Tekstu (Typography)

```javascript
textPrimary: '#1A1512'       // Bardzo ciemny brąz (prawie czarny) - główny tekst
textSecondary: '#57534E'     // Średni szary - teksty pomocnicze
textMuted: '#A8A29E'         // Jasny szary - placeholder, disabled
```

**Kontrast WCAG:**
- `textPrimary` na `bgLight` = **AAA** (19.2:1)
- `textSecondary` na `bgLight` = **AA** (7.8:1)
- `textMuted` na `bgLight` = **AA** (4.6:1)

### Kolory Funkcjonalne

```javascript
// Error states
errorColor: '#EF4444'        // Czerwony (Tailwind red-500)

// Success states
successColor: '#10B981'      // Zielony (Tailwind green-500)

// Warning states
warningColor: '#F59E0B'      // Pomarańczowy (Tailwind amber-500)

// Info states
infoColor: '#3B82F6'         // Niebieski (Tailwind blue-500)
```

### Gradienty (Subtelne, Naturalne)

```javascript
heroGradient: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)'
cardGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F4 100%)'
```

**Kiedy używać:**
- `heroGradient` - Hero sections, duże obszary
- `cardGradient` - Produktowe karty, pricing tables

---

## 🔤 Typografia

### Font Family

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

**Fallback order:**
1. Inter (preferred)
2. -apple-system (macOS/iOS)
3. BlinkMacSystemFont (Chrome)
4. Segoe UI (Windows)
5. system-ui (universal fallback)

### Skala Typograficzna

```javascript
// Mobile-first approach
{
  'xs': '0.75rem',     // 12px - captions, badges
  'sm': '0.875rem',    // 14px - small text, labels
  'base': '1rem',      // 16px - body text
  'lg': '1.125rem',    // 18px - large body
  'xl': '1.25rem',     // 20px - small headings
  '2xl': '1.5rem',     // 24px - section titles
  '3xl': '1.875rem',   // 30px - page titles
  '4xl': '2.25rem',    // 36px - hero mobile
  '5xl': '3rem',       // 48px - hero tablet
  '6xl': '3.75rem',    // 60px - hero desktop
}
```

### Font Weights

```javascript
{
  normal: 400,         // Regular text
  medium: 500,         // Labels, navigation
  semibold: 600,       // Subheadings, important text
  bold: 700,           // Headings, prices, CTA
}
```

### Line Heights

```javascript
{
  none: 1,             // Icons
  tight: 1.25,         // Headings
  snug: 1.375,         // Titles
  normal: 1.5,         // Body text
  relaxed: 1.625,      // Long-form content
  loose: 2,            // Poetic content
}
```

### Przykłady Użycia

```jsx
// Hero Heading
<h1 style={{
  fontSize: '3.75rem',      // 60px desktop (4xl mobile)
  fontWeight: 700,
  lineHeight: 1.25,
  color: '#1A1512'
}}>
  Stare Deski Rustykalne
</h1>

// Section Title
<h2 style={{
  fontSize: '1.875rem',     // 30px
  fontWeight: 700,
  color: '#1A1512'
}}>
  Wybierz kolorystykę
</h2>

// Body Text
<p style={{
  fontSize: '1rem',         // 16px
  fontWeight: 400,
  lineHeight: 1.5,
  color: '#57534E'
}}>
  Każda deska jest unikatowa...
</p>

// Label
<label style={{
  fontSize: '0.875rem',     // 14px
  fontWeight: 500,
  color: '#1A1512'
}}>
  Metraż (m²) *
</label>
```

---

## 🧩 Komponenty UI

### Przyciski (Buttons)

#### Primary Button (CTA)
```jsx
<button style={{
  backgroundColor: '#2C2420',
  color: '#FFFFFF',
  padding: '0.75rem 2rem',      // py-3 px-8
  fontSize: '0.875rem',          // text-sm
  fontWeight: 600,               // font-semibold
  transition: 'all 200ms',
  cursor: 'pointer'
}}>
  Zamów teraz
</button>

// Hover state
onMouseEnter={(e) => {
  e.currentTarget.style.opacity = '0.9';
}}
```

#### Secondary Button (Outline)
```jsx
<button style={{
  backgroundColor: 'transparent',
  color: '#1A1512',
  border: '1px solid #A8A29E',
  padding: '0.75rem 2rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  transition: 'all 200ms'
}}>
  Zobacz realizacje
</button>

// Hover state
onMouseEnter={(e) => {
  e.currentTarget.style.borderColor = '#57534E';
}}
```

#### Disabled State
```jsx
style={{
  backgroundColor: '#D1D5DB',
  color: '#9CA3AF',
  opacity: 0.6,
  cursor: 'not-allowed'
}}
```

### Inputy (Form Fields)

#### Text Input (Standard)
```jsx
<input
  type="text"
  style={{
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    color: '#1A1512',
    padding: '0.75rem 1rem',    // py-3 px-4
    fontSize: '1rem',
    borderWidth: '1px',
    outline: 'none',
    transition: 'all 200ms'
  }}
/>

// Focus state
focus:ring-2 focus:ring-offset-2 focus:ring-[#2C2420]
```

#### Error State
```jsx
style={{
  borderColor: '#EF4444',
  backgroundColor: '#FEF2F2'
}}
```

#### Disabled State
```jsx
style={{
  backgroundColor: '#F5F5F4',
  color: '#A8A29E',
  cursor: 'not-allowed'
}}
```

### Karty (Cards)

#### Standard Card
```jsx
<div style={{
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E5E5',
  padding: '1.5rem',
  transition: 'all 200ms'
}}>
  {/* Content */}
</div>

// Hover state
onMouseEnter={(e) => {
  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
}}
```

#### Selected Card
```jsx
<div style={{
  backgroundColor: '#FAF8F5',  // bgBeige
  border: '2px solid #2C2420',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  padding: '1.5rem'
}}>
  {/* Content */}
</div>
```

### Badges

#### Primary Badge
```jsx
<span style={{
  backgroundColor: '#2C2420',
  color: '#FFFFFF',
  fontSize: '0.75rem',       // 12px
  fontWeight: 700,
  padding: '0.25rem 0.75rem',
  display: 'inline-block'
}}>
  NAJPOPULARNIEJSZY
</span>
```

#### Info Badge
```jsx
<span style={{
  backgroundColor: '#F5F5F4',
  color: '#57534E',
  fontSize: '0.75rem',
  fontWeight: 500,
  padding: '0.125rem 0.5rem'
}}>
  +10 zł/m²
</span>
```

---

## 📏 Spacing & Layout

### Spacing Scale (Tailwind-based)

```javascript
{
  0: '0px',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
}
```

### Section Spacing

```jsx
// Standard section
<section style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
  {/* py-16 */}
</section>

// Hero section
<section style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
  {/* py-20 */}
</section>

// Container
<div style={{
  maxWidth: '80rem',      // max-w-7xl (1280px)
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '1rem',
  paddingRight: '1rem'
}}>
</div>
```

### Grid System

```jsx
// 2-column grid (tablet+)
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2rem'
}}>
</div>

// 3-column grid (desktop)
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem'
}}>
</div>

// Responsive grid
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
```

### Border Radius

```javascript
{
  none: '0px',
  sm: '0.125rem',    // 2px
  DEFAULT: '0.25rem', // 4px (preferred)
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  full: '9999px',    // Pills, circles
}
```

**Uwaga:** Projekt preferuje **ostre kąty (0px)** lub **minimalne zaokrąglenia (2-4px)** dla zachowania minimalistycznego, nowoczesnego wyglądu.

---

## 🎭 Shadows & Effects

### Box Shadows

```javascript
// Subtle shadow (cards, hover states)
boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'

// Medium shadow (selected cards)
boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'

// Strong shadow (modals, floating elements)
boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'

// Inner shadow (inputs)
boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
```

**Zasada:** Używaj subtelnych cieni. Unikaj mocnych drop-shadows i glow effects.

### Transitions

```javascript
// Standard transition
transition: 'all 200ms ease-in-out'

// Specific properties
transition: 'background-color 200ms, border-color 200ms, box-shadow 200ms'

// Longer for complex animations
transition: 'all 300ms ease-in-out'
```

**Zasada:** Wszystkie interakcje (hover, focus, active) powinny mieć płynne transitions **200-300ms**.

### Opacity States

```javascript
{
  hover: 0.9,        // Subtle hover on buttons
  disabled: 0.6,     // Disabled elements
  muted: 0.5,        // Very subtle elements
}
```

---

## 📱 Breakpoints (Responsive Design)

### Mobile-First Breakpoints

```javascript
{
  // Mobile: < 640px (default, no prefix)
  sm: '640px',     // Tablet portrait
  md: '768px',     // Tablet landscape
  lg: '1024px',    // Desktop
  xl: '1280px',    // Large desktop
  '2xl': '1536px', // Extra large
}
```

### Przykłady Użycia

```jsx
// Tailwind classes
<div className="
  text-4xl          /* mobile: 36px */
  sm:text-5xl       /* tablet: 48px */
  lg:text-6xl       /* desktop: 60px */
">
  Hero Heading
</div>

// Inline styles (media queries)
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

<div style={{
  fontSize: isMobile ? '2.25rem' : '3.75rem',
  padding: isMobile ? '2rem' : '5rem'
}}>
</div>
```

---

## 🎯 Wzorce UX

### Loading States

```jsx
// Spinner
<svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
  <circle
    className="opacity-25"
    cx="12" cy="12" r="10"
    stroke="currentColor"
    strokeWidth="4"
  />
  <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  />
</svg>
```

### Empty States

```jsx
<div style={{
  padding: '3rem',
  textAlign: 'center',
  color: '#A8A29E'
}}>
  <p>Brak wyników</p>
</div>
```

### Error Messages

```jsx
<p style={{
  color: '#EF4444',
  fontSize: '0.875rem',
  marginTop: '0.25rem'
}}>
  {errors.fieldName}
</p>
```

### Success Messages

```jsx
<div style={{
  backgroundColor: '#D1FAE5',  // green-100
  borderLeft: '4px solid #10B981',
  padding: '1rem',
  color: '#065F46'  // green-800
}}>
  Zamówienie zostało wysłane!
</div>
```

---

## ✅ Do's and Don'ts

### ✅ DO (Rób)

- **Używaj jasnych tła** (#FFFFFF, #FAFAF9, #F5F5F4)
- **Stosuj naturalną paletę** (brązy, szarości, biele)
- **Zachowuj spójność spacingu** (wielokrotności 4px: 8px, 12px, 16px, 24px)
- **Minimalizuj cienie** (subtelne 0.06-0.08 opacity)
- **Używaj prostych przejść** (200-300ms)
- **Testuj kontrast WCAG AA/AAA**
- **Priorytetyzuj czytelność** nad estetyką
- **Używaj system fonts** (Inter + fallbacks)

### ❌ DON'T (Nie rób)

- ❌ **Nie używaj ciemnych tła** (zachowaj jasny motyw)
- ❌ **Nie stosuj jaskrawych kolorów** (neonów, mocnych RGB)
- ❌ **Nie dodawaj złotych akcentów** (#B8860B - to stary design)
- ❌ **Nie używaj mocnych gradientów** (subtelne tylko)
- ❌ **Nie stosuj glow effects** (no box-shadow: 0 0 20px gold)
- ❌ **Nie animuj zbyt intensywnie** (no flashy animations)
- ❌ **Nie zaokrąglaj nadmiernie** (border-radius max 4px, usually 0px)
- ❌ **Nie używaj Comic Sans** (stay with Inter!)

---

## 🌲 Specyfika Produktu (Stare Drewno)

### Kolory Drewna (Product Colors)

Projekt zawiera 11 wariantów kolorystycznych starego drewna:

```javascript
const COLORS = [
  { id: 1, name: 'Brązowy', color: '#8B6914', extraCost: 0 },
  { id: 2, name: 'Czekoladowy', color: '#3E2A1E', extraCost: 0 },
  { id: 3, name: 'Grafitowy', color: '#4A5254', extraCost: 10 },
  { id: 4, name: 'Antracyt', color: '#2E3436', extraCost: 10 },
  { id: 5, name: 'Beżowy', color: '#D4C4A8', extraCost: 5 },
  { id: 6, name: 'Piaskowy', color: '#C9A961', extraCost: 5 },
  { id: 7, name: 'Jasny Brąz', color: '#A67C52', extraCost: 0 },
  { id: 8, name: 'Ciemny Brąz', color: '#5C4033', extraCost: 0 },
  { id: 9, name: 'Miodowy', color: '#D4A574', extraCost: 5 },
  { id: 10, name: 'Wenge', gradient: 'linear-gradient(135deg, #2E2420 0%, #4A3E37 100%)', extraCost: 15 },
  { id: 11, name: 'Orzech', gradient: 'linear-gradient(135deg, #654321 0%, #8B6914 100%)', extraCost: 10 },
];
```

**Wizualizacja:**
- Użyj `color` dla jednolitych kolorów
- Użyj `gradient` dla efektów gradientowych (Wenge, Orzech)
- Dodaj `border: '1px solid rgba(0,0,0,0.1)'` dla lepszej widoczności próbek

---

## 📐 Ikony i Emoji

### Ikony SVG

Projekt używa **inline SVG icons** zamiast icon fonts:

```jsx
// Checkmark
<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
</svg>

// Arrow Right
<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
</svg>

// Instagram
<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919..."/>
</svg>
```

### Emoji (Dopuszczalne)

Projekt używa emoji w kontekście **naturalnym i organicznym**:

```javascript
// FAQ icons
'🌡️' - Obróbka termiczna
'♻️' - Recykling
'✓' - Certyfikat
'🔊' - Akustyka
'🏠' - Wnętrza
'🏢' - Komercja

// Footer icons
'📧' - Email
'📞' - Telefon
'📍' - Lokalizacja
'📦' - Wysyłka
'💳' - Płatność
```

**Zasada:** Używaj emoji **oszczędnie** i tylko tam, gdzie dodają wartość (nie jako dekoracja).

---

## 🧪 Testing & Accessibility

### Kontrast (WCAG)

Wszystkie kombinacje kolorów muszą spełniać **WCAG 2.1 Level AA**:

```javascript
// Minimum contrast ratios:
{
  'Normal text': 4.5:1,      // AA
  'Large text (18px+)': 3:1, // AA
  'UI components': 3:1,      // AA
}

// Recommended (AAA):
{
  'Normal text': 7:1,
  'Large text': 4.5:1,
}
```

**Narzędzia:**
- WebAIM Contrast Checker
- Chrome DevTools Lighthouse
- axe DevTools

### Focus States

```jsx
// Keyboard focus (zawsze widoczny!)
<button style={{
  outline: '2px solid #2C2420',
  outlineOffset: '2px'
}} />

// Focus ring (Tailwind)
className="focus:ring-2 focus:ring-offset-2 focus:ring-[#2C2420]"
```

### Screen Readers

```jsx
// Aria labels
<button aria-label="Zamknij modal">
  <svg>...</svg>
</button>

// Alt text (zawsze!)
<img src="..." alt="Rustykalne deski ze stodoły - kolor brązowy" />

// Form labels (zawsze powiązane!)
<label htmlFor="sqm">Metraż (m²)</label>
<input id="sqm" type="number" />
```

---

## 📦 Struktura Plików

```
antik-holz-order-form/
├── src/
│   └── AntikHolzOrderForm.jsx    # Główny komponent
├── .gitignore
├── LICENSE
├── package.json
├── README.md
├── CLAUDE.md                      # Ten plik!
└── INSTRUKCJA_GITHUB.md
```

---

## 🔄 Version History

### v1.0.0 (2024-12-06)
- ✅ Transformacja z ciemnego na jasny design
- ✅ Paleta kolorów #2C2420 (brąz) zamiast #B8860B (złoty)
- ✅ Jasne tła (#FFFFFF, #FAFAF9, #F5F5F4)
- ✅ Minimalistyczne cienie i transitions
- ✅ Pełna responsywność
- ✅ WCAG AA compliance

---

## 🤖 Instrukcje dla AI

### Podczas Modyfikacji Projektu

1. **ZAWSZE** czytaj ten plik przed wprowadzeniem zmian
2. **SPRAWDŹ** czy nowe komponenty używają palety z `customStyles`
3. **UNIKAJ** wprowadzania kolorów spoza palety
4. **TESTUJ** kontrast WCAG dla nowych kombinacji kolorów
5. **ZACHOWAJ** spójność spacing (wielokrotności 4px)
6. **NIE ZMIENIAJ** filozofii designu bez konsultacji
7. **DOKUMENTUJ** nowe wzorce w tym pliku

### Gdy Dodajesz Nowy Komponent

```jsx
// ✅ GOOD - używa zmiennych z customStyles
<button style={{
  backgroundColor: customStyles.primaryColor,
  color: '#FFFFFF',
  padding: '0.75rem 2rem'
}}>
  Kliknij
</button>

// ❌ BAD - hardcoded colors
<button style={{
  backgroundColor: '#FF5733',  // Random color!
  color: 'white',
  padding: '12px 32px'         // Inconsistent spacing
}}>
  Kliknij
</button>
```

### Przykładowy Checklist

- [ ] Używam kolorów z `customStyles`?
- [ ] Spacing to wielokrotności 4px?
- [ ] Kontrast tekstu spełnia WCAG AA?
- [ ] Transitions są subtelne (200-300ms)?
- [ ] Komponent jest responsywny?
- [ ] Focus states są widoczne?
- [ ] Dodałem aria-labels gdzie potrzeba?

---

## 📞 Kontakt & Feedback

Jeśli ten przewodnik wymaga aktualizacji lub masz pytania:

- **Repository:** https://github.com/Regdarim/antik-holz-order-form
- **Email:** dswiercz91@gmail.com
- **Issues:** [GitHub Issues](https://github.com/Regdarim/antik-holz-order-form/issues)

---

## 📜 Licencja

MIT License - Zobacz plik [LICENSE](./LICENSE)

---

**Wersja dokumentu:** 1.0.0
**Ostatnia aktualizacja:** 2024-12-06
**Autor:** Claude Code + Regdarim

🤖 **Generated with [Claude Code](https://claude.com/claude-code)**
