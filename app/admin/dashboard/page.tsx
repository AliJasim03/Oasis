'use client'

import { useEffect, useState } from 'react'
import { getProducts, getInquiries } from '@/lib/supabase/queries'
import styles from './dashboard.module.scss'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    newInquiries: 0,
    totalInquiries: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [products, inquiries] = await Promise.all([
        getProducts(),
        getInquiries(),
      ])

      setStats({
        totalProducts: products?.length || 0,
        featuredProducts: products?.filter((p: any) => p.featured).length || 0,
        newInquiries: inquiries?.filter((i: any) => i.status === 'new').length || 0,
        totalInquiries: inquiries?.length || 0,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className={styles.loading}>Loading dashboard...</div>
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p className={styles.subtitle}>Welcome to the admin panel</p>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <div className={styles.statValue}>{stats.totalProducts}</div>
        </div>

        <div className={styles.statCard}>
          <h3>Featured Products</h3>
          <div className={styles.statValue}>{stats.featuredProducts}</div>
        </div>

        <div className={styles.statCard}>
          <h3>New Inquiries</h3>
          <div className={styles.statValue}>{stats.newInquiries}</div>
        </div>

        <div className={styles.statCard}>
          <h3>Total Inquiries</h3>
          <div className={styles.statValue}>{stats.totalInquiries}</div>
        </div>
      </div>

      <div className={styles.quickLinks}>
        <h2>Quick Links</h2>
        <div className={styles.linksGrid}>
          <a href="/admin/products" className={styles.linkCard}>
            <h3>Manage Products</h3>
            <p>Add, edit, or remove products from your catalog</p>
          </a>
          <a href="/admin/inquiries" className={styles.linkCard}>
            <h3>View Inquiries</h3>
            <p>Respond to customer inquiries and messages</p>
          </a>
        </div>
      </div>
    </div>
  )
}
