import { ApiProperty } from "@nestjs/swagger"
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
  @ApiProperty({ example: new Date().toISOString() })
  @Type(() => Date)
  @IsDate()
  createdAt: Date

  @ApiProperty({ example: 25 })
  @IsNumber()
  @Min(MIN_CELCIUS_TEMPERATURE)
  temperatureInCelcius: number

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  @Max(100)
  relativeHumidityInPercent: number

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(MIN_CELCIUS_TEMPERATURE)
  apparentTemperatureInCelcius: number

  @ApiProperty({ example: true })
  @IsBoolean()
  isDay: boolean

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  rainInMm: number

  @ApiProperty({ example: 180 })
  @IsNumber()
  @Min(0)
  @Max(359) // 360° = 0°
  windDirectionInDegrees: number

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(0)
  windSpeedInKmPerHour: number

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  precipitationInMm: number

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(0) // Is it really possible?
  surfacePressureInHpa: number
}