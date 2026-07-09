

'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import styles from '../../styles/PortfolioDetail/portfolioDetailService.module.css'

export interface PortfolioDetailServiceItem {
  number: string
  title: string
  imagesAlt?: string
  images: string[]
}

export interface PortfolioDetailServiceProps {
  badge: string
  title: string
  bigNumber: string
  descriptions: (string | React.ReactNode)[]
  items: PortfolioDetailServiceItem[]
}

const rowContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, 
    },
  },
}

const childItemVariants: Variants = {
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

export function PortfolioDetailServiceUI({
  badge, title, bigNumber, descriptions, items,
}: PortfolioDetailServiceProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
                <motion.div 
          className={styles.top}
          variants={rowContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.span variants={childItemVariants} className={styles.bigNumber}>
            {bigNumber}
          </motion.span>
          <div className={styles.topContent}>
            <motion.span variants={childItemVariants} className={styles.badge}>
              {badge}
            </motion.span>
            <motion.div
              variants={childItemVariants}
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <motion.div variants={childItemVariants} className={styles.descriptions}>
              {descriptions.map((desc, i) =>
                typeof desc === "string" ? (
                  <div
                    key={i}
                    className={styles.desc}
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                ) : (
                  <div key={i} className={styles.desc}>{desc}</div>
                )
              )}
            </motion.div>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {items[0] && (
            <motion.div 
              className={styles.row}
              variants={rowContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }} 
            >
              <motion.div className={styles.imgWrap} variants={childItemVariants}>
                <img src={items[0].images[0]} alt={items[0].imagesAlt || ""} className={styles.img} />
              </motion.div>
              
              <motion.div className={styles.numberBlock} variants={childItemVariants}>
                <span className={styles.number}>{items[0].number}</span>
                <p className={styles.itemTitle}>{items[0].title}</p>
              </motion.div>
              
              <motion.div className={styles.imgWrap} variants={childItemVariants}>
                <img src={items[0].images[1]} alt={items[0].imagesAlt || ""} className={styles.img} />
              </motion.div>
              
              <motion.div className={styles.imgWrap} variants={childItemVariants}>
                <img src={items[0].images[2]} alt={items[0].imagesAlt || ""} className={styles.img} />
              </motion.div>
            </motion.div>
          )}

          {items[1] && (
            <motion.div 
              className={styles.row}
              variants={rowContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }} 
            >
              <div className={styles.empty} />
              
              <motion.div className={styles.imgWrap} variants={childItemVariants}>
                <img src={items[1].images[0]} alt={items[1].imagesAlt || ""} className={styles.img} />
              </motion.div>
              
              <motion.div className={styles.numberBlock} variants={childItemVariants}>
                <span className={styles.number}>{items[1].number}</span>
                <p className={styles.itemTitle}>{items[1].title}</p>
              </motion.div>
              
              <motion.div className={styles.imgWrap} variants={childItemVariants}>
                <img src={items[1].images[1]} alt={items[1].imagesAlt || ""} className={styles.img} />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}