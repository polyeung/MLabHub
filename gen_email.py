from mcommunity import find_email
from util import get_round

def clean_name(name):
    cleaned_name = name
    if "Prof." in name:
        cleaned_name = name.replace("Prof.", "")
    elif "prof." in name:
        cleaned_name =name.replace("prof.", "")
    elif "Prof" in name:
        cleaned_name = name.replace("Prof", "")
    elif "prof" in name:
        cleaned_name = name.replace("prof", "")
    if "," in name:
        cleaned_name = cleaned_name.replace(",", " ")
    if "." in name:
        cleaned_name = cleaned_name.replace(".", " ")
    return cleaned_name
def extract_one_file(file, file_index):
    name_list = []
    email_list = []
    # skip firstline
    index = 0
    with open(f'./final_result/{file_index}.txt', 'w') as final_f:
        for line in file:
            if "Brief Intro" in line or "Lab Name" in line or "https:" in line or "http:" in line or index == 0 or ":" in line or "Lab" in line or "lab" in line:
                final_f.write(line)
                index += 1
                continue
            name = clean_name(line.strip()).strip()
            if len(name) == 0:
                index += 1
                continue
            name_list.append(name)
            email = find_email(name)
            if len(email) != 0:
                email_list.append(email)
            else:
                email_list.append("NA")
            index += 1
        final_f.write(",".join(name_list) + "\n" + ",".join(email_list))

    print(name_list)
    print(email_list)
    return [",".join(name_list), ",".join(email_list)]



def extract_email():
    round = get_round()
    print("round: ", round)
    for i in range(round-1, -1, -1):
        ret_list = []
        print(f'For file ./result/{i}.txt')
        with open(f'./result/{i}.txt', 'r', encoding='utf-8') as file:
            ret_list = extract_one_file(file, i)
        """
        with open(f'./result/{i}.txt', 'a', encoding='utf-8') as file:
            if len(ret_list) == 2:
                file.write("\n" + ret_list[0] + "\n" + ret_list[1])
            else:
                file.write("Failed to extract email")
        """
        print("\n")

if __name__ == '__main__':
    # Check if URL is provided as a command-line argument'
    print("Start...")
    extract_email()
    