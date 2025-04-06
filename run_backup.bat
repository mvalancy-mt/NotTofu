@echo off
setlocal enabledelayedexpansion

:: Get the current date and time for timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YYYY=%dt:~0,4%"
set "MM=%dt:~4,2%"
set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%"
set "Min=%dt:~10,2%"
set "Sec=%dt:~12,2%"

set "timestamp=%YYYY%-%MM%-%DD%_%HH%-%Min%-%Sec%"
set "backup_dir=%APPDATA%\NotTofu\Backups"
set "backup_name=nottofu_backup_%timestamp%"

echo NotTofu Backup Utility
echo.
echo Creating backup with timestamp: %timestamp%
echo.

:: Ensure backup directory exists
if not exist "%backup_dir%" (
    echo Creating backup directory: %backup_dir%
    mkdir "%backup_dir%"
)

:: Backup database (SQLite file)
if exist "app\database.db" (
    echo Backing up database...
    copy "app\database.db" "%backup_dir%\%backup_name%.db" > nul
    echo - Database backup complete
) else (
    echo - Database file not found, skipping
)

:: Backup logs directory if it exists
if exist "logs\" (
    echo Backing up logs...
    if not exist "%backup_dir%\%backup_name%_logs\" mkdir "%backup_dir%\%backup_name%_logs\"
    xcopy "logs\*" "%backup_dir%\%backup_name%_logs\" /E /I /Q /Y > nul
    echo - Logs backup complete
) else (
    echo - Logs directory not found, skipping
)

:: Create metadata file with backup information
echo Creating backup metadata file...
echo Backup created: %timestamp% > "%backup_dir%\%backup_name%_info.txt"
echo Application version: 1.0.0 >> "%backup_dir%\%backup_name%_info.txt"
echo. >> "%backup_dir%\%backup_name%_info.txt"
echo Contents: >> "%backup_dir%\%backup_name%_info.txt"
echo - Database: app\database.db >> "%backup_dir%\%backup_name%_info.txt"
echo - Logs: logs\ >> "%backup_dir%\%backup_name%_info.txt"

echo.
echo Backup complete! Files stored in:
echo %backup_dir%\%backup_name%.*
echo.

endlocal 