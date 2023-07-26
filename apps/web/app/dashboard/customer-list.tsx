'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'
import { ViewportBlock } from '~/components/viewport-block'
import { trpc } from '~/lib/trpc'

export function CustomerList() {
  const searchParams = useSearchParams()
  const status = z.enum(['waiting', 'helping', 'helped', 'spam']).parse(searchParams.get('status') ?? 'waiting')
  const query = trpc.customer.list.useInfiniteQuery(
    {
      status,
    },
    {
      getNextPageParam: (lastPage) => lastPage.meta.nextCursor,
    },
  )

  return (
    <div className="space-y-4">
      <div className="divide-y">
        {query.data &&
          query.data.pages.map((customers) => {
            if (!customers.data.length)
              return <div className="py-8 text-center text-muted-foreground">There are no customers in this list</div>

            return customers.data.map((customer) => (
              <div key={customer.id} className="group relative space-y-2 px-6 py-5">
                <div className="flex items-center gap-2">
                  <div className="font-title group-hover:text-foreground/70">
                    <Link href={`/dashboard/${customer.id}`} className="">
                      <span className="absolute inset-0"></span>
                      {customer.name}
                    </Link>
                  </div>
                  {customer.email && <div className="text-xs text-muted-foreground">&middot; {customer.email}</div>}
                </div>
                <div className="text-sm">
                  {customer.timelines[0] && <div>{customer.timelines[0].data.message}</div>}
                </div>
              </div>
            ))
          })}
      </div>
      {(query.isLoading || query.isFetchingNextPage) && <Loading />}
      {query.isError && <Error />}

      {query.hasNextPage && !query.isFetchingNextPage && (
        <ViewportBlock onEnterViewport={() => query.fetchNextPage()}>
          <Button variant="ghost" type="button" className="w-full" onClick={() => query.fetchNextPage()}>
            Load more
          </Button>
        </ViewportBlock>
      )}
    </div>
  )
}

function Loading() {
  return (
    <div>
      {Array(5)
        .fill(1)
        .map((_, idx) => {
          return (
            <div key={idx} className="space-y-4 px-6 py-4">
              <div className="flex gap-3">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
              <Skeleton className="h-5 w-4/5" />
            </div>
          )
        })}
    </div>
  )
}

function Error() {
  return <div className="text-destructive">Something went wrong</div>
}
