'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function AppQueryClientProvider({ children }: { children: React.ReactNode }) {
  // new QueryClient(...) defined in useState because it should only be present in client side not server side, as it can conflict in next.js app.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}