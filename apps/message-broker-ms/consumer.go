// consumer.go
package main

import (
	"fmt"
	"log"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

var RabbitMQURL = os.Getenv("AMQP_URL")
var QueueName = os.Getenv("RABBITMQ_QUEUE")

type ConsumerClient struct {
	conn      *amqp.Connection
	ch        *amqp.Channel
	apiClient *APIClient
}

func NewConsumerClient(apiClient *APIClient) (*ConsumerClient, error) {
	conn, err := amqp.Dial(RabbitMQURL)
	if err != nil {
		return nil, fmt.Errorf("falha ao conectar ao RabbitMQ: %w", err)
	}

	ch, err := conn.Channel()
	if err != nil {
		conn.Close()
		return nil, fmt.Errorf("falha ao abrir um canal: %w", err)
	}

	_, err = ch.QueueDeclare(
		QueueName, // name
		true,      // durable
		false,     // delete when unused
		false,     // exclusive
		false,     // no-wait
		nil,       // arguments
	)
	if err != nil {
		ch.Close()
		conn.Close()
		return nil, fmt.Errorf("falha ao declarar a fila: %w", err)
	}

	err = ch.Qos(1, 0, false)
	if err != nil {
		ch.Close()
		conn.Close()
		return nil, fmt.Errorf("falha ao definir QoS: %w", err)
	}

	return &ConsumerClient{
		conn:      conn,
		ch:        ch,
		apiClient: apiClient,
	}, nil
}

func (c *ConsumerClient) Close() {
	if c.ch != nil {
		c.ch.Close()
	}
	if c.conn != nil {
		c.conn.Close()
	}
	log.Println("Conexão com RabbitMQ fechada.")
}

func (c *ConsumerClient) StartConsuming() {
	msgs, err := c.ch.Consume(
		QueueName, // queue
		"",        // consumer
		false,     // auto-ack (setado como false para controle manual)
		false,     // exclusive
		false,     // no-local
		false,     // no-wait
		nil,       // args
	)
	if err != nil {
		log.Fatalf("Falha ao registrar o consumidor: %v", err)
	}

	log.Printf("⏳ Aguardando mensagens na fila '%s'. Para sair, pressione CTRL+C.", QueueName)

	// Loop infinito para processar as mensagens
	for d := range msgs {
		log.Printf("📩 Mensagem recebida: %s", d.Body)

		// 1. Envia os dados para a API externa
		err := c.apiClient.SendData(d.Body)

		// 2. Confirma ou rejeita a mensagem com base no resultado da API
		if err != nil {
			log.Printf("Erro ao enviar para API: %v. Rejeitando mensagem (requeue=true)", err)
			// Rejeita a mensagem e a coloca de volta na fila
			// Use Requeue=false para evitar loops infinitos em caso de erro persistente
			d.Nack(false, true)
		} else {
			log.Printf("Processamento da mensagem concluído. Confirmando consumo.")
			// Confirma o consumo da mensagem (ACK)
			d.Ack(false)
		}
	}
}
