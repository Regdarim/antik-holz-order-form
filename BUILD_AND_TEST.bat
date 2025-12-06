@echo off
REM ============================================================================
REM ANTIK-HOLZ Build & Test - Production Preview
REM ============================================================================
REM Buduje aplikacje produkcyjnie i uruchamia podglad
REM ============================================================================

echo.
echo ========================================
echo   ANTIK-HOLZ Build ^& Test
echo ========================================
echo.

echo [1/2] Budowanie wersji produkcyjnej...
call npm run build
if errorlevel 1 (
    echo [X] Blad podczas budowania!
    pause
    exit /b 1
)
echo [OK] Build zakończony pomyślnie
echo.

echo [2/2] Uruchamianie podgladu produkcyjnego...
echo [*] Serwer bedzie dostepny na: http://localhost:4173
echo [*] Aby zatrzymac, nacisnij Ctrl+C
echo.

call npm run preview

echo.
echo Podglad zatrzymany.
pause
