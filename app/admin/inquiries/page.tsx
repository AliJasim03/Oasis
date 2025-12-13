'use client'

import { useEffect, useState } from 'react'
import { getInquiries, updateInquiryStatus } from '@/lib/supabase/queries'
import { Button } from '@/components/ui/Button'
import type { Inquiry } from '@/lib/supabase/types'
import styles from './inquiries.module.scss'

type InquiryWithProduct = Inquiry & {
  products?: {
    name_en: string
  }
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryWithProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all')

  useEffect(() => {
    loadInquiries()
  }, [])

  const loadInquiries = async () => {
    try {
      const data = await getInquiries()
      setInquiries(data as InquiryWithProduct[])
    } catch (error) {
      console.error('Error loading inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: 'new' | 'contacted' | 'resolved') => {
    try {
      await updateInquiryStatus(id, status)
      setInquiries(inquiries.map(inq =>
        inq.id === id ? { ...inq, status } : inq
      ))
    } catch (error) {
      console.error('Error updating inquiry:', error)
      alert('Failed to update inquiry status')
    }
  }

  const filteredInquiries = filter === 'all'
    ? inquiries
    : inquiries.filter(inq => inq.status === filter)

  if (loading) {
    return <div className={styles.loading}>Loading inquiries...</div>
  }

  return (
    <div className={styles.inquiriesPage}>
      <h1>Customer Inquiries</h1>

      <div className={styles.filters}>
        <button
          className={filter === 'all' ? styles.active : ''}
          onClick={() => setFilter('all')}
        >
          All ({inquiries.length})
        </button>
        <button
          className={filter === 'new' ? styles.active : ''}
          onClick={() => setFilter('new')}
        >
          New ({inquiries.filter(i => i.status === 'new').length})
        </button>
        <button
          className={filter === 'contacted' ? styles.active : ''}
          onClick={() => setFilter('contacted')}
        >
          Contacted ({inquiries.filter(i => i.status === 'contacted').length})
        </button>
        <button
          className={filter === 'resolved' ? styles.active : ''}
          onClick={() => setFilter('resolved')}
        >
          Resolved ({inquiries.filter(i => i.status === 'resolved').length})
        </button>
      </div>

      <div className={styles.inquiriesList}>
        {filteredInquiries.map((inquiry) => (
          <div key={inquiry.id} className={styles.inquiryCard}>
            <div className={styles.inquiryHeader}>
              <div>
                <h3>{inquiry.customer_name}</h3>
                <p className={styles.meta}>
                  {new Date(inquiry.created_at).toLocaleDateString()} at{' '}
                  {new Date(inquiry.created_at).toLocaleTimeString()}
                </p>
              </div>
              <span className={`${styles.statusBadge} ${styles[inquiry.status]}`}>
                {inquiry.status}
              </span>
            </div>

            <div className={styles.inquiryBody}>
              <div className={styles.contactInfo}>
                <p><strong>Email:</strong> {inquiry.email}</p>
                <p><strong>Phone:</strong> {inquiry.phone}</p>
                {inquiry.products && (
                  <p><strong>Product:</strong> {inquiry.products.name_en}</p>
                )}
              </div>

              <div className={styles.message}>
                <strong>Message:</strong>
                <p>{inquiry.message}</p>
              </div>

              <div className={styles.actions}>
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusChange(
                    inquiry.id,
                    e.target.value as 'new' | 'contacted' | 'resolved'
                  )}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                </select>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => window.open(`mailto:${inquiry.email}`, '_blank')}
                >
                  Email Customer
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => window.open(`tel:${inquiry.phone}`, '_blank')}
                >
                  Call Customer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <div className={styles.noInquiries}>
          <p>No inquiries found.</p>
        </div>
      )}
    </div>
  )
}
