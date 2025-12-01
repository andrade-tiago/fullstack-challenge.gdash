import { Module } from "@nestjs/common";
import { WeatherController } from "./weather.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { WeatherLog, WeatherLogSchema } from "./weather-log.model";
import { WeatherService } from "./weather.service";
import { WeatherLogMapper } from "./weather-log.mapper";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WeatherLog.name, schema: WeatherLogSchema }]),
  ],
  providers: [WeatherService, WeatherLogMapper],
  controllers: [WeatherController]
})
export class WeatherModule {} 
