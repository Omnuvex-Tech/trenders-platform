"use client";

import styles from "../../styles/BlogAuthor/blogauthorpreview.module.css";

export interface BlogAuthorDetail {
    name: string;
    avatar: string;
}

export interface BlogDetailPreviewUIProps {
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

                    {/* Sol: şəkil */}
                    <div className={styles.imageWrap}>
                        <img
                            src={image}
                            alt={imageAlt}
                            className={styles.image}
                        />
                        <div className={styles.imageOverlay}>
                            <span className={styles.overlayBadge}>{overlayBadge}</span>
                            <p className={styles.overlayTitle}>{overlayTitle}</p>
                        </div>
                    </div>

                    {/* Sağ: məzmun */}
                    <div className={styles.content}>
                        <span className={styles.badge}>{badge}</span>
                        <h1 className={styles.title}>{title}</h1>
                        <p className={styles.description}>{description}</p>
                        <div className={styles.meta}>
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className={styles.avatar}
                            />
                            <div className={styles.authorInfo}>
                                <span className={styles.authorName}>{author.name}</span>
                                <span className={styles.date}>{date}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}