'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CarpetPattern } from '@/components/ui/CarpetPattern'
import { getProducts, getCarpetTypes } from '@/lib/supabase/queries'
import type { CarpetType } from '@/lib/supabase/types'
import styles from './categories.module.scss'

interface CategoryData {
  name: string
  nameAr: string
  slug: string
  description: string
  descriptionAr: string
  count: number
  icon: string
  category: 'Persian' | 'Afghan' | 'Indian' | 'Regional'
}

const CATEGORY_ICONS: Record<string, string> = {
  persian: '🇮🇷',
  afghan: '🇦🇫',
  indian: '🇮🇳',
  regional: '🌍',
}

const MAIN_CATEGORIES: Array<'Persian' | 'Afghan' | 'Indian' | 'Regional'> = ['Persian', 'Afghan', 'Indian', 'Regional']

export default function CategoriesPage() {
  const { t, locale } = useLanguage()
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategoryCounts()
  }, [])

  const loadCategoryCounts = async () => {
    try {
      // Get all products and carpet types
      const [allProducts, allCarpetTypes] = await Promise.all([
        getProducts(),
        getCarpetTypes()
      ])

      // Group carpet types by category and aggregate descriptions
      const categoryMap: Record<string, CategoryData> = {}

      // Process each main category
      const mainCategories = MAIN_CATEGORIES

      for (const category of mainCategories) {
        const categorySlug = category.toLowerCase()
        const categoryTypes = allCarpetTypes.filter(ct => ct.category === category)
        const productCount = allProducts.filter(p => p.category === category).length

        // Combine descriptions from all carpet types in this category
        const descriptionsEn = categoryTypes.map(ct => ct.description_en).filter(Boolean)
        const descriptionsAr = categoryTypes.map(ct => ct.description_ar).filter(Boolean)

        categoryMap[categorySlug] = {
          name: category,
          nameAr: getCategoryNameAr(category),
          slug: categorySlug,
          description: descriptionsEn.length > 0
            ? descriptionsEn.join(' ')
            : getFallbackDescription(category, 'en'),
          descriptionAr: descriptionsAr.length > 0
            ? descriptionsAr.join(' ')
            : getFallbackDescription(category, 'ar'),
          count: productCount,
          icon: CATEGORY_ICONS[categorySlug],
          category: category
        }
      }

      setCategories(Object.values(categoryMap))
    } catch (error) {
      console.error('Error loading categories:', error)
      // Fallback to basic categories
      setCategories(MAIN_CATEGORIES.map(cat => ({
        name: cat,
        nameAr: getCategoryNameAr(cat),
        slug: cat.toLowerCase(),
        description: getFallbackDescription(cat, 'en'),
        descriptionAr: getFallbackDescription(cat, 'ar'),
        count: 0,
        icon: CATEGORY_ICONS[cat.toLowerCase()],
        category: cat
      })))
    } finally {
      setLoading(false)
    }
  }

  function getCategoryNameAr(category: string): string {
    const names: Record<string, string> = {
      Persian: 'فارسي',
      Afghan: 'أفغاني',
      Indian: 'هندي',
      Regional: 'إقليمي',
    }
    return names[category] || category
  }

  function getFallbackDescription(category: string, lang: 'en' | 'ar'): string {
    const fallbacks: Record<string, Record<'en' | 'ar', string>> = {
      Persian: {
        en: 'Exquisite Persian carpets known for their intricate designs and superior craftsmanship',
        ar: 'سجاد فارسي رائع معروف بتصاميمه المعقدة وحرفيته الممتازة',
      },
      Afghan: {
        en: 'Traditional Afghan carpets featuring bold geometric patterns and rich colors',
        ar: 'سجاد أفغاني تقليدي يتميز بأنماط هندسية جريئة وألوان غنية',
      },
      Indian: {
        en: 'Beautiful Indian carpets with vibrant colors and detailed artistry',
        ar: 'سجاد هندي جميل بألوان نابضة بالحياة وفن مفصل',
      },
      Regional: {
        en: 'Unique regional carpets showcasing local traditions and techniques',
        ar: 'سجاد إقليمي فريد يعرض التقاليد والتقنيات المحلية',
      },
    }
    return fallbacks[category]?.[lang] || ''
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
