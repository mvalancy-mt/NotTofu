@echo off
echo Starting NotTofu Application...
echo.

REM Define port for backend server
set BACKEND_PORT=8000
set FRONTEND_PORT=3000

REM Check for command line arguments
if not "%~1"=="" (
    set BACKEND_PORT=%~1
)
if not "%~2"=="" (
    set FRONTEND_PORT=%~2
)

echo Configuration:
echo - Backend port: %BACKEND_PORT%
echo - Frontend port: %FRONTEND_PORT%
echo.

REM Check if backend is already running on the specified port
netstat -ano | find "LISTENING" | find ":%BACKEND_PORT%" > nul
if %ERRORLEVEL% EQU 0 (
    echo Backend appears to be already running on port %BACKEND_PORT%.
    echo If you want to restart it, please stop the current instance first.
    echo.
) else (
    echo Starting backend server on port %BACKEND_PORT%...
    start "NotTofu Backend" cmd /c "run_backend.bat %BACKEND_PORT%"
    echo Backend server starting in a new window...
    echo.
    
    REM Wait a moment for backend to initialize
    timeout /t 3 > nul
)

REM Check if frontend is already running
netstat -ano | find "LISTENING" | find ":%FRONTEND_PORT%" > nul
if %ERRORLEVEL% EQU 0 (
    echo Frontend appears to be already running on port %FRONTEND_PORT%.
    echo If you want to restart it, please stop the current instance first.
    echo.
) else (
    echo Starting frontend development server on port %FRONTEND_PORT%...
    start "NotTofu Frontend" cmd /c "run_frontend.bat %FRONTEND_PORT%"
    echo Frontend server starting in a new window...
    echo.
)

echo NotTofu application is starting up!
echo.
echo You can access:
echo - Frontend: http://localhost:%FRONTEND_PORT%
echo - Backend API: http://localhost:%BACKEND_PORT%
echo.
echo Press any key to exit this window (servers will continue running)...
pause > nul 