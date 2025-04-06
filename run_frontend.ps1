#!/usr/bin/env pwsh
# PowerShell script to run the NotTofu frontend

# Set default port
$frontendPort = 3000
if ($args.Count -ge 1) {
    $frontendPort = $args[0]
}

Write-Host "Starting NotTofu frontend on port $frontendPort..." -ForegroundColor Cyan

# Change to the frontend directory
Set-Location -Path frontend

# Set the environment variable for Next.js
$env:PORT = $frontendPort

# Run the development server
npm run dev 