'use client'

import styles from '../../styles/PortfolioDetail/portfolioDetailService.module.css'

export interface PortfolioDetailServiceItem {
  number: string
  title: string
  images: string[]
}

export interface PortfolioDetailServiceProps {
    badge: string
    title: string
    bigNumber: string
    descriptions: string[]
    items: PortfolioDetailServiceItem[]
}

export function PortfolioDetailServiceUI({
    badge,
    title,
    bigNumber,
    descriptions,
    items,
}: PortfolioDetailServiceProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Yuxarı mətn hissəsi */}
                <div className={styles.top}>
                    <span className={styles.bigNumber}>{bigNumber}</span>
                    <div className={styles.topContent}>
                        <span className={styles.badge}>{badge}</span>
                        <h2 className={styles.title}>{title}</h2>
                        <div className={styles.descriptions}>
                            {descriptions.map((desc, i) => (
                                <p key={i} className={styles.desc}>{desc}</p>
                            ))}
                        </div>
                    </div>
                </div>
<div className={styles.grid}>
  {items[0] && (
    <div className={styles.row}>
      <div className={styles.imgWrap}>
        <img src={items[0].images[0]} alt="" className={styles.img} />
      </div>
      <div className={styles.numberBlock}>
        <span className={styles.number}>/{items[0].number}</span>
        <p className={styles.itemTitle}>{items[0].title}</p>
      </div>
      <div className={styles.imgWrap}>
        <img src={items[0].images[1]} alt="" className={styles.img} />
      </div>
      <div className={styles.imgWrap}>
        <img src={items[0].images[2]} alt="" className={styles.img} />
      </div>
    </div>
  )}

  {items[1] && (
    <div className={styles.row}>
      <div className={styles.empty} />
      <div className={styles.imgWrap}>
        <img src={items[1].images[0]} alt="" className={styles.img} />
      </div>
      <div className={styles.numberBlock}>
        <span className={styles.number}>/{items[1].number}</span>
        <p className={styles.itemTitle}>{items[1].title}</p>
      </div>
      <div className={styles.imgWrap}>
        <img src={items[1].images[1]} alt="" className={styles.img} />
      </div>
    </div>
  )}
</div>

            </div>
        </section>
    )
}