"use client";

import React from "react";
import styles from "../../styles/ServiceDetail/servicedetailcontent.module.css";

export interface ServiceDetailContentItem {
    number: string;
    badge: string;
    title: string;
    descriptions: string[];
    quote: React.ReactNode;
    quoteImage: string
    subText?: React.ReactNode;
    image?: string;
    imageAlt?: string;
}

export interface ServiceDetailContentUIProps {
    items: ServiceDetailContentItem[];
}

export function ServiceDetailContentUI({ items }: ServiceDetailContentUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {items.map((item, i) => (
                    <div key={i} className={styles.block}>
                        {/* Rəqəm + məzmun */}
                        <div className={styles.row}>
                            <span className={styles.number}>{item.number}</span>
                            <div className={styles.content}>
                                <span className={styles.badge}>{item.badge}</span>
                                <h2 className={styles.title}>{item.title}</h2>
                                {item.descriptions.map((desc, j) => (
                                    <p key={j} className={styles.desc}>{desc}</p>
                                ))}
                            </div>
                        </div>

                        {/* Quote */}
                        {item.quote && (
                            <div className={styles.quoteSection}>
                                <div className={styles.quoteText}>
                                    <div className={styles.quoteInner}>
                                        <span className={styles.quoteMark}>"</span>
                                        <span className={styles.quoteLight}>{item.quote}</span>
                                    </div>
                                </div>
                                <div className={styles.quoteImgWrap}>
                                    <img src={item.quoteImage} alt="Quote side" className={styles.quoteImg} />
                                </div>
                            </div>
                        )}

                        {/* Kiçik mətn */}
                        {item.subText && (
                            <p className={styles.subText}>{item.subText}</p>
                        )}

                        {/* Şəkil */}
                        {item.image && (
                            <div className={styles.imageWrap}>
                                <img
                                    src={item.image}
                                    alt={item.imageAlt || ""}
                                    className={styles.image}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}