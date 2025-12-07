import { UserResponseDto } from "./dtos/user-response.dto";
import { UserDocument } from "./user.model";

export class UserMapper {
  toResponse(user: UserDocument): UserResponseDto {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }
}
