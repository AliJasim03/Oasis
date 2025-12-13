'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { formatPrice } from '@/lib/utils/helpers'
import type { Product, ProductImage } from '@/lib/supabase/types'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: Product & { product_images: ProductImage[] }
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, locale } = useLanguage()
  const primaryImage = product.product_images.find(img => img.is_primary) || product.product_images[0]
  const productName = locale === 'ar' ? product.name_ar : product.name_en

  return (
    <Link href={`/products/${product.sku}`} className={styles.productCard}>
      <div className={styles.imageContainer}>
        {primaryImage ? (
          <Image
            src={primaryImage.image_url}
            alt={primaryImage.alt_text}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholderImage}>{t.products.card.noImage}</div>
        )}
        {product.featured && (
          <span className={styles.badge}>{t.products.card.featured}</span>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{productName}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.details}>
          <span className={styles.origin}>{product.origin}</span>
          <span className={styles.size}>{product.size}</span>
        </div>
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {!product.available && (
            <span className={styles.unavailable}>{t.products.card.soldOut}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
