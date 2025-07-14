'use client'

import { SolarDamperHero } from '@/components/spotlights/SolarDamperHero';
import { SolarDamperIntroduction } from '@/components/spotlights/SolarDamperIntroduction';
import { SolarDamperFeatures } from '@/components/spotlights/SolarDamperFeatures';
import { SolarDamperSpecifications } from '@/components/spotlights/SolarDamperSpecifications';
import { SolarDamperProducts } from '@/components/spotlights/SolarDamperProducts';
import { SolarDamperChoose } from '@/components/spotlights/SolarDamperChoose';
import { SolarDamperAnswers } from '@/components/spotlights/SolarDamperAnswers';
import { Contact } from '@/components/home/Contact';
import { usePathname } from 'next/navigation';
import { solarDamperConfig } from '@/components/spotlights/SolarDamperLocale';

export default function SolarDamperPage() {
  const locale = usePathname().split('/')[1];
  const dict = solarDamperConfig[locale as keyof typeof solarDamperConfig];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SolarDamperHero locale={locale} />
      <SolarDamperIntroduction locale={locale} />
      <SolarDamperFeatures locale={locale} />
      <SolarDamperSpecifications locale={locale} />
      <SolarDamperProducts locale={locale} />
      <SolarDamperChoose locale={locale} />
      <SolarDamperAnswers locale={locale} />
      <section id="contact" className="bg-white">
        <Contact dict={{ home: { hero: { ctaContact: dict.contact.cta } }, contact: dict.contact }} locale={locale} />
      </section>
    </main>
  );
}