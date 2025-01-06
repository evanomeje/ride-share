package main

import (
	"fmt"
	"net/http"
	"os"
)

func getData(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Helloworld\n")
}

func main() {
	http.HandleFunc("/data", getData)

	serverEnv := os.Getenv("SERVER_ENV")

	if serverEnv == "DEV" {
		http.ListenAndServe(":8080", nil)
	} else if serverEnv == "PROD" {
		http.Handle("/", http.FileServer(http.Dir("./static")))
		http.ListenAndServeTLS(
			":443",
			"/etc/letsencrypt/live/app.evanomeje.xyz/fullchain.pem",
			"/etc/letsencrypt/live/app.evanomeje.xyz/privkey.pem",
			nil,
		)
	}
}