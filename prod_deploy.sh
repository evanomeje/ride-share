#!/bin/bash
SECONDS=0

# Update the directory path to match your server structure
cd $HOME/rideshare-simulation/ride-share

msg () {
  echo -e "$1\n--------------------\n"
}

msg "Stopping app"
sudo pkill app || echo "App not running"

msg "Pulling from GitHub"
git pull

msg "Building Go binary"
go build -o app

msg "Starting server"
SERVER_ENV=PROD nohup sudo ./app &>/dev/null &

duration=$SECONDS

echo
msg "Deploy finished in $(($duration % 60)) seconds."
msg "Press Enter to exit"
read
