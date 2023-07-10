import { cn } from '~/lib/utils'

export function Logo({ className, ...props }: React.ComponentProps<'img'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.svg" alt="Logo" className={cn(['h-5 w-auto', className])} {...props} />
  )
}

export function SquareLogo({ className, ...props }: React.ComponentProps<'img'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/square-logo.svg" alt="Square Logo" className={cn(['h-5 w-auto', className])} {...props} />
  )
}
