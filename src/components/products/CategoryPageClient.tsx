'use client'

import { ProductCard } from '@/components/products/ProductCard'
import {
  FastenerHeroSection,
  WhatIsFastenerSection,
  QualityComparisonSection,
  ProductSeriesSection,
  HowItWorksSection,
  SpecificationsSection,
  InstallationGuidelinesSection,
  IndustryApplicationsSection,
  FaqSectionP,
  ContactSection
} from '@/components/products/landingpage'
import { Locale } from '@/lib/i18n/config'
import { BentoGrid } from "@/components/magicui/bento-grid"
import { useState } from 'react';



interface CategoryPageClientProps {
  category: any
  products: any[]
  dict: any
  locale: Locale
}

export default function CategoryPageClient({ 
  category, 
  products, 
  dict, 
  locale,
}: CategoryPageClientProps) {

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  // 获取 categoryId
  const categoryId = category.id;
  
  return (
    <>
      {/* 产品详细介绍部分 - 应用home页面的背景和布局风格 */}
      <div className="relative bg-gray-50 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,transparent,black,transparent)] dark:bg-grid-slate-700/25" />
        <div className="relative">
          <FastenerHeroSection dict={dict} categoryId={categoryId} />
          <WhatIsFastenerSection dict={dict} categoryId={categoryId} />
          {/* 产品列表部分 - 应用home页面的容器和网格风格 */}
          <div className="relative container max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,transparent,black,transparent)] dark:bg-grid-slate-700/25" />
            <div className="relative">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  {category.title} {dict.common.products || 'Products'}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* 使用BentoGrid布局，与home页面保持一致 */}
              <BentoGrid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 auto-rows-[16rem] [&>*]:transition-[grid-column] [&>*]:duration-500">
                {products.map((product, index) => (
                  <div key={`${product.id}-${index}`} className="group">
                    <ProductCard
                      product={{
                        id: product.id,
                        name: product.title,
                        description: product.description,
                        images: [product.image]
                      }}
                      locale={locale}
                    />
                  </div>
                ))}
              </BentoGrid>
            </div>
          </div>

          <QualityComparisonSection dict={dict} categoryId={categoryId} />
          <HowItWorksSection dict={dict} categoryId={categoryId} />
          <SpecificationsSection dict={dict} categoryId={categoryId} />
          <InstallationGuidelinesSection dict={dict} categoryId={categoryId} />
          <FaqSectionP dict={dict} categoryId={categoryId} />
          <ContactSection />
        </div>
      </div>
    </>
  )
}