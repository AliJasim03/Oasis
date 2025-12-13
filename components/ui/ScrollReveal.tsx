'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import styles from './ScrollReveal.module.scss'

interface ScrollRevealProps {
  children: React.ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate'
  delay?: number
  className?: string
}

export function ScrollReveal({
  children,
  animation = 'fadeIn',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`${styles.scrollReveal} ${isVisible ? styles.visible : ''} ${
        styles[animation]
      } ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
