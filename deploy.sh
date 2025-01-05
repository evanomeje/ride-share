#!/bin/bash
sshcmd="ssh -t evan@app.evanomeje.xyz"
$sshcmd screen -S "deployment" /home/evan/rideshare-simulation/ride-share
