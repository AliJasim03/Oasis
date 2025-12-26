'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { getProductBySlug } from '@/lib/supabase/queries'
import { formatPrice } from '@/lib/utils/helpers'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import styles from './product-detail.module.scss'
import type { Product, ProductImage } from '@/lib/supabase/types'

type ProductWithImages = Product & { product_images: ProductImage[] }

export default function ProductDetailPage() {
  const params = useParams()
  const { t, locale } = useLanguage()
  const [product, setProduct] = useState<ProductWithImages | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null)

  useEffect(() => {
    loadProduct()
  }, [params.sku])

  async function loadProduct() {
    try {
      const data = await getProductBySlug(params.sku as string)
      if (!data) {
        // Redirect to 404 if product doesn't exist
        window.location.href = '/404'
        return
      }
      setProduct(data as ProductWithImages)
      // Set initial selected image to primary or first image
      const initialImage = data.product_images?.find((img: ProductImage) => img.is_primary) || data.product_images?.[0]
      setSelectedImage(initialImage || null)
    } catch (error) {
      console.error('Error loading product:', error)
      window.location.href = '/404'
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-3xl">
        <div className={styles.loading}>{t.products.loading}</div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  const productName = locale === 'ar' ? product.name_ar : product.name_en
  const inquiryMessage = product.available
    ? `Hello, I'm interested in the ${product.name_en} (SKU: ${product.sku}). Could you please provide more information?`
    : `Hello, I noticed the ${product.name_en} (SKU: ${product.sku}) is currently unavailable. When will it be back in stock?`

  return (
    <div className="container py-3xl">
      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          {selectedImage ? (
            <div className={`${styles.mainImage} ${!product.available ? styles.unavailableImage : ''}`}>
              <Image
                src={selectedImage.image_url}
                alt={selectedImage.alt_text}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                priority
              />
              {!product.available && (
                <div className={styles.unavailableOverlay}>
                  <span className={styles.unavailableText}>{t.products.card.soldOut}</span>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.placeholderImage}>{t.products.card.noImage}</div>
          )}

          {product.product_images?.length > 1 && (
            <div className={styles.thumbnails}>
              {product.product_images.map((img) => (
                <div
                  key={img.id}
                  className={`${styles.thumbnail} ${selectedImage?.id === img.id ? styles.activeThumbnail : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img.image_url}
                    alt={img.alt_text}
                    fill
                    sizes="100px"
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.header}>
            <div>
              <h1>{productName}</h1>
              <p className={styles.category}>{product.category} {t.products.detail.carpet}</p>
            </div>
            {product.featured && (
              <span className={styles.badge}>{t.products.card.featured}</span>
            )}
          </div>

          <div className={styles.price}>
            {formatPrice(product.price)}
          </div>

          {!product.available && (
            <div className={styles.soldOut}>
              <strong>⚠️ {t.products.card.soldOut}</strong>
              <p className={styles.soldOutMessage}>{t.products.detail.unavailableMessage}</p>
            </div>
          )}

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <strong>{t.products.detail.material}:</strong>
              <span>{product.material}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>{t.products.detail.origin}:</strong>
              <span>{product.origin}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>{t.products.detail.size}:</strong>
              <span>{product.size}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>{t.products.detail.sku}:</strong>
              <span>{product.sku}</span>
            </div>
          </div>

          <div className={styles.description}>
            <h2>{t.products.detail.description}</h2>
            <p>{locale === 'ar' ? product.description_ar : product.description_en}</p>
          </div>

          <div className={styles.actions}>
            <WhatsAppButton message={inquiryMessage} />
            <a href="/products/category" className="btn btn-outline">
              {locale === 'ar' ? '→ العودة إلى الفئات' : '← Back to Categories'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
