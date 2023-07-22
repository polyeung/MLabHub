import os
import sys
from ai import ask_gpt
from scrape import download_txt_main, download_txt_people

def gen_prompt(scrape_text):
    return "from below source, generate labname + newline + brief intro of lab(400 characters max) " + scrape_text


def gen_prompt_people(scrape_text):
    return "from below source of research lab's member intro, generate member1,member2, .... output membername one by one concatenated by comma " + scrape_text


if __name__ == '__main__':
    # Check if URL is provided as a command-line argument
    if len(sys.argv) < 2:
        print("Please provide the URL as a command-line argument.")
        sys.exit(1)

    url = sys.argv[1]  # Get lab url
    scrape_text = download_txt_main(url)
    scrape_text = scrape_text.replace(" ", "").replace("\t", "").replace("\n", "")

    # result
    print(" Result ")
    print(" URL: ", url)
    #print( " Scrape Text: ", scrape_text)
    print(" Response: ")
    prompt = gen_prompt(scrape_text)
    #ask_gpt(gen_prompt(scrape_text))
    with open('prompt_main.txt', 'w', encoding='utf-8') as file:
            file.write(prompt)

    # get people scrape text
    scrape_text_people = download_txt_people(url)
    scrape_text_people = scrape_text_people.replace(" ", "").replace("\t", "").replace("\n", "")
    prompt_people = gen_prompt_people(scrape_text_people)
    with open('prompt_people.txt' ,'w', encoding='utf-8') as file:
            file.write(prompt_people)