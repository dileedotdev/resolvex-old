import { CollapsibleCustomerStatusSelector } from './collapsible-customer-status-selector'
import { CustomerStatusSelector } from './customer-status-selector'
import { Header } from './header'
import { SecurePage } from './secure-page'

export const metadata = {
  title: 'Dashboard',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="border-b">
        <Header />
      </div>
      <SecurePage>
        <div className="flex flex-col md:flex-row">
          <div className="hidden w-[280px] px-2 py-8 md:block">
            <CustomerStatusSelector />
          </div>
          <div className="block border-b pb-2 md:hidden">
            <CollapsibleCustomerStatusSelector />
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </SecurePage>
    </div>
  )
}
