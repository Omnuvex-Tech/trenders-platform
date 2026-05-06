"use client";

import React from "react";
import styles from "../../styles/ServiceDetail/servicedetailquote.module.css";

export interface ServiceDetailQuoteUIProps {
    number: string;
    badge: string;
    title: string;
    descriptions: string[];
    quoteImage: string;
    quoteImageAlt?: string;
    quoteText: React.ReactNode;
}

export function ServiceDetailQuoteUI({
    number,
    badge,
    title,
    descriptions,
    quoteImage,
    quoteImageAlt = "",
    quoteText,
}: ServiceDetailQuoteUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Yuxarı hissə — 01 kimi */}
                <div className={styles.row}>
                    <span className={styles.number}>{number}</span>
                    <div className={styles.content}>
                        <span className={styles.badge}>{badge}</span>
                        <h2 className={styles.title}>{title}</h2>
                        {descriptions.map((desc, i) => (
                            <p key={i} className={styles.desc}>{desc}</p>
                        ))}
                    </div>
                </div>

                {/* Aşağı hissə — şəkil + mətn overlap */}
                <div className={styles.quoteBlock}>
                    {/* Sol şəkil */}
                    <div className={styles.imgWrap}>
                        <img
                            src={quoteImage}
                            alt={quoteImageAlt}
                            className={styles.img}
                        />
                    </div>

                    {/* Sağ mətn — şəkilin üzərinə çıxır */}
                    <div className={styles.quoteTextWrap}>
                        <p className={styles.quoteText}>{quoteText}</p>
                        <span className={styles.quoteMark}>"</span>
                    </div>
                </div>

            </div>
        </section>
    );
}