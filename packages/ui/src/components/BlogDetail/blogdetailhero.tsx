"use client";

import styles from "../../styles/BlogDetail/blogdetailhero.module.css";

export interface BlogDetailHeroAuthor {
    name: string;
    role: string;
    avatar: string;
}

export interface BlogDetailPageHeroUIProps {
    heroImage: string;
    heroImageAlt?: string;
    author: BlogDetailHeroAuthor;
    hashtag: string;
    title: string;
    paragraphs: string[];
}

export function BlogDetailPageHeroUI({
    heroImage,
    heroImageAlt = "",
    author,
    hashtag,
    title,
    paragraphs,
}: BlogDetailPageHeroUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Hero şəkil + author kart */}
                <div className={styles.heroWrap}>
                    <img
                        src={heroImage}
                        alt={heroImageAlt}
                        className={styles.heroImg}
                    />
                    <div className={styles.authorCard}>
                        <img
                            src={author.avatar}
                            alt={author.name}
                            className={styles.authorAvatar}
                        />
                        <div className={styles.authorInfo}>
                            <span className={styles.authorName}>{author.name}</span>
                            <span className={styles.authorRole}>{author.role}</span>
                        </div>
                    </div>
                </div>

                {/* Mətn bloku */}
                <div className={styles.textBlock}>
                    <span className={styles.hashtag}>{hashtag}</span>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.paragraphs}>
                        {paragraphs.map((p, i) => (
                            <p key={i} className={styles.paragraph}>{p}</p>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}