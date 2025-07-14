'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { solarDamperConfig } from '@/components/spotlights/SolarDamperLocale';
import { AuroraText } from "@/components/magicui/aurora-text"

interface SolarDamperHeroProps {
  className?: string;
  locale?: string;
}

export function SolarDamperHero({ className, locale = 'en' }: SolarDamperHeroProps) {

  return (
    <section className={cn(
      'relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden',
      className
    )}>
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/spotlights/solar-damper/solar-damper-hero.jpg"
          alt="Solar Tracking Field"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background/20 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-grid-slate-200/20 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* 标签 */}
          <div className="inline-flex items-center gap-2 bg-background/80 dark:bg-background/80 backdrop-blur-sm text-primary dark:text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
            </svg>
            <span>{solarDamperConfig[locale as keyof typeof solarDamperConfig].hero.eyebrow}</span>
          </div>

          {/* 标题 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight tracking-tight">
            {solarDamperConfig[locale as keyof typeof solarDamperConfig].hero.title}
            <AuroraText>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].hero.subTitle}
            </AuroraText>
          </h1>

          {/* 描述 */}
          <p className="text-lg sm:text-xl text-foreground max-w-3xl mx-auto">
            {solarDamperConfig[locale as keyof typeof solarDamperConfig].hero.description}
          </p>

          {/* 按钮组 */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].hero.proposal}
            </a>
            <a
              href="#specifications"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded-full font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].hero.specifications}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}