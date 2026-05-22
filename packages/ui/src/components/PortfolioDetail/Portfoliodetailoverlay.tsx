"use client";

import styles from "../../styles/PortfolioDetail/portfoliodetailoverlay.module.css";

export interface PortfolioDetailOverlayUIProps {
    image: string;
    imageAlt?: string;
    badge: string;
    title: string;
    descriptions: (string | React.ReactNode)[];
}

export function PortfolioDetailOverlayUI({
    image,
    imageAlt = "",
    badge,
    title,
    descriptions,
}: PortfolioDetailOverlayUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.container}>
                    <img src={image} alt={imageAlt} className={styles.heroImg} />
                    <div className={styles.content}>
                        <div className={styles.contentTop}>
                            <span className={styles.badge}>{badge}</span>
<div
  className={styles.title}
  dangerouslySetInnerHTML={{ __html: title }}
/>                        </div>
                        <div className={styles.contentBottom}>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}