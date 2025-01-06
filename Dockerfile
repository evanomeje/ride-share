FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
COPY *.go ./

COPY postgres ./postgres
COPY frontend ./frontend

RUN go build -o /main

EXPOSE 8080

CMD [ "/main" ]