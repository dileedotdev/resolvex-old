import { handleViewport, type InjectedViewportProps } from 'react-in-viewport'

// more https://github.com/roderickhsiao/react-in-viewport
export const ViewportBlock = handleViewport((props: InjectedViewportProps<HTMLDivElement>) => {
  const { forwardedRef } = props
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <div ref={forwardedRef}>{props.children}</div>
}, {})
