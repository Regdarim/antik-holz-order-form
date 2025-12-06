@echo off
echo ============================================
echo ANTIK-HOLZ - Upload to GitHub
echo ============================================
echo.
echo UWAGA: Najpierw utworz repozytorium na GitHub:
echo https://github.com/new
echo.
echo Nazwa: antik-holz-order-form
echo Opis: Formularz zamowien dla ANTIK-HOLZ - stare deski rustykalne ze stodoly
echo.
echo ============================================
echo.

set /p GITHUB_USERNAME="Podaj swoja nazwe uzytkownika GitHub: "

echo.
echo Dodawanie remote...
git remote add origin https://github.com/%GITHUB_USERNAME%/antik-holz-order-form.git

echo.
echo Zmienianie nazwy brancha na main...
git branch -M main

echo.
echo Wysylanie do GitHub...
git push -u origin main

echo.
echo ============================================
echo GOTOWE! Repozytorium zostalo wrzucone na GitHub
echo Link: https://github.com/%GITHUB_USERNAME%/antik-holz-order-form
echo ============================================
pause
