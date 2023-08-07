import { CollapsibleCustomerStatusSelector } from './collapsible-customer-status-selector'
import { CustomerList } from './customer-list'
import { CustomerStatusSelector } from './customer-status-selector'
import { ScrollArea } from '~/components/ui/scroll-area'

export default function DashboardPage() {
	return (
		<div className='flex h-full flex-col md:flex-row md:divide-x'>
			<div className='hidden w-[280px] px-2 py-8 md:block'>
				<CustomerStatusSelector />
			</div>
			<div className='block border-b pb-2 md:hidden'>
				<CollapsibleCustomerStatusSelector />
			</div>
			<ScrollArea className='flex-1 overflow-auto'>
				<div className='px-4 py-8'>
					<CustomerList />
				</div>
			</ScrollArea>
		</div>
	)
}
