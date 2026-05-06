"use client";

import styles from "../../styles/BlogPage/bloghero.module.css";

export interface BlogItem {
    id: number;
    image: string;
    imageAlt?: string;
    badge: string;
    title: string;
    description: string;
    date: string;
    href?: string;
}

export interface BlogSectionQuote {
    text: React.ReactNode;
    backgroundImage: string;
    backgroundImageAlt?: string;
}

export interface BlogSectionUIProps {
    title: string;
    portfolioHref?: string;
    featuredPost: BlogItem;
    sidePosts: [BlogItem, BlogItem, BlogItem];
    quote: BlogSectionQuote;
}

export function BlogSectionUI({
    title,
    portfolioHref = "#",
    featuredPost,
    sidePosts,
    quote,
}: BlogSectionUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <a href={portfolioHref} className={styles.portfolioLink}>
                        PORTFOLIO
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </a>
                </div>

                {/* Blog Grid */}
                <div className={styles.grid}>

                    {/* Sol: Featured Post */}
                    <a href={featuredPost.href || "#"} className={styles.featuredWrap}>
                        <img
                            src={featuredPost.image}
                            alt={featuredPost.imageAlt || featuredPost.title}
                            className={styles.featuredImg}
                        />
                        <div className={styles.featuredOverlay}>
                            <span className={styles.featuredBadge}>{featuredPost.badge}</span>
                            <h3 className={styles.featuredTitle}>{featuredPost.title}</h3>
                            <p className={styles.featuredDesc}>{featuredPost.description}</p>
                        </div>
                    </a>

                    {/* Sağ: 3 Side Posts */}
                    <div className={styles.sideList}>
                        {sidePosts.map((post) => (
                            <a key={post.id} href={post.href || "#"} className={styles.sidePost}>
                                <img
                                    src={post.image}
                                    alt={post.imageAlt || post.title}
                                    className={styles.sideImg}
                                />
                                <div className={styles.sideContent}>
                                    <h3 className={styles.sideTitle}>{post.title}</h3>
                                    <p className={styles.sideDesc}>{post.description}</p>
                                    <span className={styles.sideDate}>{post.date}</span>
                                </div>
                            </a>
                        ))}
                    </div>

                </div>

                {/* Quote */}
                <div className={styles.quoteSection}>
                    <img
                        src={quote.backgroundImage}
                        alt={quote.backgroundImageAlt || ""}
                        className={styles.quoteImg}
                    />
                    <div className={styles.quoteContent}>
                        <span className={styles.quoteIcon}>"</span>
                        <p className={styles.quoteText}>{quote.text}</p>
                    </div>
                </div>

            </div>
        </section>
    );
}