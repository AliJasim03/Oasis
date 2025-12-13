'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CarpetPattern } from '@/components/ui/CarpetPattern'
import styles from './about.module.scss'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="container py-3xl">
      <div className={styles.pageWrapper}>
        <CarpetPattern type="corner" position="top" opacity={0.08} />
        <CarpetPattern type="corner" position="bottom" opacity={0.08} />

        <ScrollReveal animation="fadeIn">
          <h1 className="text-center">{t.about.title}</h1>
        </ScrollReveal>

        <div className={styles.content}>
          <ScrollReveal animation="slideUp" delay={0.1}>
            <section className={styles.section}>
              <p>{t.about.intro}</p>
            </section>
          </ScrollReveal>

          <CarpetPattern type="divider" position="top" opacity={0.15} />

          <ScrollReveal animation="slideRight" delay={0.2}>
            <section className={styles.section}>
              <h2>{t.about.legacy.title}</h2>
              <p>{t.about.legacy.content}</p>
            </section>
          </ScrollReveal>

          <ScrollReveal animation="slideLeft" delay={0.3}>
            <section className={styles.section}>
              <h2>{t.about.collection.title}</h2>
              <p>{t.about.collection.intro}</p>
              <ul className={styles.list}>
                <li>
                  <strong>{t.about.collection.persian.title}:</strong> {t.about.collection.persian.description}
                </li>
                <li>
                  <strong>{t.about.collection.afghan.title}:</strong> {t.about.collection.afghan.description}
                </li>
                <li>
                  <strong>{t.about.collection.indian.title}:</strong> {t.about.collection.indian.description}
                </li>
                <li>
                  <strong>{t.about.collection.regional.title}:</strong> {t.about.collection.regional.description}
                </li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal animation="scale" delay={0.4}>
            <section className={styles.section}>
              <h2>{t.about.craftsmanship.title}</h2>
              <p>{t.about.craftsmanship.intro}</p>
              <ul className={styles.list}>
                <li>{t.about.craftsmanship.materials.wool}</li>
                <li>{t.about.craftsmanship.materials.silk}</li>
                <li>{t.about.craftsmanship.materials.dyes}</li>
                <li>{t.about.craftsmanship.materials.threads}</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal animation="slideRight" delay={0.5}>
            <section className={styles.section}>
              <h2>{t.about.commitment.title}</h2>
              <p>{t.about.commitment.intro}</p>
              <ul className={styles.list}>
                <li>{t.about.commitment.items.quality}</li>
                <li>{t.about.commitment.items.guidance}</li>
                <li>{t.about.commitment.items.support}</li>
                <li>{t.about.commitment.items.service}</li>
                <li>{t.about.commitment.items.preservation}</li>
              </ul>
            </section>
          </ScrollReveal>

          <CarpetPattern type="divider" position="bottom" opacity={0.15} />

          <ScrollReveal animation="slideUp" delay={0.6}>
            <section className={styles.section}>
              <h2>{t.about.visit.title}</h2>
              <p>{t.about.visit.content}</p>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
