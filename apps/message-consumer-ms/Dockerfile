# --- STAGE 1: Build a aplicação ---
FROM golang:1.25-alpine AS builder

WORKDIR /app

COPY . .

RUN go mod download

# Compila a aplicação Go
RUN go build -o main .

# --- STAGE 2: Criar a imagem final, leve ---
FROM alpine:latest

# Define o diretório de trabalho
WORKDIR /app

# Copia o binário compilado do stage anterior
COPY --from=builder /app/main .

# Expõe a porta que a aplicação usa (opcional, para documentação)
# EXPOSE 8080

# Comando para executar a aplicação quando o contêiner iniciar
CMD ["./main"]
