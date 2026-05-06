"use client";

import styles from "../../styles/PortfolioDetail/portfolioDetailHero.module.css";

export interface PortfolioDetailHeroUIProps {
    heroImage: string;
    heroImageAlt?: string;
    number: string;
    title: string;
    description: React.ReactNode;
    galleryImages: {
        src: string;
        alt?: string;
    }[];
}

export function PortfolioDetailHeroUI({
    heroImage,
    heroImageAlt = "",
    number,
    title,
    description,
    galleryImages,
}: PortfolioDetailHeroUIProps) {
    return (
        <section className={styles.section}>
            {/* Böyük hero şəkil */}
            <div className={styles.heroImageWrap}>
                <img
                    src={heroImage}
                    alt={heroImageAlt}
                    className={styles.heroImage}
                />
            </div>

            {/* Başlıq bloku */}
            <div className={styles.inner}>
                <div className={styles.titleBlock}>
                    <span className={styles.number}>{number}</span>
                    <div className={styles.titleContent}>
                        <h1 className={styles.title}>{title}</h1>
                        <p className={styles.description}>{description}</p>
                    </div>
                </div>

                {/* Qalereya */}
                <div className={styles.gallery}>
                    {galleryImages.slice(0, 2).length > 0 && (
                        <div className={styles.galleryTop}>
                            {galleryImages.slice(0, 2).map((img, i) => (
                                <div key={i} className={styles.galleryTopItem}>
                                    <img
                                        src={img.src}
                                        alt={img.alt || ""}
                                        className={styles.galleryImg}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    {galleryImages[2] && (
                        <div className={styles.galleryBottom}>
                            <img
                                src={galleryImages[2].src}
                                alt={galleryImages[2].alt || ""}
                                className={styles.galleryImg}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}