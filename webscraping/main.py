# Main file which performs the webscraping of Survivor contestants data
import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from webscraping.scrapers import contestant_scraper

# URL of Survivor contestants list
url = "https://survivor.fandom.com/wiki/List_of_Survivor_(U.S.)_contestants"

# Scrape all contestants and returning contestants
all_contestants = contestant_scraper.scrape(url, False)
returning_contestants = contestant_scraper.scrape(url, True) 

print("First Player Scraped: ", all_contestants[0])
print("First Returing Player Scraped: ", returning_contestants[-1])

# Current Condition: 

# TODO: All Players
# Figure out 8, 9 and 10 column definitions

# TODO: Returing Players
# Get ImageURL Working for all (it's currently not working until Cirie)