'use client'

import styles from './CarpetPattern.module.scss'

interface CarpetPatternProps {
  type?: 'border' | 'corner' | 'divider' | 'background'
  position?: 'top' | 'bottom' | 'left' | 'right'
  opacity?: number
}

export function CarpetPattern({ type = 'border', position = 'top', opacity = 0.1 }: CarpetPatternProps) {
  return (
    <div className={`${styles.carpetPattern} ${styles[type]} ${styles[position]}`} style={{ opacity }}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.patternSvg}
      >
        <defs>
          {/* Persian Medallion Pattern */}
          <pattern id="persianMedallion" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <path d="M50,25 L55,40 L70,35 L60,50 L70,65 L55,60 L50,75 L45,60 L30,65 L40,50 L30,35 L45,40 Z"
                  fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          </pattern>

          {/* Geometric Border Pattern */}
          <pattern id="geometricBorder" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect x="5" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <rect x="10" y="10" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <line x1="20" y1="5" x2="20" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
            <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          </pattern>

          {/* Floral Motif */}
          <pattern id="floralMotif" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="5" fill="currentColor" opacity="0.3"/>
            <ellipse cx="30" cy="15" rx="4" ry="8" fill="currentColor" opacity="0.2"/>
            <ellipse cx="30" cy="45" rx="4" ry="8" fill="currentColor" opacity="0.2"/>
            <ellipse cx="15" cy="30" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
            <ellipse cx="45" cy="30" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
          </pattern>

          {/* Weave Pattern */}
          <pattern id="weavePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0,10 L10,0 M10,20 L20,10" stroke="currentColor" strokeWidth="1.5" opacity="0.2"/>
            <path d="M0,10 L10,20 M10,0 L20,10" stroke="currentColor" strokeWidth="1.5" opacity="0.2"/>
          </pattern>
        </defs>

        {type === 'border' && (
          <rect width="100%" height="100%" fill={`url(#geometricBorder)`} />
        )}

        {type === 'corner' && (
          <>
            <rect width="100%" height="100%" fill={`url(#persianMedallion)`} />
            <rect width="100%" height="100%" fill={`url(#floralMotif)`} />
          </>
        )}

        {type === 'divider' && (
          <rect width="100%" height="100%" fill={`url(#geometricBorder)`} />
        )}

        {type === 'background' && (
          <rect width="100%" height="100%" fill={`url(#weavePattern)`} />
        )}
      </svg>
    </div>
  )
}
