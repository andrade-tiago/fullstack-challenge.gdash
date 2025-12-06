import type { RouteObject } from "react-router-dom";
import { UsersPage } from "./pages/users";

const usersRoutes: RouteObject[] = [
  {
    path: "users",
    element: <UsersPage />,
  },
]

export {
  usersRoutes,
}
