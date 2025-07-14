'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
  content: string
  title: string  // 添加 title 属性
}

export function TableOfContents({ content, title }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // 从 markdown 内容中提取标题
    const headingRegex = /^(#{2,4})\s+(.+)$/gm
    const matches = Array.from(content.matchAll(headingRegex))
    
    const headingsList = matches.map((match, index) => ({
      id: `heading-${index}`,
      text: match[2],
      level: match[1].length
    }))
    
    setHeadings(headingsList)

    // 为 markdown 内容中的标题添加 id
    const contentElement = document.querySelector('.prose')
    if (contentElement) {
      const headingElements = contentElement.querySelectorAll('h2, h3, h4')
      headingElements.forEach((elem, index) => {
        elem.id = `heading-${index}`
      })

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          })
        },
        { rootMargin: '0% 0% -80% 0%' }
      )

      headingElements.forEach((elem) => observer.observe(elem))
      return () => observer.disconnect()
    }
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav className="space-y-2">
      <h3 className="font-semibold mb-4">{title}</h3>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn(
            "block text-sm text-muted-foreground hover:text-foreground transition-colors",
            heading.level === 2 ? "pl-0" : heading.level === 3 ? "pl-4" : "pl-6",
            activeId === heading.id && "text-foreground font-medium"
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}