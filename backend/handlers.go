package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// "/contestant/*"

// GET /contestant/random
func getContestantRandom(w http.ResponseWriter, r *http.Request) {
	rows, err := DB.Query("SELECT c.name, c.age, s.season_name, c.days_lasted, c.votes_against, c.position, c.img_url FROM contestants c NATURAL JOIN seasons s ORDER BY RANDOM() LIMIT 1")
	if err != nil {
		http.Error(w, "Query failed", http.StatusInternalServerError)
		log.Println("DB query error:", err)
		return
	}
	defer rows.Close()

	var contestants []Contestant

	for rows.Next() {
		var c Contestant
		err := rows.Scan(&c.Name, &c.Age, &c.Season, &c.DaysLasted, &c.VotesAgainst, &c.Placement, &c.ImgURL)
		if err != nil {
			http.Error(w, "Row scan failed", http.StatusInternalServerError)
			log.Println("Scan error:", err)
			return
		}
		contestants = append(contestants, c)
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(contestants[0])

	fmt.Println("GET /contestant/random")
}

// GET /contestant/all
func getAllContestants(w http.ResponseWriter, r *http.Request) {
	rows, err := DB.Query("SELECT c.name, c.age, s.season_name, c.days_lasted, c.votes_against, c.position, c.img_url FROM contestants c NATURAL JOIN seasons s ")
	if err != nil {
		http.Error(w, "Query failed", http.StatusInternalServerError)
		log.Println("DB query error:", err)
		return
	}
	defer rows.Close()

	var contestants []Contestant

	for rows.Next() {
		var c Contestant
		err := rows.Scan(&c.Name, &c.Age, &c.Season, &c.DaysLasted, &c.VotesAgainst, &c.Placement, &c.ImgURL)
		if err != nil {
			http.Error(w, "Row scan failed", http.StatusInternalServerError)
			log.Println("Scan error:", err)
			return
		}
		contestants = append(contestants, c)
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(contestants)

	fmt.Println("GET /contestant/all")
}

// "/returnee/*"

// GET /returnee/random
func getReturneeRandom(w http.ResponseWriter, r *http.Request) {
	rows, err := DB.Query("SELECT name, age, seasons, days_lasted, votes_against, img_url FROM returning_contestants ORDER BY RANDOM() LIMIT 1")
	if err != nil {
		http.Error(w, "Query failed", http.StatusInternalServerError)
		log.Println("DB query error:", err)
		return
	}
	defer rows.Close()

	var returnees []Returnee

	for rows.Next() {
		var r Returnee
		err := rows.Scan(&r.Name, &r.Age, &r.Seasons, &r.DaysLasted, &r.VotesAgainst, &r.ImgURL)
		if err != nil {
			http.Error(w, "Row scan failed", http.StatusInternalServerError)
			log.Println("Scan error:", err)
			return
		}
		returnees = append(returnees, r)
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(returnees[0])

	fmt.Println("GET /returnee/random")
}

// GET /returnee/all
func getAllReturnees(w http.ResponseWriter, r *http.Request) {
	rows, err := DB.Query("SELECT name, age, seasons, days_lasted, votes_against, img_url FROM returning_contestants")
	if err != nil {
		http.Error(w, "Query failed", http.StatusInternalServerError)
		log.Println("DB query error:", err)
		return
	}
	defer rows.Close()

	var returnees []Returnee

	for rows.Next() {
		var r Returnee
		err := rows.Scan(&r.Name, &r.Age, &r.Seasons, &r.DaysLasted, &r.VotesAgainst, &r.ImgURL)
		if err != nil {
			http.Error(w, "Row scan failed", http.StatusInternalServerError)
			log.Println("Scan error:", err)
			return
		}
		returnees = append(returnees, r)
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(returnees)

	fmt.Println("GET /returnee/all")
}


// "/season/*"