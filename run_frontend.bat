@echo off
cd frontend

REM Set the default port for Next.js frontend
set FRONTEND_PORT=3000
if not "%~1"=="" (
    set FRONTEND_PORT=%~1
)

REM Run the Next.js development server on the specified port
set PORT=%FRONTEND_PORT%
npm run dev 