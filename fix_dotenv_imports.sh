#!/bin/bash

# Define the directories to search for client-side files and server-side files
CLIENT_DIR="src" # Adjust this to your client-side directory
SERVER_DIR="server" # Adjust this to your server-side directory

# Function to remove dotenv import from client-side files
remove_dotenv_from_client() {
  echo "Removing dotenv import from client-side files..."
  grep -rl "import dotenv from 'dotenv'" $CLIENT_DIR | while read -r file; do
    # Remove the dotenv import line
    sed -i "/import dotenv from 'dotenv'/d" "$file"
    echo "Removed dotenv import from $file"
  done
}

# Function to ensure dotenv is imported in server-side files
ensure_dotenv_in_server() {
  echo "Ensuring dotenv is imported in server-side files..."
  grep -rl "require('dotenv').config()" $SERVER_DIR | while read -r file; do
    if ! grep -q "require('dotenv').config()" "$file"; then
      # Add the dotenv import at the top of the file
      sed -i "1s/^/require('dotenv').config();\n/" "$file"
      echo "Added dotenv import to $file"
    else
      echo "dotenv import already present in $file"
    fi
  done
}

# Execute the functions
remove_dotenv_from_client
ensure_dotenv_in_server

echo "Done."
