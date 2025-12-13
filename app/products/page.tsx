'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CarpetPattern } from '@/components/ui/CarpetPattern'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductFilters, FilterState } from '@/components/products/ProductFilters'
import { getProducts } from '@/lib/supabase/queries'
import type { Product, ProductImage } from '@/lib/supabase/types'
import styles from './products.module.scss'

type ProductWithImages = Product & { product_images: ProductImage[] }

export default function ProductsPage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState<ProductWithImages[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductWithImages[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data as ProductWithImages[])
      setFilteredProducts(data as ProductWithImages[])
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...products]

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    // Filter by material
    if (filters.material) {
      filtered = filtered.filter(p => p.material.includes(filters.material))
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(v => v.replace('+', ''))
      filtered = filtered.filter(p => {
        if (filters.priceRange.includes('+')) {
          return p.price >= parseFloat(min)
        }
        return p.price >= parseFloat(min) && p.price <= parseFloat(max)
      })
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name_en.localeCompare(b.name_en)
        default: // newest
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

    setFilteredProducts(filtered)
  }

  if (loading) {
    return (
      <div className="container py-3xl">
        <h1>{t.products.title}</h1>
        <div className={styles.loading}>Loading products...</div>
      </div>
    )
  }

  return (
    <div className="container py-3xl">
      <div className={styles.pageWrapper}>
        <CarpetPattern type="border" position="top" opacity={0.1} />

        <ScrollReveal animation="fadeIn">
          <h1>{t.products.title}</h1>
        </ScrollReveal>

        <ScrollReveal animation="slideUp" delay={0.1}>
          <p className={styles.subtitle}>
            {t.products.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="slideUp" delay={0.2}>
          <ProductFilters onFilterChange={handleFilterChange} />
        </ScrollReveal>

        {filteredProducts.length === 0 ? (
          <ScrollReveal animation="scale">
            <div className={styles.noProducts}>
              <p>No products found matching your filters.</p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-3">
            {filteredProducts.map((product, index) => (
              <ScrollReveal key={product.id} animation="scale" delay={index * 0.05}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}

        <CarpetPattern type="border" position="bottom" opacity={0.1} />
      </div>
    </div>
  )
}
