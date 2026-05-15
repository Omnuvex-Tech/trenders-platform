'use client'

import styles from '../../styles/PortfolioDetail/portfoliodetailstrategy.module.css'

export interface PortfolioDetailStrategyProps {
  quote:  React.ReactNode;
  quoteImage: string 
  badge?: string
  mainImage: string
  smallImages: [string, string]
  title: string
  descriptions: [string, string]
}

export function PortfolioDetailStrategyUI({
  quote,
  badge,
  quoteImage,
  mainImage,
  smallImages,
  title,
  descriptions,
}: PortfolioDetailStrategyProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── Section 1: Quote + Image ── */}
        <div className={styles.quoteSection}>
        <div className={styles.quoteText}>
  <div className={styles.quoteInner}>
    <span className={styles.quoteMark}>"</span>
    <span className={styles.quoteLight}>{quote}</span>
  </div>
</div>
          <div className={styles.quoteImgWrap}>
            <img src={quoteImage} alt="Quote side" className={styles.quoteImg} />
          </div>
        </div>

      
   {/* ── Section 2: Big image | Stacked small images | Text ── */}
        <div className={styles.contentSection}>

          {/* Col 1 — böyük şəkil */}
          <div className={styles.mainImgWrap}>
            <img src={mainImage} alt="Strategy main" className={styles.mainImg} />
          </div>

          {/* Col 2 — iki kiçik şəkil alt-alta */}
          <div className={styles.smallStack}>
            <div className={styles.smallImgWrap}>
              <img src={smallImages[0]} alt="" className={styles.smallImg} />
            </div>
            <div className={`${styles.smallImgWrap} ${styles.offset}`}>
              <img src={smallImages[1]} alt="" className={styles.smallImg} />
            </div>
          </div>

          {/* Col 3 — mətn */}
         <div className={styles.textCol}>
  {badge && <span className={styles.badge}>{badge}</span>}
  <h3 className={styles.textTitle}>{title}</h3>
  <p className={styles.textBody}>{descriptions[0]}</p>
  <p className={styles.textBody}>{descriptions[1]}</p>
</div>

        </div>
      </div>
    </section>
  )
}







