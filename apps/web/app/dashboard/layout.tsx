import { Header } from './header'
import { SecurePage } from './secure-page'

export const metadata = {
  title: 'Dashboard',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <div className="border-b">
        <Header />
      </div>
      <div className="flex-1 overflow-auto">
        <SecurePage>{children}</SecurePage>
      </div>
    </div>
  )
}
