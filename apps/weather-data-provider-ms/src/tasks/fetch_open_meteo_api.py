import logging
import requests

def fetch_open_meteo_api():
  api_url = "https://api.open-meteo.com/v1/forecast"

  params = {
    "latitude": -23.55,
    "longitude": -46.63,
    "current": ",".join([
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "rain",
      "wind_direction_10m",
      "wind_speed_10m",
      "precipitation",
      "surface_pressure",
    ]),
    "timezone": "America/Sao_Paulo"
  }

  try:
    response = requests.get(api_url, params)
    response.raise_for_status()

    return response.json()

  except Exception as ex:
    logging.error(msg=f"Erro ao consumir a API: {ex}")
    raise