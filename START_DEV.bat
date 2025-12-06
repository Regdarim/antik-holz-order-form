@echo off
REM ============================================================================
REM ANTIK-HOLZ Development Server - Quick Start
REM ============================================================================
REM Uruchamia serwer deweloperski Vite z automatycznym odswiezaniem
REM Aplikacja dostepna na: http://localhost:3000
REM ============================================================================

echo.
echo ========================================
echo   ANTIK-HOLZ Development Server
echo ========================================
echo.
echo [1/3] Sprawdzanie zaleznosci...

if not exist "node_modules\" (
    echo [!] Instalowanie zaleznosci npm...
    call npm install
    if errorlevel 1 (
        echo [X] Blad podczas instalacji zaleznosci!
        pause
        exit /b 1
    )
    echo [OK] Zaleznosci zainstalowane
) else (
    echo [OK] Zaleznosci juz zainstalowane
)

echo.
echo [2/3] Uruchamianie serwera deweloperskiego...
echo.
echo [*] Serwer bedzie dostepny na: http://localhost:3000
echo [*] Hot-reload wlaczony - zmiany sa widoczne od razu
echo [*] Aby zatrzymac serwer, nacisnij Ctrl+C
echo.
echo ========================================
echo.

REM Uruchom serwer deweloperski
call npm start

echo.
echo [3/3] Serwer zatrzymany.
pause
