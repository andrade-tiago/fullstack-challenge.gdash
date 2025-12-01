import { Injectable } from "@nestjs/common";
import { WeatherLogCreateDto } from "./dtos/weather-log-create.dto";
import { InjectModel } from "@nestjs/mongoose";
import { WeatherLog, WeatherLogDocument } from "./weather-log.model";
import { Model } from "mongoose";
import { WeatherLogListDto } from "./dtos/weather-log-list.dto";
import { Pagination } from "src/common/dtos/pagination.dto";
import { WeatherLogResponseDto } from "./dtos/weather-log-response.dto";
import { WeatherLogMapper } from "./weather-log.mapper";
import { WeatherLogXlsxDto } from "./dtos/weather-log-xlsx.dto";
import { XlsxService } from "src/common/xlsx.service";
import { CsvService } from "src/common/csv.service";
import { WeatherLogToCsvDto } from "./dtos/weather-log-to-csv.dto";

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(WeatherLog.name)
    private readonly _weatherLogModel: Model<WeatherLogDocument>,

    private readonly _weatherLogMapper: WeatherLogMapper,
    private readonly _xlsxService: XlsxService,
    private readonly _csvService: CsvService,
  ) {}

  async create(command: WeatherLogCreateDto): Promise<string> {
    const newLog = new this._weatherLogModel({ ...command })

    await newLog.save()
    return newLog._id.toString()
  }

  async list(query: WeatherLogListDto): Promise<Pagination<WeatherLogResponseDto>> {
    query.pageSize ??= 10
    query.pageNumber ??= 1

    const skip = (query.pageNumber - 1) * query.pageSize

    const [weatherLogs, totalCount] = await Promise.all([
      this._weatherLogModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(query.pageSize)
        .exec(),
      this._weatherLogModel.countDocuments().exec(),
    ])

    const weatherLogDtos = weatherLogs.map(this._weatherLogMapper.toResponse)

    return new Pagination({
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      totalCount: totalCount,
      data: weatherLogDtos,
    })
  }

  async exportToXlsx(query: WeatherLogXlsxDto): Promise<Buffer> {
    query.limit ??= 10

    const logs = await this._weatherLogModel.find()
      .sort({ createdAt: -1 })
      .limit(query.limit)
      .exec()
    
    const logDtos = logs.map(this._weatherLogMapper.toResponse)

    return this._xlsxService.exportToXlsx(logDtos)
  }

  async toCsvStruct(query: WeatherLogToCsvDto): Promise<string> {
    query.limit ??= 10

    const logs = await this._weatherLogModel.find()
      .sort({ createdAt: -1 })
      .limit(query.limit)
      .exec()
    
    const logDtos = logs.map(this._weatherLogMapper.toResponse)

    return this._csvService.toCsvStruct(logDtos)
  }
}
