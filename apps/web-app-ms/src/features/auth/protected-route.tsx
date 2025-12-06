import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/auth-context"

function ProtectedRoute() {
  const auth = useAuth()

  return auth.token
    ? <Outlet />
    : <Navigate to="login" />
}

export {
  ProtectedRoute,
}
