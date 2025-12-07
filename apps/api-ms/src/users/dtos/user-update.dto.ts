import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength,  } from "class-validator";
import { UserRole } from "../user.model";

export class UserUpdateDto {
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  name: string

  @IsEnum(UserRole)
  role: UserRole
}
