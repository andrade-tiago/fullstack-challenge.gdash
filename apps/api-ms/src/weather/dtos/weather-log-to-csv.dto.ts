import { IsNumber, Max, Min } from "class-validator";

export class WeatherLogToCsvDto {
  @IsNumber()
  @Min(1)
  @Max(1000)
  limit: number
}
