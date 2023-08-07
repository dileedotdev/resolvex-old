'use client'

import { useAuth } from '@clerk/nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useEffect, useState } from 'react'
import { env } from '~/env'
import { trpc } from '~/lib/trpc'

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const { getToken, userId, orgId } = useAuth()
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `${env.NEXT_PUBLIC_API_URL}/trpc`,

					async headers() {
						const headers: Record<string, string> = {}

						const bearer = await getToken()
						if (bearer) {
							headers.Authorization = `Bearer ${bearer}`
						}

						return headers
					},
				}),
			],
		}),
	)

	useEffect(() => {
		queryClient.invalidateQueries()
	}, [userId, orgId, queryClient])

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	)
}
