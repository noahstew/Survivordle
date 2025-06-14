package main

// Contestant struct to map database rows
type Contestant struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
	Season Season    `json:"season"`
	DaysLasted int    `json:"days_lasted"`
	VotesAgainst int    `json:"votes_against"`
	Position string    `json:"position"`	
}

type Returnee struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
	Season Season    `json:"season"`
	DaysLasted int    `json:"days_lasted"`
	VotesAgainst int    `json:"votes_against"`
	HasWon bool    `json:"has_won"`
}

type Season struct {
	SeasonNumber int    `json:"season_number"`
	Title        string `json:"title"`
	ImageURL	 string `json:"img_url"`
} 