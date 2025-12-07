import App from "@/App";
import { OnlyFor } from "@/features/auth/only-for-roles";
import { ProtectedRoute } from "@/features/auth/protected-route";
import { authRoutes } from "@/features/auth/routes";
import { usersRoutes } from "@/features/users/routes";
import { UserRole } from "@/features/users/types/user";
import { WeatherDashoardPage } from "@/features/weather/pages/dashboard";
import { weatherRoutes } from "@/features/weather/routes";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  ...authRoutes,
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <App />,
        children: [
          { index: true, element: <WeatherDashoardPage /> },
          ...weatherRoutes,

          {
            element: <OnlyFor roles={[ UserRole.Admin ]} />,
            children: [
              ...usersRoutes,
            ],
          }
        ],
      },
    ],
  },
])
