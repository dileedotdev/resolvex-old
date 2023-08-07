import { CustomerList } from '../customer-list'
import { CustomerStatusSelector } from '../customer-status-selector'
import { CustomerChatDetail } from './customer-chat-detail'
import { GoBack } from './go-back'
import { ScrollArea } from '~/components/ui/scroll-area'

type Props = {
	params: {
		customerId: string
	}
}

export default function CustomerPage({ params }: Props) {
	return (
		<div className='flex h-full flex-col md:flex-row md:divide-x'>
			<div className='hidden px-2 py-8 md:block'>
				<CustomerStatusSelector collapsed />
			</div>
			<div className='hidden md:block'>
				<ScrollArea className='w-[500px] md:h-[calc(100vh-70px)]'>
					<div className='px-4 py-8'>
						<CustomerList />
					</div>
				</ScrollArea>
			</div>
			<div className='border-b px-2 py-2 md:hidden'>
				<GoBack />
			</div>
			<div className='flex-1 overflow-auto'>
				<CustomerChatDetail customerId={params.customerId} />
			</div>
		</div>
	)
}
