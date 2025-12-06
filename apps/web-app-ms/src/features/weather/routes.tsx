import { type RouteObject } from "react-router-dom"
import { WeatherDashoardPage } from "./pages/dashboard"

export const weatherRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <WeatherDashoardPage />,
  },
]
