import { WeatherLogResponseDto } from "./dtos/weather-log-response.dto";
import { WeatherLogDocument } from "./weather-log.model";

export class WeatherLogMapper {
  toResponse(log: WeatherLogDocument): WeatherLogResponseDto {
    return {
      id: log._id.toString(),
      apparentTemperature: log.apparentTemperature,
      isDay: log.isDay,
      rain: log.rain,
      precipitation: log.precipitation,
      relativeHumidity: log.relativeHumidity,
      surfacePressure: log.surfacePressure,
      temperature: log.temperature,
      windDirection: log.windDirection,
      windSpeed: log.windSpeed,
    }
  }
}
