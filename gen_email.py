from mcommunity import find_email
from util import get_round


def extract_one_file(file):
    name_list = []
    email_list = []
    for line in file:
        if "Brief intro" in line or len(line) > 15:
            continue
        name = line.strip()
        name_list.append(name)
        email = find_email(name)
        if len(email) != 0:
            email_list.append(email)
        else:
            email_list.append("NA")

    print(name_list)
    print(email_list)
    return [",".join(name_list), ",".join(email_list)]



def extract_email():
    round = get_round()
    print("round: ", round)
    round = 1
    for i in range(round-1, -1, -1):
        ret_list = []
        with open(f'./result/{i}.txt', 'r', encoding='utf-8') as file:
            ret_list = extract_one_file(file)
        with open(f'./result/{i}.txt', 'a', encoding='utf-8') as file:
            if len(ret_list) == 2:
                file.write("\n" + ret_list[0] + "\n" + ret_list[1])
            else:
                file.write("Failed to extract email")

if __name__ == '__main__':
    # Check if URL is provided as a command-line argument'
    print("hey")
    extract_email()