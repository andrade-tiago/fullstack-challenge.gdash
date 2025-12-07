import { UserRole } from "src/users/user.model"

export type AuthDataDto = {
  userId: string
  userEmail: string
  userRole: UserRole
}
