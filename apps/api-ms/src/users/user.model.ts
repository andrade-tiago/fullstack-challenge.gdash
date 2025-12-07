import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type UserDocument = HydratedDocument<User>

export enum UserRole {
  Admin = "admin",
  User = "user",
}

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

  @Prop({
    required: true
  })
  role: UserRole
}

export const UserSchema = SchemaFactory.createForClass(User)
