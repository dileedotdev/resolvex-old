import { useAuth } from '@clerk/nextjs'
import { useContext } from 'react'
import { BroadcastContext } from '~/app/broadcast-provider'

export function useBroadcast() {
	const broadcast = useContext(BroadcastContext)

	if (!broadcast) {
		throw new Error('useBroadcast must be used within a BroadcastProvider')
	}

	return broadcast
}
