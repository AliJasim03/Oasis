'use client'

import { useEffect, useState } from 'react'
import { getCarpetTypes, deleteCarpetType } from '@/lib/supabase/queries'
import { Button } from '@/components/ui/Button'
import { CarpetTypeFormModal } from '@/components/admin/CarpetTypeFormModal'
import type { CarpetType } from '@/lib/supabase/types'
import styles from './carpet-types.module.scss'

export default function AdminCarpetTypesPage() {
  const [carpetTypes, setCarpetTypes] = useState<CarpetType[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCarpetType, setEditingCarpetType] = useState<CarpetType | null>(null)
  const [filter, setFilter] = useState<'all' | 'Persian' | 'Afghan' | 'Indian' | 'Regional'>('all')

  useEffect(() => {
    loadCarpetTypes()
  }, [])

  const loadCarpetTypes = async () => {
    try {
      const data = await getCarpetTypes()
      setCarpetTypes(data || [])
    } catch (error) {
      console.error('Error loading carpet types:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      return
    }

    try {
      await deleteCarpetType(id)
      setCarpetTypes(carpetTypes.filter(ct => ct.id !== id))
    } catch (error) {
      console.error('Error deleting carpet type:', error)
      alert('Failed to delete carpet type. It may be in use by products.')
    }
  }

  const handleAddCarpetType = () => {
    setEditingCarpetType(null)
    setIsModalOpen(true)
  }

  const handleEditCarpetType = (carpetType: CarpetType) => {
    setEditingCarpetType(carpetType)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingCarpetType(null)
  }

  const handleModalSuccess = () => {
    loadCarpetTypes()
  }

  const filteredCarpetTypes = filter === 'all'
    ? carpetTypes
    : carpetTypes.filter(ct => ct.category === filter)

  if (loading) {
    return <div className={styles.loading}>Loading carpet types...</div>
  }

  return (
    <div className={styles.carpetTypesPage}>
      <div className={styles.header}>
        <h1>Carpet Types</h1>
        <Button onClick={handleAddCarpetType}>Add New Carpet Type</Button>
      </div>

      <div className={styles.filters}>
        <button
          className={filter === 'all' ? styles.active : ''}
          onClick={() => setFilter('all')}
        >
          All ({carpetTypes.length})
        </button>
        <button
          className={filter === 'Persian' ? styles.active : ''}
          onClick={() => setFilter('Persian')}
        >
          Persian ({carpetTypes.filter(ct => ct.category === 'Persian').length})
        </button>
        <button
          className={filter === 'Afghan' ? styles.active : ''}
          onClick={() => setFilter('Afghan')}
        >
          Afghan ({carpetTypes.filter(ct => ct.category === 'Afghan').length})
        </button>
        <button
          className={filter === 'Indian' ? styles.active : ''}
          onClick={() => setFilter('Indian')}
        >
          Indian ({carpetTypes.filter(ct => ct.category === 'Indian').length})
        </button>
        <button
          className={filter === 'Regional' ? styles.active : ''}
          onClick={() => setFilter('Regional')}
        >
          Regional ({carpetTypes.filter(ct => ct.category === 'Regional').length})
        </button>
      </div>

      <div className={styles.grid}>
        {filteredCarpetTypes.map((carpetType) => (
          <div key={carpetType.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3>{carpetType.name_en}</h3>
                <p className={styles.arabicName}>{carpetType.name_ar}</p>
              </div>
              <span className={styles.categoryBadge}>{carpetType.category}</span>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.descriptions}>
                <div>
                  <strong>Description (EN):</strong>
                  <p className={styles.description}>
                    {carpetType.description_en.substring(0, 150)}...
                  </p>
                </div>
                <div dir="rtl">
                  <strong>الوصف (عربي):</strong>
                  <p className={styles.description}>
                    {carpetType.description_ar.substring(0, 150)}...
                  </p>
                </div>
              </div>

              <div className={styles.meta}>
                <span><strong>Slug:</strong> {carpetType.slug}</span>
                <span><strong>Sort Order:</strong> {carpetType.sort_order}</span>
              </div>
            </div>

            <div className={styles.cardActions}>
              <Button size="sm" variant="secondary" onClick={() => handleEditCarpetType(carpetType)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(carpetType.id, carpetType.name_en)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredCarpetTypes.length === 0 && (
        <div className={styles.noCarpetTypes}>
          <p>No carpet types found.</p>
          <Button onClick={handleAddCarpetType}>Add Your First Carpet Type</Button>
        </div>
      )}

      <CarpetTypeFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        carpetType={editingCarpetType}
      />
    </div>
  )
}
