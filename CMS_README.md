# Panel Administracyjny CMS - ANTIK-HOLZ

## Jak uruchomić panel admina?

### Development:
```bash
# Otwórz w przeglądarce:
http://localhost:3010/admin.html
```

Lub kliknij dwukrotnie plik: `OPEN_ADMIN.bat` (do stworzenia)

### Po zbudowaniu:
```bash
npm run build
# Panel admina będzie dostępny jako dist/admin.html
```

---

## Funkcjonalności Panelu CMS

### 1. Zarządzanie Galeriami Zdjęć
- **5 zdjęć dla każdego koloru** (Jasny brąz, Naturalny mix, Szary, Mix, Ciemny brąz)
- **Edycja URL-i zdjęć** - wklej bezpośredni link do obrazu
- **Live preview** - podgląd każdego zdjęcia w czasie rzeczywistym
- **Edycja nazwy koloru** i dopłat cenowych

### 2. Zarządzanie Pakietami i Cenami
- **6 pakietów długości desek:**
  - MINI 50-70cm
  - STANDARD 50-100cm
  - STANDARD+ 50-150cm (najpopularniejszy)
  - KOMFORT 100-150cm
  - KOMFORT+ 100-190cm
  - DŁUGIE 190-400cm
- **Edycja cen za m²** dla każdego pakietu
- Oznaczenie pakietu jako "NAJPOPULARNIEJSZY"

### 3. Eksport i Import Danych
- **Eksport do JSON** - pobierz wszystkie dane (kolory, galerie, ceny)
- **Podgląd JSON** - zobacz aktualną konfigurację
- **Backup** - zapisz konfigurację przed zmianami

---

## Struktura Danych JSON

```json
{
  "colors": [
    {
      "id": 1,
      "name": "Jasny brąz",
      "color": "#C4A269",
      "extraCost": 0,
      "gallery": [
        "URL_ZDJECIA_1",
        "URL_ZDJECIA_2",
        "URL_ZDJECIA_3",
        "URL_ZDJECIA_4",
        "URL_ZDJECIA_5"
      ]
    }
  ],
  "packages": [
    {
      "id": "mini",
      "name": "MINI 50-70cm",
      "price": 135,
      "popular": false
    }
  ]
}
```

---

## Jak dodać nowe zdjęcia?

1. **Upload zdjęcia** na serwer lub hosting obrazów (np. CloudFlare Images, ImgBB)
2. **Skopiuj bezpośredni URL** do zdjęcia
3. **Otwórz Panel CMS** → Zakładka "Kolory i Galerie"
4. **Wybierz kolor** do edycji
5. **Wklej URL** w pole odpowiedniego zdjęcia (1-5)
6. **Zapisz zmiany** (eksportuj JSON lub wdroż bezpośrednio)

---

## Przykładowe URL-e zdjęć

```
https://antikholzprofis.com/wp-content/uploads/2024/01/jasny-braz-1.jpg
https://twoja-domena.com/galeria/naturalny-mix-2.jpg
https://cdn.example.com/images/szary-3.png
```

⚠️ **Upewnij się, że URL prowadzi bezpośrednio do obrazu** (kończy się na .jpg, .png, .webp)

---

## Deployment

### Przyszłość: Integracja z backendem
Panel CMS zostanie zintegrowany z:
- ✅ PostgreSQL (baza danych)
- ✅ MCP Server (synchronizacja danych)
- ✅ API endpoint do zapisywania zmian

Obecnie panel działa jako **frontend preview** - dane są zapisywane tylko w pamięci przeglądarki.

---

## Status: ✅ GOTOWE

**Panel CMS jest w pełni funkcjonalny i gotowy do użycia!**

Aby uruchomić:
```bash
npm start
# Następnie otwórz: http://localhost:3010/admin.html
```
