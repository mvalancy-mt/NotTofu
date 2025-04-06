@echo off
echo Setting up the NotTofu project...
echo.

REM Check if Python is installed
python --version > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Python is required but not found. Please install Python 3.7+ and try again.
    exit /b 1
)

REM Check Python version
for /f "tokens=2" %%V in ('python --version 2^>^&1') do set PYTHON_VERSION=%%V
echo Using Python version: %PYTHON_VERSION%

REM Check if npm is installed
npm --version > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js/npm is required but not found. Please install Node.js and try again.
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1" %%V in ('node -v') do set NODE_VERSION=%%V
echo Using Node.js version: %NODE_VERSION%

REM Create and activate virtual environment
echo.
echo Creating Python virtual environment...
if not exist venv (
    python -m venv venv
) else (
    echo Virtual environment already exists, skipping creation.
)

REM Activate virtual environment
call venv\Scripts\activate.bat
if %ERRORLEVEL% NEQ 0 (
    echo Failed to activate virtual environment.
    exit /b 1
)

REM Install backend dependencies
echo.
echo Installing backend Python dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install Python dependencies.
    exit /b 1
)

REM Check if uvicorn is installed, if not install it separately
pip show uvicorn > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Uvicorn not found, installing it now...
    pip install uvicorn[standard]
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install uvicorn.
        exit /b 1
    )
)

REM Install frontend dependencies
echo.
echo Installing frontend dependencies...
if not exist frontend (
    echo Frontend directory not found. Creating it now...
    mkdir frontend
)

cd frontend
npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install frontend dependencies.
    cd ..
    exit /b 1
)

REM Install Tailwind Forms plugin
echo.
echo Installing Tailwind Forms plugin...
npm install -D @tailwindcss/forms
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install Tailwind Forms plugin.
    cd ..
    exit /b 1
)
cd ..

REM Initialize the database if it doesn't exist
echo.
if not exist NotTofu.db (
    echo Initializing the database...
    python -m app.database
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to initialize the database.
        exit /b 1
    )
    
    echo Running migrations...
    alembic upgrade head
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to run migrations.
        exit /b 1
    )
) else (
    echo Database already exists, skipping initialization.
)

REM Create convenience scripts
echo.
echo Creating convenience scripts...

echo @echo off > run_backend.bat
echo call venv\Scripts\activate.bat >> run_backend.bat
echo python -m uvicorn app.main:app --reload --port %%1 >> run_backend.bat
echo. >> run_backend.bat

echo @echo off > run_frontend.bat
echo cd frontend >> run_frontend.bat
echo npm run dev >> run_frontend.bat
echo. >> run_frontend.bat

REM Setup complete
echo.
echo Setup complete! 
echo.
echo To start the application:
echo 1. Backend server: run_backend.bat 8000
echo 2. Frontend server: run_frontend.bat
echo Or use: start.bat
echo.
echo You can view the application at:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:8000
echo.

REM Deactivate virtual environment
call venv\Scripts\deactivate.bat 