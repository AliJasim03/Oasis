'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CarpetPattern } from '@/components/ui/CarpetPattern'
import { getProducts } from '@/lib/supabase/queries'
import styles from './categories.module.scss'

interface CategoryData {
  name: string
  nameAr: string
  slug: string
  description: string
  descriptionAr: string
  count: number
  icon: string
}

const CATEGORIES_INFO = [
  {
    name: 'Persian',
    nameAr: 'فارسي',
    slug: 'persian',
    description: 'Exquisite Persian carpets known for their intricate designs and superior craftsmanship',
    descriptionAr: 'سجاد فارسي رائع معروف بتصاميمه المعقدة وحرفيته الممتازة',
    icon: '🇮🇷',
  },
  {
    name: 'Afghan',
    nameAr: 'أفغاني',
    slug: 'afghan',
    description: 'Traditional Afghan carpets featuring bold geometric patterns and rich colors',
    descriptionAr: 'سجاد أفغاني تقليدي يتميز بأنماط هندسية جريئة وألوان غنية',
    icon: '🇦🇫',
  },
  {
    name: 'Indian',
    nameAr: 'هندي',
    slug: 'indian',
    description: 'Beautiful Indian carpets with vibrant colors and detailed artistry',
    descriptionAr: 'سجاد هندي جميل بألوان نابضة بالحياة وفن مفصل',
    icon: '🇮🇳',
  },
  {
    name: 'Regional',
    nameAr: 'إقليمي',
    slug: 'regional',
    description: 'Unique regional carpets showcasing local traditions and techniques',
    descriptionAr: 'سجاد إقليمي فريد يعرض التقاليد والتقنيات المحلية',
    icon: '🌍',
  },
]

export default function CategoriesPage() {
  const { t, locale } = useLanguage()
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategoryCounts()
  }, [])

  const loadCategoryCounts = async () => {
    try {
      const allProducts = await getProducts()

      // Count products per category
      const categoriesWithCounts = CATEGORIES_INFO.map(cat => {
        const count = allProducts.filter(p => p.category === cat.name).length
        return { ...cat, count }
      })

      setCategories(categoriesWithCounts)
    } catch (error) {
      console.error('Error loading categories:', error)
      setCategories(CATEGORIES_INFO.map(cat => ({ ...cat, count: 0 })))
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
            {t.products.category.title}
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="slideUp" delay={0.1}>
          <p className={styles.subtitle}>
            {t.products.category.exploreCollection}
          </p>
        </ScrollReveal>

        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <ScrollReveal key={category.slug} animation="scale" delay={index * 0.1}>
              <Link href={`/products/category/${category.slug}`} className={styles.categoryCard}>
                <div className={styles.cardHeader}>
                  <h2>
                    <span className={styles.cardIcon}>{category.icon}</span>
                    {locale === 'ar' ? category.nameAr : category.name}
                  </h2>
                  <span className={styles.count}>
                    {category.count} {locale === 'ar' ? 'منتج' : category.count === 1 ? 'product' : 'products'}
                  </span>
                </div>
                <p className={styles.description}>
                  {locale === 'ar' ? category.descriptionAr : category.description}
                </p>
                <div className={styles.viewLink}>
                  {locale === 'ar' ? 'عرض المنتجات ←' : 'View Products →'}
                </div>
              </Link>
            </ScrollReveal>
          ))}
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
