"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "../../styles/BlogPage/bloglist.module.css";

export interface BlogAuthor {
    name: string;
    avatar: string;
    avatarAlt?: string;
    href?: string;
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
    categorySlug?: string;
    categoryLabel?: string;
}

export interface BlogCategory {
    id: number;
    label: string;
    href?: string;
    slug?: string;
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
    allPosts?: BlogListItem[];
    searchPlaceholder?: string;
    categoriesTitle?: string;
    categories: BlogCategory[];
    featuredBlogTitle?: string;
    featuredBlog?: FeaturedBlog;
    onSearch?: (value: string) => void;
}

const VISIBLE = 4;

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, "").toLowerCase();
}

export function BlogListUI({
    posts,
    allPosts,
    searchPlaceholder = "Axtarış ...",
    categoriesTitle = "KATEQORİYALAR",
    categories,
    featuredBlogTitle = "Həftənin seçilmiş blogu",
    featuredBlog,
    onSearch,
}: BlogListUIProps) {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemHeight, setItemHeight] = useState(0);
    const [gap, setGap] = useState(0);

    const currentIndexRef = useRef(0);
    const maxIndexRef = useRef(0);
    const showCarouselRef = useRef(false);
    const listInnerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const firstItemRef = useRef<HTMLDivElement>(null);
    const lastScrollTime = useRef(0);
    const touchStartY = useRef(0);
    const prevQuery = useRef(query);
    const prevCategory = useRef(activeCategory);

    const isFiltering = query.trim().length >= 3 || activeCategory !== null;
    const searchPool = allPosts ?? posts;

    const filtered = (() => {
        if (!isFiltering) return posts.slice(0, VISIBLE);
        let result = searchPool;
        if (activeCategory) result = result.filter((p) => p.categorySlug === activeCategory);
        if (query.trim().length >= 3) {
            const q = query.toLowerCase();
            result = result.filter((p) =>
                stripHtml(p.title).includes(q) ||
                p.badge.toLowerCase().includes(q) ||
                p.author.name.toLowerCase().includes(q) ||
                (p.categoryLabel ?? "").toLowerCase().includes(q)
            );
        }
        return result;
    })();

    const maxIndex = Math.max(0, filtered.length - VISIBLE);
    maxIndexRef.current = maxIndex;
    const showCarousel = isFiltering && filtered.length > VISIBLE;
    showCarouselRef.current = showCarousel;

    const updateIndex = useCallback((next: number) => {
        currentIndexRef.current = next;
        setCurrentIndex(next);
    }, []);

    // Filter dəyişəndə index sıfırla
    useEffect(() => {
        const queryChanged = prevQuery.current !== query;
        const categoryChanged = prevCategory.current !== activeCategory;
        prevQuery.current = query;
        prevCategory.current = activeCategory;
        if (queryChanged || categoryChanged) {
            updateIndex(0);
            lastScrollTime.current = 0;
        }
    }, [query, activeCategory, updateIndex]);

    // DOM ölçümü
    useEffect(() => {
        if (!showCarousel) return;

        const measure = () => {
            const el = firstItemRef.current;
            const parent = el?.parentElement;
            if (!el || !parent) return;
            const elHeight = el.getBoundingClientRect().height;
            const parentStyle = window.getComputedStyle(parent);
            const rowGap = parseFloat(parentStyle.rowGap) || parseFloat(parentStyle.gap) || 0;
            setItemHeight(elHeight);
            setGap(rowGap);
        };

        const rafId = requestAnimationFrame(measure);
        const observer = new ResizeObserver(measure);
        if (firstItemRef.current) observer.observe(firstItemRef.current);
        return () => {
            cancelAnimationFrame(rafId);
            observer.disconnect();
        };
    }, [showCarousel, filtered.length]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (!showCarouselRef.current) return;
            const goingDown = e.deltaY > 0;
            const goingUp = e.deltaY < 0;

            const atTop = currentIndexRef.current === 0;
            const atBottom = currentIndexRef.current >= maxIndexRef.current;

            if (goingUp && atTop) return;
            if (goingDown && atBottom) {
                lastScrollTime.current = Date.now();
                return;
            }

            e.preventDefault();

            const threshold = Math.abs(e.deltaY) < 50 ? 900 : 650;
            const now = Date.now();
            if (now - lastScrollTime.current < threshold) return;
            lastScrollTime.current = now;

            const next = goingDown
                ? Math.min(currentIndexRef.current + 1, maxIndexRef.current)
                : Math.max(currentIndexRef.current - 1, 0);
            updateIndex(next);
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [updateIndex]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onTouchStart = (e: TouchEvent) => {
            if (!showCarouselRef.current) return;
            const touch = e.touches?.[0];
            if (!touch) return;
            touchStartY.current = touch.clientY;
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (!showCarouselRef.current) return;
            const touch = e.changedTouches?.[0];
            if (!touch) return;
            const delta = touchStartY.current - touch.clientY;
            if (Math.abs(delta) < 30) return;
            const goingDown = delta > 0;
            if (goingDown && currentIndexRef.current >= maxIndexRef.current) return;
            if (!goingDown && currentIndexRef.current === 0) return;
            e.preventDefault();

            const now = Date.now();
            if (now - lastScrollTime.current < 600) return;
            lastScrollTime.current = now;

            const next = goingDown
                ? Math.min(currentIndexRef.current + 1, maxIndexRef.current)
                : Math.max(currentIndexRef.current - 1, 0);
            updateIndex(next);
        };

        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchend", onTouchEnd, { passive: false });
        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchend", onTouchEnd);
        };
    }, [updateIndex]);

    const stepSize = itemHeight + gap;
    const translateY = currentIndex * stepSize;
    const visibleCount = Math.min(VISIBLE, filtered.length);
    const containerHeight = itemHeight > 0
        ? itemHeight * visibleCount + gap * (visibleCount - 1)
        : 0;

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div
                    ref={containerRef}
                    className={styles.postList}
                    style={
                        showCarousel && containerHeight > 0
                            ? { overflow: "hidden", height: containerHeight, position: "relative" }
                            : { overflow: "visible", height: "auto" }
                    }
                >
                    <div
                        ref={listInnerRef}
                        style={
                            showCarousel
                                ? {
                                    transform: `translateY(-${translateY}px)`,
                                    transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                    willChange: "transform",
                                }
                                : {}
                        }
                    >
                        {filtered.length === 0 ? (
                            <div style={{ padding: "32px 0", color: "#94a3b8", fontSize: 15 }}>
                                Nəticə tapılmadı
                            </div>
                        ) : (
                            filtered.map((post, i) => (
                                <div
                                    key={post.id}
                                    ref={i === 0 ? firstItemRef : undefined}
                                    className={styles.postItem}
                                >
                                    <a href={post.href || "#"} className={styles.postImgLink}>
                                        <img
                                            src={post.image}
                                            alt={post.imageAlt || post.title}
                                            className={styles.postImg}
                                        />
                                    </a>
                                    <div className={styles.postContent}>
                                        <span className={styles.postBadge}>{post.badge}</span>
                                        <a href={post.href || "#"} className={styles.postTitleLink}>
                                            <div className={styles.postTitle} dangerouslySetInnerHTML={{ __html: post.title }} />
                                        </a>
                                        <div className={styles.postMeta}>
                                            {post.author.href ? (
                                                <a href={post.author.href}>
                                                    <img src={post.author.avatar} alt={post.author.avatarAlt || post.author.name} className={styles.authorAvatar} />
                                                </a>
                                            ) : (
                                                <img src={post.author.avatar} alt={post.author.avatarAlt || post.author.name} className={styles.authorAvatar} />
                                            )}
                                            <div className={styles.authorInfo}>
                                                {post.author.href ? (
                                                    <a href={post.author.href} className={styles.authorName}>{post.author.name}</a>
                                                ) : (
                                                    <span className={styles.authorName}>{post.author.name}</span>
                                                )}
                                                <span className={styles.postDate}>{post.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.sideCard}>
                        <div className={styles.searchWrap}>
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                className={styles.searchInput}
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    onSearch?.(e.target.value);
                                }}
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
                                {categories.map((cat) => {
                                    const slug = cat.slug ?? cat.href?.split("=")[1] ?? cat.label.toLowerCase();
                                    const isActive = activeCategory === slug;
                                    return (
                                        <button
                                            key={cat.id}
                                            className={`${styles.categoryTag} ${isActive ? styles.categoryTagActive : ""}`}
                                            onClick={() => setActiveCategory((prev) => prev === slug ? null : slug)}
                                        >
                                            {cat.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {featuredBlog && (
                        <div className={styles.featuredWrap}>
                            <h4 className={styles.featuredTitle}>{featuredBlogTitle}</h4>
                            <a href={featuredBlog.href || "#"} className={styles.featuredPost}>
                                <img src={featuredBlog.image} alt={featuredBlog.imageAlt || featuredBlog.title} className={styles.featuredImg} />
                                <div className={styles.featuredContent}>
                                    <span className={styles.featuredBadge}>{featuredBlog.badge}</span>
                                    <div className={styles.featuredPostTitle} dangerouslySetInnerHTML={{ __html: featuredBlog.title }} />
                                    <span className={styles.featuredDate}>{featuredBlog.date}</span>
                                </div>
                            </a>
                        </div>
                    )}
                </aside>
            </div>
        </section>
    );
}