import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { WeatherService } from "./weather.service";
import type { WeatherLogCreateDto } from "./dtos/weather-log-create.dto";
import type { WeatherLogListDto } from "./dtos/weather-log-list.dto";

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly _weatherService: WeatherService,
  ) {}

  @Post('logs')
  async create(@Body() data: WeatherLogCreateDto) {
    const id = await this._weatherService.create(data);
    return { id }
  }

  @Get('logs')
  async list(@Query() query: WeatherLogListDto) {
    return this._weatherService.list(query)
  }
}
