class season:
    def __init__(self, season_number, season_name):
        self.season_number = season_number
        self.season_name = season_name
    
    def __str__(self):
        return f"Season {self.season_number}: {self.season_name}"