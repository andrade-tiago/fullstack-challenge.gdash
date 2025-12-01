import { Injectable } from "@nestjs/common";
import { WeatherLogCreateDto } from "./dtos/weather-log-create.dto";
import { InjectModel } from "@nestjs/mongoose";
import { WeatherLog, WeatherLogDocument } from "./weather-log.model";
import { Model } from "mongoose";
import { WeatherLogListDto } from "./dtos/weather-log-list.dto";
import { Pagination } from "src/common/dtos/pagination.dto";
import { WeatherLogResponseDto } from "./dtos/weather-log-response.dto";
import { WeatherLogMapper } from "./weather-log.mapper";

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(WeatherLog.name)
    private readonly _weatherLogModel: Model<WeatherLogDocument>,

    private readonly _weatherLogMapper: WeatherLogMapper,
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
      this._weatherLogModel.find().skip(skip).limit(query.pageSize).exec(),
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
}
