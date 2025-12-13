import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProductBySlug } from '@/lib/supabase/queries'
import { formatPrice, getWhatsAppLink } from '@/lib/utils/helpers'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { Button } from '@/components/ui/Button'
import styles from './product-detail.module.scss'

export default async function ProductDetailPage({
  params,
}: {
  params: { sku: string }
}) {
  let product: any

  try {
    product = await getProductBySlug(params.sku)
  } catch (error) {
    notFound()
  }

  if (!product) {
    notFound()
  }

  const primaryImage = product.product_images?.find((img: any) => img.is_primary) || product.product_images?.[0]
  const inquiryMessage = `Hello, I'm interested in the ${product.name_en} (SKU: ${product.sku}). Could you please provide more information?`

  return (
    <div className="container py-3xl">
      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          {primaryImage ? (
            <div className={styles.mainImage}>
              <Image
                src={primaryImage.image_url}
                alt={primaryImage.alt_text}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            </div>
          ) : (
            <div className={styles.placeholderImage}>No Image Available</div>
          )}

          {product.product_images?.length > 1 && (
            <div className={styles.thumbnails}>
              {product.product_images.map((img: any) => (
                <div key={img.id} className={styles.thumbnail}>
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
              <h1>{product.name_en}</h1>
              <p className={styles.category}>{product.category} Carpet</p>
            </div>
            {product.featured && (
              <span className={styles.badge}>Featured</span>
            )}
          </div>

          <div className={styles.price}>
            {formatPrice(product.price)}
          </div>

          {!product.available && (
            <div className={styles.soldOut}>
              <strong>Sold Out</strong>
            </div>
          )}

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <strong>Material:</strong>
              <span>{product.material}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Origin:</strong>
              <span>{product.origin}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>Size:</strong>
              <span>{product.size}</span>
            </div>
            <div className={styles.detailItem}>
              <strong>SKU:</strong>
              <span>{product.sku}</span>
            </div>
          </div>

          <div className={styles.description}>
            <h2>Description</h2>
            <p>{product.description_en}</p>
          </div>

          <div className={styles.actions}>
            <WhatsAppButton message={inquiryMessage} />
            <a href="/products" className="btn btn-outline">
              Back to Products
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
