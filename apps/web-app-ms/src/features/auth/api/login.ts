import { api } from "@/shared/api/api"

type LoginProps = {
  email: string
  password: string
}

type LoginResponse = {
  accessToken: string
}

async function login(props: LoginProps) {
  try {
    const response = await api.post<LoginResponse>('auth/login', { ...props })

    return response.data
  } catch {
    return null
  }
}

export {
  login,
}
