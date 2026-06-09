"use client";

import React from "react";
import styles from "../../styles/About/abouthero.module.css";

export interface AboutHeroUIProps {
    heroImage: string;
    heroImageAlt?: string;
    badge: string;
    title: string;
    paragraphs: string[];
}

export function AboutHeroUI({
    heroImage,
    heroImageAlt = "",
    badge,
    title,
    paragraphs,
}: AboutHeroUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Böyük şəkil */}
                <div className={styles.heroWrap}>
                    <img
                        src={heroImage}
                        alt={heroImageAlt}
                        className={styles.heroImg}
                    />
                </div>

                {/* Aşağı — 2 sütun */}
                <div className={styles.content}>
                    <div className={styles.left}>
                        <span className={styles.badge}>{badge}</span>
                        <h1 className={styles.title}>{title}</h1>
                    </div>
                    <div className={styles.right}>
                        {paragraphs.map((p, i) => (
                            <div
                                key={i}
                                className={styles.paragraph}
                                dangerouslySetInnerHTML={{ __html: p }}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}