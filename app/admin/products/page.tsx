'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProducts, deleteProduct } from '@/lib/supabase/queries'
import { formatPrice } from '@/lib/utils/helpers'
import { Button } from '@/components/ui/Button'
import { ProductFormModal } from '@/components/admin/ProductFormModal'
import type { Product, ProductImage } from '@/lib/supabase/types'
import styles from './products.module.scss'

type ProductWithImages = Product & { product_images: ProductImage[] }

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductWithImages[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getProducts({ limit: 100 })
      setProducts(data as ProductWithImages[])
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return
    }

    try {
      await deleteProduct(id)
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleModalSuccess = () => {
    loadProducts()
  }

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>
  }

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <h1>Products</h1>
        <Button onClick={handleAddProduct}>Add New Product</Button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>SKU</th>
              <th>Featured</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name_en}</td>
                <td>{product.category}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.sku}</td>
                <td>
                  <span className={product.featured ? styles.badgeYes : styles.badgeNo}>
                    {product.featured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <span className={product.available ? styles.badgeYes : styles.badgeNo}>
                    {product.available ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className={styles.actions}>
                  <Button size="sm" variant="secondary" onClick={() => handleEditProduct(product)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(product.id, product.name_en)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className={styles.noProducts}>
          <p>No products found.</p>
          <Button onClick={handleAddProduct}>Add Your First Product</Button>
        </div>
      )}

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        product={editingProduct}
      />
    </div>
  )
}
