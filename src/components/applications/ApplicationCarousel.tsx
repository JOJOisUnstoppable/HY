'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from 'react'

const carouselImages = [
  '/images/application/carousel/1.jpg',
  '/images/application/carousel/2.png',
  '/images/application/carousel/3.png',
  '/images/application/carousel/4.jpg',
  '/images/application/carousel/5.jpg',
  '/images/application/carousel/6.jpg',
]

export function ApplicationCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current]}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <CarouselContent>
        {carouselImages.map((image, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={`Application showcase ${index + 1}`}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 2}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  )
}