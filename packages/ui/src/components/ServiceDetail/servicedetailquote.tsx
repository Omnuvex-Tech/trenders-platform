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
    quoteText: string;
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
                <div className={styles.row}>
                    <span className={styles.number}>{number}</span>
                    <div className={styles.content}>
                        <span className={styles.badge}>{badge}</span>
                        <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                        {descriptions.map((desc, i) => (
                            <div key={i} className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />
                        ))}
                    </div>
                </div>

                <div className={styles.quoteBlock}>
                    <div className={styles.imgWrap}>
                        <img
                            src={quoteImage}
                            alt={quoteImageAlt}
                            className={styles.img}
                        />
                    </div>

                    <div className={styles.quoteTextWrap}>
                        <div className={styles.quoteText} dangerouslySetInnerHTML={{ __html: quoteText as string }} />                        <span className={styles.quoteMark}>"</span>
                    </div>
                </div>

            </div>
        </section>
    );
}