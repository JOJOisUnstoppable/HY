
import Link from 'next/link'
import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card"

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    images: string[]
  }
  locale: string
}

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <Link
      href={`/${locale}/products/${product.id}`}
    >
      <MinimalCard>
        <MinimalCardImage src={product.images[0]} alt={product.name} />
        <MinimalCardTitle>{product.name}</MinimalCardTitle>
        {/* <MinimalCardDescription>
          {product.description}
        </MinimalCardDescription> */}
      </MinimalCard>
    </Link>
  )
}