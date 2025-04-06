# NotTofu Project Setup PowerShell Script
Write-Host "Setting up the NotTofu project..." -ForegroundColor Cyan

# Function to check if command exists
function Test-CommandExists {
    param ($command)
    $exists = $null -ne (Get-Command $command -ErrorAction SilentlyContinue)
    return $exists
}

# Check for npm
if (-not (Test-CommandExists "npm")) {
    Write-Host "Node.js/npm is required but not found. Please install Node.js and try again." -ForegroundColor Red
    exit 1
}

# Check Node.js version
$nodeVersion = (node -v).Substring(1)
Write-Host "Using Node.js version: $nodeVersion" -ForegroundColor Green

# Install root dependencies
Write-Host "`nInstalling root project dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install root project dependencies." -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host "`nInstalling frontend dependencies..." -ForegroundColor Cyan
if (-not (Test-Path -Path "frontend")) {
    Write-Host "Frontend directory not found. Creating it now..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "frontend"
}

Set-Location -Path "frontend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install frontend dependencies." -ForegroundColor Red
    Set-Location -Path ".."
    exit 1
}
Set-Location -Path ".."

# Create .env files if they don't exist
if (-not (Test-Path -Path ".env.local")) {
    Write-Host "`nCreating root .env.local file..." -ForegroundColor Cyan
    @"
# Root project environment variables
NODE_ENV=development
"@ | Out-File -FilePath ".env.local" -Encoding utf8
}

if (-not (Test-Path -Path "frontend/.env.local")) {
    Write-Host "Creating frontend .env.local file..." -ForegroundColor Cyan
    @"
# Frontend environment variables
NEXT_PUBLIC_API_URL=http://localhost:3001/api
"@ | Out-File -FilePath "frontend/.env.local" -Encoding utf8
}

# Setup complete
Write-Host "`nSetup complete! 🚀" -ForegroundColor Green
Write-Host "`nTo start the development servers:" -ForegroundColor Yellow
Write-Host "1. Root server: npm run dev" -ForegroundColor Yellow
Write-Host "2. Frontend server: cd frontend; npm run dev" -ForegroundColor Yellow
Write-Host "`nOr use the convenience script: npm run dev:all" -ForegroundColor Yellow 