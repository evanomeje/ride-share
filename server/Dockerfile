FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

COPY server ./server
COPY db ./db
COPY frontend ./frontend

COPY dbconfig.json .

RUN cd server && go build -o main

EXPOSE ${SERVER_PORT}

CMD cd server && ./main
