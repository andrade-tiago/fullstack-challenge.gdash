from dotenv import load_dotenv
from src.tasks.fetch_open_meteo_api import fetch_open_meteo_api 
from src.tasks.publish_to_rabbitmq_queue import publish_to_rabbitmq_queue
import logging
import os
import schedule
import time

load_dotenv()
FETCH_INTERVAL_SECONDS = int(os.getenv("FETCH_INTERVAL_SECONDS"))

def task():
  try:
    data = fetch_open_meteo_api()
    publish_to_rabbitmq_queue(data["current"])

  except Exception as ex:
    logging.exception(ex)

schedule.every(FETCH_INTERVAL_SECONDS).seconds.do(task)

task()
while True:
  schedule.run_pending()
  time.sleep(1)
