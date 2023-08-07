import { Github, Twitter } from 'lucide-react'
import { cn } from '~/lib/utils'

const navigation = [
	{
		name: 'Github',
		href: 'https://github.com/resolvexai',
		icon: <Github className='h-5 w-5' />,
	},
	{
		name: 'Twitter',
		href: 'https://twitter.com/resolvexai',
		icon: <Twitter className='h-5 w-5' />,
	},
]

export interface FooterProps {
	className?: string
}

export function Footer({ className }: FooterProps) {
	return (
		<footer className={cn('bg-background @container', className)}>
			<div className='@2xl:flex @2xl:items-center @2xl:justify-between'>
				<div className='flex justify-center space-x-6 @2xl:order-2'>
					{navigation.map((item) => (
						<a key={item.name} href={item.href} className='text-muted-foreground/60 hover:text-muted-foreground'>
							<span className='sr-only'>{item.name}</span>
							{item.icon}
						</a>
					))}
				</div>
				<div className='mt-8 @2xl:order-1 @2xl:mt-0'>
					<p className='text-center text-xs leading-5 text-muted-foreground'>
						&copy; 2023 ResolveX, Inc. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
