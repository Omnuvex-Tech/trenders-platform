"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/BlogPage/bloghero.module.css";

export interface BlogItem {
    id: number;
    image: string;
    gif?: string;
    imageAlt?: string;
    badge: string;
    title: string;
    description: string;
    date: string;
    href?: string;
}

export interface BlogSectionQuote {
    text: string;
    image?: string;
    imageAlt?: string;
}

export interface BlogSectionUIProps {
    title: string;
    portfolioHref?: string;
    portfolioLabel?: string;
    portfolioNewTab?: boolean;
    featuredPost: BlogItem;
    sidePosts: BlogItem[];
    quote?: BlogSectionQuote | null;
}

const headerAnimation: Variants = {
    hidden: () => ({ opacity: 0, y: -15 }),
    visible: () => ({
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 20 }
    })
};

const postVariants: Variants = {
    hidden: () => ({
        opacity: 0,
        y: 30,
        scale: 0.98
    }),
    visible: (customIndex: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 18,
            delay: customIndex * 0.08,
            duration: 0.5
        }
    })
};

const quoteAnimation: Variants = {
    hidden: () => ({ opacity: 0, y: 25 }),
    visible: () => ({
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 20,
            delay: 0.2
        }
    })
};

const hoverVariant: Variants = {
    hover: {
        y: -6,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.5
        }
    }
};

export function BlogSectionUI({
    title,
    portfolioHref = "#",
    portfolioLabel = "PORTFOLIO",
    portfolioNewTab = false,
    featuredPost,
    sidePosts,
    quote,
}: BlogSectionUIProps) {

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <motion.div
                    className={styles.header}
                    variants={headerAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className={styles.title}>{title}</h2>
                    <a
                        href={portfolioHref}
                        className={styles.portfolioLink}
                        target={portfolioNewTab ? "_blank" : "_self"}
                        rel={portfolioNewTab ? "noopener noreferrer" : undefined}
                    >
                        {portfolioLabel}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </a>
                </motion.div>
                <div className={styles.grid}>
                    <motion.a
                        href={featuredPost.href || "#"}
                        className={styles.featuredWrap}
                        custom={0}
                        variants={postVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-5%" }}
                        whileHover="hover"
                        exit="hidden"
                    >
                        <motion.span variants={hoverVariant} style={{ display: "none" }} />

                        <img
                            src={featuredPost.image}
                            alt={featuredPost.imageAlt || featuredPost.title}
                            className={`${styles.featuredImg} ${featuredPost.gif ? styles.imageStatic : ""}`}
                        />

                        {featuredPost.gif && (
                            featuredPost.gif.toLowerCase().endsWith('.mp4') ? (
                                <video
                                    src={featuredPost.gif}
                                    className={`${styles.featuredImg} ${styles.imageGif}`} autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={featuredPost.gif}
                                    alt=""
                                    className={`${styles.featuredImg} ${styles.imageGif}`} />
                            )
                        )}
                        <div className={styles.featuredOverlay}>
                            <span className={styles.featuredBadge}>{featuredPost.badge}</span>
                            <div className={styles.featuredTitle} dangerouslySetInnerHTML={{ __html: featuredPost.title }} />
                        </div>
                    </motion.a>
                    <div className={styles.sideList}>
                        {sidePosts.map((post, index) => (
                            <motion.a
                                key={post.id}
                                href={post.href || "#"}
                                className={styles.sidePost}
                                custom={index + 1}
                                variants={postVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-5%" }}
                                style={{ display: "flex" }}
                                whileHover="hover"
                            >
                                <motion.span variants={hoverVariant} style={{ display: "none" }} />

                                <img
                                    src={post.image}
                                    alt={post.imageAlt || post.title}
                                    className={styles.sideImg}
                                />
                                <div className={styles.sideContent}>
                                    <div className={styles.sideTitle} dangerouslySetInnerHTML={{ __html: post.title }} />
                                    <div className={styles.sideDesc} dangerouslySetInnerHTML={{ __html: post.description }} />
                                    <span className={styles.sideDate}>{post.date}</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
                {quote && (
                    <motion.div
                        className={styles.quoteSection}
                        variants={quoteAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-5%" }}
                    >
                        {quote.image && (
                            <img
                                src={quote.image}
                                alt={quote.imageAlt || ""}
                                className={styles.quoteImg}
                            />
                        )}
                        <div className={styles.quoteContent}>
                            <span className={styles.quoteIcon}>"</span>
                            <div
                                className={styles.quoteText}
                                dangerouslySetInnerHTML={{ __html: quote.text }}
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}