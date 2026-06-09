"use client";

import styles from "../../styles/BlogDetail/blogdetailcontent.module.css";

export interface BlogDetailSection {
    title: string;
    paragraphs: string[];
}

export interface BlogDetailContentUIProps {
    heroImage: string;
    heroImageAlt?: string;
    overlapTitle: string;
    introParagraphs: string[];
    sections: BlogDetailSection[];
    bottomImages: {
        left: string;
        leftAlt?: string;
        right: string;
        rightAlt?: string;
    };
}

export function BlogDetailContentUI({
    heroImage,
    heroImageAlt = "",
    overlapTitle,
    introParagraphs,
    sections,
    bottomImages,
}: BlogDetailContentUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                <div className={styles.heroWrap}>
                    <img
                        src={heroImage}
                        alt={heroImageAlt}
                        className={styles.heroImg}
                    />
                </div>

                <div className={styles.overlapBlock}>
                    <div className={styles.overlapTitle} dangerouslySetInnerHTML={{ __html: overlapTitle }} />
                </div>

                <div className={styles.introBlock}>
                    {introParagraphs.map((p, i) => (
                        <div key={i} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                </div>

                <div className={styles.sections}>
                    {sections.map((section, i) => (
                        <div key={i} className={styles.sectionBlock}>
                            <div className={styles.sectionTitle} dangerouslySetInnerHTML={{ __html: section.title }} />
                            <div className={styles.sectionParagraphs}>
                                {section.paragraphs.map((p, j) => (
                                    <div key={j} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: p }} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.bottomImages}>
                    <img
                        src={bottomImages.left}
                        alt={bottomImages.leftAlt || ""}
                        className={styles.bottomImgLeft}
                    />
                    <img
                        src={bottomImages.right}
                        alt={bottomImages.rightAlt || ""}
                        className={styles.bottomImgRight}
                    />
                </div>

            </div>
        </section>
    );
}