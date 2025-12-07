export type WeatherLogDataDto = {
  temperatureInCelcius: number
  realtiveHumidityInPercent: number
  apparentTemperatureInCelcius: number
  isDay: boolean
  rainInMm: number
  windDirectionInDegrees: number
  windSpeedInKmPerHour: number
  precipitationInMm: number
  surfacePressureInHpa: number
  createdAt: Date
}
