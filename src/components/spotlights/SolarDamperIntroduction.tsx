/**
 * @file SolarDamperIntroduction.tsx
 * @description Solar Damper 产品介绍组件，展示产品标题、描述和详细说明
 */

'use client'

import Image from 'next/image';
import { solarDamperConfig } from '@/components/spotlights/SolarDamperLocale';

interface SolarDamperIntroductionProps {
  locale?: string;
}

/**
 * Solar Damper 产品介绍组件
 * @param props - 组件属性
 * @param props.locale - 语言代码
 */
export function SolarDamperIntroduction({ locale = 'en' }: SolarDamperIntroductionProps) {

  return (
    <section className="max-w-7xl mx-auto w-full py-12 md:py-12 lg:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].introduction.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].introduction.description}
            </p>
            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold">{solarDamperConfig[locale as keyof typeof solarDamperConfig].introduction.whatIs}</h3>
              <p className="text-muted-foreground">
                {solarDamperConfig[locale as keyof typeof solarDamperConfig].introduction.whatIsExpansion}
              </p>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="/images/spotlights/solar-damper/solar_damper_product.jpg"
              alt="Solar Damper Product"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}