'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import styles from './Footer.module.scss'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>{t.home.title}</h3>
            <p>{t.footer.description}</p>
          </div>

          <div className={styles.footerSection}>
            <h4>{t.footer.quickLinks}</h4>
            <ul>
              <li><Link href="/">{t.nav.home}</Link></li>
              <li><Link href="/products">{t.nav.products}</Link></li>
              <li><Link href="/about">{t.nav.about}</Link></li>
              <li><Link href="/contact">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>{t.footer.categories}</h4>
            <ul>
              <li><Link href="/products?category=Persian">{t.products.filters.categories.persian}</Link></li>
              <li><Link href="/products?category=Afghan">{t.products.filters.categories.afghan}</Link></li>
              <li><Link href="/products?category=Indian">{t.products.filters.categories.indian}</Link></li>
              <li><Link href="/products?category=Regional">{t.products.filters.categories.regional}</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>{t.footer.contactUs}</h4>
            <ul>
              <li>{t.contact.info.locationValue}</li>
              <li>{t.contact.info.phone}: {t.contact.info.phoneValue}</li>
              <li>{t.contact.info.email}: {t.contact.info.emailValue}</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} {t.home.title}. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
