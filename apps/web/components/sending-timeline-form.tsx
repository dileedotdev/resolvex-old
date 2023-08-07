'use client'

import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useToast } from './ui/use-toast'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { trpc } from '~/lib/trpc'

export function SendingTimelineForm({ customerId }: { customerId: string }) {
	const { toast } = useToast()
	const [message, setMessage] = useState('')
	const { mutate } = trpc.timeline.create.useMutation({
		onSuccess: () => {
			setMessage('')
			toast({
				title: 'Success!',
				description: 'Your message has been sent',
			})
		},
		onError: () => {
			toast({
				variant: 'destructive',
				title: 'Oops!',
				description: 'Something went wrong, please try again later.',
			})
		},
	})

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		mutate({
			customerId,
			data: {
				type: 'chat',
				message,
			},
		})
	}

	return (
		<div className='space-y-4'>
			<div>
				<Button size='sm' variant='secondary'>
					<MessageCircle size={20} className='mr-1' />
					<span>Chat</span>
				</Button>
			</div>
			<form className='space-y-2' onSubmit={onSubmit}>
				<div>
					<Textarea placeholder='Type a message...' value={message} onChange={(e) => setMessage(e.target.value)} />
				</div>
				<div className='flex justify-end'>
					<Button size='sm' disabled={!message}>
						Send chat
					</Button>
				</div>
			</form>
		</div>
	)
}
