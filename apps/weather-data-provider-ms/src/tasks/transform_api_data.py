def transform_api_data(data):
  return {
    "temperature": data["temperature_2m"],
    "relativeHumidity": data["relative_humidity_2m"],
    "apparentTemperature": data["apparent_temperature"],
    "isDay": bool(data["is_day"]),
    "rain": data["rain"],
    "windDirection": data["wind_direction_10m"],
    "windSpeed": data["wind_speed_10m"],
    "precipitation": data["precipitation"],
    "surfacePressure": data["surface_pressure"]
  }