"use client";

import styles from "../../styles/BlogAuthor/blogauthorsearch.module.css";

export interface BlogAuthors {
    name: string;
    avatar: string;
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
                        <a key={post.id} href={post.href || "#"} className={styles.postItem}>
                            <img
                                src={post.image}
                                alt={post.imageAlt || post.title}
                                className={styles.postImg}
                            />
                            <div className={styles.postContent}>
                                <span className={styles.postBadge}>{post.badge}</span>
                                <h3 className={styles.postTitle}>{post.title}</h3>
                                <div className={styles.postMeta}>
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className={styles.authorAvatar}
                                    />
                                    <div className={styles.authorInfo}>
                                        <span className={styles.authorName}>{post.author.name}</span>
                                        <span className={styles.postDate}>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
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
                                    <a key={cat.id} href={cat.href || "#"} className={styles.categoryTag}>
                                        {cat.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

            
                </aside>

            </div>
        </section>
    );
}