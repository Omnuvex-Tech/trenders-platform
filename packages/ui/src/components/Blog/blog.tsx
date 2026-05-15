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
      <svg width="16" height="16" viewBox="0 0 36 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="8" x2="28" y2="8" stroke="#3E82F6" strokeWidth="1.5"/>
        <path d="M22 2L30 8L22 14" stroke="#3E82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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