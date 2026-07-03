"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/BlogPage/bloggrid.module.css";

export interface BlogGridItem {
    id: number;
    image: string;
    gif?: string;
    imageAlt?: string;
    category: string;
    title: string;
    excerpt: string;
    authorImage: string;
    authorImageAlt?: string;
    authorName: string;
    authorHref?: string;
    date: string;
    href?: string;
}

export interface BlogGridUIProps {
    posts: BlogGridItem[];
    moreButtonText: string;
}
export function BlogGridUI({
    posts,
    moreButtonText,
}: BlogGridUIProps) {
    const [visibleCount, setVisibleCount] = useState(3);

    const handleShowMore = () => {
        setVisibleCount((prev) => Math.min(prev + 3, posts.length));
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.grid}>
                    {posts.slice(0, visibleCount).map((post) => (
                        <div key={post.id} className={styles.card}>
                            <Link href={post.href || "#"} className={styles.imageWrap}>
                                <img
                                    src={post.image}
                                    alt={post.imageAlt || post.title}
                                    className={`${styles.image} ${post.gif ? styles.imageStatic : ""}`}
                                />
                                {post.gif && (
                                    post.gif.toLowerCase().endsWith('.mp4') ? (
                                        <video
                                            src={post.gif}
                                            className={`${styles.image} ${styles.imageGif}`} loop
                                            muted
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            src={post.gif}
                                            alt=""
                                            className={`${styles.image} ${styles.imageGif}`} />
                                    )
                                )}
                                <span className={styles.category}>
                                    {post.category}
                                </span>
                            </Link>

                            <div className={styles.content}>
                                <Link
                                    href={post.href || "#"}
                                    className={styles.titleLink}
                                >
                                    <div
                                        className={styles.postTitle}
                                        dangerouslySetInnerHTML={{
                                            __html: post.title,
                                        }}
                                    />
                                </Link>

                                <div
                                    className={styles.excerpt}
                                    dangerouslySetInnerHTML={{
                                        __html: post.excerpt,
                                    }}
                                />

                                <div className={styles.author}>
                                    {post.authorHref ? (
                                        <Link
                                            href={post.authorHref}
                                            className={styles.authorLink}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            <img
                                                src={post.authorImage}
                                                alt={
                                                    post.authorImageAlt ||
                                                    post.authorName
                                                }
                                                className={styles.authorImg}
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <p className={styles.authorName}>
                                                    {post.authorName}
                                                </p>
                                                <p className={styles.date}>
                                                    {post.date}
                                                </p>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            <img
                                                src={post.authorImage}
                                                alt={
                                                    post.authorImageAlt ||
                                                    post.authorName
                                                }
                                                className={styles.authorImg}
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <p className={styles.authorName}>
                                                    {post.authorName}
                                                </p>
                                                <p className={styles.date}>
                                                    {post.date}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {posts.length > visibleCount && (
                    <div className={styles.moreBtnWrapper}>
                        <button
                            type="button"
                            onClick={handleShowMore}
                            className={styles.projectsMoreBtn}
                        >
                            {moreButtonText}                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}