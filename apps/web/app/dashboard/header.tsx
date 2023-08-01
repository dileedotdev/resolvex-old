import { UserButton, OrganizationSwitcher } from '@clerk/nextjs'
import { Logo } from '~/components/logo'

export function Header() {
  return (
    <header className="flex h-[57px] items-center justify-between px-4 py-4 @container">
      <div className="flex items-start gap-5">
        <div className="hidden @xl:block">
          <Logo className="h-8 w-auto " />
        </div>
        <div className="hidden rotate-12 pt-1 text-xl font-light text-muted-foreground @xl:block">/</div>
        <div>
          <OrganizationSwitcher
            hidePersonal
            afterLeaveOrganizationUrl="/dashboard"
            afterCreateOrganizationUrl="/dashboard"
            afterSwitchOrganizationUrl="/dashboard"
          />
        </div>
      </div>
      <div>
        <UserButton />
      </div>
    </header>
  )
}
