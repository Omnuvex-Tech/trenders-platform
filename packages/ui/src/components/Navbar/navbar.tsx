"use client";

import { useRef, useEffect, useCallback } from "react";
import { cn } from "../../lib/utils";
import styles from "../../styles/Navbar/navbar.module.css";
import Link from "next/link";

export interface NavLink {
    label: string;
    href: string;
    openInNewTab?: boolean;
}

export interface SearchResult {
    title: string;
    url: string;
    breadcrumb: string;
    excerpt: string;
}

export interface NavbarUIProps {
    logo: React.ReactNode;
    links: NavLink[];
    langSlot?: React.ReactNode;
    showSearch?: boolean;
    showLang?: boolean;
    searchOpen: boolean;
    searchValue: string;
    drawerOpen: boolean;
    onSearchToggle: () => void;
    onSearchChange: (val: string) => void;
    onDrawerToggle: () => void;
    onDrawerClose: () => void;
    suggestions: SearchResult[];
    locale: string;
}

export function NavbarUI({
    logo,
    links,
    langSlot,
    showSearch = true,
    showLang = true,
    locale,
    suggestions: defaultSuggestions,
}: NavbarUIProps) {
    const searchDetailsRef = useRef<HTMLDetailsElement>(null);
    const drawerDetailsRef = useRef<HTMLDetailsElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const renderSuggestions = useCallback((results: SearchResult[], query: string) => {
        const el = suggestionsRef.current;
        if (!el) return;
        el.innerHTML = "";

        if (results.length === 0) {
            if (query.trim().length >= 2) {
                el.innerHTML = `<div class="${styles.searchNoResult}">Nəticə tapılmadı</div>`;
            }
            return;
        }

        results.forEach(item => {
            const a = document.createElement("a");
            a.href = item.url;
            a.className = styles.searchSuggestionItem!;
            if (query.trim().length < 2) {
                a.innerHTML = `<span class="${styles.searchSuggestionTitle}">${item.title}</span>`;
            } else {
                a.innerHTML = `
                    <span class="${styles.searchSuggestionUrl}">${item.breadcrumb}</span>
                    <span class="${styles.searchSuggestionTitle}">${item.title}</span>
                    ${item.excerpt ? `<span class="${styles.searchSuggestionExcerpt}">${item.excerpt}</span>` : ""}
                `;
            }
            a.addEventListener("click", closeSearch);
            el.appendChild(a);
        });
    }, [defaultSuggestions]);

    const resetSearchUI = useCallback(() => {
        if (searchDetailsRef.current) {
            searchDetailsRef.current.open = false;
        }
        popupRef.current?.classList.remove(styles.searchPopupOpen!);
        overlayRef.current?.classList.remove(styles.searchOverlayOpen!);
        if (inputRef.current) inputRef.current.value = "";
        if (suggestionsRef.current) suggestionsRef.current.innerHTML = "";
        if (debounceRef.current) clearTimeout(debounceRef.current);
    }, []);

    const openSearch = useCallback(() => {
        popupRef.current?.classList.add(styles.searchPopupOpen!);
        overlayRef.current?.classList.add(styles.searchOverlayOpen!);
        renderSuggestions(defaultSuggestions, "");
        setTimeout(() => inputRef.current?.focus(), 50);
    }, [defaultSuggestions, renderSuggestions]);

    const closeSearch = useCallback(() => {
        if (searchDetailsRef.current) {
            searchDetailsRef.current.open = false;
        }
        popupRef.current?.classList.remove(styles.searchPopupOpen!);
        overlayRef.current?.classList.remove(styles.searchOverlayOpen!);
        if (inputRef.current) inputRef.current.value = "";
        if (suggestionsRef.current) suggestionsRef.current.innerHTML = "";
        if (debounceRef.current) clearTimeout(debounceRef.current);
    }, []);

    const closeDrawer = useCallback(() => {
        if (drawerDetailsRef.current) {
            drawerDetailsRef.current.open = false;
        }
    }, []);

    useEffect(() => {
        const details = searchDetailsRef.current;
        if (!details) return;

        // Native toggle listener — React synthetic event-dən asılılıq yoxdur
        const handleToggle = () => {
            if (details.open) {
                openSearch();
            } else {
                closeSearch();
            }
        };

        details.addEventListener("toggle", handleToggle);

        // bfcache restore: xarici saytdan Back ilə qayıtma ssenarisi
        // e.persisted === true yalnız bfcache-dən restore zamanı olur
        const handlePageShow = (e: PageTransitionEvent) => {
            if (!e.persisted) return;
            resetSearchUI();
            if (drawerDetailsRef.current) {
                drawerDetailsRef.current.open = false;
            }
        };

        window.addEventListener("pageshow", handlePageShow);

        // Komponent mount olduqda da sıfırla —
        // SPA navigation-da navbar unmount olmur amma bu müdafiə qatıdır
        resetSearchUI();

        return () => {
            details.removeEventListener("toggle", handleToggle);
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, [openSearch, closeSearch, resetSearchUI]);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const query = (e.currentTarget as HTMLInputElement).value;

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (query.trim().length < 2) {
            renderSuggestions(defaultSuggestions, "");
            return;
        }

        debounceRef.current = setTimeout(() => {
            fetch(`/api/search?q=${encodeURIComponent(query)}&locale=${locale}`)
                .then(r => r.json())
                .then((data: SearchResult[]) => renderSuggestions(data, query))
                .catch(() => {
                    if (suggestionsRef.current) {
                        suggestionsRef.current.innerHTML = `<div class="${styles.searchNoResult}">Nəticə tapılmadı</div>`;
                    }
                });
        }, 300);
    };

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbarInner}>
                    <div className={styles.navbarLogo}>{logo}</div>

                    <div className={styles.navbarRight}>
                        <ul className={styles.navbarLinks}>
                            {links.map(link => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        target={link.openInNewTab ? "_blank" : undefined}
                                        rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.navbarActions}>
                            {showSearch && (
                                <details
                                    ref={searchDetailsRef}
                                    className={styles.searchDetails}
                                // onToggle yoxdur — useEffect içində native listener idarə edir
                                >
                                    <summary className={styles.searchBtn} aria-label="Axtar">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                            stroke="#1a1a1a" strokeWidth="1.8"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        </svg>
                                    </summary>
                                </details>
                            )}
                            {showLang && langSlot}
                        </div>

                        <details ref={drawerDetailsRef} className={styles.drawerDetails}>
                            <summary className={styles.hamburgerSummary} aria-label="Menyunu aç">
                                <span className={styles.bar} />
                                <span className={styles.bar} />
                                <span className={styles.bar} />
                            </summary>

                            <div className={styles.mobileDrawerBackdrop} onClick={closeDrawer} />
                            <div className={styles.mobileDrawerPanel}>
                                <ul className={styles.mobileNavLinks}>
                                    {links.map(link => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                target={link.openInNewTab ? "_blank" : undefined}
                                                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                                                onClick={closeDrawer}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.mobileDrawerFooter}>
                                    {showSearch && (
                                        <button className={styles.mobileSearchBtn} onClick={() => {
                                            closeDrawer();
                                            openSearch();
                                        }}>
                                            Axtar
                                        </button>
                                    )}
                                    {showLang && langSlot}
                                </div>
                            </div>
                        </details>
                    </div>
                </div>
            </nav>

            {showSearch && (
                <>
                    <div
                        ref={overlayRef}
                        className={styles.searchOverlay}
                        onClick={closeSearch}
                    />
                    <div ref={popupRef} className={styles.searchPopup}>
                        <div className={styles.searchInputWrapper}>
                            <div className={styles.searchInputBorder} />
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="#1a6fd4" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Axtar..."
                                onInput={handleInput}
                            />
                        </div>

                        <div className={styles.searchSuggestionsWrapper}>
                            <div className={styles.searchSuggestionsBorder} />
                            <div
                                ref={suggestionsRef}
                                className={styles.searchSuggestions}
                                data-lenis-prevent
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}