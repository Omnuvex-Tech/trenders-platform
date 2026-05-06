"use client";

import styles from "../../styles/Blog/blog.module.css";

export interface BlogPost {
    id: number;
    image: string;
    category: string;
    title: string;
    excerpt: string;
    authorImage: string;
    authorName: string;
    date: string;
    href?: string;
}

export interface BlogUIProps {
    title: string;
    allPostsLabel: string;
    allPostsHref?: string;
    posts: BlogPost[];
}

export function BlogUI({ title, allPostsLabel, allPostsHref = "#", posts,  }: BlogUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.blogDivider}></div>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <a href={allPostsHref} className={styles.allPostsBtn}>
                        {allPostsLabel}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </a>
                </div>

                <div className={styles.grid}>
                    {posts.map(post => (
                        <a key={post.id} href={post.href || "#"} className={styles.card}>
                            <div className={styles.imageWrap}>
                                <img src={post.image} alt={post.title} className={styles.image} />
                                <span className={styles.category}>{post.category}</span>
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.postTitle}>{post.title}</h3>
                                <p className={styles.excerpt}>{post.excerpt}</p>
                                <div className={styles.author}>
                                    <img src={post.authorImage} alt={post.authorName} className={styles.authorImg} />
                                    <div>
                                        <p className={styles.authorName}>{post.authorName}</p>
                                        <p className={styles.date}>{post.date}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}