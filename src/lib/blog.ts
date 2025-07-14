import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Locale } from './i18n/config'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
  coverImage?: string
  author?: string
}

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog', locale)
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        content,
        coverImage: data.coverImage
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getBlogPost(locale: Locale, slug: string): Promise<BlogPost | null> {
  const filePath = path.join(process.cwd(), 'content', 'blog', locale, `${slug}.md`)
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      tags: data.tags || [],
      content,
      coverImage: data.coverImage,
      author: data.author
    }
  } catch {
    return null
  }
}

export async function getBlogTags(locale: Locale): Promise<string[]> {
  const posts = await getBlogPosts(locale)
  const tags = new Set(posts.flatMap(post => post.tags))
  return Array.from(tags)
}

interface RelatedPost {
  slug: string
  title: string
  coverImage?: string
}

export async function getRelatedPosts(locale: Locale, currentSlug: string, limit: number = 5): Promise<RelatedPost[]> {
  const allPosts = await getBlogPosts(locale)
  const currentPost = allPosts.find(post => post.slug === currentSlug)
  
  if (!currentPost || !currentPost.tags.length) {
    return allPosts
      .filter(post => post.slug !== currentSlug)
      .slice(0, limit)
      .map(post => ({
        slug: post.slug,
        title: post.title,
        coverImage: post.coverImage
      }))
  }

  return allPosts
    .filter(post => 
      post.slug !== currentSlug && // 过滤掉当前文章
      post.tags.some(tag => currentPost.tags.includes(tag)) // 至少有一个标签匹配
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 按发布时间倒序
    .slice(0, 5) // 最多5篇
    .map(post => ({
      slug: post.slug,
      title: post.title,
      coverImage: post.coverImage
    }))
}

interface AdjacentPost {
  slug: string
  title: string
}

export async function getAdjacentPosts(locale: Locale, currentSlug: string): Promise<{
  previous: AdjacentPost | null
  next: AdjacentPost | null
}> {
  const posts = await getBlogPosts(locale)
  const currentIndex = posts.findIndex(post => post.slug === currentSlug)
  
  return {
    previous: currentIndex > 0 ? {
      slug: posts[currentIndex - 1].slug,
      title: posts[currentIndex - 1].title
    } : null,
    next: currentIndex < posts.length - 1 ? {
      slug: posts[currentIndex + 1].slug,
      title: posts[currentIndex + 1].title
    } : null
  }
}