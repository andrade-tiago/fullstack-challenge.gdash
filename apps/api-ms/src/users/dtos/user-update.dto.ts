import { IsEnum, IsString, MaxLength, MinLength,  } from "class-validator";
import { UserRole } from "../user.model";
import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto {
  @ApiProperty({ example: "Fulano" })
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  name: string

  @ApiProperty({ example: "admin" })
  @IsEnum(UserRole)
  role: UserRole
}
