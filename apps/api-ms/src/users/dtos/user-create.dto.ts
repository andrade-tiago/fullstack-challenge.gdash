import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator"
import { UserRole } from "../user.model"

export class UserCreateDto {
  @IsString()
  @MinLength(2) // e.g.: Jó
  @MaxLength(24) // No basis for this limit
  name: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(72) // BCrypt limit
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]).+$/, {
    message: "password must contain at least one uppercase, lowecase, number and especial character"
  })
  password: string

  @IsEnum(UserRole)
  role: UserRole
}
