"use client"

import { Application } from '@/types/application'
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid"
import { RocketIcon, GearIcon, LightningBoltIcon, CubeIcon, HeartIcon, TargetIcon } from "@radix-ui/react-icons"
import Image from "next/image"

interface ApplicationGridProps {
  applications: Application[]
  locale: string
  dict: {
    applications: {
      title: string
      description: string
      descriptionLabel: string
      solutionLabel: string
      viewMoreString: string
    }
  }
}

export function ApplicationGrid({ applications, dict, locale }: ApplicationGridProps) {
  
  return (
    <BentoGrid className="grid-cols-1 lg:grid-cols-12 auto-rows-[480px] [&>*]:transition-[grid-column] [&>*]:duration-1000">
      <div className="contents group/first">
        {applications.slice(0, 3).map((app) => (
          <BentoCard
            key={app.id}
            name={app.title}
            description={app.solution}
            className="col-span-1 lg:col-span-4 lg:group-hover/first:col-span-3 lg:group-hover/first:[&:hover]:!col-span-6"
            Icon={app.id === 'aerospace-navy-railways' ? RocketIcon :
              app.id === 'mechanical-engineering-and-automation' ? GearIcon :
              app.id === 'energy-and-construction' ? LightningBoltIcon :
              app.id === 'commercial-vehicles' ? CubeIcon :
              app.id === 'health-leisure-and-furniture' ? HeartIcon :
              TargetIcon}
            href={`/${locale}/contact`}
            cta={dict.applications.viewMoreString}
            background={
              <div className="absolute inset-0 w-full">
                <div className="relative w-full aspect-square before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-white/20 via-[60%] before:to-white/100 before:z-[1]">
                  <Image
                    src={`/images/application/grid/${app.id}.png`}
                    alt={app.title}
                    fill
                    className="object-contain w-full transition-all duration-300 group-hover:[&]:translate-y-[-75px]" style={{ objectPosition: '0 -25px' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            }
          />
        ))}
      </div>
      <div className="contents group/second">
        {applications.slice(3, 6).map((app) => (
          <BentoCard
            key={app.id}
            name={app.title}
            description={app.solution}
            className="col-span-1 lg:col-span-4 lg:group-hover/second:col-span-3 lg:group-hover/second:[&:hover]:!col-span-6"
            Icon={app.id === 'aerospace-navy-railways' ? RocketIcon :
              app.id === 'mechanical-engineering-and-automation' ? GearIcon :
              app.id === 'energy-and-construction' ? LightningBoltIcon :
              app.id === 'commercial-vehicles' ? CubeIcon :
              app.id === 'health-leisure-and-furniture' ? HeartIcon :
              TargetIcon}
            href={`/${locale}/contact`}
            cta={dict.applications.viewMoreString}
            background={
              <div className="absolute inset-0 w-full">
                <div className="relative w-full aspect-square before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-white/20 via-[60%] before:to-white/100 before:z-[1]">
                  <Image
                    src={`/images/application/grid/${app.id}.png`}
                    alt={app.title}
                    fill
                    className="object-contain w-full transition-all duration-300 group-hover:[&]:translate-y-[-75px]" style={{ objectPosition: '0 -25px' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            }
          />
        ))}
      </div>

    </BentoGrid>
  )
}