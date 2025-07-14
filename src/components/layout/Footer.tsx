'use client';

import Link from 'next/link'
import Image from 'next/image'
import { Locale } from '@/lib/i18n/config'

interface FooterDictionary {
    common: {
        products: string
        applications: string
        blog: string
        contact: string
    }
    footer: {
        quickLinks: string
        legal: string
        terms: string
        privacy: string
        description: string
    }
}

interface FooterProps {
    locale: Locale
    dict: FooterDictionary
    categories: {
        id: string
        title: string
        description: string
    }[]
}

export function Footer({ locale, dict, categories }: FooterProps) {
    return (
        <footer className="bg-background border-t">
            <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 my-4">

                    {/* 产品分类 */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-foreground font-semibold mb-3">{dict.common.products}</h3>
                        <ul className="space-y-3">
                            {categories.map(category => (
                                <li key={category.id}>
                                    <Link
                                        href={`/${locale}/products/category/${category.id}`}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                                    >
                                        {category.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 快速链接 */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-foreground font-semibold mb-4">{dict.footer.quickLinks}</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href={`/${locale}/applications`}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                                >
                                    {dict.common.applications}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/blog`}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {dict.common.blog}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/contact`}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {dict.common.contact}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 法律相关 */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-foreground font-semibold mb-4">{dict.footer.legal}</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href={`/${locale}/terms`}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {dict.footer.terms}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/${locale}/privacy`}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {dict.footer.privacy}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logo 和公司简介 */}
                    <div className="space-y-4 text-center sm:text-left">
                        <Link href={`/${locale}`}>
                            <Image
                                src="/logoWithDK.svg"
                                alt="Gas Spring Solutions"
                                width={80}
                                height={80}
                                className="mb-3 mx-auto sm:mx-0"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed mt-2 text-muted-foreground">{dict.footer.description}</p>
                    </div>

                </div>

                {/* 版权信息 */}
                <div className="border-t border-border mt-8 pt-6 text-sm text-center text-muted-foreground">
                    <p>Copyright © 2024 – 2025 • All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}