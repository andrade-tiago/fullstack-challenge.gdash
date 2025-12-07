import { Body, Controller, Get, Header, Post, Query, Res, StreamableFile, UseGuards } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { WeatherLogCreateDto } from './dtos/weather-log-create.dto'
import { WeatherLogListDto } from './dtos/weather-log-list.dto'
import { WeatherLogXlsxDto } from './dtos/weather-log-xlsx.dto'
import { Readable } from 'stream'
import { WeatherLogToCsvDto } from './dtos/weather-log-to-csv.dto'

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

  @Get('logs/export/xlsx')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename="weather.xlsx"')
  async exportToXlsx(@Query() query: WeatherLogXlsxDto) {
    const fileBuffer = await this._weatherService.exportToXlsx(query)

    const stream = Readable.from(fileBuffer);
    return new StreamableFile(stream);
  }

  @Get('logs/export/csv')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="weather.csv"')
  async exportToCsv(@Query() query: WeatherLogToCsvDto) {
    return this._weatherService.toCsvStruct(query);
  }

  @Get('insights')
  async getIaInsights() {
    const insightText = await this._weatherService.getInsights()

    return { insightText }
  }
}
