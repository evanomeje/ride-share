FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
COPY *.go ./

COPY postgres ./postgres
COPY frontend/build ./frontend/build

RUN go build -o /main

EXPOSE ${SERVER_PORT}

CMD [ "/main" ]