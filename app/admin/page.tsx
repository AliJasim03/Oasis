'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/supabase/auth'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const session = await getSession()
        if (session) {
          // User is logged in, redirect to dashboard
          router.replace('/admin/dashboard')
        } else {
          // User is not logged in, redirect to login
          router.replace('/admin/login')
        }
      } catch (error) {
        // Error checking session, redirect to login
        router.replace('/admin/login')
      }
    }

    checkAuthAndRedirect()
  }, [router])

  // Show loading while checking authentication
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '18px',
          color: '#001F3F',
          fontWeight: '500'
        }}>
          Loading...
        </div>
      </div>
    </div>
  )
}
