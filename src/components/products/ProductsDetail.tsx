import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ProductHero 组件
interface ProductHeroProps {
  title: string;
  description: string;
  images: string[]; // 修改为图片数组
  dict: {
    common: {
      home: string;
      products: string;
    };
  };
  locale: string;
}

function ProductHero({ title, description, images, dict, locale }: ProductHeroProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="relative h-[30vh] overflow-hidden">
      {/* 图片轮播 */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative h-full">
            <div className="absolute inset-0">
              <Image
                src={image}
                alt={title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </div>
        ))}
      </Slider>

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

// ProductIntroduction 组件
interface ProductIntroductionProps {
  title: string;
  description: string;
  images: string[]; // 修改为图片数组
  locale: string;
}

function ProductIntroduction({
  title,
  description,
  images,
  locale
}: ProductIntroductionProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
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
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt="Product"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              ))}
            </Slider>
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
    images: string[]; // 修改为图片数组
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