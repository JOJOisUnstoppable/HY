import { getBlogPosts, getBlogTags } from '@/lib/blog'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Locale } from '@/lib/i18n/config'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { BlogHero } from '@/components/blog/BlogHero'
import Image from 'next/image'

export default async function BlogPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = await getDictionary(locale)
  const posts = await getBlogPosts(locale)
  const tags = await getBlogTags(locale)

  // 按发布时间倒序排列
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // 在组件顶部添加标签统计和排序逻辑
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  // 按文章数量排序标签
  const sortedTags = tags
    .sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0))
    .slice(0, 6)

  return (
    <>
      <BlogHero 
        title={dict.common.blog}
        description={dict.blog.description}
        dict={dict}
        locale={locale}
      />
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* 标签部分 */}
        <div className="hidden md:block mb-12 bg-gray-50 rounded-xl p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* 左栏：标题和按钮 */}
            <div className="md:w-1/3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{dict.blog.popularTags}</h2>
              <Link 
                href={`/${locale}/blog/tag`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-800 transition-colors"
              >
                {dict.common.viewAll}
              </Link>
            </div>
            
            {/* 右栏：标签列表 */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-3 gap-3">
                {sortedTags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/${locale}/blog/tag/${tag}`}
                    className="group"
                  >
                    <Badge 
                      variant="secondary" 
                      className="w-full py-1.5 flex items-center justify-center text-sm font-medium hover:bg-white hover:text-blue-600 cursor-pointer transition-all"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 博客文章网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map(post => (
            <Link 
              key={post.slug} 
              href={`/${locale}/blog/${post.slug}`}
              className="group"
            >
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.coverImage || '/images/blog/cover-default.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {post.author && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                    )}
                    <span className="text-sm text-gray-500">
                      {formatDate(post.date, locale)}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}