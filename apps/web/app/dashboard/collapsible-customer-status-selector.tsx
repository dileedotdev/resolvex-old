'use client'

import { CustomerStatusSelector } from './customer-status-selector'
import { ChevronDown } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'

export function CollapsibleCustomerStatusSelector() {
	const searchParams = useSearchParams()
	const status = searchParams.get('status')
	const title = status === null ? 'Waiting for help' : status.charAt(0).toUpperCase() + status.slice(1)
	return (
		<Collapsible>
			<CollapsibleTrigger className='w-full'>
				<div className='flex items-center justify-between px-4 py-4'>
					<div className=' text-left'>
						<div className='font-title'>Customer status</div>
						<div className='text-sm text-muted-foreground'>{title}</div>
					</div>
					<div>
						<ChevronDown className='h-6 w-6 text-muted-foreground' />
					</div>
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<CustomerStatusSelector hideTitle />
			</CollapsibleContent>
		</Collapsible>
	)
}
