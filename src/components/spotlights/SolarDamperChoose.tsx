/**
 * @file SolarDamperChoose.tsx
 * @description Solar Damper 为什么选择DK组件
 */

'use client'

import { solarDamperConfig } from '@/components/spotlights/SolarDamperLocale';
import { Ruler, Award, Wrench, Globe2, Shield, Heart } from 'lucide-react';

interface SolarDamperChooseProps {
    locale?: string;
}

/**
 * Solar Damper 为什么选择DK组件
 * @param props - 组件属性
 * @param props.locale - 语言代码
 */
export function SolarDamperChoose({ locale = 'en' }: SolarDamperChooseProps) {

    return (
        <section id="specifications" className="w-full py-6 md:py-8 lg:py-16 mb-6 md:mb-8 lg:mb-16 bg-[url('/images/spotlights/solar-damper/solar-damper-whyChoose-bg.png')] bg-cover bg-center bg-no-repeat">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">

                    <div className="space-y-4 pt-0 col-span-1 lg:col-span-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
                            {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.title}
                        </h2>
                        <p className="text-black/90 text-lg">
                            {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.description}
                        </p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-[3px] rounded-lg p-4 shadow-lg border border-white/40">
                        <div className="flex flex-col gap-3 mb-4">
                            <div className="p-2 bg-white/80 rounded-full w-fit">
                                <Ruler className="w-5 h-5 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitAdvancedTechnology}
                            </h3>
                            <p className="font-medium text-sm text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitAdvancedTechnologyExpansion}
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:block"></div>

                    <div className="bg-white/50 backdrop-blur-[3px] rounded-lg p-4 shadow-lg border border-white/40">
                        <div className="flex flex-col gap-3 mb-4">
                            <div className="p-2 bg-white/80 rounded-full w-fit">
                                <Award className="w-5 h-5 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitQualityExcellence}
                            </h3>
                            <p className="font-medium text-sm text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitQualityExcellenceExpansion}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/50 backdrop-blur-[3px] rounded-lg p-4 shadow-lg border border-white/40">
                        <div className="flex flex-col gap-3 mb-4">
                            <div className="p-2 bg-white/80 rounded-full w-fit">
                                <Wrench className="w-5 h-5 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitCustomSolutions}
                            </h3>
                            <p className="font-medium text-sm text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitCustomSolutionsExpansion}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/50 backdrop-blur-[3px] rounded-lg p-4 shadow-lg border border-white/40">
                        <div className="flex flex-col gap-3 mb-4">
                            <div className="p-2 bg-white/80 rounded-full w-fit">
                                <Globe2 className="w-5 h-5 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitGlobalSupport}
                            </h3>
                            <p className="font-medium text-sm text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitGlobalSupportExpansion}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/50 backdrop-blur-[3px] rounded-lg p-4 shadow-lg border border-white/40">
                        <div className="flex flex-col gap-3 mb-4">
                            <div className="p-2 bg-white/80 rounded-full w-fit">
                                <Shield className="w-5 h-5 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitProvenDurability}
                            </h3>
                            <p className="font-medium text-sm text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitProvenDurabilityExpansion}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/50 backdrop-blur-[3px] rounded-lg p-4 shadow-lg border border-white/40">
                        <div className="flex flex-col gap-3 mb-4">
                            <div className="p-2 bg-white/80 rounded-full w-fit">
                                <Heart className="w-5 h-5 text-black" />
                            </div>
                            <h3 className="text-lg font-semibold text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitLowMaintenance}
                            </h3>
                            <p className="font-medium text-sm text-black">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].choose.benefitLowMaintenanceExpansion}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}