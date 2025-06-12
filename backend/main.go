package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	InitDB()

	http.HandleFunc("/contestant/random", getContestantRandom)
	http.HandleFunc("/contestant/all", getAllContestants)
	http.HandleFunc("/returnee/random", getReturneeRandom)
	http.HandleFunc("/returnee/all", getAllReturnees)


	fmt.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// TODO: Understand how currently is working and build rest of API without AI
// TODO: Build routes used for Contestants, Returnees, Seasons
// TODO: Deploy to Render