
"use client";

import styles from "../../styles/Team/team.module.css";
import { motion, Variants } from "framer-motion";
import Link from "next/link"; // KRİTİK ƏLAVƏ

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    imageAlt?: string;
    href?: string;
}

export interface TeamUIProps {
    title: string;
    members: TeamMember[];
    featuredImage: string;
    goHref?: string;
}

export function TeamUI({ title, members, featuredImage, goHref = "/team" }: TeamUIProps) {
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

    const words = title.split(" ");

    return (
        <section className={styles.section}>
            <div className={styles.teamDivider}></div>
            <div className={styles.inner}>

                <div className={styles.left}>
                    <motion.h2
                        className={styles.title}
                        variants={titleContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
                    >
                        {words.map((word, index) => (
                            <span key={index} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                                <motion.span variants={titleWordVariants} style={{ display: "inline-block" }}>
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </motion.h2>
                    
                    <motion.div
                        variants={leftContentVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        style={{ width: "100%" }}
                    >
                        <Link href={goHref} className={styles.goBtn}>
                            Keçid edin
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>

                        <div className={styles.featuredWrap}>
                            <img src={featuredImage} alt="team" className={styles.featuredImg} />
                            <div className={styles.featuredOverlay} />
                        </div>
                    </motion.div>
                </div>

                <div className={styles.cards} style={{ paddingTop: "12px", marginTop: "-12px" }}>
                    <motion.div
                        className={styles.cardsTrack}
                        variants={trackVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        style={{ display: "flex" }}
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
                                <img src={member.image} alt={member.imageAlt || member.name} className={styles.memberImg} />
                                
                                <Link
                                    href={member.href || "#"}
                                    className={styles.plusBtn}
                                    aria-label={`${member.name} haqqında ətraflı`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </Link>
                                <div className={styles.memberInfo}>
                                    <p className={styles.memberName}>{member.name}</p>
                                    <p className={styles.memberRole}>{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}