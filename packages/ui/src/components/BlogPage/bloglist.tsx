"use client";

import styles from "../../styles/BlogPage/bloglist.module.css";

export interface BlogAuthor {
    name: string;
    avatar: string;
}

export interface BlogListItem {
    id: number;
    image: string;
    imageAlt?: string;
    badge: string;
    title: string;
    author: BlogAuthor;
    date: string;
    href?: string;
}

export interface BlogCategory {
    id: number;
    label: string;
    href?: string;
}

export interface FeaturedBlog {
    image: string;
    imageAlt?: string;
    badge: string;
    title: string;
    date: string;
    href?: string;
}

export interface BlogListUIProps {
    posts: BlogListItem[];
    searchPlaceholder?: string;
    categoriesTitle?: string;
    categories: BlogCategory[];
    featuredBlogTitle?: string;
    featuredBlog: FeaturedBlog;
    onSearch?: (value: string) => void;
}

export function BlogListUI({
    posts,
    searchPlaceholder = "Axtarış ...",
    categoriesTitle = "KATEQORİYALAR",
    categories,
    featuredBlogTitle = "Həftənin seçilmiş blogu",
    featuredBlog,
    onSearch,
}: BlogListUIProps) {
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

                    {/* Həftənin seçilmiş blogu */}
                    <div className={styles.featuredWrap}>
                        <h4 className={styles.featuredTitle}>{featuredBlogTitle}</h4>
                        <a href={featuredBlog.href || "#"} className={styles.featuredPost}>
                            <img
                                src={featuredBlog.image}
                                alt={featuredBlog.imageAlt || featuredBlog.title}
                                className={styles.featuredImg}
                            />
                            <div className={styles.featuredContent}>
                                <span className={styles.featuredBadge}>{featuredBlog.badge}</span>
                                <h5 className={styles.featuredPostTitle}>{featuredBlog.title}</h5>
                                <span className={styles.featuredDate}>{featuredBlog.date}</span>
                            </div>
                        </a>
                    </div>

                </aside>

            </div>
        </section>
    );
}