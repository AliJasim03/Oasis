'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import styles from './LanguageSwitcher.module.scss'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={locale === 'en' ? styles.active : ''}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
      <span className={styles.separator}>|</span>
      <button
        className={locale === 'ar' ? styles.active : ''}
        onClick={() => setLocale('ar')}
      >
        عربي
      </button>
    </div>
  )
}
