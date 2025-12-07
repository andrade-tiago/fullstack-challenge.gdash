def transform_api_data(data):
  return {
    "createdAt": data["time"],
    "temperatureInCelcius": data["temperature_2m"],
    "relativeHumidityInPercent": data["relative_humidity_2m"],
    "apparentTemperatureInCelcius": data["apparent_temperature"],
    "isDay": bool(data["is_day"]),
    "rainInMm": data["rain"],
    "windDirectionInDegrees": data["wind_direction_10m"],
    "windSpeedInKmPerHour": data["wind_speed_10m"],
    "precipitationInMm": data["precipitation"],
    "surfacePressureInHpa": data["surface_pressure"]
  }
