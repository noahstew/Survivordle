class season:
    def __init__(self, season_number, season_name, logo_url):
        self.season_number = season_number
        self.season_name = season_name
        self.logo_url = logo_url
    
    def __str__(self):
        return f"Season {self.season_number}: {self.season_name}"
