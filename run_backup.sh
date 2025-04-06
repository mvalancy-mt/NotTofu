#!/bin/bash

# Get the current date and time for timestamp
timestamp=$(date +"%Y-%m-%d_%H-%M-%S")
backup_dir="$HOME/.nottofu/backups"
backup_name="nottofu_backup_$timestamp"

# Script information
echo "NotTofu Backup Utility"
echo
echo "Creating backup with timestamp: $timestamp"
echo

# Ensure backup directory exists
if [ ! -d "$backup_dir" ]; then
    echo "Creating backup directory: $backup_dir"
    mkdir -p "$backup_dir"
fi

# Backup database (SQLite file)
if [ -f "app/database.db" ]; then
    echo "Backing up database..."
    cp "app/database.db" "$backup_dir/${backup_name}.db"
    echo "- Database backup complete"
else
    echo "- Database file not found, skipping"
fi

# Backup logs directory if it exists
if [ -d "logs" ]; then
    echo "Backing up logs..."
    mkdir -p "$backup_dir/${backup_name}_logs"
    cp -r logs/* "$backup_dir/${backup_name}_logs/" 2>/dev/null
    echo "- Logs backup complete"
else
    echo "- Logs directory not found, skipping"
fi

# Create metadata file with backup information
echo "Creating backup metadata file..."
cat > "$backup_dir/${backup_name}_info.txt" << EOF
Backup created: $timestamp
Application version: 1.0.0

Contents:
- Database: app/database.db
- Logs: logs/
EOF

echo
echo "Backup complete! Files stored in:"
echo "$backup_dir/${backup_name}.*"
echo

# Make script executable
chmod +x "$0" 