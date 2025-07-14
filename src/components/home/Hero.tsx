import Image from 'next/image'
import { Package2 } from "lucide-react"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import Link from 'next/link'
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { cn } from "@/lib/utils"

interface HeroProps {
  dict: {
    home: {
      hero: {
        eyebrow: string
        title: string
        subtitle: string
        ctaContact: string
        ctaProduct: string
      }
    }
  }
  locale: string
}

export function Hero({ dict, locale }: HeroProps) {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Gas Spring"
          fill
          priority
          fetchPriority="high"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/60 via-blue-800/40 to-blue-800/60" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gray-50 hidden md:block" style={{ clipPath: 'polygon(0 101%, 100% 101%, 100% 0)' }} />
      </div>

      {/* 内容 */}
      <div className="relative container h-full flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-1 max-w-2xl text-white space-y-6">
          <div className="group relative mx-auto inline-flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
            <span
              className={cn(
                "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#FF4500]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
              )}
              style={{
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "subtract",
                WebkitClipPath: "padding-box",
              }}
            />
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-400" />
            <AnimatedGradientText
              speed={1}
              colorFrom="#ffaa40"
              colorTo="#FF4500"
              className="text-sm font-medium"
            >
              {dict.home.hero.eyebrow}
            </AnimatedGradientText>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold">
            {dict.home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl">
            {dict.home.hero.subtitle}
          </p>

          <div className="flex items-end gap-4">
            <Link href={`/${locale}/contact`}>
              <InteractiveHoverButton>
                {dict.home.hero.ctaContact}
              </InteractiveHoverButton>
            </Link>
            <Link
              href={`/${locale}/products`}
              className='hidden md:inline-flex items-center justify-center gap-3 rounded-full border border-white/5 bg-white/5 p-2 px-6 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10 hover:scale-[1.02]'
            >
              <Package2 className="size-5" />
              <span>{dict.home.hero.ctaProduct}</span>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block flex-shrink-0 ml-auto">
          <div className="relative aspect-square w-[min(400px,85vh)] rounded-lg border-4 border-gray-800/40 overflow-hidden">
            <Image
              src="/images/hero-fi.png"
              alt="Featured Image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}