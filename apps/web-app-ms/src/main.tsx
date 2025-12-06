import './main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/api/query-client.ts'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './app/router.tsx'
import { AuthProvider } from './features/auth/context/auth-context.tsx'
import { configuration } from './env.ts' // necessary to validating on bootstrap

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
