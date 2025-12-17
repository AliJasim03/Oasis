'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { WHATSAPP_NUMBER, PHONE_NUMBER, EMAIL, LOCATION } from '@/lib/constants'
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
            <div className={styles.socialLinks}>
              <h4>{t.footer.followUs}</h4>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.instagram.com/oasis_carpet"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.tiktok.com/@oasiscarpet?_r=1&_t=ZS-92HDTRpj2S9"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>{t.footer.quickLinks}</h4>
            <ul>
              <li><Link href="/">{t.nav.home}</Link></li>
              <li><Link href="/products">{t.nav.products}</Link></li>
              <li><Link href="/products/category">{t.footer.categories}</Link></li>
              <li><Link href="/about">{t.nav.about}</Link></li>
              <li><Link href="/contact">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>{t.footer.categories}</h4>
            <ul>
              <li><Link href="/products/category/persian">{t.products.filters.categories.persian}</Link></li>
              <li><Link href="/products/category/afghan">{t.products.filters.categories.afghan}</Link></li>
              <li><Link href="/products/category/indian">{t.products.filters.categories.indian}</Link></li>
              <li><Link href="/products/category/regional">{t.products.filters.categories.regional}</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>{t.footer.contactUs}</h4>
            <ul>
              <li>{t.contact.info.location}: {LOCATION}</li>
              <li>{t.contact.info.phone}: {PHONE_NUMBER}</li>
              <li>{t.contact.info.email}: {EMAIL}</li>
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
