#!/bin/bash

# NotTofu Startup Script for Linux/Mac
echo -e "\033[1;36mStarting NotTofu...\033[0m"

# Check if npx is available (part of npm)
if ! command -v npx &> /dev/null; then
    echo -e "\033[1;31mError: npx command not found. Please install Node.js and npm.\033[0m"
    exit 1
fi

# Check if concurrently is installed
if ! npx concurrently --version &> /dev/null; then
    echo -e "\033[1;33mInstalling concurrently package...\033[0m"
    npm install -g concurrently
    if [ $? -ne 0 ]; then
        echo -e "\033[1;31mFailed to install concurrently. Please run 'npm install -g concurrently' manually.\033[0m"
        exit 1
    fi
fi

# Check if frontend/node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo -e "\033[1;33mSetting up project for first run...\033[0m"
    
    # Install root dependencies
    echo -e "\033[1;36mInstalling root dependencies...\033[0m"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "\033[1;31mFailed to install dependencies. Please run setup.sh manually.\033[0m"
        exit 1
    fi
    
    # Install frontend dependencies
    echo -e "\033[1;36mInstalling frontend dependencies...\033[0m"
    cd frontend
    npm install
    if [ $? -ne 0 ]; then
        echo -e "\033[1;31mFailed to install frontend dependencies.\033[0m"
        cd ..
        exit 1
    fi
    cd ..
fi

# Make executable
chmod +x start.sh

# Run both servers
echo -e "\n\033[1;32mStarting NotTofu servers...\033[0m"
echo -e "\033[1;36mBackend running on port 3001, Frontend on port 3000\033[0m"
echo -e "\033[1;33mPress Ctrl+C to stop all servers\033[0m\n"

# Start the servers
npx concurrently --kill-others --prefix "[{name}]" --names "BACKEND,FRONTEND" --prefix-colors "cyan.bold,green.bold" "npm run dev:root" "npm run dev:frontend" 