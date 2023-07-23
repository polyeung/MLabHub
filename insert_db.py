import psycopg2
import os
import json
from dateutil.parser import parse
from dateutil import tz
import random
from dotenv import load_dotenv
import json
from util import get_round
from datetime import datetime
# Load the .env file
load_dotenv()

info = []
def convert_to_human_readable_time(time_str):
    try:
        # Attempt to parse the time string
        parsed_time = parse(time_str)

        # Convert the time to the local timezone
        local_time = parsed_time.astimezone(tz.tzlocal())

        # Format the time in a human-readable format
        formatted_time = local_time.strftime('%I:%M %p %B %d, %Y')

        return formatted_time

    except Exception as e:
        # If the time cannot be parsed, return the original string
        return time_str

def parse_file(file):
    ret_dict = {}
    index = 0
    map_key = ["dep", "url", "name", 'intro', "people", "emails"]
    for line in file:
        key = map_key[index]
        value = line.strip()
        if ":" in value and "http" not in value:
            value = value.split(":")[1]

        ret_dict[key] = value.strip()
        index += 1
    return ret_dict

def update_info_list():
    round = get_round()
    global info
    for index in range(round - 1, -1, -1):
        with open(f'./final_result/{index}.txt', 'r') as file:
            dict = parse_file(file)
            info.append(dict)
    print(json.dumps(info, indent=2))




def insert_labs():
    global info
        
    # Database configuration
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASS = os.getenv("DB_PASS")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")

    # Construct the database URL
    DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

    try:
        # Connect to the database
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()
        # select random tags
        cursor.execute("SELECT COUNT(*) FROM labs;")
        count = cursor.fetchone()[0]
        if count > 0:
            print("got labs!", count)



        for index, lab in enumerate(info):
            # Modify the SQL query according to your table structure
            print(f"inserting {index}...")
            sql = "INSERT INTO labs (name,link,intro,people,dep,funding,approved,emails,creator_id, create_date) VALUES (%s,%s,%s,%s, %s, %s, %s, %s, %s, %s)"
            values = (lab['name'], lab['url'], lab['intro'], lab['people'], lab['dep'], "NA", True, lab['emails'],1, datetime.now())  # Replace 'value1', 'value2', etc. with your actual values
            
            # Execute the query
            cursor.execute(sql, values)

        # Commit the changes
        conn.commit()

        print("Data inserted successfully!")

        # Close the cursor and connection
        cursor.close()
        conn.close()
        print("Connection closed.")
    except Exception as e:
        print("Error:", e)

if __name__ == '__main__':
        
    update_info_list()
    insert_labs()
    