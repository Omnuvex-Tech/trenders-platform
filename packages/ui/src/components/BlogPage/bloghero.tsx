"use client";

import React from "react";
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
                <div className={styles.header}>
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
                </div>

                <div className={styles.grid}>
                    <a href={featuredPost.href || "#"} className={styles.featuredWrap}>
                       <img
    src={featuredPost.image}
    alt={featuredPost.imageAlt || featuredPost.title}
    className={`${styles.featuredImg} ${featuredPost.gif ? styles.imageStatic : ""}`}
/>
{featuredPost.gif && (
    <img
        src={featuredPost.gif}
        alt=""
        className={`${styles.featuredImg} ${styles.imageGif}`}
    />
)}
                        <div className={styles.featuredOverlay}>
                            <span className={styles.featuredBadge}>{featuredPost.badge}</span>
                            <div className={styles.featuredTitle} dangerouslySetInnerHTML={{ __html: featuredPost.title }} />
                        </div>
                    </a>

                    <div className={styles.sideList}>
                        {sidePosts.map((post) => (
                            <a key={post.id} href={post.href || "#"} className={styles.sidePost}>
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
                            </a>
                        ))}
                    </div>
                </div>

                {quote && (
                    <div className={styles.quoteSection}>
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
                    </div>
                )}
            </div>
        </section>
    );
}