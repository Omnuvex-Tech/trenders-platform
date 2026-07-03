"use client";

import Link from "next/link";
import styles from "../../styles/BlogPage/blogpostpreview.module.css";

export interface BlogDetailAuthor {
    name: string;
    avatar: string;
    href?: string;
}

export interface BlogDetailHeroUIProps {
    href?: string;
    image: string;
    gif?: string;
    imageAlt?: string;
    overlayBadge: string;
    overlayTitle: string;
    badge: string;
    title: string;
    description: string;
    author: BlogDetailAuthor;
    date: string;
}

export function BlogDetailHeroUI({
    href = "#",
    image,
    imageAlt = "",
    overlayBadge,
    overlayTitle,
    badge,
    title,
    gif,
    description,
    author,
    date,
}: BlogDetailHeroUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.card}>

                    <Link href={href} className={styles.imageWrap}>
                        <img src={image} alt={imageAlt} className={`${styles.image} ${gif ? styles.imageStatic : ""}`} />
                        {gif && (
                            gif.toLowerCase().endsWith('.mp4') ? (
                                <video
                                    src={gif}
                                    className={`${styles.image} ${styles.imageGif}`} autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={gif}
                                    alt=""
                                    className={`${styles.image} ${styles.imageGif}`} />
                            )
                        )}
                    </Link>

                    <div className={styles.content}>
                        <span className={styles.badge}>{badge}</span>
                        <Link href={href} className={styles.titleLink}>
                            <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                        </Link>
                        <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
                        <div className={styles.meta} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {author.href ? (
                                <Link href={author.href} className={styles.authorLink} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <img src={author.avatar} alt={author.name} className={styles.avatar} />
                                    <div className={styles.authorInfo}>
                                        <span className={styles.authorName}>{author.name}</span>
                                        <span className={styles.date}>{date}</span>
                                    </div>
                                </Link>
                            ) : (
                                <>
                                    <img src={author.avatar} alt={author.name} className={styles.avatar} />
                                    <div className={styles.authorInfo}>
                                        <span className={styles.authorName}>{author.name}</span>
                                        <span className={styles.date}>{date}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}