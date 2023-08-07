'use client'

import { BrainCircuit, Combine, Hand, Workflow } from 'lucide-react'
import { FeatureCard } from '~/components/feature-card'
import { useMediaQuery } from '~/hooks/use-media-query'

const features = [
	{
		icon: <Combine className='h-[22px] w-auto' />,
		title: 'All in One',
		description:
			'We will help you support your customers through email, real-time chat, ticket support, ... Connect all things to only one your center support',
	},
	{
		icon: <BrainCircuit className='h-[22px] w-auto' />,
		title: 'Power of ChatGPT',
		description: 'We utilize the power of ChatGPT help your support center automatically help you a part of answers',
	},
	{
		icon: <Workflow className='h-[22px] w-auto' />,
		title: 'Design for Developers',
		description: 'We bring the powerful of integration with good DX and more we are open source.',
	},
	{
		icon: <Hand className='h-[22px] w-auto' />,
		title: 'Powerful and Simple',
		description: 'All foremost we cover all powers by the simple.',
	},
]

export function FeatureSection() {
	const isSmallScreen = useMediaQuery({
		maxWidth: 1023,
	})

	// const isSmallScreen = useMedia('(max-width: 1023px)')

	return (
		<section className='container mt-28 lg:mt-48'>
			<h2 className='sr-only'>Features</h2>

			<div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20'>
				{features.map((feature, idx) => (
					<FeatureCard
						orientation={
							isSmallScreen
								? 'top-left'
								: idx % 4 === 0
								? 'bottom-right'
								: idx % 4 === 1
								? 'bottom-left'
								: idx % 4 === 2
								? 'top-right'
								: 'top-left'
						}
						{...feature}
						key={feature.title}
					/>
				))}
			</div>
		</section>
	)
}
