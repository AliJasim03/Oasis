'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CarpetPattern } from '@/components/ui/CarpetPattern'
import { getCarpetTypes } from '@/lib/supabase/queries'
import type { CarpetType } from '@/lib/supabase/types'
import styles from './categories.module.scss'

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  Persian: { en: 'Persian', ar: 'فارسي' },
  Afghan: { en: 'Afghan', ar: 'أفغاني' },
  Indian: { en: 'Indian', ar: 'هندي' },
  Regional: { en: 'Regional', ar: 'إقليمي' },
}

// Truncate text to a certain number of characters
const truncateText = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export default function CategoriesPage() {
  const { t, locale } = useLanguage()
  const [carpetTypes, setCarpetTypes] = useState<CarpetType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCarpetTypes()
  }, [])

  const loadCarpetTypes = async () => {
    try {
      const data = await getCarpetTypes()
      setCarpetTypes(data)
    } catch (error) {
      console.error('Error loading carpet types:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-3xl">
        <h1>{t.products.category.title}</h1>
        <div className={styles.loading}>{t.products.category.loadingCategories}</div>
      </div>
    )
  }

  return (
    <div className="container py-3xl">
      <div className={styles.pageWrapper}>
        <CarpetPattern type="border" position="top" opacity={0.1} />

        <ScrollReveal animation="fadeIn">
          <h1 className={styles.title}>
            {locale === 'ar' ? 'أنواع السجاد' : 'Carpet Types'}
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="slideUp" delay={0.1}>
          <p className={styles.subtitle}>
            {locale === 'ar' ? 'اكتشف أنواع السجاد الفاخرة المصنوعة يدويًا' : 'Discover our exquisite handmade carpet types'}
          </p>
        </ScrollReveal>

        <div className={styles.categoriesGrid}>
          {carpetTypes.map((type, index) => {
            const description = locale === 'ar' ? type.description_ar : type.description_en
            const truncatedDesc = truncateText(description, 180)

            return (
              <ScrollReveal key={type.slug} animation="scale" delay={index * 0.1}>
                <Link href={`/products/carpet-type/${type.slug}`} className={styles.categoryCard}>
                  <div className={styles.cardHeader}>
                    <h2>{locale === 'ar' ? type.name_ar : type.name_en}</h2>
                    <span className={styles.categoryBadge}>
                      {locale === 'ar'
                        ? CATEGORY_LABELS[type.category].ar
                        : CATEGORY_LABELS[type.category].en}
                    </span>
                  </div>

                  <p className={styles.description}>
                    {truncatedDesc}
                  </p>

                  <div className={styles.viewLink}>
                    <span>{locale === 'ar' ? 'عرض المنتجات' : 'View Products'}</span>
                    <span className={styles.arrow}>{locale === 'ar' ? '←' : '→'}</span>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal animation="slideUp" delay={0.5}>
          <div className={styles.backLink}>
            <a href="/products" className="btn btn-outline">
              {locale === 'ar' ? '→' : '←'} {t.products.backToAllProducts}
            </a>
          </div>
        </ScrollReveal>

        <CarpetPattern type="border" position="bottom" opacity={0.1} />
      </div>
    </div>
  )
}
