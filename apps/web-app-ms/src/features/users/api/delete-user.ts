import { api } from "@/shared/api/api"

async function deleteUser(userId: string) {
  try {
    await api.delete(`users/${userId}`)

    return true
  } catch {
    return false
  }
}

export {
  deleteUser,
}