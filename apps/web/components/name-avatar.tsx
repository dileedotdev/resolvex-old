import { cn } from '~/lib/utils'

export function NameAvatar({ name, className }: { name: string; className?: string }) {
  const firstLetter = name[0].toUpperCase()
  return (
    <div
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full bg-foreground font-title text-background',
        className,
      )}
    >
      {firstLetter}
    </div>
  )
}
