import { getDictionary } from '@/lib/i18n/getDictionary'
import { Locale } from '@/lib/i18n/config'
import { TermsHero } from '@/components/terms/TermsHero'
import { TableOfContents } from '@/components/terms/TableOfContents'
import { TermsContent } from '@/components/terms/TermsContent'

export default async function TermsPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;
  const { locale } = params;
  const dict = await getDictionary(locale)

  return (
    <div>
      <TermsHero dict={dict} locale={locale} />
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧内容区域 */}
          <div className="lg:w-3/4">
            <TermsContent />
          </div>
          
          {/* 右侧目录导航 */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}