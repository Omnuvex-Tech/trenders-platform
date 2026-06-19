"use client";

import styles from "../../styles/ServiceDetail/servicedetailhero.module.css";
import React from "react";

export interface ServiceDetailStat {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

export interface ServiceDetailHeroUIProps {
    heroImage: string;
    badge: string;
    title: string;
    descriptions: string[];
    stats: ServiceDetailStat[];
    quoteText: string;
    bottomImage: string;
    bottomImageAlt?: string;
}

export function ServiceDetailHeroUI({
    heroImage,
    badge,
    title,
    descriptions,
    stats,
    quoteText,
    bottomImage,
    bottomImageAlt = "",
}: ServiceDetailHeroUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {/* Hero şəkil */}
                <div className={styles.heroWrap}>
                    <img src={heroImage} alt={title} className={styles.heroImg} />
                </div>

                {/* Overlay — şəkildən başlayır, aşağıya davam edir */}
                <div className={styles.overlayWrap}>
                    <div className={styles.overlay}>
                        <span className={styles.badge}>{badge}</span>
                        <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                        {descriptions.map((d, i) => (
                            <div key={i} className={styles.desc} dangerouslySetInnerHTML={{ __html: d }} />
                        ))}                     
                    </div>
                </div>

                {/* Quote */}
                <div className={styles.quoteWrap}>
                    <span className={styles.quoteIcon}>"</span>
                    <div className={styles.quoteText} dangerouslySetInnerHTML={{ __html: quoteText as string }} />  </div>

                {/* Bottom şəkil */}
                <div className={styles.bottomWrap}>
                    <img src={bottomImage} alt={bottomImageAlt} className={styles.bottomImg} />
                </div>
            </div>
        </section>
    );
}