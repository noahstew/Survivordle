# Main file which performs the webscraping of Survivor contestants data
import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from webscraping.scrapers import contestant_scraper
from webscraping.scrapers import season_scraper
from webscraping.database.db import updateDB

# URL of Survivor contestants list
url_contestants = "https://survivor.fandom.com/wiki/List_of_Survivor_(U.S.)_contestants"
url_seasons = "https://survivor.fandom.com/wiki/Category:Seasons"
url_logos = "https://logos.fandom.com/wiki/Survivor_(TV_series)"

# Scrape all contestants and returning contestants
all_contestants = contestant_scraper.scrape(url_contestants, False)
returning_contestants = contestant_scraper.scrape(url_contestants, True) 
seasons = season_scraper.scrape(url_seasons)

# TODO: Send to database & Verify links on logos page
updateDB(all_contestants, returning_contestants, seasons)