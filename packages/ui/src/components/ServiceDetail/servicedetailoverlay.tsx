"use client";

import styles from "../../styles/ServiceDetail/servicedetailoverlay.module.css";

export interface ServiceDetailOverlayUIProps {
    image: string;
    imageAlt?: string;
    badge: string;
    title: string;
    descriptions: string[];
}

export function ServiceDetailOverlayUI({
    image,
    imageAlt = "",
    badge,
    title,
    descriptions,
}: ServiceDetailOverlayUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.container}>
                    <img
                        src={image}
                        alt={imageAlt}
                        className={styles.heroImg}
                    />
                    <div className={styles.content}>
                        <div className={styles.contentTop}>
                            <span className={styles.badge}>{badge}</span>
                            <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />                        </div>
                        <div className={styles.contentBottom}>
                            {descriptions.map((desc, i) => (
                                <div key={i} className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}