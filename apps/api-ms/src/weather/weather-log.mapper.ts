import { WeatherLogResponseDto } from "./dtos/weather-log-response.dto";
import { WeatherLogDocument } from "./weather-log.model";

export class WeatherLogMapper {
  toResponse(log: WeatherLogDocument): WeatherLogResponseDto {
    return {
      id: log._id.toString(),
      apparentTemperatureInCelcius: log.apparentTemperatureInCelcius,
      isDay: log.isDay,
      rainInMm: log.rainInMm,
      precipitationInMm: log.precipitationInMm,
      relativeHumidityInPercent: log.relativeHumidityInPercent,
      surfacePressureInHpa: log.surfacePressureInHpa,
      temperatureInCelcius: log.temperatureInCelcius,
      windDirectionInDegrees: log.windDirectionInDegrees,
      windSpeedInKmPerHour: log.windSpeedInKmPerHour,
      createdAt: log.createdAt?.toISOString() ?? null
    }
  }
}
