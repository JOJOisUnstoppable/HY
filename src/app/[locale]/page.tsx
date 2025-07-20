import { getDictionary } from '@/lib/i18n/getDictionary'
import { Locale } from '@/lib/i18n/config'
import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { Service } from '@/components/home/Service'
import { CategoryCard } from '@/components/products/CategoryCard'
import { ApplicationGrid } from '@/components/applications/ApplicationGrid'
import { getProductData } from '@/lib/products'
import { getApplicationData } from '@/lib/applications'
import { BentoGrid } from "@/components/magicui/bento-grid"
import { Contact } from '@/components/home/Contact'
import Link from 'next/link'

export default async function Home(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = await getDictionary(locale)
  const { categories, content } = await getProductData(locale)
  const { applications } = await getApplicationData(locale)

  return (
    <main>
      {/* Hero section */}
      <Hero dict={dict} locale={locale} />

      {/* Products section */}  
      <div className="relative container max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,transparent,black,transparent)] dark:bg-grid-slate-700/25" />
        <div className="relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {dict.common.showProducts}
            </h2>
            <div className="text-gray-600 max-w-2xl mx-auto prose"
              dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <BentoGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[12rem] [&>*]:transition-[grid-column] [&>*]:duration-500">
            {categories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <CategoryCard
                  key={category.id}
                  category={{
                    id: category.id,
                    name: category.title,
                    description: category.description,
                    image: category.image
                  }}
                  locale={locale}
                  viewMore={dict.categoryViewMore}
                />
              ))}
          </BentoGrid>
        </div>
      </div>
      
      {/* Features section */}
      <Features dict={dict} />
      
      {/* Applications section */}
      <div className="bg-gray-50 py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {dict.applications.description}
            </h2>
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
      </div>

      {/* Service section */}
      <Service dict={dict} />

      {/* Contact section */}
      <Contact dict={dict} locale={locale} />

    </main>
  )
}