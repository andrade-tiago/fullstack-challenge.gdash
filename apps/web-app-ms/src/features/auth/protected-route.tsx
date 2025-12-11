import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "./context/auth-context"

function ProtectedRoute() {
  const auth = useAuth()
  const location = useLocation()

  if (auth.token) return <Outlet />
  
  const postAuthURL = location.pathname + location.search + location.hash

  let loginURL = "login"
  if (postAuthURL !== "/") {
    const urlSearchParams = new URLSearchParams({ redirect: postAuthURL })

    loginURL += "?" + urlSearchParams
  }


  return <Navigate to={loginURL}  />
}

export {
  ProtectedRoute,
}
