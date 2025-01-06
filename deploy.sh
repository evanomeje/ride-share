#!/bin/bash
cd frontend
yarn build
cd ..
git add .
git commit -m "build: Updating frontend"
git push
sshcmd="ssh -t evan@app.evanomeje.xyz"
$sshcmd screen -S "deployment" /home/evan/app/prod_deploy.sh
