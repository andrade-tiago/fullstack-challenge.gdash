import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string

  @Prop({
    required: true
  })
  pass: string
}

export const UserSchema = SchemaFactory.createForClass(User)
