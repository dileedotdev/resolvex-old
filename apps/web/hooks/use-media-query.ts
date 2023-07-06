import { useEffect, useState } from 'react'

export interface Query {
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
}

export function useMediaQuery(query: Query) {
  const [matched, setMatched] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

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

  return matched
}
