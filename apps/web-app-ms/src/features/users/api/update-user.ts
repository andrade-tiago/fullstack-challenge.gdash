import { api } from "@/shared/api/api"
import type { UserRole } from "../types/user"

type UserData = {
  name: string
  role: UserRole
}

async function updateUser(id: string, userData: UserData) {
  const response = await api.patch(`users/${id}`, userData)

  return response.status >= 200 && response.status < 300
}

export {
  updateUser,
}
