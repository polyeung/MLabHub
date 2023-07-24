import os
import sys
from ai import ai_entry
from util import get_round, inc_round

if __name__ == '__main__':
    # Check if URL is provided as a command-line argument

    if len(sys.argv) < 3:
        print("Please provide the onlyPrompt boolean as a command-line argument. and dep, python driver.py 1/0 dep_name")
        sys.exit(1)

    onlyPrompt = bool(int(sys.argv[1])) # Get lab url
    dep = sys.argv[2]

    if onlyPrompt:
        print("Mode: non gpt output")
    else:
        print("Mode: GPT output")

    with open(f'./source/ece_urls.txt' ,'r', encoding='utf-8') as file:
        for line in file:
            url = line.strip()
            round = get_round()
            ai_entry(url, round, onlyPrompt, dep)
            inc_round()