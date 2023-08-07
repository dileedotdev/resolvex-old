'use client'

import { NameAvatar } from '~/components/name-avatar'
import { SendingTimelineForm } from '~/components/sending-timeline-form'
import { TimelineList } from '~/components/timeline-list'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Skeleton } from '~/components/ui/skeleton'
import { trpc } from '~/lib/trpc'

export function CustomerChatDetail({ customerId }: { customerId: string }) {
	const {
		data: customer,
		isLoading,
		isError,
	} = trpc.customer.detail.useQuery({
		id: customerId,
	})

	if (isError) return <ErrorComponent />

	return (
		<div className='flex h-full flex-col px-4 py-4'>
			{isLoading ? (
				<div>
					<Skeleton className='h-8 w-32' />
				</div>
			) : (
				<div className='flex items-center gap-2 border-b pb-4'>
					<NameAvatar name={customer.name} className='h-8 w-8' />
					<div className='font-title'>{customer.name}</div>
				</div>
			)}

			{/* TODO: SCROLL REVERED */}
			<ScrollArea className='flex flex-1'>
				<div className='flex justify-center pb-8'>
					<div className='w-full max-w-lg py-4'>
						<TimelineList customerId={customerId} />
					</div>
				</div>
			</ScrollArea>

			<div className='border-t p-4 pb-0'>
				<SendingTimelineForm customerId={customerId} />
			</div>
		</div>
	)
}

function ErrorComponent() {
	return <div className='p-8 text-destructive'>Something went wrong</div>
}
