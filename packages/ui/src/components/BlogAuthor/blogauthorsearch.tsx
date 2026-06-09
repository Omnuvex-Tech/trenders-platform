"use client";

import Link from "next/link";
import styles from "../../styles/BlogAuthor/blogauthorsearch.module.css";

export interface BlogAuthors {
    name: string;
    avatar: string;
    avatarAlt?: string;
    href?: string;
}

export interface BlogListItems {
    id: number;
    image: string;
    imageAlt?: string;
    badge: string;
    title: string;
    author: BlogAuthors;
    date: string;
    href?: string;
}

export interface BlogCategories {
    id: number;
    label: string;
    href?: string;
}

export interface BlogAuthorListUIProps {
    posts: BlogListItems[];
    searchPlaceholder?: string;
    categoriesTitle?: string;
    categories: BlogCategories[];
    featuredBlogTitle?: string;
    onSearch?: (value: string) => void;
}

export function BlogAuthorListUI({
    posts,
    searchPlaceholder = "Axtarış ...",
    categoriesTitle = "KATEQORİYALAR",
    categories,
    onSearch,
}: BlogAuthorListUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Sol: Blog siyahısı */}
                <div className={styles.postList}>
                    {posts.map((post) => (
                        <div key={post.id} className={styles.postItem}>
                            <Link href={post.href || "#"} className={styles.postImgLink}>
                                <img
                                    src={post.image}
                                    alt={post.imageAlt || post.title}
                                    className={styles.postImg}
                                />
                            </Link>
                            <div className={styles.postContent}>
                                <span className={styles.postBadge}>{post.badge}</span>
                                <Link href={post.href || "#"} className={styles.postTitleLink}>
                                    <div className={styles.postTitle} dangerouslySetInnerHTML={{ __html: post.title }} />
                                </Link>
                                <div className={styles.postMeta}>
                                    <Link
                                        href={post.author.href || "#"}
                                        className={styles.authorLink}
                                        style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
                                    >
                                        <img
                                            src={post.author.avatar}
                                            alt={post.author.avatarAlt || post.author.name}
                                            className={styles.authorAvatar}
                                        />
                                        <div className={styles.authorInfo}>
                                            <span className={styles.authorName}>{post.author.name}</span>
                                            <span className={styles.postDate}>{post.date}</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sağ: Sidebar */}
                <aside className={styles.sidebar}>

                    {/* Axtarış + Kateqoriyalar kartı */}
                    <div className={styles.sideCard}>
                        <div className={styles.searchWrap}>
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                className={styles.searchInput}
                                onChange={(e) => onSearch?.(e.target.value)}
                            />
                            <button className={styles.searchBtn} aria-label="Axtar">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </button>
                        </div>

                        <div className={styles.categories}>
                            <h4 className={styles.categoriesTitle}>{categoriesTitle}</h4>
                            <div className={styles.categoryTags}>
                                {categories.map((cat) => (
                                    <Link key={cat.id} href={cat.href || "#"} className={styles.categoryTag}>
                                        {cat.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                </aside>

            </div>
        </section>
    );
}