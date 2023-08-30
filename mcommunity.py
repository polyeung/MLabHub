import requests
from bs4 import BeautifulSoup
import sys
from selenium import webdriver
import time
from selenium.webdriver.common.by import By

def find_email(name):
    url = "https://mcommunity.umich.edu/"
    driver = webdriver.Chrome("/mnt/c/Users/shuna/Downloads/chromedriver-win64/chromedriver-win64/chromedriver")
    driver.get(url)

    input_element = driver.find_element(By.ID,'searchString') 
    input_element.send_keys(name)

    # Find the search button and click it
    search_button = driver.find_element(By.XPATH,'//button[@type="submit" and @aria-label="Search" and contains(@class, "btn-tertiary")]') # Replace 'search_button_id' with the actual ID of the search button
    search_button.click()
    time.sleep(1.5)

    page_source = driver.page_source
    driver.close()

    soup = BeautifulSoup(page_source, 'html.parser')
    span_element = soup.find('span', {'name': 'uniqname'})
    if span_element:
        email = span_element.text.strip()
        return email
    else:
        return ""


