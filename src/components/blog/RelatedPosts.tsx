import Link from 'next/link'
import Image from 'next/image'

interface RelatedPost {
  slug: string
  title: string
  coverImage?: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
  locale: string
  title: string  // 添加 title 属性
}

export function RelatedPosts({ posts, locale, title }: RelatedPostsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="flex items-center gap-4 group"
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={post.coverImage || '/images/blog/cover-default.jpg'}
                alt={post.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <h4 className="text-sm group-hover:text-primary transition-colors">
              {post.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  )
}