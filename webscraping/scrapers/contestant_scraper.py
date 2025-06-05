# This module scrapes contestants 

import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import requests
from bs4 import BeautifulSoup
from webscraping.helpers import split_seasons
from webscraping.model.contestant import contestant
from webscraping.model.contestant import returning_contestant

def scrape_returnees(table):
    contestants = []
    for row in table.findAll("tr"):
        # Getting imageURL
        img = row.select("td > span > a")
        img_url = img[0]['href'] if img and 'href' in img[0].attrs else None
        # Getting contestant name 
        name = row.find("th").text
        columns = row.findAll("td")
        
        print(name ,"has Image URL ", img_url)  # Debugging line to check image URL

        if len(columns) > 0:
            # Extracting contestant details
            age = columns[1].get_text(strip=True)
            raw_seasons = columns[2].get_text(strip=True)
            tribe_wins = columns[3].get_text(strip=True)
            ind_wins = columns[4].get_text(strip=True)
            days_lasted = columns[6].get_text(strip=True)
            votes_against = columns[7].get_text(strip=True)

            # Making seasons an array
            seasons = split_seasons(raw_seasons)
            
            # Creating returning_contestant object
            contestant_obj = returning_contestant(
                name=name,
                age=age,
                seasons=seasons,
                tribe_wins=tribe_wins,
                individual_wins=ind_wins,
                days_lasted=days_lasted,
                votes_against=votes_against,
                img_url=img_url
            )
            contestants.append(contestant_obj)
    return contestants

def scrape_players(table):
    contestants = []
    for row in table.findAll("tr"):
        # Getting imageURL
        img = row.select("td > span > a > img")
        img_url = img[0]['data-src'] if img and 'data-src' in img[0].attrs else None
        
        # Getting contestant name 
        name = row.find("th").text
        columns = row.findAll("td")
        if len(columns) > 0:
            # Extracting contestant details
            birthday = columns[1].get_text(strip=True)
            age = columns[2].get_text(strip=True)
            location_from = columns[3].get_text(strip=True)
            season = columns[4].get_text(strip=True)
            position = columns[5].get_text(strip=True)
            days_lasted = columns[6].get_text(strip=True)
            votes_against = columns[7].get_text(strip=True)

            # Handling the 8th, 9th, and 10th columns (need to define what they are)
            eight = columns[8].get_text(strip=True)
            nine = columns[9].get_text(strip=True)
            ten = columns[10].get_text(strip=True)

            
            # Creating contestant object
            contestant_obj = contestant(
                name=name,
                img_url=img_url,
                birthday=birthday,
                age=age,
                location_from=location_from,
                season=season,
                position=position,
                days_lasted=days_lasted,
                votes_against=votes_against,
                
                eight=eight,
                nine=nine,
                ten=ten
            )   
            
            contestants.append(contestant_obj)
            
    return contestants

def scrape(url, returning_only):
    # Fetch the page
    response = requests.get(url)
    
    table_index = 2 if returning_only else 1  # Index for the table with contestants' data

    # Making soup object from the response text
    soup = BeautifulSoup(response.text, "html.parser")

    # Finding table with contestants' data of all who played > 1 season
    table = soup.findAll("table", class_=["wikitable", "mw-collapsible", "mw-made-collapsible"])[table_index]

    if returning_only:
        contestants = scrape_returnees(table)
        print(f"✅ Successfully scraped {len(contestants)} returning contestants.")
    else:
        contestants = scrape_players(table)
        print(f"✅ Successfully scraped {len(contestants)} contestants.")
    return contestants