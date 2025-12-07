package main

import (
	"bytes"
	"fmt"
	"net/http"
	"os"
	"time"
)

var ApiUrl = os.Getenv("API_URL")

type APIClient struct {
	client *http.Client
}

func NewAPIClient() *APIClient {
	return &APIClient{
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (c *APIClient) SendData(body []byte) error {
	req, err := http.NewRequest("POST", ApiUrl, bytes.NewBuffer(body))
	if err != nil {
		return fmt.Errorf("erro ao criar a requisição: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := c.client.Do(req)
	if err != nil {
		return fmt.Errorf("erro ao executar a requisição POST: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 200 && resp.StatusCode < 300 {
		fmt.Printf("Requisição POST enviada com sucesso para %s. Status: %s\n", ApiUrl, resp.Status)
		return nil
	}

	return fmt.Errorf("falha na requisição POST. Status inesperado: %s", resp.Status)
}
