import requests
from bs4 import BeautifulSoup
import sys

potential_labname = []
potential_peopleinfo=[]

def find_labname(soup):
    global potential_labname  # Declare the variable as global
    title_tag = soup.title
    # find labname from className
    title_elements = soup.find_all(class_=lambda x: x and x.endswith('title'))

    # find labname from <title>
    for title_element in title_elements:
        potential_labname.append(title_element.get_text())
    if title_tag:
        # Get the content of the title tag
        title_content = title_tag.get_text()
        potential_labname.append(title_content)
    # find Labname based on content
    matching_elements = soup.find_all(lambda tag: tag.name != 'script' and tag.string is not None and tag.string.endswith('Lab'))
    for ele in matching_elements:
        potential_labname.append(ele.get_text())


def filter_labname():
    global potential_labname
    # filter all potentiallab name
    possible_endings = ["lab.", "Lab.", "lab", "Lab", "Laboratory", "laboratory", "Laboratory.", "laboratory."]
    possible_beginings = ["Lab", "Laboratory", "lab", "laboratory"]
    # check whether ends with one of above for every potential
    new_list = []
    # check ending
    for word in potential_labname:
        #print("testing: ", word)
        isMatch = False
        for sub in possible_endings:
            if word.endswith(sub):
                isMatch = True
            if isMatch:
                break
        if isMatch:
            new_list.append(word)
    # check starting
    for word in potential_labname:
        #print("testing: ", word)
        isMatch = False
        for sub in possible_beginings:
            if word.startswith(sub):
                isMatch = True
            if isMatch:
                break
        if isMatch:
            new_list.append(word)
    return new_list

def print_res():
    """Print results of finding."""
    print("====== Potential Labname ======")
    print(*(name for name in filter_labname()), sep="\n")
    print("\n\n====== Potential People ======")
    print(potential_peopleinfo)
    #print(*(name for name in potential_peopleinfo()), sep="\n")

def download_txt_main(url):
    # Send a GET request to the URL 
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    response = requests.get(url, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')
        # find labname
        find_labname(soup)

         # Remove all script tags

        for script in soup.find_all('script'):
            script.extract()
        
        # remove all style tag
        for style in soup.find_all('style'):
            style.extract()
        
          # Remove all meta tags
        for meta in soup.find_all('meta'):
            meta.extract()

        # Remove all link tags
        for link in soup.find_all('link'):
            link.extract()

        # Get the modified HTML content
        modified_html = str(soup.get_text())




        return modified_html
    else:
        print(f"Failed to download HTML. Status code: {response.status_code}")
        return None


def find_people(soup):
    global potential_peopleinfo
    class_name = "eecs_person_copy"
    copys = soup.find_all(class_=class_name)
    for copy in copys:
        h_tags = copy.find_all(["h1", "h2", "h3","h4","h5","h6"])

        for h_tag in h_tags:
            print("get person: ", h_tag.get_text())
            potential_peopleinfo.append(h_tag.get_text())


def download_txt_people(url):
    # Send a GET request to the URL 
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    response = requests.get(url, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')
        # find people
        find_people(soup)
        # Remove all script tags


        # Get the modified HTML content
        modified_html = str(soup.get_text())

        return modified_html
    else:
        print(f"Failed to download HTML. Status code: {response.status_code}")
        return None
"""
if __name__ == '__main__':
    # Check if URL is provided as a command-line argument
    if len(sys.argv) < 2:
        print("Please provide the URL as a command-line argument.")
        sys.exit(1)

    url = sys.argv[1]  # Get the URL from the command-line argument
    html = download_txt_main(url)
    if html:
        with open('downloaded_page_main.txt', 'w', encoding='utf-8') as file:
            file.write(html)
        print("Page downloaded and saved as 'downloaded_page_main.txt'")
    
    # download page for people page
    html_people = download_txt_people(url + "/people/")
    if html_people:
        with open('downloaded_page_people.txt', 'w', encoding='utf-8') as file:
            file.write(html_people)
        print("Page downloaded and saved as 'downloaded_page_people.txt'")
    print_res()
#https://ce.engin.umich.edu/"""