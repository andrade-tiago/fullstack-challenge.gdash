import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class WeatherLogXlsxDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(1)
  @Max(1000)
  limit: number
}
