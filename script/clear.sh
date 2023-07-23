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


# reset store/round.txt
file_path="./store/round.txt"

# Check if the file exists
if [ -f "$file_path" ]; then
    # Overwrite the content of the file with new content
    echo "0" > "$file_path"
    echo "File content has been overwritten."
else
    echo "The file 'round.txt' does not exist."
fi