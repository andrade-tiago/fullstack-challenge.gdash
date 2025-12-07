package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	apiClient := NewAPIClient()

	consumer, err := NewConsumerClient(apiClient)
	if err != nil {
		log.Fatalf("Erro fatal ao iniciar o consumidor: %v", err)
	}
	defer consumer.Close()

	go consumer.StartConsuming()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	<-quit

	log.Println("Sinal de encerramento recebido. Fechando o serviço...")
}
