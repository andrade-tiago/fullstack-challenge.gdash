export type WeatherLogResponseDto = {
    id: string
    temperatureInCelcius: number
    relativeHumidityInPercent: number
    apparentTemperatureInCelcius: number
    isDay: boolean
    rainInMm: number
    windDirectionInDegrees: number
    windSpeedInKmPerHour: number
    precipitationInMm: number
    surfacePressureInHpa: number
    createdAt: string
}
