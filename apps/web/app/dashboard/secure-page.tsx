'use client'

import { useAuth } from '@clerk/nextjs'

export function SecurePage({ children }: { children: React.ReactNode }) {
  const { orgId } = useAuth()

  if (!orgId)
    return (
      <div className="px-8 py-28 text-center text-muted-foreground">
        Please select an organization to view the dashboard
      </div>
    )

  return children
}
