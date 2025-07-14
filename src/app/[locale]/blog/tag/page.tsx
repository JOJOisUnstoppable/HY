import { getBlogPosts, getBlogTags } from '@/lib/blog'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Locale } from '@/lib/i18n/config'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { BlogAllTagsHero } from '@/components/blog/BlogAllTagsHero'

export default async function TagsPage(
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

  // 统计每个标签的文章数量
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  // 按文章数量排序标签
  const sortedTags = tags.sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0))

  return (
    <>
      <BlogAllTagsHero
        title={dict.blog.allTags}
        description={dict.blog.tagsDescription}
        locale={locale}
        dict={dict}
      />
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTags.map(tag => (
            <Link
              key={tag}
              href={`/${locale}/blog/tag/${tag}`}
              className="group"
            >
              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
                <Badge
                  variant="secondary"
                  className="w-full py-2 mb-2 flex items-center justify-center text-sm font-medium"
                >
                  {tag}
                </Badge>
                <p className="text-center text-sm text-gray-600">
                  {tagCounts[tag]} {dict.blog.posts}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}