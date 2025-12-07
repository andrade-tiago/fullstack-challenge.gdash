import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type WeatherLogDocument = HydratedDocument<WeatherLog>

@Schema()
export class WeatherLog {
  @Prop()
  temperatureInCelcius: number

  @Prop()
  relativeHumidityInPercent: number

  @Prop()
  apparentTemperatureInCelcius: number
  
  @Prop()
  isDay: boolean
  
  @Prop()
  rainInMm: number
  
  @Prop()
  windDirectionInDegrees: number
  
  @Prop()
  windSpeedInKmPerHour: number
  
  @Prop()
  precipitationInMm: number
  
  @Prop()
  surfacePressureInHpa: number

  // timestamp
  @Prop()
  createdAt: Date;
}

export const WeatherLogSchema = SchemaFactory.createForClass(WeatherLog)
