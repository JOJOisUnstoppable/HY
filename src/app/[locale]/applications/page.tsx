import { ApplicationHero } from "@/components/applications/ApplicationHero"
import { getApplicationData } from "@/lib/applications"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { Metadata } from "next"
import { generateMetadata as generateSharedMetadata } from "@/components/shared/Metadata"
import { ApplicationGrid } from "@/components/applications/ApplicationGrid"
import { Locale } from '@/lib/i18n/config'
import Link from "next/link"

interface PageParams {
    locale: Locale
}

interface Props {
    params: Promise<PageParams>
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { locale } = params;
    const dict = await getDictionary(locale)
    const { applications } = await getApplicationData(locale)
    const keywords = applications.map(app => app.title).join(', ')

    return generateSharedMetadata({
        title: dict.applications.title,
        description: dict.applications.description,
        keywords: ['gas spring applications', 'gas strut applications', keywords],
        locale,
        type: 'website',
    })
}

export default async function ApplicationsPage(props: Props) {
    const params = await props.params;
    const { locale } = params;
    const dict = await getDictionary(locale)
    const { applications, content } = await getApplicationData(locale)

    return (
        <>
            <ApplicationHero
                title={dict.applications.title}
                description={dict.applications.description}
                dict={dict}
                locale={locale}
            />
            <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="text-gray-600 max-w-2xl mx-auto prose"
                        dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <Link href={`/${locale}/spotlights/solar-damper`} className="block w-full mx-auto mb-8 group">
                    <div className="relative overflow-hidden bg-gradient-to-b from-transparent via-blue-100/30 to-transparent hover:via-blue-100/50 dark:via-blue-900/20 dark:hover:via-blue-900/30 rounded-xl px-6 py-4 transition-all duration-300 border-t border-b border-[linear-gradient(90deg,transparent,rgb(59,130,246),transparent)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue-500 before:to-transparent after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent">
                        <div className="absolute top-2 left-2 bg-blue-500/10 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase rounded-full text-blue-700 dark:text-blue-300">New</div>
                        <div className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                            <p className="font-medium text-base text-blue-900 dark:text-blue-100">
                                {dict.spotlights.solarDamperLong}
                            </p>
                            <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                </Link>
                <ApplicationGrid
                    applications={applications}
                    locale={locale}
                    dict={dict}
                />
            </div>
        </>
    );
}

export async function generateStaticParams(): Promise<PageParams[]> {
    return [
        { locale: 'zh' },
        { locale: 'en' },
        { locale: 'es' },
        { locale: 'de' }
    ]
}

export const dynamic = 'force-static'
