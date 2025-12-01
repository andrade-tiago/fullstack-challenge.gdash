import sys
from dotenv import load_dotenv
from src.tasks.fetch_open_meteo_api import fetch_open_meteo_api 
from src.tasks.publish_to_rabbitmq_queue import publish_to_rabbitmq_queue
from src.tasks.transform_api_data import transform_api_data
import logging
import os
import schedule
import time

load_dotenv()
FETCH_INTERVAL_SECONDS = int(os.getenv("FETCH_INTERVAL_SECONDS"))

logging.basicConfig(
  level=logging.INFO,
  format="%(asctime)s - %(levelname)s - %(message)s",
  stream=sys.stdout
)

def task():
  json_data = fetch_open_meteo_api()
  # logging.info(msg=f"API DATA: {json_data}")

  weather_data = transform_api_data(json_data["current"])
  # logging.info(msg=f"WEATHER DATA: {weather_data}")

  publish_to_rabbitmq_queue(weather_data)

schedule.every(FETCH_INTERVAL_SECONDS).seconds.do(task)

task()
while True:
  schedule.run_pending()
  time.sleep(1)
