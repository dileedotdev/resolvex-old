'use client'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useBroadcast } from '~/lib/broadcast'

export default function Page() {
	const [isOn, setIsOn] = useState(true)

	return (
		<div>
			<button type='button' className='block' onClick={() => setIsOn(!isOn)}>
				on/off
			</button>
			----
			{isOn && <Test />}
		</div>
	)
}

export function Test() {
	const { userId } = useAuth()
	const [count, setCount] = useState(0)
	const broadcast = useBroadcast()

	useEffect(() => {
		if (!userId) return

		const channel = broadcast.channel(userId)
		const listener = channel.on('ping', (data) => {
			console.log('ping', { data, count })
		})

		return () => {
			channel.off(listener)
		}
	}, [count])

	return (
		<div>
			{count}
			<button
				type='button'
				onClick={() => {
					setCount(count + 1)
				}}
			>
				+
			</button>
		</div>
	)
}
