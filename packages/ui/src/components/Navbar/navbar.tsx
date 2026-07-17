"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import styles from "../../styles/Navbar/navbar.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

export interface NavLink {
    label: string;
    href: string;
    openInNewTab?: boolean;
}

export interface SearchResult {
    title: string;
    titleHtml: string;
    url: string;
    breadcrumb: string;
    excerptHtml: string;
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
    const pathname = usePathname();
    const pathWithoutLocale = (() => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        const rest = segments.slice(2).join("/");
        return rest ? `/${rest}` : "/";
    })();
    const getHrefPath = (href: string) => {
        try {
            const url = new URL(href, "http://dummy-base.local");
            return url.pathname;
        } catch {
            return href;
        }
    };
    const isActiveLink = (href: string) => {
        const hrefPath = getHrefPath(href);
        const normalizedHref = hrefPath === "/" ? "/" : hrefPath.replace(/\/$/, "");
        const normalizedPath = pathWithoutLocale === "/" ? "/" : pathWithoutLocale.replace(/\/$/, "");
        return normalizedPath.toLowerCase() === normalizedHref.toLowerCase()
            || normalizedPath.toLowerCase().startsWith(`${normalizedHref.toLowerCase()}/`);
    };

    const searchDetailsRef = useRef<HTMLDetailsElement>(null);
    const drawerDetailsRef = useRef<HTMLDetailsElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const NAV_LABELS: Record<string, { noResults: string; showAll: string }> = {
        az: { noResults: "Nəticə tapılmadı", showAll: "üçün bütün nəticələri göstər" },
        en: { noResults: "No results found", showAll: "Show all results for" },
        ru: { noResults: "Результаты не найдены", showAll: "Показать все результаты для" },
    };
    const navLabels: { noResults: string; showAll: string } = NAV_LABELS[locale] ?? NAV_LABELS.az!;

    const renderSuggestions = useCallback((results: SearchResult[], query: string) => {
        const el = suggestionsRef.current;
        if (!el) return;
        el.innerHTML = "";

        const trimmedQuery = query.trim();

        if (results.length === 0) {
            if (trimmedQuery.length >= 2) {
                el.innerHTML = `<div class="${styles.searchNoResult}">${navLabels.noResults}</div>`;
            }
            return;
        }

        results.forEach(item => {
            const a = document.createElement("a");
            a.href = item.url;
            a.className = styles.searchSuggestionItem!;
            if (trimmedQuery.length < 2) {
                a.innerHTML = `<span class="${styles.searchSuggestionTitle}">${item.titleHtml}</span>`;
            } else {
                a.innerHTML = `
                    <span class="${styles.searchSuggestionUrl}">${item.breadcrumb}</span>
                    <span class="${styles.searchSuggestionTitle}">${item.titleHtml}</span>
                    ${item.excerptHtml ? `<span class="${styles.searchSuggestionExcerpt}">${item.excerptHtml}</span>` : ""}
                `;
            }
            a.addEventListener("click", closeSearch);
            el.appendChild(a);
        });

        if (trimmedQuery.length >= 2) {
            const showAll = document.createElement("a");
            showAll.href = `/${locale}/search?q=${encodeURIComponent(trimmedQuery)}`;
            showAll.className = styles.searchShowAll!;
            showAll.textContent = locale === "en"
                ? `${navLabels.showAll} "${trimmedQuery}"`
                : `"${trimmedQuery}" ${navLabels.showAll}`;
            showAll.addEventListener("click", closeSearch);
            el.appendChild(showAll);
        }
    }, [defaultSuggestions, locale, navLabels]);

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

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const details = drawerDetailsRef.current;
        if (!details) return;
        const handleToggle = () => setDrawerOpen(details.open);
        details.addEventListener("toggle", handleToggle);
        return () => details.removeEventListener("toggle", handleToggle);
    }, []);

    useEffect(() => {
        const details = searchDetailsRef.current;
        if (!details) return;
        const handleToggle = () => {
            if (details.open) {
                openSearch();
            } else {
                closeSearch();
            }
        };

        details.addEventListener("toggle", handleToggle);
        const handlePageShow = (e: PageTransitionEvent) => {
            if (!e.persisted) return;
            resetSearchUI();
            if (drawerDetailsRef.current) {
                drawerDetailsRef.current.open = false;
            }
        };

        window.addEventListener("pageshow", handlePageShow);
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
            fetch(`/api/search?q=${encodeURIComponent(query)}&locale=${locale}&limit=4`)
                .then(r => r.json())
                .then((data: { total: number; results: SearchResult[] }) => renderSuggestions(data.results ?? [], query))
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
                    <motion.div
                        className={styles.navbarLogo}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 3.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {logo}
                    </motion.div>

                    <div className={styles.navbarRight}>
                        <ul className={styles.navbarLinks}>
                            {links.map(link => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        target={link.openInNewTab ? "_blank" : undefined}
                                        rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                                        className={isActiveLink(link.href) ? styles.navLinkActive : undefined}
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
                        </details>

                        {mounted && createPortal(
                            <>
                                <div
                                    className={`${styles.drawerBackdrop} ${drawerOpen ? styles.drawerBackdropOpen : ""}`}
                                    onClick={closeDrawer}
                                />
                                <div className={`${styles.drawerPanel} ${drawerOpen ? styles.drawerPanelOpen : ""}`}>
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
                                        {showLang && <div className="mobileLangSlot">{langSlot}</div>}
                                    </div>
                                </div>
                            </>,
                            document.body
                        )}
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