import { api } from "@/shared/api/api"

type UserData = {
  name: string
}

async function updateUser(id: string, userData: UserData) {
  const response = await api.patch(`users/${id}`, userData)

  return response.status >= 200 && response.status < 300
}

export {
  updateUser,
}
