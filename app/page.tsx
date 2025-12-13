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
                  <h3 className={styles.featureTitle}>Authentic Craftsmanship</h3>
                  <p className={styles.featureDescription}>
                    Each carpet is handwoven by skilled artisans using traditional techniques passed down through generations
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="scale" delay={0.3}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <MdOutlineWorkspacePremium className={styles.iconSvg} />
                  </div>
                  <h3 className={styles.featureTitle}>Premium Quality</h3>
                  <p className={styles.featureDescription}>
                    Finest materials including premium wool, pure silk, and natural dyes for lasting beauty
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="scale" delay={0.4}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <FaAward className={styles.iconSvg} />
                  </div>
                  <h3 className={styles.featureTitle}>30+ Years Heritage</h3>
                  <p className={styles.featureDescription}>
                    Trusted source for exquisite handmade carpets in Bahrain since 1994
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
            <h2 className={styles.craftTitle}>The Art of Carpet Weaving</h2>
            <div className={styles.weavingProcess}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <h3>Design & Pattern</h3>
                <p>Traditional motifs inspired by Persian, Afghan, and Indian heritage</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <h3>Hand Knotting</h3>
                <p>Each knot tied individually by master weavers using ancient techniques</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <h3>Natural Dyeing</h3>
                <p>Colors extracted from plants and minerals for rich, lasting hues</p>
              </div>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>4</div>
                <h3>Finishing Touch</h3>
                <p>Careful washing and trimming to reveal the carpet's true beauty</p>
              </div>
            </div>
            <CarpetPattern type="corner" position="bottom" opacity={0.1} />
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
