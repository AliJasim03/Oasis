'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CarpetPattern } from '@/components/ui/CarpetPattern'
import { ProductCard } from '@/components/products/ProductCard'
import { getProducts, getCarpetTypeBySlug } from '@/lib/supabase/queries'
import type { Product, ProductImage, CarpetType } from '@/lib/supabase/types'
import styles from './carpet-type.module.scss'

type ProductWithImages = Product & { product_images: ProductImage[] }

export default function CarpetTypePage() {
  const params = useParams()
  const { t, locale } = useLanguage()
  const [products, setProducts] = useState<ProductWithImages[]>([])
  const [carpetType, setCarpetType] = useState<CarpetType | null>(null)
  const [loading, setLoading] = useState(true)

  const slug = params.slug as string

  useEffect(() => {
    loadCarpetTypeAndProducts()
  }, [slug])

  const loadCarpetTypeAndProducts = async () => {
    try {
      setLoading(true)

      // Load carpet type by slug
      const typeData = await getCarpetTypeBySlug(slug)
      setCarpetType(typeData)

      // Load products filtered by carpet type ID
      const productsData = await getProducts({ carpet_type_id: typeData.id })
      setProducts(productsData as ProductWithImages[])
    } catch (error) {
      console.error('Error loading carpet type and products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-3xl">
        <h1>{t.products.category.loadingProducts}</h1>
      </div>
    )
  }

  if (!carpetType) {
    return (
      <div className="container py-3xl">
        <h1>{t.products.category.noCategoryFound}</h1>
        <p>{t.products.category.noCategoryText}</p>
        <a href="/products/category" className="btn btn-primary">
          {locale === 'ar' ? 'العودة إلى أنواع السجاد' : 'Back to Carpet Types'}
        </a>
      </div>
    )
  }

  return (
    <div className="container py-3xl">
      <div className={styles.pageWrapper}>
        <CarpetPattern type="border" position="top" opacity={0.1} />

        <ScrollReveal animation="fadeIn">
          <h1>
            {locale === 'ar' ? carpetType.name_ar : carpetType.name_en}
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="slideUp" delay={0.1}>
          <p className={styles.subtitle}>
            {locale === 'ar' ? carpetType.description_ar : carpetType.description_en}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="slideUp" delay={0.2}>
          <div className={styles.backLink}>
            <a href="/products/category" className="btn btn-outline">
              {locale === 'ar' ? '→ العودة إلى أنواع السجاد' : '← Back to Carpet Types'}
            </a>
          </div>
        </ScrollReveal>

        {products.length === 0 ? (
          <ScrollReveal animation="scale">
            <div className={styles.noProducts}>
              <p>{t.products.category.noProductsInCategory}</p>
            </div>
          </ScrollReveal>
        ) : (
          <>
            <ScrollReveal animation="slideUp" delay={0.3}>
              <p className={styles.productCount}>
                {products.length} {products.length === 1 ? t.products.productFound : t.products.productsFound}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-3">
              {products.map((product, index) => (
                <ScrollReveal key={product.id} animation="scale" delay={index * 0.05}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

        <CarpetPattern type="border" position="bottom" opacity={0.1} />
      </div>
    </div>
  )
}
