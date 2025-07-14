/**
 * @file SolarDamperProducts.tsx
 * @description Solar Damper 产品介绍组件，展示产品标题、描述和详细说明
 */

'use client'

import { solarDamperConfig } from '@/components/spotlights/SolarDamperLocale';
import {
    MinimalCard,
    MinimalCardDescription,
    MinimalCardImage,
    MinimalCardTitle,
} from "@/components/ui/minimal-card"

interface SolarDamperProductsProps {
    locale?: string;
}

/**
 * Solar Damper 产品介绍组件
 * @param props - 组件属性
 * @param props.locale - 语言代码
 */
export function SolarDamperProducts({ locale = 'en' }: SolarDamperProductsProps) {

    return (
        <section className="max-w-7xl mx-auto w-full py-12 md:py-12 lg:py-16 bg-background">
            <div className="container px-4 md:px-6">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {solarDamperConfig[locale as keyof typeof solarDamperConfig].products.title}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {solarDamperConfig[locale as keyof typeof solarDamperConfig].products.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        <MinimalCard key="Single-Axis Trackers">
                            <MinimalCardImage src="/images/spotlights/solar-damper/solar-damper-prd00.jpg" alt={solarDamperConfig[locale as keyof typeof solarDamperConfig].products.singleAxisTrackers} />
                            <MinimalCardTitle>{solarDamperConfig[locale as keyof typeof solarDamperConfig].products.singleAxisTrackers}</MinimalCardTitle>
                            <MinimalCardDescription>{solarDamperConfig[locale as keyof typeof solarDamperConfig].products.singleAxisTrackersLong}</MinimalCardDescription>
                        </MinimalCard>
                        <MinimalCard key="Dual-Axis Trackers">
                            <MinimalCardImage src={"/images/spotlights/solar-damper/solar-damper-prd01.jpg"} alt={solarDamperConfig[locale as keyof typeof solarDamperConfig].products.dualAxisTrackers} />
                            <MinimalCardTitle>{solarDamperConfig[locale as keyof typeof solarDamperConfig].products.dualAxisTrackers}</MinimalCardTitle>
                            <MinimalCardDescription>{solarDamperConfig[locale as keyof typeof solarDamperConfig].products.dualAxisTrackersLong}</MinimalCardDescription>
                        </MinimalCard>
                        <MinimalCard key="Special Scenarios">
                            <MinimalCardImage src={"/images/spotlights/solar-damper/solar_tracking_system.png"} alt={solarDamperConfig[locale as keyof typeof solarDamperConfig].products.largeScale} />
                            <MinimalCardTitle>{solarDamperConfig[locale as keyof typeof solarDamperConfig].products.largeScale}</MinimalCardTitle>
                            <MinimalCardDescription>{solarDamperConfig[locale as keyof typeof solarDamperConfig].products.largeScaleLong}</MinimalCardDescription>
                        </MinimalCard>


                    </div>
                </div>
            </div>
        </section>
    );
}