'use client'

import React from 'react'
import styles from '../../styles/PortfolioDetail/portfoliodetailstrategy.module.css'
export interface PortfolioDetailStrategyProps {
  quote: string | React.ReactNode;
  quoteImage: string;
  badge?: string;
  mainImage: string;
  smallImages: [string, string];
  title: string;
  descriptions: (string | React.ReactNode)[];
  quoteImageAlt?: string;
  smallImagesAlt?: string;
  contactLabel?: string;
  onContactClick?: () => void;
}

export function PortfolioDetailStrategyUI({
  quote, badge, quoteImage, mainImage, smallImages, title, descriptions,
  quoteImageAlt, smallImagesAlt,
  contactLabel,
  onContactClick,
}: PortfolioDetailStrategyProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.quoteSection}>
          <div className={styles.quoteText}>
            <div className={styles.quoteInner}>
              <span className={styles.quoteMark}>"</span>
              {typeof quote === "string" ? (
                <div className={styles.quoteLight} dangerouslySetInnerHTML={{ __html: quote }} />
              ) : (
                <div className={styles.quoteLight}>{quote}</div>
              )}
            </div>
          </div>
          <div className={styles.quoteImgWrap}>
            <img src={quoteImage} alt={quoteImageAlt || ""} className={styles.quoteImg} />
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.mainImgWrap}>
            <img src={mainImage} alt={smallImagesAlt || ""} className={styles.mainImg} />
          </div>
          <div className={styles.smallStack}>
            <div className={styles.smallImgWrap}>
              <img src={smallImages[0]} alt={smallImagesAlt || ""} className={styles.smallImg} />
            </div>
            <div className={`${styles.smallImgWrap} ${styles.offset}`}>
              <img src={smallImages[1]} alt={smallImagesAlt || ""} className={styles.smallImg} />
            </div>
          </div>
          <div className={styles.textCol}>
            {badge && <span className={styles.badge}>{badge}</span>}
            <div
              className={styles.textTitle}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {descriptions.map((desc, i) =>
              typeof desc === "string" ? (
                <div key={i} className={styles.textBody} dangerouslySetInnerHTML={{ __html: desc }} />
              ) : (
                <div key={i} className={styles.textBody}>{desc}</div>
              )
            )}

            {/* ── Bizimlə əlaqə button ── */}
            <button
              className={styles.contactBtn}
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {contactLabel}
            </button>          </div>
        </div>

      </div>
    </section>
  );
}