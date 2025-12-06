import type { RouteObject } from "react-router-dom";
import { LoginPage } from "./pages/login";

const authRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginPage />,
  },
]

export {
  authRoutes,
}
