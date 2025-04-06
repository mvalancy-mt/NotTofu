@echo off
echo Starting NotTofu...

:: Install concurrently if needed
call npm list -g concurrently >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Installing concurrently package globally...
    call npm install -g concurrently
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install concurrently. Please run 'npm install -g concurrently' manually.
        exit /b 1
    )
)

:: Check if setup is needed
if not exist frontend\node_modules (
    echo Setting up project for first run...
    
    echo Installing root dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install dependencies. Please run setup.ps1 manually.
        exit /b 1
    )
    
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install frontend dependencies.
        cd ..
        exit /b 1
    )
    cd ..
)

:: Run both servers
echo.
echo Starting NotTofu servers...
echo Backend running on port 3001, Frontend on port 3000
echo Press Ctrl+C to stop all servers
echo.

:: Start the servers
npx concurrently --kill-others --prefix "[{name}]" --names "BACKEND,FRONTEND" --prefix-colors "cyan.bold,green.bold" "npm run dev:root" "npm run dev:frontend" 