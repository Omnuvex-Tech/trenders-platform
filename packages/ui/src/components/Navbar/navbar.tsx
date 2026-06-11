"use client";

import { useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import styles from "../../styles/Navbar/navbar.module.css";

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
}

export function NavbarUI({
    logo,
    links,
    langSlot,
    showSearch = true,
    showLang = true,
    searchOpen,
    searchValue,
    drawerOpen,
    onSearchToggle,
    onSearchChange,
    onDrawerClose,
    onDrawerToggle,
    suggestions,
}: NavbarUIProps) {
    const popupRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!searchOpen || !popupRef.current || !inputRef.current || !suggestionsRef.current) return;

        const popupTop = popupRef.current.getBoundingClientRect().top;
        const inputHeight = inputRef.current.getBoundingClientRect().height;
        const gap = 10;
        const padding = 44;
        const available = window.innerHeight - popupTop - padding - inputHeight - gap;

        suggestionsRef.current.style.maxHeight = `${available}px`;
    }, [searchOpen, suggestions]);

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbarInner}>
                    <div className={styles.navbarLogo}>{logo}</div>

                    <div className={styles.navbarRight}>
                        <ul className={styles.navbarLinks}>
                            {links.map(link => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target={link.openInNewTab ? "_blank" : undefined}
                                        rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.navbarActions}>
                            {showSearch && (
                                <button
                                    className={styles.searchBtn}
                                    aria-label="Axtar"
                                    onClick={onSearchToggle}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                        stroke="#1a1a1a" strokeWidth="1.8"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </button>
                            )}
                            {showLang && langSlot}
                        </div>

                        <button
                            className={cn(styles.hamburgerBtn, drawerOpen && styles.open)}
                            aria-label="Menyunu aç"
                            onClick={onDrawerToggle}
                        >
                            <span className={styles.bar} />
                            <span className={styles.bar} />
                            <span className={styles.bar} />
                        </button>
                    </div>
                </div>
            </nav>

            <div className={cn(styles.mobileDrawer, drawerOpen && styles.open)}>
                <div className={styles.mobileDrawerBackdrop} onClick={onDrawerClose} />
                <div className={styles.mobileDrawerPanel}>
                    <ul className={styles.mobileNavLinks}>
                        {links.map(link => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    target={link.openInNewTab ? "_blank" : undefined}
                                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                                    onClick={onDrawerClose}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.mobileDrawerFooter}>
                        {showSearch && (
                            <button className={styles.mobileSearchBtn} onClick={() => {
                                onDrawerClose();
                                onSearchToggle();
                            }}>
                                Axtar
                            </button>
                        )}
                        {showLang && langSlot}
                    </div>
                </div>
            </div>

            {showSearch && (
                <>
                    <div
                        className={cn(styles.searchOverlay, searchOpen && styles.searchOverlayOpen)}
                        onClick={onSearchToggle}
                    />
                    <div
                        ref={popupRef}
                        className={cn(styles.searchPopup, searchOpen && styles.searchPopupOpen)}
                    >
                        <div ref={inputRef} className={styles.searchInputWrapper}>
                            <div className={styles.searchInputBorder} />
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="#1a6fd4" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Axtar..."
                                value={searchValue}
                                onChange={e => onSearchChange(e.target.value)}
                                autoFocus={searchOpen}
                            />
                        </div>
                        {suggestions.length > 0 && (
                            <div className={styles.searchSuggestionsWrapper}>
                                <div className={styles.searchSuggestionsBorder} />
                                <div
                                    ref={suggestionsRef}
                                    className={styles.searchSuggestions}
                                    data-lenis-prevent
                                >
                                    {searchValue.trim().length < 2 ? (
                                        suggestions.map((item, i) => (
                                            <a
                                                key={i}
                                                href={item.url}
                                                className={styles.searchSuggestionItem}
                                                onClick={onSearchToggle}
                                            >
                                                <span className={styles.searchSuggestionTitle}>
                                                    {item.title}
                                                </span>
                                            </a>
                                        ))
                                    ) : (
                                        suggestions.map((item, i) => (
                                            <a
                                                key={i}
                                                href={item.url}
                                                className={styles.searchSuggestionItem}
                                                onClick={onSearchToggle}
                                            >
                                                <span className={styles.searchSuggestionUrl}>
                                                    {item.breadcrumb}
                                                </span>
                                                <span className={styles.searchSuggestionTitle}>
                                                    {item.title}
                                                </span>
                                                {item.excerpt && (
                                                    <span className={styles.searchSuggestionExcerpt}>
                                                        {item.excerpt}
                                                    </span>
                                                )}
                                            </a>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                        {searchValue.trim().length >= 2 && suggestions.length === 0 && (
                            <div className={styles.searchSuggestionsWrapper}>
                                <div className={styles.searchSuggestionsBorder} />
                                <div className={styles.searchSuggestions} data-lenis-prevent>
                                    <div className={styles.searchNoResult}>Nəticə tapılmadı</div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}