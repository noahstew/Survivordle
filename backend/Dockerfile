# Use official Go image
FROM golang:1.24 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build static binary for Linux (musl libc)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main .

# Use minimal runtime image
FROM scratch

WORKDIR /root/
COPY --from=builder /app/main .

CMD ["./main"]
