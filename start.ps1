# NotTofu Startup Script for Windows
Write-Host "Starting NotTofu..." -ForegroundColor Cyan

# Check if concurrently is installed
$concurrentlyInstalled = npm list -g concurrently 2>$null
if ($concurrentlyInstalled -notlike "*concurrently*") {
    Write-Host "Installing concurrently package globally..." -ForegroundColor Yellow
    npm install -g concurrently
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install concurrently. Please run 'npm install -g concurrently' manually." -ForegroundColor Red
        exit 1
    }
}

# Check if frontend/node_modules exists
if (-not (Test-Path -Path "frontend/node_modules")) {
    Write-Host "Setting up project for first run..." -ForegroundColor Yellow
    
    # Install root dependencies
    Write-Host "Installing root dependencies..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install dependencies. Please run setup.ps1 manually." -ForegroundColor Red
        exit 1
    }
    
    # Install frontend dependencies
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    Set-Location -Path "frontend"
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install frontend dependencies." -ForegroundColor Red
        Set-Location -Path ".."
        exit 1
    }
    Set-Location -Path ".."
}

# Run both servers
Write-Host "`nStarting NotTofu servers..." -ForegroundColor Green
Write-Host "Backend running on port 3001, Frontend on port 3000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop all servers`n" -ForegroundColor Yellow

# Start the servers
npx concurrently --kill-others --prefix "[{name}]" --names "BACKEND,FRONTEND" --prefix-colors "cyan.bold,green.bold" "npm run dev:root" "npm run dev:frontend" 