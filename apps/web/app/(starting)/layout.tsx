export default function StartingLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <div className='flex min-h-[100vh] items-center justify-center'>{children}</div>
}
