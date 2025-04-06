#!/usr/bin/env python
"""
Simple script to run the NotTofu API backend
This provides a reliable way to start the backend server
"""
import os
import sys
import platform
import uvicorn

def main():
    # Print system information
    print(f"Python version: {platform.python_version()}")
    print(f"Operating System: {platform.system()} {platform.release()}")
    
    # Get port from command line or use default
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"Invalid port number: {sys.argv[1]}")
            print(f"Using default port {port}")
    
    print(f"Starting NotTofu API on port {port}")
    
    # The host 0.0.0.0 allows connections from other machines
    # If you only want local connections, use 127.0.0.1
    host = "0.0.0.0"
    
    # Use reload=True for development to auto-reload on file changes
    uvicorn.run("app.main:app", host=host, port=port, reload=True)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nAPI server stopped")
    except Exception as e:
        print(f"Error starting API server: {e}") 