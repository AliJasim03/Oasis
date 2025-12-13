'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { signOut, getSession } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/Button'
import styles from './admin-layout.module.scss'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession()
        if (session) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          if (pathname !== '/admin/login') {
            router.push('/admin/login')
          }
        }
      } catch (error) {
        setIsAuthenticated(false)
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        }
      }
    }

    checkAuth()
  }, [pathname, router])

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div>Loading...</div>
      </div>
    )
  }

  // Don't render admin layout if not authenticated
  if (!isAuthenticated) {
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/admin/dashboard"
            className={pathname === '/admin/dashboard' ? styles.active : ''}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className={pathname.startsWith('/admin/products') ? styles.active : ''}
          >
            Products
          </Link>
          <Link
            href="/admin/carpet-types"
            className={pathname.startsWith('/admin/carpet-types') ? styles.active : ''}
          >
            Carpet Types
          </Link>
          <Link
            href="/admin/inquiries"
            className={pathname === '/admin/inquiries' ? styles.active : ''}
          >
            Inquiries
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <Button variant="outline" onClick={handleSignOut} size="sm">
            Sign Out
          </Button>
          <Link href="/" className={styles.viewSite}>
            View Site
          </Link>
        </div>
      </aside>

      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  )
}
