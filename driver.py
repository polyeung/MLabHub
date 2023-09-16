import os
import sys
from ai import ai_entry
from util import get_round, inc_round

if __name__ == '__main__':
    ## TO DO: the file that has urls should be given in a command-line argument or we should use the department name to specify the file name
    ## TO DO: It shouldn't be hardcoded

    if len(sys.argv) != 3:
        print("Please provide the onlyPrompt boolean value and department name as a command-line argument.\nThe line should look like this. python driver.py 1/0 dep_name")
        sys.exit(1)

    onlyPrompt = bool(int(sys.argv[1])) # Get lab url
    dep = sys.argv[2]

    if onlyPrompt:
        print("Mode: non gpt output")
    else:
        print("Mode: GPT output")

    with open(f'./source/si_urls.txt' ,'r', encoding='utf-8') as file:
        for line in file:
            url = line.strip()
            if url[0] == "#":
                continue
            round = get_round()
            ai_entry(url, round, onlyPrompt, dep)
            inc_round()