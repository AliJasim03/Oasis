'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CarpetPattern } from '@/components/ui/CarpetPattern'
import { Button } from '@/components/ui/Button'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { createInquiry } from '@/lib/supabase/queries'
import styles from './contact.module.scss'

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await createInquiry(formData)
      setSuccess(true)
      setFormData({
        customer_name: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (err) {
      setError(t.contact.form.error)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container py-3xl">
      <div className={styles.pageWrapper}>
        <CarpetPattern type="corner" position="top" opacity={0.08} />

        <ScrollReveal animation="fadeIn">
          <h1 className="text-center">{t.contact.title}</h1>
        </ScrollReveal>

        <ScrollReveal animation="slideUp" delay={0.1}>
          <p className={styles.subtitle}>
            {t.contact.subtitle}
          </p>
        </ScrollReveal>

        <div className={styles.contactContent}>
        <div className={styles.formSection}>
          <h2>{t.contact.form.title}</h2>

          {success && (
            <div className={styles.successMessage}>
              {t.contact.form.success}
            </div>
          )}

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customer_name">{t.contact.form.name} {t.contact.form.required}</label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t.contact.form.email} {t.contact.form.required}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t.contact.form.phone} {t.contact.form.required}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t.contact.form.message} {t.contact.form.required}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" disabled={loading} size="lg">
              {loading ? t.contact.form.sending : t.contact.form.submit}
            </Button>
          </form>
        </div>

        <div className={styles.infoSection}>
          <h2>{t.contact.info.title}</h2>

          <div className={styles.infoItem}>
            <h3>{t.contact.info.location}</h3>
            <p>{t.contact.info.locationValue}</p>
          </div>

          <div className={styles.infoItem}>
            <h3>{t.contact.info.phone}</h3>
            <p>{t.contact.info.phoneValue}</p>
          </div>

          <div className={styles.infoItem}>
            <h3>{t.contact.info.email}</h3>
            <p>{t.contact.info.emailValue}</p>
          </div>

          <div className={styles.infoItem}>
            <h3>{t.contact.info.hours}</h3>
            <p>{t.contact.info.hoursWeekdays}</p>
            <p>{t.contact.info.hoursFriday}</p>
          </div>

          <div className={styles.whatsappSection}>
            <h3>{t.contact.info.whatsappTitle}</h3>
            <p>{t.contact.info.whatsappText}</p>
            <WhatsAppButton message={t.contact.info.whatsappMessage} />
          </div>
        </div>
        </div>

        <CarpetPattern type="corner" position="bottom" opacity={0.08} />
      </div>
    </div>
  )
}
