package main

import (
	db "app/db"
	"encoding/json"
	_"log"
	"net/http"
	"os"
)

type Ride struct {
	Id       string `json:"id"`
	CarId    string `json:"car_id"`
	Location string `json:"location"`
	Path     string `json:"path"`
}

func getRides(w http.ResponseWriter, req *http.Request) {
	rows, err := db.Connection.Query("SELECT * FROM rides")
	if err != nil {
		http.Error(w, "Failed to get rides: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var rides []Ride

	for rows.Next() {
		var ride Ride
		rows.Scan(&ride.Id, &ride.CarId, &ride.Location, &ride.Path)
		rides = append(rides, ride)
	}

	ridesBytes, _ := json.MarshalIndent(rides, "", "\t")

	w.Header().Set("Content-Type", "application/json")
	w.Write(ridesBytes)
}

func main() {
	db.InitDB()
	defer db.Connection.Close()

	http.Handle("/", http.FileServer(http.Dir("../frontend/build")))
	//http.HandleFunc("/drivers", getDrivers)
	http.HandleFunc("/rides", getRides)

	serverEnv := os.Getenv("SERVER_ENV")

	if serverEnv == "DEV" {
		http.ListenAndServe(":8080", nil)
	} else if serverEnv == "PROD" {
		http.ListenAndServeTLS(
			":443",
			"/etc/letsencrypt/live/app.evanomeje.xyz/fullchain.pem",
			"/etc/letsencrypt/live/app.evanomeje.xyz/privkey.pem",
			nil,
		)
	}
}
