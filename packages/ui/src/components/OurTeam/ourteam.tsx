"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import styles from "../../styles/OurTeam/ourteam.module.css";
import portfolioStyles from "../../styles/Portfolio/portfolio.module.css";

const SCROLL_STATE_KEY = "ourteam-scroll-state";

export interface OurTeamMember {
    id: number;
    image: string;
    imageAlt?: string;
    name: string;
    role: string;
    href?: string;
}

export interface OurTeamUIProps {
    title: string;
    descriptionHtml: string;
    members: OurTeamMember[];
    moreButtonText: string;
}

const descriptionAnimation: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 20,
            delay: 0.1
        }
    }
};

const cardVariants: Variants = {
    hidden: () => ({
        opacity: 0,
        y: 35,
        scale: 0.96
    }),
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 16,
            delay: (index % 4) * 0.08,
            duration: 0.5
        }
    })
};

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, "");
}

export function OurTeamUI({ title, descriptionHtml, members, moreButtonText }: OurTeamUIProps) {
    const [visibleCount, setVisibleCount] = useState<number>(() => {
        if (typeof window === "undefined") return 8;
        try {
            const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
            const isBackForward = navEntries[0]?.type === "back_forward";
            if (!isBackForward) {
                sessionStorage.removeItem(SCROLL_STATE_KEY);
                return 8;
            }
            const saved = sessionStorage.getItem(SCROLL_STATE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as { visibleCount?: number; scrollY?: number };
                return parsed.visibleCount || 8;
            }
        } catch {}
        return 8;
    });
    const restoredScroll = useRef(false);

    const displayed = useMemo(() => {
        return members.slice(0, visibleCount);
    }, [members, visibleCount]);

    const handleShowMore = () => {
        setVisibleCount(prev => Math.min(prev + 4, members.length));
    };

    useEffect(() => {
        if (restoredScroll.current) return;
        restoredScroll.current = true;
        try {
            const saved = sessionStorage.getItem(SCROLL_STATE_KEY);
            if (saved) {
                const { scrollY } = JSON.parse(saved);
                if (scrollY) {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            window.scrollTo(0, scrollY);
                        });
                    });
                }
            }
        } catch {}
    }, [displayed.length]);

    const saveScrollState = () => {
        try {
            sessionStorage.setItem(SCROLL_STATE_KEY, JSON.stringify({
                visibleCount,
                scrollY: window.scrollY,
            }));
        } catch {}
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                <div className={styles.header}>
                    <motion.h1
                        className={styles.title}
                        dangerouslySetInnerHTML={{ __html: title }}
                        initial={{ opacity: 0, y: -15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    />

                    <motion.div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                        variants={descriptionAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    />
                </div>

                <div className={styles.grid}>
                    <AnimatePresence mode="popLayout">
                                          {displayed.map((member, index) => (
                            <motion.a
                                key={member.id}
                                href={member.href || "#"}
                                onClick={saveScrollState}
                                className={styles.card}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-5%" }}
                                layout
                                whileHover={{
                                    y: -6,
                                    zIndex: 10,
                                    transition: {
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 20,
                                        mass: 0.5
                                    }
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
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        style={{ display: "block", width: "14px", height: "14px" }}
                                    >
                                        <path
                                            d="M7 1V13M1 7H13"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>

                                <div className={styles.cardInfo}>
                                    <div className={styles.memberName} dangerouslySetInnerHTML={{ __html: member.name }} />
                                    <div className={styles.memberRole} dangerouslySetInnerHTML={{ __html: member.role }} />
                                </div>
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </div>
                {visibleCount < members.length && (
                    <motion.div
                        className={portfolioStyles.moreBtnWrapper}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <button
                            type="button"
                            onClick={handleShowMore}
                            className={portfolioStyles.projectsMoreBtn}
                        >
                            {moreButtonText}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}