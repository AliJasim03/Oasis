'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from '../ui/WhatsAppButton'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Don't show Header, Footer, and WhatsAppButton on admin pages
  const isAdminPage = pathname?.startsWith('/admin')

  if (isAdminPage) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <WhatsAppButton floating />
    </>
  )
}
