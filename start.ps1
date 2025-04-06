#!/usr/bin/env pwsh
# PowerShell script to start the NotTofu application

# Define default ports
$backendPort = 8000
$frontendPort = 3000

# Parse command line arguments
if ($args.Count -ge 1) {
    $backendPort = $args[0]
}
if ($args.Count -ge 2) {
    $frontendPort = $args[1]
}

Write-Host "Starting NotTofu Application..." -ForegroundColor Cyan
Write-Host

Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "- Backend port: $backendPort" -ForegroundColor Blue
Write-Host "- Frontend port: $frontendPort" -ForegroundColor Blue
Write-Host

# Check if backend is already running on the specified port
$backendRunning = $false
try {
    $netstatOutput = netstat -ano | Select-String -Pattern "LISTENING" | Select-String -Pattern ":$backendPort "
    if ($netstatOutput) {
        $backendRunning = $true
    }
} catch {
    # Netstat command may fail in some environments
}

if ($backendRunning) {
    Write-Host "Backend appears to be already running on port $backendPort." -ForegroundColor Yellow
    Write-Host "If you want to restart it, please stop the current instance first." -ForegroundColor Yellow
    Write-Host
} else {
    Write-Host "Starting backend server on port $backendPort..." -ForegroundColor Cyan
    
    # Start backend in a new PowerShell window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "& {& `"$PSScriptRoot\run_backend.bat`" $backendPort}"
    
    Write-Host "Backend server starting in a new window..." -ForegroundColor Green
    Write-Host
    
    # Wait a moment for backend to initialize
    Start-Sleep -Seconds 3
}

# Check if frontend is already running
$frontendRunning = $false
try {
    $netstatOutput = netstat -ano | Select-String -Pattern "LISTENING" | Select-String -Pattern ":$frontendPort "
    if ($netstatOutput) {
        $frontendRunning = $true
    }
} catch {
    # Netstat command may fail in some environments
}

if ($frontendRunning) {
    Write-Host "Frontend appears to be already running on port $frontendPort." -ForegroundColor Yellow
    Write-Host "If you want to restart it, please stop the current instance first." -ForegroundColor Yellow
    Write-Host
} else {
    Write-Host "Starting frontend development server on port $frontendPort..." -ForegroundColor Cyan
    
    # Start frontend in a new PowerShell window
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "& {& `"$PSScriptRoot\run_frontend.bat`" $frontendPort}"
    
    Write-Host "Frontend server starting in a new window..." -ForegroundColor Green
    Write-Host
}

Write-Host "NotTofu application is starting up!" -ForegroundColor Green
Write-Host
Write-Host "You can access:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:$frontendPort" -ForegroundColor Blue
Write-Host "- Backend API: http://localhost:$backendPort" -ForegroundColor Blue
Write-Host 