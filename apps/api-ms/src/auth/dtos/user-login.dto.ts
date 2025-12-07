import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class UserLoginDto {
  @ApiProperty({ example: "example@email.com" })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ example: "S3enha_d0_usu4rio" })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string
}
