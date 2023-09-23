import json
import sys
from ai import ask_gpt
from scrape import download_txt_main

def get_labels(path_to_labels):
    with open(path_to_labels) as f:
        labels_dict = json.load(f)
    return labels_dict

def get_labels_in_str(labels_dict):
    return ', '.join(labels_dict.keys())

def gen_prompt_for_labels(path_to_labels, description):
    labels_dict = get_labels(path_to_labels)
    labels_list = get_labels_in_str(labels_dict)

    prompt = 'This is a list of labels:\n' + labels_list + '\n'
    prompt += "Give me appropriate labels from the list above for the description below. Return what are in the list and don't make new labels that are not in the list even if you think they are appropriate. Make sure that every label should be separated by a comma.\n"
    prompt += description
    return prompt

def gen_labels(description, onlyPrompt):
    prompt_labels = gen_prompt_for_labels("labels_test.json", description)
    print("Getting labels for the lab.")
    response_labels = ""
    if not onlyPrompt:
        if len(prompt_labels) > 4096:
            print("The prompt for labels is too long. The answer might not be accurate.")
            prompt_labels = prompt_labels[:4097]
        response_labels = ask_gpt(prompt_labels)
    print("Got labels for the lab.")
    return response_labels

def gen_labels_from_url(url, onlyPrompt):
    scrape_text = download_txt_main(url)
    return gen_labels(scrape_text, onlyPrompt)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Please provide url and onlyPrompt (boolean value) as command-line arguments.\nThe line should look like this. python gen_labels.py url 1/0")
        sys.exit(1)

    print(gen_labels_from_url(sys.argv[1], bool(int(sys.argv[2]))))