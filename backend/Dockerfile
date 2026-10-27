# ---------- Этап 1: сборка ----------
FROM golang:1.22-alpine AS builder

WORKDIR /build

# Сначала зависимости — кэшируется, пока не меняется go.mod/go.sum
COPY go.mod go.sum ./
RUN go mod download

# Потом исходники
COPY . .

# CGO_ENABLED=0 → статический бинарник (для distroless)
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /out/app ./main.go

# ---------- Этап 2: runtime ----------
FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /app
COPY --from=builder /out/app /app/app

EXPOSE 8080
ENTRYPOINT ["/app/app"]