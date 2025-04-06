#!/usr/bin/env pwsh
# PowerShell script to run the NotTofu backend API

# Set default port
$backendPort = 8000
if ($args.Count -ge 1) {
    $backendPort = $args[0]
}

Write-Host "Starting NotTofu backend on port $backendPort..." -ForegroundColor Cyan

# Activate the virtual environment if it exists
if (Test-Path "venv\Scripts\Activate.ps1") {
    . .\venv\Scripts\Activate.ps1
    Write-Host "Activated Python virtual environment" -ForegroundColor DarkGray
}

# Run the API using the Python script
python run_api.py $backendPort 