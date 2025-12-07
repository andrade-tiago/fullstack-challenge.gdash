import { UserRole } from "src/users/user.model"

export type JwtPayloadDto = {
  sub: string
  email: string
  role: UserRole
}
