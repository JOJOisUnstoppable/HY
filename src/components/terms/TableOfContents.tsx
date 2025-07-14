'use client'

import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState<string>('')

  const sections = useMemo(() => [
    { id: '1-agreement-to-terms', title: '1.Agreement to Terms' },
    { id: '2-description-of-service', title: '2.Description of Service' },
    { id: '3-user-responsibilities', title: '3.User Responsibilities' },
    { id: '4-intellectual-property-rights', title: '4.Intellectual Property Rights' },
    { id: '5-privacy-and-data-protection', title: '5.Privacy and Data Protection' },
    { id: '6-limitation-of-liability', title: '6.Limitation of Liability' },
    { id: '7-product-information', title: '7.Product Information' },
    { id: '8-ordering-and-payment', title: '8.Ordering and Payment' },
    { id: '9-shipping-and-delivery', title: '9.Shipping and Delivery' },
    { id: '10-returns-and-refunds', title: '10.Returns and Refunds' },
    { id: '11-warranty', title: '11.Warranty' },
    { id: '12-termination', title: '12.Termination' },
    { id: '13-governing-law', title: '13.Governing Law' },
    { id: '14-changes-to-terms', title: '14.Changes to Terms' },
    { id: '15-contact-information', title: '15.Contact Information' },
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