#!/bin/bash

# Define the folder path
folder_path="result"

# Check if the folder exists and is a directory
if [ -d "$folder_path" ]; then
    # Remove all files in the folder
    rm -f "$folder_path"/*
    echo "Files removed from the 'result' folder."
else
    echo "The 'result' folder does not exist or is not a directory."
fi


folder_path2="prompt"

# Check if the folder exists and is a directory
if [ -d "$folder_path2" ]; then
    # Remove all files in the folder
    rm -f "$folder_path2"/*
    echo "Files removed from the 'prompt' folder."
else
    echo "The 'prompt' folder does not exist or is not a directory."
fi
