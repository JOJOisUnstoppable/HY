'use client'

import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState<string>('')

  const sections = useMemo(() => [
    { id: '1-introduction', title: '1.Introduction' },
    { id: '2-information-we-collect', title: '2.Information We Collect' },
    { id: '3-how-we-use-your-information', title: '3.How We Use Your Information' },
    { id: '4-information-sharing', title: '4.Information Sharing' },
    { id: '5-data-security', title: '5.Data Security' },
    { id: '6-your-rights', title: '6.Your Rights' },
    { id: '7-cookies-policy', title: '7.Cookies Policy' },
    { id: '8-changes-to-this-policy', title: '8.Changes to This Policy' },
    { id: '9-contact-us', title: '9.Contact Us' }
  ], []); // 空依赖数组，因为这些数据是静态的

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])  // 添加 sections 到依赖数组中

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64; // 假设导航栏高度为 64px，请根据实际情况调整
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight - 24, // 额外添加 24px 的间距
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="space-y-1 text-sm">
      <p className="font-semibold text-base mb-4">Table of Contents</p>
      {sections.map(({ id, title }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => handleClick(e, id)}
          className={cn(
            'block py-2 px-3 rounded-md transition-colors',
            activeSection === id
              ? 'bg-primary/10 text-primary font-medium'
              : 'hover:bg-muted'
          )}
        >
          {title}
        </a>
      ))}
    </nav>
  )
}