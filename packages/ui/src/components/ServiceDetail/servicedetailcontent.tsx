"use client";

import React from "react";
import styles from "../../styles/ServiceDetail/servicedetailcontent.module.css";

export interface ServiceDetailContentItem {
    number: string;
    badge: string;
    title: string;
    descriptions: string[];
    quote: string;
    quoteImage: string;
    subText?: string;
    image?: string;
    imageAlt?: string;
    contactLabel?: string;
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
                        <div className={styles.row}>
                            <span className={styles.number}>{item.number}</span>
                            <div className={styles.content}>
                                <span className={styles.badge}>{item.badge}</span>
                                <div className={styles.title} dangerouslySetInnerHTML={{ __html: item.title }} />
                                {item.descriptions.map((desc, j) => (
                                    <div key={j} className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />
                                ))}
                                {item.contactLabel && (
                                    <button
                                        className={styles.contactBtn}
                                        onClick={() => {
                                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                    >
                                        {item.contactLabel}
                                    </button>
                                )}
                            </div>
                        </div>

                        {item.quote && (
                            <div className={styles.quoteSection}>
                                <div className={styles.quoteText}>
                                    <div className={styles.quoteInner}>
                                        <span className={styles.quoteMark}>"</span>
                                        <div className={styles.quoteLight} dangerouslySetInnerHTML={{ __html: item.quote ?? '' }} />
                                    </div>
                                </div>
                                <div className={styles.quoteImgWrap}>
                                    <img src={item.quoteImage} alt="Quote side" className={styles.quoteImg} />
                                </div>
                            </div>
                        )}

                        {item.subText && (
                            <div className={styles.subText} dangerouslySetInnerHTML={{ __html: item.subText as string }} />
                        )}

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