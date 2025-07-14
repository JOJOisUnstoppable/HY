import { getBlogPosts } from '@/lib/blog'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Locale } from '@/lib/i18n/config'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { BlogTagHero } from '@/components/blog/BlogTagHero'
import Image from 'next/image'  // 添加这行导入

export default async function TagPage(
  props: {
    params: Promise<{ locale: Locale; tag: string }>
  }
) {
  const params = await props.params;

  const {
    locale,
    tag
  } = params;

  const decodedTag = decodeURIComponent(tag)
  const dict = await getDictionary(locale)
  const posts = await getBlogPosts(locale)
  const filteredPosts = posts.filter(post => post.tags.includes(decodedTag))

  return (
    <>
      <BlogTagHero 
        //title={dict.common?.blog || 'Blog'} 
        tag={decodedTag}
        locale={locale}
        dict={dict}
      />
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
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
                    {post.tags.map(tag => (
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