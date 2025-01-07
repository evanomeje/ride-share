FROM node:19-alpine

WORKDIR /app

COPY simulation ./simulation
COPY dbconfig.json ./

RUN cd simulation && yarn install

CMD cd simulation && node main.js