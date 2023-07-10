import { Logo } from './logo'
import Link from 'next/link'
import React from 'react'

export function Header({ ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header {...props}>
      <Link href="/">
        <span className="sr-only">Home</span>
        <Logo />
      </Link>
    </header>
  )
}
