#!/bin/bash
sshcmd="ssh -t evan@app.evanomeje.xyz"
$sshcmd screen -S "deployment" /home/evan/app/prod_deploy.sh