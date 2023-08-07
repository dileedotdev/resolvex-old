import { type InjectedViewportProps, handleViewport } from 'react-in-viewport'

// more https://github.com/roderickhsiao/react-in-viewport
export const ViewportBlock = handleViewport((props: InjectedViewportProps<HTMLDivElement>) => {
	const { forwardedRef } = props
	// @ts-ignore
	return <div ref={forwardedRef}>{props.children}</div>
}, {})
