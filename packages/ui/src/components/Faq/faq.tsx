"use client";

import { useState } from "react";
import styles from "../../styles/Faq/faq.module.css";
import { motion, Variants, AnimatePresence } from "framer-motion";

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

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const
            }
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.accordion}
                    variants={containerVariants}
                    initial="hidden"      
                    whileInView="visible"  
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {items.map((item, index) => {
                        const isOpen = openId === item.id;
                        const num = String(index + 1).padStart(2, "0");
                        return (
                            <motion.div
                                key={item.id}
                                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                                variants={itemVariants}
                            >
                                <button
                                    className={styles.header}
                                    onClick={() => toggle(item.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span className={styles.number}>{num}</span>
                                    <span className={styles.question}>{item.question}</span>
                                    <motion.span
                                        className={`${styles.iconBtn} ${isOpen ? styles.iconBtnOpen : ""}`}
                                        animate={{ rotate: isOpen ? 135 : 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            className={`${styles.body} ${styles.bodyOpen}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                                transition: {
                                                    height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                                                    opacity: { duration: 0.3, delay: 0.1 }
                                                }
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                                transition: {
                                                    height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                                                    opacity: { duration: 0.2 }
                                                }
                                            }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <div className={styles.answer} dangerouslySetInnerHTML={{ __html: item.answer }} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div className={styles.divider} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}