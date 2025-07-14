import { ApplicationHero } from "@/components/applications/ApplicationHero"
import { getApplicationData } from "@/lib/applications"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { Metadata } from "next"
import { generateMetadata as generateSharedMetadata } from "@/components/shared/Metadata"
import { ApplicationCarousel } from "@/components/applications/ApplicationCarousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { getApplicationRelatedPosts } from "@/lib/applications"
import { Locale } from '@/lib/i18n/config'

// 修改接口定义
interface PageParams {
  locale: Locale
}

interface Props {
  params: Promise<PageParams>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;

    const {
        locale
    } = params;

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

    const {
        locale
    } = params;

    const dict = await getDictionary(locale)
    const { applications, content } = await getApplicationData(locale)

    const applicationsWithPosts = await Promise.all(
      applications.map(async (app) => ({
        ...app,
        relatedPosts: await getApplicationRelatedPosts(locale, app.id)
      }))
    )

    return (
        <>
            <ApplicationHero
                title={dict.applications.title}
                description={dict.applications.description}
                dict={dict}
                locale={locale}
            />
            <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="text-gray-600 max-w-2xl mx-auto prose"
                        dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
            {/* ApplicationCarousel 移到这里 */}
            <div className="py-3">
                <div className="mb-6">
                    <ApplicationCarousel />
                </div>
            </div>
            {/* Accordion 部分 */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <Accordion type="single" collapsible className="space-y-4">
                        {applicationsWithPosts.map((app) => (
                            <AccordionItem key={app.id} value={app.id}>
                                <AccordionTrigger className="text-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 text-sm font-medium text-primary bg-primary/10 rounded-full">
                                            {String(app.order).padStart(2, '0')}
                                        </span>
                                        <span className="font-medium">
                                            {app.title}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                        {/* 左栏：描述和解决方案 */}
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                                    {dict.applications.descriptionLabel}
                                                </h3>
                                                <p className="text-gray-600 whitespace-pre-line">
                                                    {app.description}
                                                </p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                                    {dict.applications.solutionLabel}
                                                </h3>
                                                <p className="text-gray-600 whitespace-pre-line">
                                                    {app.solution}
                                                </p>
                                            </div>
                                        </div>

                                        {/* 右栏：相关文章 */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-2">
                                                {dict.applications.relatedPostsLabel}
                                            </h3>
                                            {app.relatedPosts.length > 0 ? (
                                                <ul className="space-y-2">
                                                    {app.relatedPosts.map((post) => (
                                                        <li key={post.slug}>
                                                            <Link
                                                                href={`/${locale}/blog/${post.slug}`}
                                                                className="text-primary hover:underline block"
                                                            >
                                                                {post.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                // 在显示无相关文章时使用字典中的文本
                                                (<p className="text-gray-500 italic">
                                                    {dict.applications.noRelatedPosts}
                                                </p>)
                                            )}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </>
    );
}

// 明确返回类型
export async function generateStaticParams(): Promise<PageParams[]> {
  return [
    { locale: 'zh' },
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'de' }
  ]
}

// 取消注释 dynamic 配置
export const dynamic = 'force-static'
