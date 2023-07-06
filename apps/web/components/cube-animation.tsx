'use client'

import { useRive } from '@rive-app/react-canvas'

export function CubeAnimation() {
  const { RiveComponent } = useRive({
    src: '/cube.riv',
    autoplay: true,
  })

  return <RiveComponent />
}
