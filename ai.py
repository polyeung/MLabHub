import openai
import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


def ask_gpt(prompt):
    response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{'role': 'user', 'content': prompt}],
            temperature = 0 
        )
    print(response['choices'][0]['message']['content'])

