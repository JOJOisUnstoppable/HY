"use client"


import { Settings, Zap, Shield, Globe } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import * as React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

interface FeaturesProps {
  dict: {
    home: {
      features: {
        title: string
        description: string
        items: Array<{
          title: string
          description: string
        }>
      }
    }
  }
}

export function Features({ dict }: FeaturesProps) {
  return (
    <section className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LazyMotion features={domAnimation}>
          <m.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              {dict.home.features.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {dict.home.features.description}
            </p>
          </m.div>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
          {dict.home.features.items.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow text-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                {index === 0 && <Settings className="size-48 text-blue-900" />}
                {index === 1 && <Zap className="size-48 text-blue-900" />}
                {index === 2 && <Shield className="size-48 text-blue-900" />}
                {index === 3 && <Globe className="size-48 text-blue-900" />}
              </div>
              <CardHeader className="items-center relative">
                {index === 0 && <Settings className="size-6 mb-2 text-blue-500" />}
                {index === 1 && <Zap className="size-6 mb-2 text-blue-500" />}
                {index === 2 && <Shield className="size-6 mb-2 text-blue-500" />}
                {index === 3 && <Globe className="size-6 mb-2 text-blue-500" />}
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
          </m.div>
        </LazyMotion>
      </div>
    </section>
  )
}