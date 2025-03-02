#!/bin/bash

# Define the client-side directory
CLIENT_DIR="src" # Adjust this to your client-side directory

# Function to remove dotenv import from client-side files
remove_dotenv_from_client() {
  echo "Removing dotenv import from client-side files..."
  grep -rl "import dotenv from 'dotenv'" $CLIENT_DIR | while read -r file; do
    # Remove the dotenv import line
    sed -i "/import dotenv from 'dotenv'/d" "$file"
    echo "Removed dotenv import from $file"
  done
}

# Execute the function
remove_dotenv_from_client

echo "Done."
