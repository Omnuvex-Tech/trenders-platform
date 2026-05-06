"use client";

import styles from "../../styles/BlogPage/bloggrid.module.css";

export interface BlogGridItem {
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

export interface BlogGridUIProps {
    posts: BlogGridItem[];
}

export function BlogGridUI({posts,  }: BlogGridUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
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