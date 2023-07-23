import os
import sys
from ai import ai_entry
from util import get_round, inc_round

if __name__ == '__main__':
    # Check if URL is provided as a command-line argument
    if len(sys.argv) < 2:
        print("Please provide the URL as a command-line argument.")
        sys.exit(1)

    url = sys.argv[1]  # Get lab url
    
    round = get_round()
    ai_entry(url, round)
    inc_round()