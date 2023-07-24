import { cn } from '~/lib/utils'

export function Logo({ className, ...props }: React.ComponentProps<'img'>) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="Logo dark version"
        className={cn(['hidden h-5 w-auto dark:inline-block', className])}
        {...props}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo:light.svg"
        alt="Logo light version"
        className={cn(['inline-block h-5 w-auto dark:hidden', className])}
        {...props}
      />
    </>
  )
}

export function SquareLogo({ className, ...props }: React.ComponentProps<'img'>) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/square-logo.svg"
        alt="Logo icon dark version"
        className={cn(['hidden h-5 w-auto dark:inline-block', className])}
        {...props}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo:icon:light.svg"
        alt="Logo icon light version"
        className={cn(['inline-block h-5 w-auto dark:hidden', className])}
        {...props}
      />
    </>
  )
}
