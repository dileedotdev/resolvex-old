import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { ScrollArea } from '~/components/ui/scroll-area'

export default function IntroductionLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="dark h-screen w-screen bg-background text-foreground">
      <Header className="container py-7" />
      {children}
      <Footer className="container pb-10 pt-36" />
    </ScrollArea>
  )
}
