# Survivordle

Survivordle is Wordle-style fan game based on the show [Survivor](https://www.cbs.com/shows/survivor/).   

It is playable at [https://survivordle.vercel.app](https://survivordle.vercel.app/)  (rules and game details on the site).

## Repo Contents

This repo contains 3 sections, the scraper, frontend and backend.  

### Scraper

Web scraper script made w/ Python and Beautiful Soup.  Runs and scrapes data on all contestants and returnee players- scrapes over 1000+ entries of data and updates a Postgres Database on Supabase.  

### Frontend

This is the frontend for the game built in NextJS/React wit Typescript.  App is what communicates with the database made by scraper. This is deployed on Vercel and what the game runs on. 

### Backend (Incomplete)

Was to be a seperate API for the game, and still may build out in the future, but for now this is just old files that are not used in any way.  
