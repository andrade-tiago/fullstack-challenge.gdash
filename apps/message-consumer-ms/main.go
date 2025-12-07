// main.go
package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	// 1. Cria o cliente da API
	apiClient := NewAPIClient()

	// 2. Cria e inicializa o cliente consumidor do RabbitMQ
	consumer, err := NewConsumerClient(apiClient)
	if err != nil {
		log.Fatalf("Erro fatal ao iniciar o consumidor: %v", err)
	}
	defer consumer.Close()

	// 3. Inicia o consumo em uma goroutine
	// A função StartConsuming é bloqueante, então rodamos em background.
	go consumer.StartConsuming()

	// 4. Configura o tratamento de sinais do sistema (CTRL+C)
	// Isso garante que o programa feche a conexão com o RabbitMQ de forma elegante.
	quit := make(chan os.Signal, 1)
	// Captura os sinais de interrupção (como CTRL+C) e de término
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	// Bloqueia até receber um sinal
	<-quit

	log.Println("👋 Sinal de encerramento recebido. Fechando o serviço...")
}
