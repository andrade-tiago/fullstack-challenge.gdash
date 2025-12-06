import React from "react"
import { api } from "@/shared/api/api"
import { fetchLoggedUser, type LoggedUser } from "../api/fetch-logged-user"

type AuthContextType = {
  token: string | null
  user: LoggedUser | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
})

type AuthProviderProps = {
  children: React.ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
  const [token, setToken] = React.useState<string | null>(null)
  const [user, setUser] = React.useState<LoggedUser | null>(null)

  async function login(newToken: string) {
    setToken(newToken)
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`
    
    const user = await fetchLoggedUser()
    setUser(user)
  }
  function logout() {
    setToken(null)
    delete api.defaults.headers.common["Authorization"]
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => React.useContext(AuthContext)

export {
  AuthProvider,
  useAuth,
}
