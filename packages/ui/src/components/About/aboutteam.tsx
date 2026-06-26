// "use client";

// import styles from "../../styles/About/aboutteam.module.css";

// export interface AboutTeamMember {
//     id: number;
//     image: string;
//     imageAlt?: string;
//     name: string;
//     role: string;
//     href?: string;
// }

// export interface AboutTeamUIProps {
//     title: React.ReactNode;
//     description: string;
//     ctaLabel?: string;
//     ctaHref?: string;
//     members: AboutTeamMember[];
// }

// export function AboutTeamUI({
//     title,
//     description,
//     ctaLabel = "Keçid edin →",
//     ctaHref = "#",
//     members,
// }: AboutTeamUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 <div className={styles.left}>
//                     <h2 className={styles.title}>{title}</h2>
//                     <p className={styles.description}>{description}</p>
//                     <a href={ctaHref} className={styles.ctaBtn}>{ctaLabel}</a>
//                 </div>
//                 <div className={styles.grid}>
//                     {members.map((member) => (
//                         <div key={member.id} className={styles.card}>
//                             <img
//                                 src={member.image}
//                                 alt={member.imageAlt || member.name}
//                                 className={styles.cardImg}
//                             />
//                             <a href={member.href || "#"} className={styles.plusBtn} aria-label={`${member.name} haqqında ətraflı`}>
//                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                                     <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
//                                     <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
//                                 </svg>
//                             </a>
//                             <div className={styles.cardInfo}>
//                                 <span className={styles.memberName}>{member.name}</span>
//                                 <span className={styles.memberRole}>{member.role}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }


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

    // Team-dəki eyni variant-lar (TOXUNULMAYIB)
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

    // ---- YENİ: description üçün söz-söz stagger ----
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

    const descriptionWords = description.split(" ");
    // -------------------------------------------------

    // title string-dirsə söz-söz animasiya et, deyilsə (ReactNode) sadə fade-up (TOXUNULMAYIB)
    const words = typeof title === "string" ? title.split(" ") : null;

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    {words ? (
                        <motion.h2
                            className={styles.title}
                            variants={titleContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
                        >
                            {words.map((word, index) => (
                                <span
                                    key={index}
                                    style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
                                >
                                    <motion.span variants={titleWordVariants} style={{ display: "inline-block" }}>
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.h2>
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
                        <motion.p
                            className={styles.description}
                            variants={descriptionContainerVariants}
                            style={{ flexWrap: "wrap" }}
                        >
                            {descriptionWords.map((word, index) => (
                                <motion.span
                                    key={index}
                                    variants={descriptionWordVariants}
                                    style={{ display: "inline-block" }}
                                >
                                    {word}{index < descriptionWords.length - 1 ? "\u00A0" : ""}
                                </motion.span>
                            ))}
                        </motion.p>
                        <a href={ctaHref} className={styles.ctaBtn}>
                            {ctaLabel}
                        </a>
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
                        <motion.div
                            key={member.id}
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
                                alt={member.imageAlt || member.name}
                                className={styles.cardImg}
                            />
                            <a
                                href={member.href || "#"}
                                className={styles.plusBtn}
                                aria-label={`${member.name} haqqında ətraflı`}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                    <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </a>
                            <div className={styles.cardInfo}>
                                <span className={styles.memberName}>{member.name}</span>
                                <span className={styles.memberRole}>{member.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}