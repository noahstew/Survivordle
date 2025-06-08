# This module scrapes contestants 

import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import requests
from bs4 import BeautifulSoup
from webscraping.helpers import filterSeasons
from webscraping.model.season import season

def scrape(url_seasons):
    # Fetch the page
    seasons_page = fetchPage(url_seasons)
    seasons_soup = BeautifulSoup(seasons_page, 'html.parser')
    
    # Extract season names from the seasons page
    season_links = seasons_soup.find_all('a', class_='category-page__member-link')
    season_names = [a.get_text(strip=True) for a in season_links]
    seasons = filterSeasons(season_names)
    
    # Extract logos from the logos page
    for i in range(len(seasons)):
        logo_url = f"https://survivor.fandom.com/wiki/Survivor_{seasons[i].replace(' ', '_')}?file=Survivor_{i+1}_Logo.png"
        seasons[i] = season(season_number=i + 1, season_name=seasons[i], logo_url=logo_url)
    
    return seasons

def fetchPage(url):
    
    print("🐕 Fetching...", url)
    # Fetch the page content
    response = requests.get(url)
    
    print("🦴 Found")
    if response.status_code != 200:
        raise Exception(f"Failed to fetch page: {url}")
    return response.text

