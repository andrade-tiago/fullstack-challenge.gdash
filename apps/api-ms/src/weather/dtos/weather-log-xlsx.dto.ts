import { IsNumber, Max, Min } from "class-validator";

export class WeatherLogXlsxDto {
  @IsNumber()
  @Min(1)
  @Max(1000)
  limit: number
}
