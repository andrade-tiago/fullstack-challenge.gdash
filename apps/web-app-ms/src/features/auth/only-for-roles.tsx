import { Navigate, Outlet } from "react-router-dom"
import type { UserRole } from "../users/types/user"
import { useAuth } from "./context/auth-context"

type OnlyForRolesProps = {
  roles: UserRole[]
}

function OnlyFor({ roles }: OnlyForRolesProps) {
  const auth = useAuth()

  return auth.user && roles.includes(auth.user.role)
    ? <Outlet />
    : <Navigate to="/" />
}

export {
  OnlyFor,
}
