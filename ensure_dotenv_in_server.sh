#!/bin/bash

# Define the server-side directory
SERVER_DIR="src/services" # Adjust this to your correct server-side directory

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

# Execute the function
ensure_dotenv_in_server

echo "Done."
