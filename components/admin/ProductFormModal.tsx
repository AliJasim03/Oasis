'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { createProduct, updateProduct, uploadProductImage, createProductImage, getCarpetTypes } from '@/lib/supabase/queries'
import type { Product, CarpetType } from '@/lib/supabase/types'
import styles from './ProductFormModal.module.scss'

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  product?: Product | null
}

export function ProductFormModal({ isOpen, onClose, onSuccess, product }: ProductFormModalProps) {
  const [loading, setLoading] = useState(false)
  const [carpetTypes, setCarpetTypes] = useState<CarpetType[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    category: 'Persian' as 'Persian' | 'Afghan' | 'Indian' | 'Regional',
    carpet_type_id: '',
    material: '',
    origin: '',
    price: '',
    size: '',
    sku: '',
    featured: false,
    available: true,
  })

  useEffect(() => {
    loadCarpetTypes()
  }, [])

  useEffect(() => {
    if (product) {
      setFormData({
        name_en: product.name_en,
        name_ar: product.name_ar,
        description_en: product.description_en,
        description_ar: product.description_ar,
        category: product.category,
        carpet_type_id: (product as any).carpet_type_id || '',
        material: product.material,
        origin: product.origin,
        price: product.price.toString(),
        size: product.size,
        sku: product.sku,
        featured: product.featured,
        available: product.available,
      })
    } else {
      // Reset form for new product
      setFormData({
        name_en: '',
        name_ar: '',
        description_en: '',
        description_ar: '',
        category: 'Persian',
        carpet_type_id: '',
        material: '',
        origin: '',
        price: '',
        size: '',
        sku: '',
        featured: false,
        available: true,
      })
      setImageFiles([])
      setImagePreviews([])
    }
  }, [product])

  const loadCarpetTypes = async () => {
    try {
      const types = await getCarpetTypes()
      setCarpetTypes(types || [])
    } catch (error) {
      console.error('Error loading carpet types:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImageFiles(files)

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        carpet_type_id: formData.carpet_type_id || null,
      }

      let productId: string

      if (product) {
        // Update existing product
        const updated = await updateProduct(product.id, productData)
        productId = updated.id
      } else {
        // Create new product
        const created = await createProduct(productData)
        productId = created.id
      }

      // Upload images if any
      if (imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i]
          const imageUrl = await uploadProductImage(file, productId)

          await createProductImage({
            product_id: productId,
            image_url: imageUrl,
            is_primary: i === 0, // First image is primary
            alt_text: formData.name_en,
          })
        }
      }

      onSuccess()
      onClose()
    } catch (error: any) {
      console.error('Error saving product:', error)
      alert(error.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  const filteredCarpetTypes = carpetTypes.filter(type => type.category === formData.category)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Edit Product' : 'Add New Product'}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className="form-group">
            <label htmlFor="name_en">Name (English) *</label>
            <input
              type="text"
              id="name_en"
              value={formData.name_en}
              onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
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
          <label htmlFor="description_en">Description (English) *</label>
          <textarea
            id="description_en"
            value={formData.description_en}
            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
            required
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description_ar">Description (Arabic) *</label>
          <textarea
            id="description_ar"
            value={formData.description_ar}
            onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
            required
            rows={4}
            dir="rtl"
          />
        </div>

        <div className={styles.row}>
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({
                ...formData,
                category: e.target.value as any,
                carpet_type_id: '' // Reset carpet type when category changes
              })}
              required
            >
              <option value="Persian">Persian</option>
              <option value="Afghan">Afghan</option>
              <option value="Indian">Indian</option>
              <option value="Regional">Regional</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="carpet_type_id">Carpet Type</label>
            <select
              id="carpet_type_id"
              value={formData.carpet_type_id}
              onChange={(e) => setFormData({ ...formData, carpet_type_id: e.target.value })}
            >
              <option value="">Select carpet type (optional)</option>
              {filteredCarpetTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name_en}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className="form-group">
            <label htmlFor="material">Material *</label>
            <input
              type="text"
              id="material"
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              placeholder="e.g., 100% Silk, Wool & Silk"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="origin">Origin *</label>
            <input
              type="text"
              id="origin"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              placeholder="e.g., Qum, Iran"
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className="form-group">
            <label htmlFor="price">Price (BHD) *</label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="size">Size *</label>
            <input
              type="text"
              id="size"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              placeholder="e.g., 200cm x 300cm"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sku">SKU *</label>
            <input
              type="text"
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="e.g., QUM-SILK-001"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="images">Product Images</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          <p className={styles.helper}>First image will be set as primary. Upload up to 5 images.</p>

          {imagePreviews.length > 0 && (
            <div className={styles.imagePreviews}>
              {imagePreviews.map((preview, index) => (
                <div key={index} className={styles.previewItem}>
                  <img src={preview} alt={`Preview ${index + 1}`} />
                  {index === 0 && <span className={styles.primaryBadge}>Primary</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.checkboxes}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <span>Featured Product</span>
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
            />
            <span>Available for Sale</span>
          </label>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
