import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type WeatherLogDocument = HydratedDocument<WeatherLog>

@Schema({ timestamps: true })
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
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const WeatherLogSchema = SchemaFactory.createForClass(WeatherLog)
