"use client";

import { useState } from "react";
import styles from "../../styles/Faq/faq.module.css";

export interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

export interface FaqUIProps {
    items: FaqItem[];
}

export function FaqUI({ items }: FaqUIProps) {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggle = (id: number) => {
        setOpenId(prev => prev === id ? null : id);
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.accordion}>
                    {items.map((item, index) => {
                        const isOpen = openId === item.id;
                        const num = String(index + 1).padStart(2, "0");

                        return (
                            <div key={item.id} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
                                <button
                                    className={styles.header}
                                    onClick={() => toggle(item.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span className={styles.number}>{num}</span>
                                    <span className={styles.question}>{item.question}</span>
                                  <span className={`${styles.iconBtn} ${isOpen ? styles.iconBtnOpen : ""}`}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
</span>
                                </button>

                                <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ""}`}>
                                    <p className={styles.answer}>{item.answer}</p>
                                </div>

                                <div className={styles.divider} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}