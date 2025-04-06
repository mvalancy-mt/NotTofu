#!/bin/bash

# NotTofu Project Setup Script
echo -e "\033[1;36mSetting up the NotTofu project...\033[0m"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "\033[1;31mNode.js/npm is required but not found. Please install Node.js and try again.\033[0m"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -c2-)
echo -e "\033[1;32mUsing Node.js version: $NODE_VERSION\033[0m"

# Install root dependencies
echo -e "\n\033[1;36mInstalling root project dependencies...\033[0m"
npm install
if [ $? -ne 0 ]; then
    echo -e "\033[1;31mFailed to install root project dependencies.\033[0m"
    exit 1
fi

# Install frontend dependencies
echo -e "\n\033[1;36mInstalling frontend dependencies...\033[0m"
if [ ! -d "frontend" ]; then
    echo -e "\033[1;33mFrontend directory not found. Creating it now...\033[0m"
    mkdir -p frontend
fi

cd frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "\033[1;31mFailed to install frontend dependencies.\033[0m"
    cd ..
    exit 1
fi
cd ..

# Create .env files if they don't exist
if [ ! -f ".env.local" ]; then
    echo -e "\n\033[1;36mCreating root .env.local file...\033[0m"
    cat > .env.local << EOF
# Root project environment variables
NODE_ENV=development
EOF
fi

if [ ! -f "frontend/.env.local" ]; then
    echo -e "\033[1;36mCreating frontend .env.local file...\033[0m"
    cat > frontend/.env.local << EOF
# Frontend environment variables
NEXT_PUBLIC_API_URL=http://localhost:3001/api
EOF
fi

# Make setup script executable
chmod +x setup.sh

# Setup complete
echo -e "\n\033[1;32mSetup complete! 🚀\033[0m"
echo -e "\n\033[1;33mTo start the development servers:\033[0m"
echo -e "\033[1;33m1. Root server: npm run dev\033[0m"
echo -e "\033[1;33m2. Frontend server: cd frontend && npm run dev\033[0m"
echo -e "\n\033[1;33mOr use the convenience script: npm run dev:all\033[0m" 