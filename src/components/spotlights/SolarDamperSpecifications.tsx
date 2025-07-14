/**
 * @file SolarDamperSpecifications.tsx
 * @description Solar Damper 产品规格组件，展示产品的主要规格
 */

'use client'

import { solarDamperConfig } from '@/components/spotlights/SolarDamperLocale';
import { Ruler, Weight, Gauge } from 'lucide-react';

interface SolarDamperSpecificationsProps {
    locale?: string;
}

/**
 * Solar Damper 产品规格组件
 * @param props - 组件属性
 * @param props.locale - 语言代码
 */
export function SolarDamperSpecifications({ locale = 'en' }: SolarDamperSpecificationsProps) {

    return (
        <section id="specifications" className="w-full py-6 md:py-8 lg:py-16 mt-6 md:mt-8 lg:mt-16 bg-[url('/images/spotlights/solar-damper/solar-damper-specifications-bg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
                    <div className="space-y-4 pt-0">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                            {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.title}
                        </h2>
                        <p className="text-white/80 text-lg">
                            {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.description}
                        </p>
                    </div>

                    <div className="bg-white/25 backdrop-blur-[3px] rounded-lg p-4 shadow-lg border border-white/40">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/10 rounded-full">
                                <Ruler className="w-5 h-5 text-white drop-shadow-sm" />
                            </div>
                            <h3 className="text-lg font-semibold text-white drop-shadow-sm">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.dimensions.lable}
                            </h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-sm drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.dimensions.maxLengthLable}
                                </span>
                                <span className="font-medium text-sm text-white drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.dimensions.maxLengthValue}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-sm drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.dimensions.minLengthLable}
                                </span>
                                <span className="font-medium text-sm text-white drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.dimensions.minLengthValue}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-sm drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.dimensions.altMinLable}
                                </span>
                                <span className="font-medium text-sm text-white drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.dimensions.altMinValue}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/25 backdrop-blur-[3px] rounded-lg p-4 shadow-lg border border-white/40">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/10 rounded-full">
                                <Weight className="w-5 h-5 text-white drop-shadow-sm" />
                            </div>
                            <h3 className="text-lg font-semibold text-white drop-shadow-sm">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.loadCapacity.lable}
                            </h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-sm drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.loadCapacity.windLoadLable}
                                </span>
                                <span className="font-medium text-sm text-white drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.loadCapacity.windLoadValue}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-sm drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.loadCapacity.snowLoadLable}
                                </span>
                                <span className="font-medium text-sm text-white drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.loadCapacity.snowLoadValue}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-sm drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.loadCapacity.dampingForceLable}
                                </span>
                                <span className="font-medium text-sm text-white drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.loadCapacity.dampingForceValue}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/25 backdrop-blur-[3px] rounded-lg p-4 shadow-lg border border-white/40">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/10 rounded-full">
                                <Gauge className="w-5 h-5 text-white drop-shadow-sm" />
                            </div>
                            <h3 className="text-lg font-semibold text-white drop-shadow-sm">
                                {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.performance.lable}
                            </h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-sm drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.performance.operatingTempLable}
                                </span>
                                <span className="font-medium text-sm text-white drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.performance.operatingTempValue}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-sm drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.performance.lifetimeLable}
                                </span>
                                <span className="font-medium text-sm text-white drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.performance.lifetimeValue}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/90 text-sm drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.performance.maintenanceLable}
                                </span>
                                <span className="font-medium text-sm text-white drop-shadow-sm">
                                    {solarDamperConfig[locale as keyof typeof solarDamperConfig].specifications.performance.maintenanceValue}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}