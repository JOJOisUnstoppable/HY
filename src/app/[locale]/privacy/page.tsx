import { getDictionary } from '@/lib/i18n/getDictionary'
import { Locale } from '@/lib/i18n/config'
import { PrivacyHero } from '@/components/privacy/PrivacyHero'
import { TableOfContents } from '@/components/privacy/TableOfContents'
import { PrivacyContent } from '@/components/privacy/PrivacyContent'

export default async function PrivacyPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;
  const { locale } = params;
  const dict = await getDictionary(locale)

  return (
    <div>
      <PrivacyHero dict={dict} locale={locale} />
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧内容区域 */}
          <div className="lg:w-3/4">
            <PrivacyContent />
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