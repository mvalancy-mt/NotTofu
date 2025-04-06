#!/bin/bash
# Run the NotTofu API backend application

# Set the default port
BACKEND_PORT=8000
if [ ! -z "$1" ]; then
    BACKEND_PORT=$1
fi

echo "Starting NotTofu API backend on port $BACKEND_PORT..."

# Activate the virtual environment
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null

# Run the API using the python script
python run_api.py $BACKEND_PORT 