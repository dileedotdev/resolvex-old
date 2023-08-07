import { SignIn } from '@clerk/nextjs'

export const metadata = {
	title: 'Sign In',
}

export default function Page() {
	return <SignIn />
}
