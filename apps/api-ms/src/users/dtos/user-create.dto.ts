import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator"
import { UserRole } from "../user.model"
import { ApiProperty } from "@nestjs/swagger"

export class UserCreateDto {
  @ApiProperty({ example: "Fulano" })
  @IsString()
  @MinLength(2) // e.g.: Jó
  @MaxLength(24) // No basis for this limit
  name: string

  @ApiProperty({ example: "example@email.com" })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ example: "S3nha_f0rte!" })
  @IsString()
  @MinLength(8)
  @MaxLength(72) // BCrypt limit
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]).+$/, {
    message: "password must contain at least one uppercase, lowecase, number and especial character"
  })
  password: string

  @ApiProperty({ example: 'user' })
  @IsEnum(UserRole)
  role: UserRole
}
