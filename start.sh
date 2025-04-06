#!/bin/bash

# NotTofu Startup Script for Linux/Mac
echo -e "\033[1;36mStarting NotTofu Application...\033[0m"
echo

# Define default ports
BACKEND_PORT=8000
FRONTEND_PORT=3000

# Parse command line arguments
if [ ! -z "$1" ]; then
    BACKEND_PORT=$1
fi
if [ ! -z "$2" ]; then
    FRONTEND_PORT=$2
fi

echo -e "\033[1;33mConfiguration:\033[0m"
echo -e "- Backend port: \033[1;34m$BACKEND_PORT\033[0m"
echo -e "- Frontend port: \033[1;34m$FRONTEND_PORT\033[0m"
echo

# Check if backend is already running
if netstat -tuln 2>/dev/null | grep "LISTEN" | grep ":$BACKEND_PORT " > /dev/null; then
    echo -e "\033[1;33mBackend appears to be already running on port $BACKEND_PORT.\033[0m"
    echo -e "\033[1;33mIf you want to restart it, please stop the current instance first.\033[0m"
    echo
else
    echo -e "\033[1;36mStarting backend server on port $BACKEND_PORT...\033[0m"
    # Use nohup to keep the process running after the terminal is closed
    chmod +x run_backend.sh
    nohup ./run_backend.sh $BACKEND_PORT > backend.log 2>&1 &
    BACKEND_PID=$!
    echo -e "\033[1;32mBackend server started with PID $BACKEND_PID\033[0m"
    echo
    
    # Wait a moment for backend to initialize
    sleep 3
fi

# Check if frontend is already running
if netstat -tuln 2>/dev/null | grep "LISTEN" | grep ":$FRONTEND_PORT " > /dev/null; then
    echo -e "\033[1;33mFrontend appears to be already running on port $FRONTEND_PORT.\033[0m"
    echo -e "\033[1;33mIf you want to restart it, please stop the current instance first.\033[0m"
    echo
else
    echo -e "\033[1;36mStarting frontend development server on port $FRONTEND_PORT...\033[0m"
    # Use nohup to keep the process running after the terminal is closed
    chmod +x run_frontend.sh
    nohup ./run_frontend.sh $FRONTEND_PORT > frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo -e "\033[1;32mFrontend server started with PID $FRONTEND_PID\033[0m"
    echo
fi

echo -e "\033[1;32mNotTofu application is starting up!\033[0m"
echo
echo -e "You can access:"
echo -e "- Frontend: \033[1;34mhttp://localhost:$FRONTEND_PORT\033[0m"
echo -e "- Backend API: \033[1;34mhttp://localhost:$BACKEND_PORT\033[0m"
echo
echo -e "Check \033[1;33mbackend.log\033[0m and \033[1;33mfrontend.log\033[0m for output"
echo
echo -e "To stop the servers, run: \033[1;33mkill $BACKEND_PID $FRONTEND_PID\033[0m"

# If running in background, show how to view logs
if ! command -v gnome-terminal &>/dev/null && ! command -v konsole &>/dev/null && ! command -v xterm &>/dev/null && ! (command -v open &>/dev/null && [ "$(uname)" == "Darwin" ]); then
    echo -e "To view backend logs: \033[1;33mtail -f backend.log\033[0m"
    echo -e "To view frontend logs: \033[1;33mtail -f frontend.log\033[0m"
    echo
fi 