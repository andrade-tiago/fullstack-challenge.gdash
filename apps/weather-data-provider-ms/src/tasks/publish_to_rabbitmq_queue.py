import pika
import json
import os

RABBIT_USER = os.getenv("RABBIT_USER")
RABBIT_PASS = os.getenv("RABBIT_PASS")

def publish_to_rabbitmq_queue(data):
  credentials = pika.PlainCredentials(RABBIT_USER, RABBIT_PASS)

  connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='rabbitmq', credentials=credentials)
  )

  channel = connection.channel()

  queue_name = 'weather_logs_queue'
  channel.queue_declare(
    queue=queue_name,
    durable=True
  )

  message = json.dumps(data)

  channel.basic_publish(
    exchange='',
    routing_key=queue_name,
    body=message,
  )

  connection.close()
