"use client";

import React from "react";
import styles from "../../styles/About/abouthero.module.css";
export interface AboutHeroStat {
    icon?: string;
    label: string;
    value: string;
}

export interface AboutHeroUIProps {
    heroImage: string;
    heroImageAlt?: string;
    badge: string;
    title: string;
    paragraphs: string[];
    stats?: AboutHeroStat[];
}

export function AboutHeroUI({
    heroImage, heroImageAlt = "", badge, title, paragraphs, stats = [],
}: AboutHeroUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.heroWrap}>
                    <img src={heroImage} alt={heroImageAlt} className={styles.heroImg} />
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <span className={styles.badge}>{badge}</span>
                        <h1 className={styles.title}>{title}</h1>
                        {stats.length > 0 && (
                            <div className={styles.statsGrid}>
                                {stats.map((stat, i) => (
                                    <div key={i} className={styles.statItem}>
                                        <div className={styles.statTop}>
                                            {stat.icon && (
                                                stat.icon.startsWith("http") || stat.icon.startsWith("/")
                                                    ? <img src={stat.icon} alt="" className={styles.statIcon} />
                                                    : <span className={styles.statIcon}>{stat.icon}</span>
                                            )}
                                            <span className={styles.statLabel}>{stat.label}</span>
                                        </div>
                                        <span className={styles.statValue}>{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={styles.right}>
                        {paragraphs.map((p, i) => (
                            <div key={i} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: p }} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}