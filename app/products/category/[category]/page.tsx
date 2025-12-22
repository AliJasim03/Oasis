'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CarpetPattern } from '@/components/ui/CarpetPattern'
import { ProductCard } from '@/components/products/ProductCard'
import { getProducts } from '@/lib/supabase/queries'
import type { Product, ProductImage } from '@/lib/supabase/types'
import styles from './category.module.scss'

type ProductWithImages = Product & { product_images: ProductImage[] }

const CATEGORY_NAMES: Record<string, { en: string; ar: string }> = {
  persian: { en: 'Persian', ar: 'فارسي' },
  afghan: { en: 'Afghan', ar: 'أفغاني' },
  indian: { en: 'Indian', ar: 'هندي' },
  regional: { en: 'Regional', ar: 'إقليمي' },
}

export default function CategoryPage() {
  const params = useParams()
  const { t, locale } = useLanguage()
  const [products, setProducts] = useState<ProductWithImages[]>([])
  const [loading, setLoading] = useState(true)

  const categorySlug = params.category as string
  const categoryKey = categorySlug.toLowerCase()
  const categoryInfo = CATEGORY_NAMES[categoryKey]

  // Capitalize first letter for API query
  const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).toLowerCase()

  useEffect(() => {
    loadProducts()
  }, [categoryName])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts({ category: categoryName })
      setProducts(data as ProductWithImages[])
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!categoryInfo) {
    return (
      <div className="container py-3xl">
        <h1>{t.products.category.noCategoryFound}</h1>
        <p>{t.products.category.noCategoryText}</p>
        <a href="/products" className="btn btn-primary">
          {t.products.backToAllProducts}
        </a>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container py-3xl">
        <h1>{locale === 'ar' ? categoryInfo.ar : categoryInfo.en} {t.products.title}</h1>
        <div className={styles.loading}>{t.products.category.loadingProducts}</div>
      </div>
    )
  }

  return (
    <div className="container py-3xl">
      <div className={styles.pageWrapper}>
        <CarpetPattern type="border" position="top" opacity={0.1} />

        <ScrollReveal animation="fadeIn">
          <h1>
            {locale === 'ar' ? categoryInfo.ar : categoryInfo.en} {t.products.title}
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="slideUp" delay={0.1}>
          <p className={styles.subtitle}>
            {t.products.category.exploreCategory} {categoryInfo.en.toLowerCase()} {locale === 'ar' ? 'السجاد اليدوي' : 'handmade carpets'}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="slideUp" delay={0.2}>
          <div className={styles.backLink}>
            <a href="/products/category" className="btn btn-outline">
              {locale === 'ar' ? '→ العودة إلى الفئات' : '← Back to Categories'}
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
