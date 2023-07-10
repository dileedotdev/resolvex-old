'use client'

import { type JoinWaitlistInput, joinWaitlist } from './join-wait-list-form.action'
import { useToast } from './ui/use-toast'
import { ChevronRight } from 'lucide-react'
import { useAction } from 'next-safe-action/hook'
import { useForm } from 'react-hook-form'
import { cn } from '~/lib/utils'

export function JointWaitListForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { toast } = useToast()
  const { register, handleSubmit } = useForm<JoinWaitlistInput>()
  const { execute } = useAction(joinWaitlist, {
    onSuccess: () => {
      toast({
        title: 'Thank you!',
        description: 'Please check your email for confirmation.',
      })
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: 'Something went wrong, please try again later.',
      })
    },
  })

  const onSubmit = handleSubmit((data) => {
    execute(data)
  })

  return (
    <form className={cn(['relative w-full p-1 @container', className])} onSubmit={onSubmit} {...props}>
      <div className="absolute inset-0  -z-20 rounded-md bg-gradient-to-r from-red-700 to-orange-700 blur-sm" />
      <div className="absolute inset-0  -z-10 rounded-md bg-background" />

      <div className="flex flex-col items-center justify-between px-5 text-muted-foreground @md:flex-row @md:px-0">
        <input
          type="email"
          placeholder="Your email address"
          required
          className={cn([
            'w-full border-none bg-transparent py-2 text-muted-foreground focus:ring-0 @md:w-auto @md:min-w-[18rem] @md:flex-1',
            'text-center placeholder:text-center placeholder:font-light @md:text-left @md:placeholder:text-left',
          ])}
          {...register('email')}
        />

        <button
          type="submit"
          className="flex w-full items-center justify-center border-t px-5 py-2 transition hover:text-foreground @md:w-auto @md:border-l @md:border-t-0"
        >
          Join our waitlist
          <ChevronRight className="h-5 w-auto" />
        </button>
      </div>
    </form>
  )
}
