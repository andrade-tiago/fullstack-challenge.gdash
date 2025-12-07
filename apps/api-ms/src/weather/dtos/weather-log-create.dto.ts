import { Type } from "class-transformer"
import {
  IsBoolean,
  IsDate,
  IsNumber,
  Max,
  Min,
} from "class-validator"

const MIN_CELCIUS_TEMPERATURE = -273.15

export class WeatherLogCreateDto {
  @Type(() => Date)
  @IsDate()
  createdAt: Date

  @IsNumber()
  @Min(MIN_CELCIUS_TEMPERATURE)
  temperatureInCelcius: number

  @IsNumber()
  @Min(0)
  @Max(100)
  relativeHumidityInPercent: number

  @IsNumber()
  @Min(MIN_CELCIUS_TEMPERATURE)
  apparentTemperatureInCelcius: number

  @IsBoolean()
  isDay: boolean

  @IsNumber()
  @Min(0)
  rainInMm: number

  @IsNumber()
  @Min(0)
  @Max(359) // 360° = 0°
  windDirectionInDegrees: number

  @IsNumber()
  @Min(0)
  windSpeedInKmPerHour: number

  @IsNumber()
  @Min(0)
  precipitationInMm: number

  @IsNumber()
  @Min(0) // Is it really possible?
  surfacePressureInHpa: number
}