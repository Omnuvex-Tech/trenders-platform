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
    quoteText: React.ReactNode;
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
                        <h1 className={styles.title}>{title}</h1>
                        {descriptions.map((d, i) => (
                            <p key={i} className={styles.desc}>{d}</p>
                        ))}
                          <div className={styles.heroStatsWrap}>
                                        <div className={styles.heroStatsRow}>
                                            <div className={styles.heroStatCards}>
                                                {stats.map((stat, i) => (
                                                    <div key={i} className={styles.heroStatCard}>
                                                        <div className={styles.heroStatIcon}>{stat.icon}</div>
                                                        <div>
                                                            <p className={styles.heroStatLabel}>{stat.label}</p>
                                                            <p className={styles.heroStatValue}>{stat.value}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                          
                                        </div>
                                    </div>
                    </div>
                </div>

                {/* Quote */}
                <div className={styles.quoteWrap}>
                    <span className={styles.quoteIcon}>"</span>
                    <p className={styles.quoteText}>{quoteText}</p>
                </div>

                {/* Bottom şəkil */}
                <div className={styles.bottomWrap}>
                    <img src={bottomImage} alt={bottomImageAlt} className={styles.bottomImg} />
                </div>
            </div>
        </section>
    );
}