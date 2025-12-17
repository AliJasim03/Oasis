'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CarpetPattern } from '@/components/ui/CarpetPattern'
import { GiCottonFlower, GiSewingString } from 'react-icons/gi'
import { FaAward, FaHandHoldingHeart } from 'react-icons/fa'
import { MdOutlineWorkspacePremium } from 'react-icons/md'
import styles from './home.module.scss'

export default function Home() {
  const { t } = useLanguage()

  return (
    <main>
      <section className={styles.hero}>
        <CarpetPattern type="background" opacity={0.05} />
        <CarpetPattern type="border" position="top" opacity={0.12} />
        <CarpetPattern type="border" position="bottom" opacity={0.12} />

        <div className="container">
          <div className={styles.heroContent}>
            <h1>{t.home.title}</h1>
            <p>{t.home.subtitle}</p>
            <p>{t.home.description}</p>
            <div className="mt-xl">
              <a href="/products" className={`btn btn-primary btn-lg ${styles.ctaButton}`}>
                {t.home.cta}
              </a>
            </div>

            <div className={styles.features}>
              <ScrollReveal animation="scale" delay={0.2}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <GiSewingString className={styles.iconSvg} />
                  </div>
                  <h3 className={styles.featureTitle}>{t.home.features.craftsmanship.title}</h3>
                  <p className={styles.featureDescription}>
                    {t.home.features.craftsmanship.description}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="scale" delay={0.3}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <MdOutlineWorkspacePremium className={styles.iconSvg} />
                  </div>
                  <h3 className={styles.featureTitle}>{t.home.features.quality.title}</h3>
                  <p className={styles.featureDescription}>
                    {t.home.features.quality.description}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="scale" delay={0.4}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <FaAward className={styles.iconSvg} />
                  </div>
                  <h3 className={styles.featureTitle}>{t.home.features.heritage.title}</h3>
                  <p className={styles.featureDescription}>
                    {t.home.features.heritage.description}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal animation="slideUp">
        <section className={styles.craftSection}>
          <div className="container">
            <CarpetPattern type="corner" position="top" opacity={0.1} />
            <h2 className={styles.craftTitle}>{t.home.craft.title}</h2>
            <div className={styles.weavingProcess}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <h3>{t.home.craft.steps.design.title}</h3>
                <p>{t.home.craft.steps.design.description}</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <h3>{t.home.craft.steps.knotting.title}</h3>
                <p>{t.home.craft.steps.knotting.description}</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <h3>{t.home.craft.steps.dyeing.title}</h3>
                <p>{t.home.craft.steps.dyeing.description}</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>4</div>
                <h3>{t.home.craft.steps.finishing.title}</h3>
                <p>{t.home.craft.steps.finishing.description}</p>
              </div>
            </div>
            <CarpetPattern type="corner" position="bottom" opacity={0.1} />
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
