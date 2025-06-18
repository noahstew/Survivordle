package main

// Contestant struct to map database rows
type Contestant struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
	Season string    `json:"season"`
	DaysLasted string    `json:"days_lasted"`
	VotesAgainst int    `json:"votes_against"`
	Placement string    `json:"placement"`	
	ImgURL string `json:"img_url"`
}

type Returnee struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
	Seasons string    `json:"seasons"`
	DaysLasted string    `json:"days_lasted"`
	VotesAgainst int    `json:"votes_against"`
	ImgURL string `json:"img_url"`
}
