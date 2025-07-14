import { getBlogPost, getRelatedPosts, getAdjacentPosts } from '@/lib/blog'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Locale } from '@/lib/i18n/config'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Markdown from 'react-markdown'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { generateMetadata as generateSharedMetadata } from '@/components/shared/Metadata'

export default async function BlogPostPage(
  props0: {
    params: Promise<{ locale: Locale; slug: string }>
  }
) {
  const params = await props0.params;

  const {
    locale,
    slug
  } = params;

  const dict = await getDictionary(locale)
  const post = await getBlogPost(locale, slug)
  const relatedPosts = await getRelatedPosts(locale, slug, 3)
  const adjacentPosts = await getAdjacentPosts(locale, slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        <article>
          {post.coverImage ? (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority  // 添加 priority 属性以优化首屏加载
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // 添加响应式尺寸
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/5" />

              {/* 添加返回按钮 */}
              <div className="absolute top-6 left-6 right-0 z-10">
                <div className="container max-w-7xl mx-auto">
                  <Link href={`/${locale}/blog`}>
                    <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {dict.blog.backToBlog}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="container max-w-7xl mx-auto">
                  <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
                  <div className="flex items-center gap-4 text-gray-200">
                    <time>{formatDate(post.date, locale)}</time>
                    <span>·</span>
                    <span>{post.author || 'Lisa & Gavin'}</span>
                    <span>·</span>
                    <div className="flex gap-2">
                      {post.tags.map(tag => (
                        <Link key={tag} href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`}>
                          <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-white cursor-pointer">
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-4 mb-8 text-gray-500">
                <time>{formatDate(post.date, locale)}</time>
                <span>·</span>
                <span>{post.author || 'Lisa & Gavin'}</span>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <Link 
                      key={tag} 
                      href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`}
                      className="group"
                      prefetch={false}  // 添加 prefetch 属性以优化性能
                    >
                      <Badge variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypePrism]}
              components={{
                // 自定义标题样式
                h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>,
                // 自定义链接样式
                a: ({ href, children }) => (
                  <a href={href} className="text-blue-600 hover:text-blue-800 transition-colors" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                // 自定义代码块样式
                /*
                code: ({ node, inline, className, children, ...props }) => (
                  <code
                    className={`${className} ${inline ? 'bg-gray-100 rounded px-1' : 'block p-4 bg-gray-100 rounded-lg'}`}
                    {...props}
                  >
                    {children}
                  </code>
                ),
                */
                // 自定义列表样式
                ul: ({ children, ...props }) => {
                  const depth = props.node?.position?.start?.line || 0;
                  return (
                    <ul className={`list-disc my-6 ${depth > 1 ? 'ml-6 mt-2 mb-2' : 'list-inside'}`} {...props}>
                      {children}
                    </ul>
                  );
                },
                ol: ({ children, ...props }) => {
                  const depth = props.node?.position?.start?.line || 0;
                  return (
                    <ol className={`list-decimal my-6 ${depth > 1 ? 'ml-6 mt-2 mb-2' : 'list-inside'}`} {...props}>
                      {children}
                    </ol>
                  );
                },
                // 自定义表格样式
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                      {children}
                    </table>
                  </div>
                ),
                // 添加表格单元格样式
                td: ({ children }) => (
                  <td className="px-4 py-2 text-center whitespace-nowrap border-r border-b border-gray-200 last:border-r-0">
                    {children}
                  </td>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2 text-center whitespace-nowrap border-r border-b border-gray-200 last:border-r-0 bg-gray-50">
                    {children}
                  </th>
                ),
                // 添加段落样式
                p: ({ children }) => (
                  <p className="my-4 leading-7">
                    {children}
                  </p>
                ),
                // 添加块引用样式
                blockquote: ({ children }) => (
                  <blockquote className="pl-4 border-l-4 border-gray-200 my-6 italic">
                    <div className="text-gray-700 dark:text-gray-300">
                      {children}
                    </div>
                  </blockquote>
                ),
                // 添加脚注引用样式
                sup: ({ children }) => (
                  <sup className="text-sm align-super">
                    {children}
                  </sup>
                ),

                // 添加脚注部分样式
                section: ({ children, className }) => {
                  if (className === 'footnotes') {
                    return (
                      <section className="mt-8 pt-8 border-t border-gray-200">
                        <div className="[&>h2:first-child]:hidden">
                          {children}
                        </div>
                      </section>
                    );
                  }
                  return <section className={className}>{children}</section>;
                },
              }}
            >
              {post.content}
            </Markdown>
          </div>
        </article>

        <aside className="space-y-8 lg:sticky lg:top-20 lg:self-start">
          <div className="bg-gray-50 p-6 rounded-lg">
            <TableOfContents
              content={post.content}
              title={dict.blog.tableOfContents}
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <RelatedPosts
              posts={relatedPosts}
              locale={locale}
              title={dict.blog.relatedPosts}
            />
          </div>
        </aside>
      </div>

      {/* 添加前后文章导航 */}
      <nav className="mt-12 border-t pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adjacentPosts.previous && (
            <Link
              href={`/${locale}/blog/${adjacentPosts.previous.slug}`}
              className="group flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <div className="text-sm text-gray-500">{dict.blog.previousPost}</div>
                <div className="font-medium line-clamp-1">{adjacentPosts.previous.title}</div>
              </div>
            </Link>
          )}
          
          {adjacentPosts.next && (
            <Link
              href={`/${locale}/blog/${adjacentPosts.next.slug}`}
              className="group flex items-center justify-end space-x-2 text-gray-600 hover:text-gray-900"
            >
              <div className="text-right">
                <div className="text-sm text-gray-500">{dict.blog.nextPost}</div>
                <div className="font-medium line-clamp-1">{adjacentPosts.next.title}</div>
              </div>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

// 添加 generateMetadata 函数
export async function generateMetadata(
  props: { 
    params: Promise<{ locale: Locale; slug: string }> 
  }
) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const post = await getBlogPost(locale, slug)
  if (!post) return {}

  return generateSharedMetadata({
    title: post.title,
    description: post.description,
    keywords: post.tags,
    image: post.coverImage,
    locale,
    type: 'article'
  })
}