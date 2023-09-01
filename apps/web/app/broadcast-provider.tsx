'use client'
import { useAuth } from '@clerk/nextjs'
import { createBroadcastClient } from '@resolvex/broadcast-client/src'
import { Events } from 'api/src/worker.broadcast'
import { createContext, useState } from 'react'
import { env } from '~/env'

export const BroadcastContext = createContext<ReturnType<typeof createBroadcastClient<Events>> | null>(null)

export function BroadcastProvider({ children }: { children: React.ReactNode }) {
	const { getToken } = useAuth()

	const [broadcast] = useState(() => {
		return createBroadcastClient<Events>({
			async connect(chanel) {
				return new WebSocket(`${env.NEXT_PUBLIC_BROADCAST_URL}?channel=${chanel}&token=${await getToken()}`)
			},
		})
	})

	return <BroadcastContext.Provider value={broadcast}>{children}</BroadcastContext.Provider>
}
