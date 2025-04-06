#!/bin/bash
# Run the Next.js frontend application

# Set the default port
FRONTEND_PORT=3000
if [ ! -z "$1" ]; then
    FRONTEND_PORT=$1
fi

echo "Starting NotTofu frontend on port $FRONTEND_PORT..."

# Change to the frontend directory
cd frontend

# Set the environment variable for Next.js
export PORT=$FRONTEND_PORT

# Run the development server
npm run dev 