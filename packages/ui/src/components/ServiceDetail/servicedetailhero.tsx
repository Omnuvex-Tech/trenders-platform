"use client";

import styles from "../../styles/ServiceDetail/servicedetailhero.module.css";
import React from "react";
import { motion, Variants } from "framer-motion";

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
    quoteText: string;
    bottomImage: string;
    bottomImageAlt?: string;
}

const smoothEase = [0.25, 1, 0.2, 1] as const;

const heroImageVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 15 
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { 
            duration: 0.85, 
            ease: smoothEase 
        },
    },
};

const revealVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 40 
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { 
            duration: 1.2, 
            ease: smoothEase 
        },
    },
};

const contentVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 25 
    },
    visible: (customDelay: number) => ({
        opacity: 1,
        y: 0,
        transition: { 
            duration: 0.9, 
            ease: smoothEase,
            delay: customDelay
        },
    }),
};

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
    
    const statsStartDelay = 0.25 + descriptions.length * 0.1;

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.heroWrap}
                    variants={heroImageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0 }}
                    style={{ willChange: "transform, opacity" }}
                >
                    <img src={heroImage} alt={title} className={styles.heroImg} />
                </motion.div>
                <motion.div
                    className={styles.overlayWrap}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    <div className={styles.overlay}>
                        <motion.span
                          className={styles.badge}
                          variants={contentVariants}
                          custom={0.05}
                          style={{ display: "inline-block", willChange: "transform, opacity" }}
                        >
                            {badge}
                        </motion.span>
                        <motion.div
                            className={styles.title}
                            variants={contentVariants}
                            custom={0.15}
                            style={{ willChange: "transform, opacity" }}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                        {descriptions.map((d, i) => (
                            <motion.div
                                key={i}
                                className={styles.desc}
                                variants={contentVariants}
                                custom={0.25 + i * 0.1}
                                style={{ willChange: "transform, opacity" }}
                                dangerouslySetInnerHTML={{ __html: d }}
                            />
                        ))}
                        {stats && stats.length > 0 && (
                            <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
                                {stats.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={contentVariants}
                                        custom={statsStartDelay + idx * 0.08}
                                        style={{ willChange: "transform, opacity" }}
                                    >
                                        <div>{stat.icon}</div>
                                        <strong>{stat.value}</strong>
                                        <div>{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
                <motion.div
                    className={styles.quoteWrap}
                    variants={revealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    style={{ willChange: "transform, opacity" }}
                >
                    <span className={styles.quoteIcon}>"</span>
                    <div className={styles.quoteText} dangerouslySetInnerHTML={{ __html: quoteText }} />
                </motion.div>
                <motion.div
                    className={styles.bottomWrap}
                    variants={revealVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    style={{ willChange: "transform, opacity" }}
                >
                    <img src={bottomImage} alt={bottomImageAlt} className={styles.bottomImg} />
                </motion.div>
            </div>
        </section>
    );
}