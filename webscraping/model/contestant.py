# This module has the contestant class which is used to store information about a contestant in Survivor.
# Note: Numeric fields may be "N/A" and will be normalized to -1 before DB insert
class contestant:
    def __init__(self, name, img_url, birthday, age, location_from, season, position, days_lasted, votes_against, tribe_wins, ind_wins, total_wins):
        self.name = name
        self.img_url = img_url
        self.birthday = birthday
        self.age = age
        self.location_from = location_from
        self.season = season
        self.position = position
        self.days_lasted = days_lasted
        self.votes_against = votes_against
        self.tribe_wins = tribe_wins
        self.ind_wins = ind_wins
        self.total_wins = total_wins
    
    def __str__(self):
        return f"""
Name: {self.name}
Image URL: {self.img_url}
Birthday: {self.birthday}
Age: {self.age}
Location From: {self.location_from}
Season: {self.season}
Position: {self.position}
Days Lasted: {self.days_lasted}
Votes Against: {self.votes_against}
tribe_wins:{self.tribe_wins}
ind_wins:{self.ind_wins}
total_wins:{self.total_wins}
"""


class returning_contestant:
    def __init__(self, name, age, seasons, tribe_wins, individual_wins, days_lasted, votes_against, img_url):
        self.name = name
        self.img_url = img_url
        self.age = age
        self.seasons = seasons
        self.tribe_wins = tribe_wins
        self.individual_wins = individual_wins
        self.days_lasted = days_lasted # NOTE: Includes edge of extinction and redemption island days
        self.votes_against = votes_against
    
    def __str__(self):
        return f"""
Name:{self.name}
Age:{self.age}
Seasons:{', '.join(self.seasons)}
Tribe Wins:{self.tribe_wins}
Individual Wins:{self.individual_wins}
Days Lasted:{self.days_lasted}
Votes Against:{self.votes_against}
Image URL:{self.img_url}
"""
