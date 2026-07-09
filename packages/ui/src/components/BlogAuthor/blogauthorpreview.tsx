"use client";

import styles from "../../styles/BlogAuthor/blogauthorpreview.module.css";

export interface BlogAuthorDetail {
    name: string;
    avatar: string;
    href?: string;
}

export interface BlogDetailPreviewUIProps {
    href?: string;
    sectionTitle: string;
    image: string;
    imageAlt?: string;
    overlayBadge: string;
    overlayTitle: string;
    badge: string;
    title: string;
    description: string;
    author: BlogAuthorDetail;
    date: string;
}

export function BlogDetailPreviewUI({
    href,
    sectionTitle,
    image,
    imageAlt = "",
    overlayBadge,
    overlayTitle,
    badge,
    title,
    description,
    author,
    date,
}: BlogDetailPreviewUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
                </div>
                <div className={styles.card}>

                    <a href={href} className={styles.imageWrap}>
                        <img
                            src={image}
                            alt={imageAlt}
                            className={styles.image}
                        />
                    </a>

                    <div className={styles.content}>
                        <span className={styles.badge}>{badge}</span>
                        <a href={href}>
                            <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                            <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
                        </a>
                        <div className={styles.meta}>
                            <a
                                href={author.href}
                                className={styles.authorLink}
                                onClick={(e) => e.stopPropagation()}
                                style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
                            >
                                <img
                                    src={author.avatar}
                                    alt={author.name}
                                    className={styles.avatar}
                                />
                                <div className={styles.authorInfo}>
                                    <span className={styles.authorName}>{author.name}</span>
                                    <span className={styles.date}>{date}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}