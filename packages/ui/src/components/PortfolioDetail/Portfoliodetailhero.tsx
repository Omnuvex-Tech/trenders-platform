"use client";

import styles from "../../styles/PortfolioDetail/portfolioDetailHero.module.css";
export interface PortfolioDetailHeroUIProps {
    heroImage: string;
    heroImageAlt?: string;
    number: string;
    imagesAlt?: string;
    title: string;
    description: React.ReactNode | string;
    galleryImages: { src: string; alt?: string; }[];
}

export function PortfolioDetailHeroUI({
    heroImage, heroImageAlt = "", number, title, description, galleryImages, imagesAlt = "",
}: PortfolioDetailHeroUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.heroImageWrap}>
                <img src={heroImage} alt={heroImageAlt} className={styles.heroImage} />
            </div>
            <div className={styles.inner}>
                <div className={styles.titleBlock}>
                    <span className={styles.number}>{number}</span>
                    <div className={styles.titleContent}>
                        <div
                            className={styles.title}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />                        {typeof description === "string" ? (
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        ) : (
                            <div className={styles.description}>{description}</div>
                        )}
                    </div>
                </div>
                {/* <div className={styles.gallery}>
                    {galleryImages.slice(0, 2).length > 0 && (
                        <div className={styles.galleryTop}>
                            {galleryImages.slice(0, 2).map((img, i) => (
                                <div key={i} className={styles.galleryTopItem}>
                                    <img src={img.src} alt={img.alt || ""} className={styles.galleryImg} />
                                </div>
                            ))}
                        </div>
                    )}
                    {galleryImages[2] && (
                        <div className={styles.galleryBottom}>
                            <img src={galleryImages[2].src} alt={imagesAlt || galleryImages[2].alt || ""} className={styles.galleryImg} />                        </div>
                    )}
                </div> */}


                <div className={styles.gallery}>
  {galleryImages.slice(0, 2).length > 0 && (
    <div className={styles.galleryTop}>
      {galleryImages.slice(0, 2).map((img, i) => (
        <div key={i} className={styles.galleryTopItem}>
          <img src={img.src} alt={imagesAlt || img.alt || ""} className={styles.galleryImg} />
        </div>
      ))}
    </div>
  )}
  {galleryImages[2] && (
    <div className={styles.galleryBottom}>
      <img src={galleryImages[2].src} alt={imagesAlt || galleryImages[2].alt || ""} className={styles.galleryImg} />
    </div>
  )}
</div>
            </div>
        </section>
    );
}