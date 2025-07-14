/**
 * @file SolarDamperAnswers.tsx
 * @description Solar Damper 常见问题回答组件
 */

'use client'

import { solarDamperConfig } from '@/components/spotlights/SolarDamperLocale';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SolarDamperAnswersProps {
  locale?: string;
}

/**
 * Solar Damper 常见问题回答组件
 * @param props - 组件属性
 * @param props.locale - 语言代码
 */
export function SolarDamperAnswers({ locale = 'en' }: SolarDamperAnswersProps) {
  return (
    <section className="max-w-7xl mx-auto w-full mb-12 md:mb-12 lg:mb-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.description}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.question1}
            </AccordionTrigger>
            <AccordionContent>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.answer1}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.question2}
            </AccordionTrigger>
            <AccordionContent>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.answer2}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.question3}
            </AccordionTrigger>
            <AccordionContent>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.answer3}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.question4}
            </AccordionTrigger>
            <AccordionContent>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.answer4}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.question5}
            </AccordionTrigger>
            <AccordionContent>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.answer5}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.question6}
            </AccordionTrigger>
            <AccordionContent>
              {solarDamperConfig[locale as keyof typeof solarDamperConfig].qa.answer6}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}