'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// ProductHero 组件 - 简化为单张图片
interface ProductHeroProps {
  title: string;
  description: string;
  images: string[]; // 保持数组格式，但只使用第一张
  dict: {
    common: {
      home: string;
      products: string;
    };
  };
  locale: string;
}

function ProductHero({ title, description, images, dict, locale }: ProductHeroProps) {
  return (
    <div className="relative h-[30vh] overflow-hidden">
      {/* 单张背景图片 */}
      <div className="relative h-full">
        {images.length > 0 && (
          <div className="absolute inset-0">
            <Image
              src={images[0]} // 只使用第一张图片
              alt={title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
      </div>

      {/* 内容 */}
      <div className="relative container h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white space-y-4">
          <h1 className="flex items-baseline gap-2 text-4xl md:text-5xl font-bold">
            <Link 
              href={`/${locale}`} 
              className="text-lg md:text-xl hover:text-gray-200 transition-colors font-light"
            >
              {dict.common.home}
            </Link>
            <span className="text-lg md:text-xl opacity-60">&gt;</span>
            <Link 
              href={`/${locale}/products`} 
              className="text-lg md:text-xl hover:text-gray-200 transition-colors font-light"
            >
              {dict.common.products}
            </Link>
            <span className="text-lg md:text-xl opacity-60">&gt;</span>
            {title}
          </h1>
          <p className="text-lg md:text-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ProductIntroduction 组件 - 增强的图片轮播功能
interface ProductIntroductionProps {
  title: string;
  description: string;
  images: string[];
  locale: string;
}

function ProductIntroduction({
  title,
  description,
  images,
  locale
}: ProductIntroductionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="max-w-7xl mx-auto w-full py-12 md:py-12 lg:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {description}
            </p>
          </div>
          
          {/* 增强的图片轮播区域 */}
          <div className="relative aspect-video overflow-hidden rounded-xl">
            {images.length > 0 && (
              <div className="relative h-full">
                <Image
                  src={images[currentImageIndex]}
                  alt="Product"
                  fill
                  className="object-cover transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                
                {/* 优化后的轮播控制按钮 */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white p-2 rounded-full z-10 transition-all duration-200 hover:scale-110 shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/20 text-white p-2 rounded-full z-10 transition-all duration-200 hover:scale-110 shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                {/* 图片预览缩略图 */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex space-x-1.5 bg-black/40 backdrop-blur-sm rounded-lg p-1.5">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative w-12 h-9 rounded-md overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                            index === currentImageIndex 
                              ? 'border-white shadow-lg' 
                              : 'border-white/30 hover:border-white/60'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                          {index === currentImageIndex && (
                            <div className="absolute inset-0 bg-white/20" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 图片计数器 */}
                {images.length > 1 && (
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-md">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// 特性和功能的数据结构
interface Feature {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

// 产品详情页组件
interface ProductDetailPageProps {
  product: {
    title: string;
    description: string;
    images: string[];
  };
  dict: {
    common: {
      home: string;
      products: string;
    };
  };
  locale: string;
}

export default function ProductDetailPage({ product, dict, locale }: ProductDetailPageProps) {
  return (
    <div>
      <ProductHero 
        title={product.title}
        description={product.description}
        images={product.images}
        dict={dict}
        locale={locale}
      />
      <ProductIntroduction
        title={product.title}
        description={product.description}
        images={product.images}
        locale={locale}
      />
    </div>
  );
}