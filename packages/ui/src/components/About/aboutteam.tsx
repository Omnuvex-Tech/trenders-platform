"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/About/aboutteam.module.css";

export interface AboutTeamMember {
    id: number;
    image: string;
    imageAlt?: string;
    name: string;
    role: string;
    href?: string;
}

export interface AboutTeamUIProps {
    title: React.ReactNode;
    description: string;
    ctaLabel?: string;
    ctaHref?: string;
    members: AboutTeamMember[];
}

export function AboutTeamUI({
    title,
    description,
    ctaLabel = "Keçid edin →",
    ctaHref = "#",
    members,
}: AboutTeamUIProps) {

    const titleContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const titleWordVariants: Variants = {
        hidden: { y: "100%" },
        visible: {
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    const leftContentVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }
        }
    };

    const trackVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    const descriptionContainerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.035, delayChildren: 0.1 }
        }
    };

    const descriptionWordVariants: Variants = {
        hidden: { opacity: 0, y: 8 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
        }
    };
    function stripHtml(html: string) {
        return html.replace(/<[^>]*>/g, "");
    }

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    {typeof title === "string" ? (
                        <motion.div
                            className={styles.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    ) : (
                        <motion.h2
                            className={styles.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {title}
                        </motion.h2>
                    )}

                    <motion.div
                        variants={leftContentVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div
                            className={styles.description}
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                        <a href={ctaHref} className={styles.ctaBtn} dangerouslySetInnerHTML={{ __html: ctaLabel }} />
                    </motion.div>
                </div>
                <motion.div
                    className={styles.grid}
                    variants={trackVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {members.map((member) => (
                        <motion.a
                            key={member.id}
                            href={member.href || "#"}
                            className={styles.card}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                zIndex: 10,
                                transition: { duration: 0.25, ease: "easeOut" }
                            }}
                        >
                            <img
                                src={member.image}
                                alt={member.imageAlt || stripHtml(member.name)}
                                className={styles.cardImg}
                            />
                            <span
                                className={styles.plusBtn}
                                aria-hidden="true"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                    <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </span>
                            <div className={styles.cardInfo}>
                                <div className={styles.memberName} dangerouslySetInnerHTML={{ __html: member.name }} />
                                <div className={styles.memberRole} dangerouslySetInnerHTML={{ __html: member.role }} />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}