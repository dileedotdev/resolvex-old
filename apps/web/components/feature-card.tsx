import { cn } from '~/lib/utils'
import { Light } from './ui/light'

export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  orientation?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
  orientation = 'top-left',
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md px-10 pb-16 pt-10',
        orientation === 'top-left' && 'border-t',
        orientation === 'top-right' && 'border-t',
        orientation === 'bottom-left' && 'border-b',
        orientation === 'bottom-right' && 'border-b',
        className
      )}
    >
      <Light
        className={cn(
          'absolute -z-10 h-10 w-10',
          orientation === 'top-left' && 'left-0 top-0',
          orientation === 'top-right' && 'right-0 top-0',
          orientation === 'bottom-left' && 'bottom-0 left-0',
          orientation === 'bottom-right' && 'bottom-0 right-0'
        )}
      />

      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-title text-2xl font-bold">{title}</h3>
      </div>
      <p className="mt-4 text-muted-foreground">{description}</p>
    </div>
  )
}
