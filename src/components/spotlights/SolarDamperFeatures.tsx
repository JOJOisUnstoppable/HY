/**
 * @file SolarDamperFeatures.tsx
 * @description Solar Damper 产品功能组件，展示产品的主要功能
 */

'use client'

import { solarDamperConfig } from './SolarDamperLocale';
import { Compass, Shield, Wrench, Gauge, Wind, Snowflake, Thermometer, Timer } from 'lucide-react'

interface SolarDamperFeaturesProps {
    locale?: string;
}

interface Function {
    id: number
    name: string
    description: string
    icon: React.ReactNode
}

interface Feature {
    id: number
    name: string
    description: string
    icon: React.ReactNode
}

/**
 * Solar Damper 产品介绍组件
 * @param props - 组件属性
 * @param props.locale - 语言代码
 */
export function SolarDamperFeatures({ locale = 'en' }: SolarDamperFeaturesProps) {

    const iconSize = 20

    const FunctionData: Function[] = [
        {
            id: 1,
            name: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.functions.functionFixedAngle,
            description: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.functions.functionFixedAngleExpansion,
            icon: <Compass size={iconSize} className="stroke-[1.5]" />,
        },
        {
            id: 2,
            name: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.functions.functionBufferImpact,
            description: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.functions.functionBufferImpactExpansion,
            icon: <Shield size={iconSize} className="stroke-[1.5]" />,
        },
        {
            id: 3,
            name: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.functions.functionAssistedMaintenance,
            description: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.functions.functionAssistedMaintenanceExpansion,
            icon: <Wrench size={iconSize} className="stroke-[1.5]" />,
        },
        {
            id: 4,
            name: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.functions.functionEnhancedStability,
            description: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.functions.functionEnhancedStabilityExpansion,
            icon: <Gauge size={iconSize} className="stroke-[1.5]" />,
        },
    ]

    const FeaturesData: Feature[] = [
        {
            id: 1,
            name: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.performance.performanceWindLoadResistance,
            description: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.performance.performanceWindLoadResistanceExpansion,
            icon: <Wind size={iconSize} className="stroke-[1.5]" />,
        },
        {
            id: 2,
            name: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.performance.performanceSnowLoadCapacity,
            description: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.performance.performanceSnowLoadCapacityExpansion,
            icon: <Snowflake size={iconSize} className="stroke-[1.5]" />,
        },
        {
            id: 3,
            name: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.performance.performanceTemperatureRange,
            description: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.performance.performanceTemperatureRangeExpansion,
            icon: <Thermometer size={iconSize} className="stroke-[1.5]" />,
        },
        {
            id: 4,
            name: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.performance.performanceLongLifespan,
            description: solarDamperConfig[locale as keyof typeof solarDamperConfig].features.performance.performanceLongLifespanExpansion,
            icon: <Timer size={iconSize} className="stroke-[1.5]" />,
        },
    ]

    const FeaturesGrid = () => {
        return (
            <div>
                <div className="mt-8 grid w-full grid-cols-2 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {FeaturesData.map((feature) => {
                        return (
                            <div key={feature.id} className="width-fit text-left mt-8 space-y-4">
                                <div className="mb-4 w-fit rounded-lg bg-red-500 p-1 text-center text-white ">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold">
                                    {feature.name}
                                </h3>
                                <div className="font-regular text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const FunctionGrid = () => {
        return (
            <div>
                <div className="mt-8 grid w-full grid-cols-1 gap-12 md:grid-cols-1 lg:grid-cols-2">
                    {FunctionData.map((feature) => {
                        return (
                            <div key={feature.id} className="width-fit text-left mt-8 space-y-4">
                                <div className="mb-4 w-fit rounded-lg bg-red-500 p-1 text-center text-white ">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold">
                                    {feature.name}
                                </h3>
                                <div className="font-regular text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }


    return (
        <section className="max-w-7xl mx-auto w-full bg-background">
            <div className="container px-4 md:px-6 ">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {solarDamperConfig[locale as keyof typeof solarDamperConfig].features.functions.title}
                    </h2>
                    <FunctionGrid />
                </div>
                <div className="space-y-4 pt-24 md:pt-24 lg:pt-24">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {solarDamperConfig[locale as keyof typeof solarDamperConfig].features.performance.title}
                    </h2>
                    <FeaturesGrid />
                </div>
            </div>
        </section>
    )
}
