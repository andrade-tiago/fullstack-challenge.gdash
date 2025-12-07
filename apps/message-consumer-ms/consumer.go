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
		QueueName,
		true,
		false,
		false,
		false,
		nil,
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
		QueueName,
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Falha ao registrar o consumidor: %v", err)
	}

	log.Printf("Aguardando mensagens na fila '%s'. Para sair, pressione CTRL+C.", QueueName)

	for d := range msgs {
		log.Printf("Mensagem recebida: %s", d.Body)

		err := c.apiClient.SendData(d.Body)

		if err != nil {
			log.Printf("Erro ao enviar para API: %v. Rejeitando mensagem (requeue=true)", err)
			d.Nack(false, true)
		} else {
			log.Printf("Processamento da mensagem concluído. Confirmando consumo.")
			d.Ack(false)
		}
	}
}
