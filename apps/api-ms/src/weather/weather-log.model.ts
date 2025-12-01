import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type WeatherLogDocument = HydratedDocument<WeatherLog>

@Schema({ timestamps: true })
export class WeatherLog {
  @Prop()
  temperature: number

  @Prop()
  relativeHumidity: number

  @Prop()
  apparentTemperature: number
  
  @Prop()
  isDay: boolean
  
  @Prop()
  rain: number
  
  @Prop()
  windDirection: number
  
  @Prop()
  windSpeed: number
  
  @Prop()
  precipitation: number
  
  @Prop()
  surfacePressure: number

  // timestamp
  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const WeatherLogSchema = SchemaFactory.createForClass(WeatherLog)
