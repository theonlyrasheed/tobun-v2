import { Link, useMatchRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { ProjectTypeToggle } from './project-type-toggle'
import type { FileRoutesByFullPath } from '@/routeTree.gen'
import { FONTS } from '@/config/constants'

interface HeroSectionProps {
  showBackButton?: boolean
  backTo?: string
  tagline?: string
  wavyUnderline?: boolean
}

const routes: Array<keyof FileRoutesByFullPath> = [
  '/',
  '/mobile-apps',
  '/websites',
]

export function HeroSection({
  tagline = 'I turn simple ideas into powerful digital experience',
  wavyUnderline = true,
}: HeroSectionProps) {
  const matchRoute = useMatchRoute()
  const matches = routes.some((path) => matchRoute({ to: path }))

  return (
    <section className="py-8 md:py-16 text-center">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:gap-5">
          <p
            className="text-base md:text-lg lg:text-xl font-medium text-[#807784]"
            style={{ fontFamily: FONTS.MONTSERRAT }}
          >
            Welcome Client,
          </p>
          <div className="flex flex-col gap-3">
            <h2
              className="text-xl md:text-2xl lg:text-3xl font-bold px-4"
              style={{ fontFamily: FONTS.MONTSERRAT }}
            >
              Build a beautiful Website/ Apps with me in weeks
            </h2>
            <div className="flex items-center justify-center gap-3 md:gap-4.5 flex-wrap px-4">
              <span
                className="text-xl md:text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: FONTS.MONTSERRAT }}
              >
                Enjoy
              </span>
              <span
                className="text-xl md:text-2xl lg:text-3xl font-normal text-[#0769e0] relative"
                style={{
                  fontFamily: FONTS.MOOLI,
                  textDecoration: 'underline',
                  textDecorationStyle: wavyUnderline ? 'wavy' : 'solid',
                  textDecorationColor: '#0769e0',
                }}
              >
                Free
              </span>
              <span
                className="text-xl md:text-2xl lg:text-3xl font-bold"
                style={{ fontFamily: FONTS.MONTSERRAT }}
              >
                Animations
              </span>
            </div>
          </div>
          <p
            className="text-base md:text-lg font-medium text-[#807784] px-4"
            style={{ fontFamily: FONTS.MONTSERRAT }}
          >
            {tagline}
          </p>
        </div>

        {/* Toggle Buttons */}
        <ProjectTypeToggle />
      </div>

      {/* Back Button */}
      {!matches && (
        <Link
          to=".."
          className="fixed top-20 md:top-32 right-4 md:right-6 lg:right-12 flex items-center gap-2 md:gap-4 bg-[#0769e0] text-white px-4 md:px-6 py-2 md:py-3 rounded hover:bg-[#0558c0] transition-colors z-10"
        >
          <ArrowLeft size={18} className="md:w-5 md:h-5" />
          <span
            className="text-base md:text-lg lg:text-xl font-extrabold"
            style={{ fontFamily: FONTS.POPPINS }}
          >
            Back
          </span>
        </Link>
      )}
    </section>
  )
}
