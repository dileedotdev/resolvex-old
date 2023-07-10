import React from 'react'
import { cn } from '~/lib/utils'

export const Light = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<'div'>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('h-10 w-full bg-white blur-[100px]', className)} {...props} />
  },
)

Light.displayName = 'Light'
