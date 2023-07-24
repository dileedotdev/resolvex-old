import { useEffect, useRef, useState } from 'react'

export interface Query {
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
}

export function useContainerQuery(query: Query) {
  const container = useRef<HTMLDivElement>(null)
  const [matched, setMatched] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (!container.current) return
      const width = container.current.clientWidth
      const height = container.current.clientHeight

      let newMatched = true

      if (query.maxHeight && height > query.maxHeight) newMatched = false

      if (query.minHeight && height < query.minHeight) newMatched = false

      if (query.maxWidth && width > query.maxWidth) newMatched = false

      if (query.minWidth && width < query.minWidth) newMatched = false

      setMatched(newMatched)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [query.maxHeight, query.minHeight, query.maxWidth, query.minWidth])

  return { matched, container }
}
