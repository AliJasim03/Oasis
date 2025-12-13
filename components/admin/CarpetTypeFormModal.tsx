'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { createCarpetType, updateCarpetType } from '@/lib/supabase/queries'
import type { CarpetType } from '@/lib/supabase/types'
import styles from './ProductFormModal.module.scss'

interface CarpetTypeFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  carpetType?: CarpetType | null
}

export function CarpetTypeFormModal({ isOpen, onClose, onSuccess, carpetType }: CarpetTypeFormModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    slug: '',
    description_en: '',
    description_ar: '',
    category: 'Persian' as 'Persian' | 'Afghan' | 'Indian' | 'Regional',
    sort_order: '',
  })

  useEffect(() => {
    if (carpetType) {
      setFormData({
        name_en: carpetType.name_en,
        name_ar: carpetType.name_ar,
        slug: carpetType.slug,
        description_en: carpetType.description_en,
        description_ar: carpetType.description_ar,
        category: carpetType.category,
        sort_order: carpetType.sort_order.toString(),
      })
    } else {
      // Reset form for new carpet type
      setFormData({
        name_en: '',
        name_ar: '',
        slug: '',
        description_en: '',
        description_ar: '',
        category: 'Persian',
        sort_order: '0',
      })
    }
  }, [carpetType])

  // Auto-generate slug from English name
  const handleNameEnChange = (value: string) => {
    setFormData({
      ...formData,
      name_en: value,
      slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        ...formData,
        sort_order: parseInt(formData.sort_order) || 0,
      }

      if (carpetType) {
        await updateCarpetType(carpetType.id, data)
      } else {
        await createCarpetType(data)
      }

      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Error saving carpet type:', error)
      alert(error.message || 'Failed to save carpet type')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={carpetType ? 'Edit Carpet Type' : 'Add New Carpet Type'}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className="form-group">
            <label htmlFor="name_en">Name (English) *</label>
            <input
              type="text"
              id="name_en"
              value={formData.name_en}
              onChange={(e) => handleNameEnChange(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name_ar">Name (Arabic) *</label>
            <input
              type="text"
              id="name_ar"
              value={formData.name_ar}
              onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
              required
              dir="rtl"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="slug">Slug *</label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="auto-generated from name"
            required
          />
          <p className={styles.helper}>URL-friendly identifier (auto-generated)</p>
        </div>

        <div className="form-group">
          <label htmlFor="description_en">Description (English) *</label>
          <textarea
            id="description_en"
            value={formData.description_en}
            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
            required
            rows={6}
            placeholder="Detailed description of this carpet type..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="description_ar">Description (Arabic) *</label>
          <textarea
            id="description_ar"
            value={formData.description_ar}
            onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
            required
            rows={6}
            dir="rtl"
            placeholder="وصف تفصيلي لنوع السجاد..."
          />
        </div>

        <div className={styles.row}>
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              required
            >
              <option value="Persian">Persian</option>
              <option value="Afghan">Afghan</option>
              <option value="Indian">Indian</option>
              <option value="Regional">Regional</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sort_order">Sort Order</label>
            <input
              type="number"
              id="sort_order"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
              min="0"
              placeholder="0"
            />
            <p className={styles.helper}>Lower numbers appear first</p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : carpetType ? 'Update Carpet Type' : 'Create Carpet Type'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
