#!/bin/bash

# NotTofu Project Setup Script
echo -e "\033[1;36mSetting up the NotTofu project...\033[0m"

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo -e "\033[1;31mPython 3 is required but not found. Please install Python 3.7+ and try again.\033[0m"
    exit 1
fi

# Check Python version
PYTHON_VERSION=$(python3 --version 2>&1 | cut -d' ' -f2)
echo -e "\033[1;32mUsing Python version: $PYTHON_VERSION\033[0m"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "\033[1;31mNode.js/npm is required but not found. Please install Node.js and try again.\033[0m"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v)
echo -e "\033[1;32mUsing Node.js version: $NODE_VERSION\033[0m"

# Create and activate virtual environment
echo -e "\n\033[1;36mCreating Python virtual environment...\033[0m"
if [ ! -d "venv" ]; then
    python3 -m venv venv
else
    echo -e "\033[1;33mVirtual environment already exists, skipping creation.\033[0m"
fi

# Activate virtual environment
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo -e "\033[1;31mFailed to activate virtual environment.\033[0m"
    exit 1
fi

# Install backend dependencies
echo -e "\n\033[1;36mInstalling backend Python dependencies...\033[0m"
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo -e "\033[1;31mFailed to install Python dependencies.\033[0m"
    exit 1
fi

# Check if uvicorn is installed, if not install it separately
if ! pip show uvicorn &> /dev/null; then
    echo -e "\033[1;33mUvicorn not found, installing it now...\033[0m"
    pip install "uvicorn[standard]"
    if [ $? -ne 0 ]; then
        echo -e "\033[1;31mFailed to install uvicorn.\033[0m"
        exit 1
    fi
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

# Install Tailwind Forms plugin
echo -e "\n\033[1;36mInstalling Tailwind Forms plugin...\033[0m"
npm install -D @tailwindcss/forms
if [ $? -ne 0 ]; then
    echo -e "\033[1;31mFailed to install Tailwind Forms plugin.\033[0m"
    cd ..
    exit 1
fi
cd ..

# Initialize the database if it doesn't exist
echo -e "\n\033[1;36mChecking database...\033[0m"
if [ ! -f "NotTofu.db" ]; then
    echo -e "\033[1;33mInitializing the database...\033[0m"
    python -m app.database
    if [ $? -ne 0 ]; then
        echo -e "\033[1;31mFailed to initialize the database.\033[0m"
        exit 1
    fi
    
    echo -e "\033[1;33mRunning migrations...\033[0m"
    alembic upgrade head
    if [ $? -ne 0 ]; then
        echo -e "\033[1;31mFailed to run migrations.\033[0m"
        exit 1
    fi
else
    echo -e "\033[1;33mDatabase already exists, skipping initialization.\033[0m"
fi

# Create convenience scripts
echo -e "\n\033[1;36mCreating convenience scripts...\033[0m"

# Create run_backend.sh
cat > run_backend.sh << 'EOF'
#!/bin/bash
source venv/bin/activate
python -m uvicorn app.main:app --reload --port $1
EOF
chmod +x run_backend.sh

# Create run_frontend.sh
cat > run_frontend.sh << 'EOF'
#!/bin/bash
cd frontend
npm run dev
EOF
chmod +x run_frontend.sh

# Make setup script executable
chmod +x setup.sh

# Setup complete
echo -e "\n\033[1;32mSetup complete! 🚀\033[0m"
echo -e "\n\033[1;33mTo start the application:\033[0m"
echo -e "\033[1;33m1. Backend server: ./run_backend.sh 8000\033[0m"
echo -e "\033[1;33m2. Frontend server: ./run_frontend.sh\033[0m"
echo -e "\033[1;33mOr use: ./start.sh\033[0m"
echo -e "\n\033[1;33mYou can view the application at:\033[0m"
echo -e "\033[1;33m- Frontend: http://localhost:3000\033[0m"
echo -e "\033[1;33m- Backend API: http://localhost:8000\033[0m"
echo -e "\n"

# Deactivate virtual environment
deactivate 