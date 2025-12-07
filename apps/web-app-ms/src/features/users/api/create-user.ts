import { api } from "@/shared/api/api"
import type { UserRole } from "../types/user"

type CreateUserProps = {
  name: string
  email: string
  password: string
  role: UserRole
}

async function createUser(data: CreateUserProps) {
  try {
    await api.post("users", { ...data })
    return true
  } catch {
    return false
  }
}

export {
  createUser,
}
