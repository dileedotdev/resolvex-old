import { FeatureSection } from '../feature-section'
import { CubeAnimation } from '~/components/cube-animation'
import { JointWaitListForm } from '~/components/join-wait-list-form'
import { SquareLogo } from '~/components/logo'
import { Button } from '~/components/ui/button'
import { Light } from '~/components/ui/light'

export default function Home() {
  return (
    <>
      <main className="container mt-6 bg-grid-pattern bg-cover bg-center bg-no-repeat lg:mt-10 xl:mt-14">
        <div className="flex flex-col-reverse items-center justify-between gap-16 lg:flex-row lg:gap-28 xl:gap-44">
          <div>
            <h1 className="text-center font-title text-5xl font-bold lg:text-left">Your support center</h1>
            <div className="mt-3 max-w-lg lg:max-w-xl">
              <p className="text-center font-light text-muted-foreground  lg:text-left">
                We bring the simple and powerful to your support center. Help you support your customers by all over the
                channels by the power of
                <SquareLogo className="ml-1.5 inline-block" />
              </p>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-5 lg:justify-start">
              <Button variant="outline" disabled>
                Simple
              </Button>
              <Button variant="outline" disabled>
                Powerful
              </Button>
              <Button variant="outline" disabled>
                Open Source
              </Button>
            </div>
          </div>

          <div className="relative h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]">
            <Light className="absolute left-1/2 top-24 -z-10 w-1/2 -translate-x-1/2" />
            <CubeAnimation />
          </div>
        </div>

        <div className="mt-20 flex justify-center md:mt-28 xl:mt-40">
          <JointWaitListForm className="max-w-lg" />
        </div>
      </main>

      <FeatureSection />
    </>
  )
}
