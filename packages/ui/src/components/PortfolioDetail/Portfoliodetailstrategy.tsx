
'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
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

const blockContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, 
    },
  },
}

const elementVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 65,
      damping: 15,
      duration: 0.6,
    },
  },
}

export function PortfolioDetailStrategyUI({
  quote, badge, quoteImage, mainImage, smallImages, title, descriptions,
  quoteImageAlt, smallImagesAlt,
  contactLabel,
  onContactClick,
}: PortfolioDetailStrategyProps) {

  const handleScrollToContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <motion.div 
          className={styles.quoteSection}
          variants={blockContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }} 
        >
          <motion.div className={styles.quoteText} variants={elementVariants}>
            <div className={styles.quoteInner}>
              <span className={styles.quoteMark}>"</span>
              {typeof quote === "string" ? (
                <div className={styles.quoteLight} dangerouslySetInnerHTML={{ __html: quote }} />
              ) : (
                <div className={styles.quoteLight}>{quote}</div>
              )}
            </div>
          </motion.div>
          
          <motion.div className={styles.quoteImgWrap} variants={elementVariants}>
            <img src={quoteImage} alt={quoteImageAlt || ""} className={styles.quoteImg} />
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.contentSection}
          variants={blockContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }} 
        >
          <motion.div className={styles.mainImgWrap} variants={elementVariants}>
            <img src={mainImage} alt={smallImagesAlt || ""} className={styles.mainImg} />
          </motion.div>
          
          <div className={styles.smallStack}>
            <motion.div className={styles.smallImgWrap} variants={elementVariants}>
              <img src={smallImages[0]} alt={smallImagesAlt || ""} className={styles.smallImg} />
            </motion.div>
            <motion.div className={`${styles.smallImgWrap} ${styles.offset}`} variants={elementVariants}>
              <img src={smallImages[1]} alt={smallImagesAlt || ""} className={styles.smallImg} />
            </motion.div>
          </div>
                   <div className={styles.textCol} data-badge={badge}>
            {badge && <motion.span variants={elementVariants} className={styles.badge}>{badge}</motion.span>}
            <motion.div
              variants={elementVariants}
              className={styles.textTitle}
              dangerouslySetInnerHTML={{ __html: title }}
            />        
            {descriptions.map((desc, i) =>
              typeof desc === "string" ? (
                <motion.div key={i} variants={elementVariants} className={styles.textBody} dangerouslySetInnerHTML={{ __html: desc }} />
              ) : (
                <motion.div key={i} variants={elementVariants} className={styles.textBody}>{desc}</motion.div>
              )
            )}
            {contactLabel && (
              <motion.button
                variants={elementVariants}
                className={styles.contactBtn}
                onClick={handleScrollToContact}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {contactLabel}
              </motion.button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}