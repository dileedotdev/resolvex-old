'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '~/components/ui/button'
import { useContainerQuery } from '~/hooks/use-container-query'

export function CustomerStatusSelector({ hideTitle = false }: { hideTitle?: boolean }) {
  const searchParams = useSearchParams()
  const { matched: isSmall, container } = useContainerQuery({
    maxWidth: 240,
  })

  return (
    <div ref={container} className="space-y-2 @container">
      {!hideTitle && (
        <div className="h-6">
          <div className="hidden px-4 font-title text-muted-foreground @[240px]:block">Customer status</div>
        </div>
      )}
      <Button
        size={isSmall ? 'icon' : 'default'}
        variant={searchParams.get('status') === null ? 'secondary' : 'ghost'}
        className="flex gap-4 text-muted-foreground @[240px]:w-full @[240px]:justify-start"
        asChild
      >
        <Link href="/dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4 22c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 0 1 2 20V4c0-.55.196-1.02.587-1.413A1.926 1.926 0 0 1 4 2h16c.55 0 1.02.196 1.413.587C21.803 2.98 22 3.45 22 4v16c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0 1 20 22H4Zm8-4c.533 0 1.025-.137 1.475-.413.45-.274.817-.637 1.1-1.087.1-.15.225-.27.375-.363a.94.94 0 0 1 .5-.137H20V4H4v12h4.55a.94.94 0 0 1 .5.137c.15.092.275.213.375.363.283.45.65.813 1.1 1.087.45.276.942.413 1.475.413Z"
            ></path>
          </svg>
          <span className="hidden @[240px]:inline">Waiting for help</span>
        </Link>
      </Button>
      <Button
        size={isSmall ? 'icon' : 'default'}
        variant={searchParams.get('status') === 'helping' ? 'secondary' : 'ghost'}
        className="flex gap-4 text-muted-foreground @[240px]:w-full @[240px]:justify-start"
        asChild
      >
        <Link href="/dashboard?status=helping">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
              clip-rule="evenodd"
            ></path>
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="hidden @[240px]:inline">Helping</span>
        </Link>
      </Button>
      <Button
        size={isSmall ? 'icon' : 'default'}
        variant={searchParams.get('status') === 'helped' ? 'secondary' : 'ghost'}
        className="flex gap-4 text-muted-foreground @[240px]:w-full @[240px]:justify-start"
        asChild
      >
        <Link href="/dashboard?status=helped">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m10.6 13.8-2.175-2.175a.892.892 0 0 0-.688-.262.977.977 0 0 0-.687.287.948.948 0 0 0-.275.7c0 .283.092.517.275.7L9.9 15.9a.948.948 0 0 0 .7.275.948.948 0 0 0 .7-.275l5.675-5.675a.892.892 0 0 0 .262-.688.977.977 0 0 0-.287-.687.948.948 0 0 0-.7-.275.948.948 0 0 0-.7.275L10.6 13.8ZM12 22a9.738 9.738 0 0 1-3.9-.788 10.099 10.099 0 0 1-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 0 1 2 12c0-1.383.263-2.683.788-3.9a10.099 10.099 0 0 1 2.137-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0 1 12 2c1.383 0 2.683.263 3.9.788a10.098 10.098 0 0 1 3.175 2.137c.9.9 1.613 1.958 2.137 3.175A9.738 9.738 0 0 1 22 12a9.738 9.738 0 0 1-.788 3.9 10.098 10.098 0 0 1-2.137 3.175c-.9.9-1.958 1.613-3.175 2.137A9.738 9.738 0 0 1 12 22Zm0-2c2.217 0 4.104-.78 5.663-2.337C19.22 16.104 20 14.217 20 12s-.78-4.104-2.337-5.662C16.104 4.779 14.217 4 12 4s-4.104.78-5.662 2.338C4.779 7.896 4 9.783 4 12s.78 4.104 2.338 5.663C7.896 19.22 9.783 20 12 20Z"
            ></path>
          </svg>
          <span className="hidden @[240px]:inline">Helped</span>
        </Link>
      </Button>
      <Button
        size={isSmall ? 'icon' : 'default'}
        variant={searchParams.get('status') === 'spam' ? 'secondary' : 'ghost'}
        className="flex gap-4 text-muted-foreground @[240px]:w-full @[240px]:justify-start"
        asChild
      >
        <Link href="/dashboard?status=spam">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M15.9 2.788A9.738 9.738 0 0 0 12 2a9.738 9.738 0 0 0-3.9.788 10.099 10.099 0 0 0-3.175 2.137c-.9.9-1.612 1.958-2.137 3.175A9.738 9.738 0 0 0 2 12c0 1.383.263 2.683.788 3.9a10.098 10.098 0 0 0 2.137 3.175c.9.9 1.958 1.613 3.175 2.137A9.738 9.738 0 0 0 12 22a9.738 9.738 0 0 0 3.9-.788 10.098 10.098 0 0 0 3.175-2.137c.9-.9 1.613-1.958 2.137-3.175A9.738 9.738 0 0 0 22 12a9.738 9.738 0 0 0-.788-3.9 10.099 10.099 0 0 0-2.137-3.175c-.9-.9-1.958-1.612-3.175-2.137Zm-9.563 3.55C7.897 4.779 9.784 4 12 4s4.104.78 5.663 2.338C19.22 7.896 20 9.783 20 12s-.78 4.104-2.337 5.663C16.104 19.22 14.217 20 12 20s-4.104-.78-5.662-2.337C4.779 16.104 4 14.217 4 12s.78-4.104 2.338-5.662Zm7.956 9.37a1 1 0 0 0 1.414-1.415L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="hidden @[240px]:inline">Spam</span>
        </Link>
      </Button>
    </div>
  )
}
