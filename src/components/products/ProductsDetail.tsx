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
  // 过滤除最后一张图片的有效图片列表
  const validImages = images.slice(0, -1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    // 只在有效图片范围内轮播
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    // 只在有效图片范围内轮播
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  return (
    <section className="max-w-7xl mx-auto w-full py-12 md:py-12 lg:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">

          {/* 图片轮播及下方缩略图容器 */}
          <div className="flex flex-col gap-4">
            {/* 图片轮播区域 */}
            <div className="relative aspect-video overflow-hidden rounded-xl">
              {validImages.length > 0 && (
                <div className="relative h-full">
                  <Image
                    src={validImages[currentImageIndex]}
                    alt="Product"
                    fill
                    className="object-cover transition-all duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  
                  {/* 轮播控制按钮 */}
                  {validImages.length > 1 && (
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
                  
                  {/* 图片计数器 */}
                  {validImages.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-md">
                      {currentImageIndex + 1} / {validImages.length}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 缩略图区域 - 移到图片下方 */}
            {validImages.length > 1 && (
              <div className="flex justify-center">
                <div className="flex space-x-1.5 bg-black/40 backdrop-blur-sm rounded-lg p-1.5">
                  {validImages.map((image, index) => (
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
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* 文字 标题+描述 */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {description}
              </p>
            </div>
            
            {/* <VolumePricingTable /> // 数量折扣组件 */}
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

// 定义阶梯价格类型接口，新增折扣字段
interface PricingTier {
  id: number;
  quantityRange: string;
  price: number;
  discount: string; // 折扣百分比显示
  minQty: number;
  maxQty?: number;
}

const VolumePricingTable = () => {
  // 阶梯价格数据，包含折扣信息
  const pricingTiers: PricingTier[] = [
    { id: 0, quantityRange: '<10', price: 45.00, discount: '0%', minQty: 1, maxQty: 9 },
    { id: 1, quantityRange: '10 - 19', price: 42.75, discount: '5%', minQty: 10, maxQty: 19 },
    { id: 2, quantityRange: '20 - 49', price: 40.50, discount: '10%', minQty: 20, maxQty: 49 },
    { id: 3, quantityRange: '50 - 99', price: 36.00, discount: '20%', minQty: 50, maxQty: 99 },
    { id: 4, quantityRange: '100+', price: 33.75, discount: '25%', minQty: 100 }
  ];

  // 状态管理 - 默认选中第一个区间
  const [selectedTier, setSelectedTier] = useState<PricingTier>(pricingTiers[0]);

  // 处理区间点击
  const handleTierClick = (tier: PricingTier) => {
    setSelectedTier(tier);
  };

  // 格式化价格显示
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* 标题 */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Volume Pricing</h2>

      {/* 价格区间表格 */}
      <div className="border rounded-lg overflow-hidden">
        {/* 表头 - 第二列改为折扣(Discount) */}
        <div className="grid grid-cols-3 bg-gray-50 py-2 px-4 border-b">
          <div className="font-medium text-gray-700">Quantity Range</div>
          <div className="font-medium text-gray-700 text-center">Discount</div>
          <div className="font-medium text-gray-700 text-right">Unit Price</div>
        </div>

        {/* 区间行 */}
        {pricingTiers.map(tier => (
          <div
            key={tier.id}
            onClick={() => handleTierClick(tier)}
            className={`grid grid-cols-3 py-3 px-4 cursor-pointer transition-colors ${
              selectedTier.id === tier.id 
                ? 'bg-blue-50 border-l-4 border-blue-500' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="text-gray-800">{tier.quantityRange}</div>
            <div className="text-gray-800 text-center font-medium">
              {tier.discount}
            </div>
            <div className="text-gray-800 text-right font-medium">
              {formatPrice(tier.price)}
            </div>
          </div>
        ))}

        {/* 选中区间信息 */}
        <div className="bg-gray-50 py-3 px-4 border-t mt-2">
          <div className="flex justify-between items-center">
            <div className="text-gray-700">
              Selected: <span className="font-medium">{selectedTier.quantityRange}</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {formatPrice(selectedTier.price)} each
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// MaterialDrawing组件
interface MaterialProps {
  images: string[];
}

function MaterialDrawing({ images }: MaterialProps) {
  // 获取最后一张图片
  const lastImage = images[images.length - 1];
  
  if (!lastImage) return null;

  return (
    <section className="max-w-7xl mx-auto w-full py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6">
        {/* 标题部分 - 左对齐带竖线 */}
        <div className="mb-8 flex items-start">
          <div className="w-1.5 h-8 bg-blue-600 mr-3 mt-1"></div> {/* 2px宽度的竖线 */}
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Material Drawing</h2>
        </div>
        
        {/* 最后一张图片 - 居中显示 */}
        <div className="flex justify-center">
          <div className="relative" style={{ maxWidth: '100%' }}>
            <Image
              src={lastImage}
              alt="Material drawing"
              className="object-contain" // 保持原有比例
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: 'auto', height: 'auto', maxHeight: '80vh' }} // 自适应大小
            />
          </div>
        </div>
      </div>
    </section>
  );
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
      <MaterialDrawing images={product.images}  />
    </div>
  );
}