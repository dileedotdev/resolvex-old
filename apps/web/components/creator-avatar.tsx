'use client'

import { NameAvatar } from './name-avatar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'
import { Bot } from 'lucide-react'
import { trpc } from '~/lib/trpc'

export function CreatorAvatar({
	creatorId,
	withName = false,
}: {
	creatorId?: string | null
	withName?: boolean
}) {
	if (!creatorId)
		return (
			<div className=' flex items-center gap-2'>
				<Bot size={20} />
				{withName && <span className='font-title text-sm'>Bot</span>}
			</div>
		)

	if (creatorId.startsWith('c_')) return <Customer customerId={creatorId} withName={withName} />

	return <User userId={creatorId} withName={withName} />
}

function Customer({
	customerId,
	withName,
}: {
	customerId: string
	withName: boolean
}) {
	const { data, isLoading, isError } = trpc.customer.detail.useQuery({
		id: customerId,
	})

	if (isLoading || isError)
		return (
			<div className='flex items-center gap-2'>
				<Skeleton className='h-6 w-6' />
				{withName && <Skeleton className='h-4 w-20' />}
			</div>
		)

	return (
		<div className='flex items-center gap-2'>
			<NameAvatar name={data.name} />
			{withName && <span className='font-title text-sm'>{data.name}</span>}
		</div>
	)
}

function User({ userId, withName }: { userId: string; withName: boolean }) {
	const { data, isLoading, isError } = trpc.user.detail.useQuery({
		userId,
	})

	if (isLoading || isError)
		return (
			<div className='flex items-center gap-2'>
				<Skeleton className='h-6 w-6' />
				{withName && <Skeleton className='h-4 w-20' />}
			</div>
		)

	return (
		<div className='flex items-center gap-2'>
			<Avatar className='h-6 w-6'>
				<AvatarImage src={data.imageUrl} />
				<AvatarFallback>{userId[0].toUpperCase()}</AvatarFallback>
			</Avatar>
			{withName && (
				<span className='font-title text-sm'>
					{data.firstName} {data.lastName}
				</span>
			)}
		</div>
	)
}
