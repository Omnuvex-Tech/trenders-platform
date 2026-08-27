"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/About/aboutquote.module.css";

export interface AboutQuoteUIProps {
    image: string;
    imageAlt?: string;
    title: string;
    description: string;
    authorName: string;
    authorRole: string;
    authorHref?: string;
}

export function AboutQuoteUI({
    image,
    imageAlt,
    title,
    description,
    authorName,
    authorRole,
    authorHref = "#",
}: AboutQuoteUIProps) {

    function stripHtml(html: string) {
        return html.replace(/<[^>]*>/g, "");
    }

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <motion.a
                    href={authorHref}
                    className={styles.imageCard}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                >
                    <img
                        src={image}
                        alt={imageAlt || stripHtml(authorName)}
                        className={styles.image}
                    />
                    <span className={styles.plusBtn} aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </span>
                </motion.a>

                <motion.div
                    className={styles.box}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                >
                    <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
                    <div className={styles.authorBlock}>
                        <div className={styles.authorName} dangerouslySetInnerHTML={{ __html: authorName }} />
                        <div className={styles.authorRole} dangerouslySetInnerHTML={{ __html: authorRole }} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}