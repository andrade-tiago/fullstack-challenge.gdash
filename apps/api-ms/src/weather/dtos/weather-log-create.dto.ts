export type WeatherLogCreateDto = {
    temperature: number
    relativeHumidity: number
    apparentTemperature: number
    isDay: boolean
    rain: number
    windDirection: number
    windSpeed: number
    precipitation: number
    surfacePressure: number
}