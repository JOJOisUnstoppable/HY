"use client"

import { Building2, Mail, Phone, MapPin } from 'lucide-react'
import * as React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import Link from 'next/link'

interface ContactProps {
    dict: {
        home: {
            hero: {
                ctaContact: string
            }
        },
        contact: {
            title: string,
            description: string,
            company: string,
            address: string,
            phone: string,
            email: string,
            office: string,
            officeAddress: string
        }
    }
    locale: string
}


export function Contact({ dict, locale }: ContactProps) {
    return (
        <section className="py-20 bg-gray-50 relative">
            <div className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-contain" style={{ backgroundImage: 'url("/images/contact-worldmap.png")' }}></div>
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
                            {dict.contact.title}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {dict.contact.description}
                        </p>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col items-center text-center">
                                        <Building2 className="w-8 h-8 text-blue-500 mb-4" />
                                        <h3 className="font-semibold mb-2">{dict.contact.company}</h3>
                                        <p className="text-gray-600">{dict.contact.address}</p>
                                    </div>
                                </div>

                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col items-center text-center">
                                        <Phone className="w-8 h-8 text-blue-500 mb-4" />
                                        <h3 className="font-semibold mb-2">{dict.contact.phone}</h3>
                                        <p className="text-gray-600">+86 123 4567 89XX</p>
                                    </div>
                                </div>

                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col items-center text-center">
                                        <Mail className="w-8 h-8 text-blue-500 mb-4" />
                                        <h3 className="font-semibold mb-2">{dict.contact.email}</h3>
                                        <p className="text-gray-600">diskdamper-info@dkmachineryinc.com</p>
                                    </div>
                                </div>

                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col items-center text-center">
                                        <MapPin className="w-8 h-8 text-blue-500 mb-4" />
                                        <h3 className="font-semibold mb-2">{dict.contact.office}</h3>
                                        <p className="text-gray-600">{dict.contact.officeAddress}</p>
                                    </div>
                                </div>

                            </div>

                            <div className="flex justify-center mt-12">
                                <Link href={`/${locale}/contact`}>
                                    <ShimmerButton>
                                        {dict.home.hero.ctaContact}
                                    </ShimmerButton>
                                </Link>
                            </div>
                        </div>
                    </m.div>
                </LazyMotion>
            </div>
        </section>
    )
}