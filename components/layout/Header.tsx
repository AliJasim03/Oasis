'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import styles from './Header.module.scss'

export function Header() {
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <h1>{t.home.title}</h1>
          </Link>

          <div className={styles.navContainer}>
            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>{t.nav.home}</Link>
              <Link href="/products" onClick={() => setIsMenuOpen(false)}>{t.nav.products}</Link>
              <Link href="/products/category" onClick={() => setIsMenuOpen(false)}>{t.nav.categories}</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</Link>
            </nav>

            <LanguageSwitcher />
          </div>

          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
