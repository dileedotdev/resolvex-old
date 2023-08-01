import { CreatorAvatar } from './creator-avatar'
import { Skeleton } from './ui/skeleton'
import { ViewportBlock } from './viewport-block'
import { formatDistance } from 'date-fns'
import { trpc } from '~/lib/trpc'

export function TimelineList({ customerId }: { customerId: string }) {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = trpc.timeline.list.useInfiniteQuery(
    {
      customerId,
      limit: 5,
    },
    {
      getNextPageParam: (lastPage) => lastPage.meta.nextCursor,
    },
  )

  if (isError) return <Error />
  if (data?.pages?.[0].data.length === 0) return <Empty />

  return (
    <div className="space-y-8">
      {isLoading ? (
        <>
          <div className="space-y-4 divide-y divide-border/50 rounded-md border border-border/50 p-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-28 w-10/12" />
            <Skeleton className="h-6 w-full" />
          </div>

          <div className="space-y-4 divide-y divide-border/50 rounded-md border border-border/50 p-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-28 w-8/12" />
            <Skeleton className="h-6 w-full" />
          </div>
        </>
      ) : (
        <>
          {data.pages.map((page) =>
            page.data.map((timeline) => (
              <div key={timeline.id} className="divide-y divide-border/50 rounded-md border border-border/50 p-4">
                <div className="flex items-center gap-2 pb-4">
                  <CreatorAvatar creatorId={timeline.creatorId} withName />
                  <div className="text-muted-foreground">&middot;</div>
                  <time
                    className="text-xs text-muted-foreground"
                    dateTime={new Date(timeline.createdAt).toString()}
                    title={new Date(timeline.createdAt).toString()}
                  >
                    {formatDistance(timeline.createdAt, Date.now(), { addSuffix: true })}
                  </time>
                </div>

                <div className="pt-4">{timeline.data.message}d</div>
              </div>
            )),
          )}
          {hasNextPage ? (
            <ViewportBlock onEnterViewport={fetchNextPage}>
              <div className="space-y-4 divide-y divide-border/50 rounded-md border border-border/50 p-4">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-28 w-8/12" />
                <Skeleton className="h-6 w-full" />
              </div>
            </ViewportBlock>
          ) : (
            <div className="text-center text-sm text-muted-foreground">End</div>
          )}
        </>
      )}
    </div>
  )
}

function Error() {
  return <div className="text-destructive">Something went wrong</div>
}

function Empty() {
  return <div className="text-center">No timelines yet</div>
}
