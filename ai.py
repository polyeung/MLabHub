import openai
import os
import sys
from dotenv import load_dotenv
from scrape import download_txt_main, download_txt_people
import json
# Load the .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


def ask_gpt(prompt):
    response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{'role': 'user', 'content': prompt}],
            temperature = 0 
        )
    return (response['choices'][0]['message']['content'])



def gen_prompt(scrape_text):
    return "from below source, generate labname and brief intro of lab(400 characters max) output format: seperated by comma" + scrape_text


def gen_prompt_people(scrape_text):
    return "from below source of research lab's member intro, generate member1,member2, .... output membername one by one concatenated by comma " + scrape_text


def ai_exec(url, onlyPrompt):
    print(f"Start crawling for {url}...")

    # for main page
    scrape_text = download_txt_main(url)

    # remove punctuation
    if not onlyPrompt:
        scrape_text = scrape_text.replace(" ", "").replace("\t", "").replace("\n", "")
    else:
        scrape_text = scrape_text.replace("\n", "")

    # result
    # prompt = gen_prompt(scrape_text)
    # print("Prompting main start...")
    # response = ""
    # if not onlyPrompt:
    #     response = ask_gpt(prompt[:4097])
    # print("Prompting main ends..")

    # # for people page
    # # get people scrape text
    # scrape_text_people = download_txt_people(url)
    # """
    # if not onlyPrompt:
    #     scrape_text_people = scrape_text_people.replace(" ", "").replace("\t", "").replace("\n", "")
    # else:"""

    # scrape_text_people = scrape_text_people.replace("\n", "")
    # prompt_people = gen_prompt_people(scrape_text_people)
    # print("Prompting people start...")
    # response_people = ""
    # """
    # if not onlyPrompt:
    #     response_people = ask_gpt(prompt_people[:4097])
    # """
    # print("Prompting people ends...")
    # print(f"Finish crawling for {url}...")

    # return {
    #     "main_prompt": prompt,
    #     "main_response": response,
    #     "people_prompt": prompt_people,
    #     "response_people": response_people
    # }

    return scrape_text

# execute and write to file
def ai_entry(url, round, onlyPrompt, dep):
    res = ai_exec(url, onlyPrompt)
    # if not onlyPrompt:
    #     with open(f'./result/{round}.txt' ,'w', encoding='utf-8') as file:
    #         file.write(dep + "\n" + url + "\n" + res["main_response"] + "\n" + "[Paste below prompt to gpt]\n" + res["people_prompt"])
    # with open(f'./prompt/{round}.txt' ,'w', encoding='utf-8') as file:
    #     json.dump(res, file, indent=2)
    #     if onlyPrompt:
    #         file.write("people prompt: \n" + res["people_prompt"] + "\n\n" + "main prompt: \n" + res["main_prompt"])
    print(res)


## IDEA: create a list of labels and ask chat gpt if description matches or contains the labels


