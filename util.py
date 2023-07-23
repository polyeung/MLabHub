def reset_round():
    round = 0
    with open('./store/round.txt' ,'w', encoding='utf-8') as file:
                file.write("0")

def inc_round():
    round = 0
    with open('./store/round.txt' ,'r', encoding='utf-8') as file:
        for line in file:
            round = int(line.strip())
    round += 1
    with open('./store/round.txt' ,'w', encoding='utf-8') as file:
        file.write(str(round))

def get_round():
    round = 0
    with open('./store/round.txt' ,'r', encoding='utf-8') as file:
        for line in file:
            round = int(line.strip())
    return round
