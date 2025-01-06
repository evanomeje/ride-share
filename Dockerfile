FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY *.go ./
COPY static ./static

RUN go build -o /app/main .

EXPOSE 8080

CMD [ "/app/main" ]