'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import styles from './ProductFilters.module.scss'

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  category: string
  material: string
  priceRange: string
  sortBy: string
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    material: '',
    priceRange: '',
    sortBy: 'newest',
  })

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label htmlFor="category">{t.products.filters.category}</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">{t.products.filters.allCategories}</option>
          <option value="Persian">{t.products.filters.categories.persian}</option>
          <option value="Afghan">{t.products.filters.categories.afghan}</option>
          <option value="Indian">{t.products.filters.categories.indian}</option>
          <option value="Regional">{t.products.filters.categories.regional}</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="material">{t.products.filters.material}</label>
        <select
          id="material"
          value={filters.material}
          onChange={(e) => handleFilterChange('material', e.target.value)}
        >
          <option value="">{t.products.filters.allMaterials}</option>
          <option value="Wool">{t.products.filters.materials.wool}</option>
          <option value="Silk">{t.products.filters.materials.silk}</option>
          <option value="Cotton">{t.products.filters.materials.cotton}</option>
          <option value="Wool & Silk">{t.products.filters.materials.woolSilk}</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="priceRange">{t.products.filters.priceRange}</label>
        <select
          id="priceRange"
          value={filters.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
        >
          <option value="">{t.products.filters.allPrices}</option>
          <option value="0-500">{t.products.filters.prices.under500}</option>
          <option value="500-1000">{t.products.filters.prices.range500_1000}</option>
          <option value="1000-2000">{t.products.filters.prices.range1000_2000}</option>
          <option value="2000+">{t.products.filters.prices.over2000}</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="sortBy">{t.products.filters.sortBy}</label>
        <select
          id="sortBy"
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
        >
          <option value="newest">{t.products.filters.sorting.newest}</option>
          <option value="price-low">{t.products.filters.sorting.priceLow}</option>
          <option value="price-high">{t.products.filters.sorting.priceHigh}</option>
          <option value="name">{t.products.filters.sorting.name}</option>
        </select>
      </div>
    </div>
  )
}
