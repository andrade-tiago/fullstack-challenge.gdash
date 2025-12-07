import type { UserRole } from "@/features/users/types/user"
import { api } from "@/shared/api/api"

type LoggedUser = {
  id: string
  name: string
  email: string
  role: UserRole
}

async function fetchLoggedUser() {
  const response = await api.get<LoggedUser>("users/me")

  return response.data
}

export {
  type LoggedUser,
  fetchLoggedUser,
}
