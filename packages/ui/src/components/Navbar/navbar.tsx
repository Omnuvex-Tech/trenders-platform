"use client";

import { cn } from "../../lib/utils";
import styles from "../../styles/Navbar/navbar.module.css";

export interface NavLink {
    label: string;
    href: string;
}

export interface NavbarUIProps {
    logo: React.ReactNode;
    links: NavLink[];
    langSlot?: React.ReactNode;
    searchOpen: boolean;
    searchValue: string;
    drawerOpen: boolean;
    onSearchToggle: () => void;
    onSearchChange: (val: string) => void;
    onDrawerToggle: () => void;
    onDrawerClose: () => void;
    suggestions: string[];
}

export function NavbarUI({
    logo,
    links,
    langSlot,
    searchOpen,
    searchValue,
    drawerOpen,
    onSearchToggle,
    onSearchChange,
    onDrawerClose,
    onDrawerToggle,
    suggestions,
}: NavbarUIProps) {
    const filtered = suggestions.filter(s =>
        searchValue === "" ? true : s.includes(searchValue.toLowerCase())
    );

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbarInner}>
                    <div className={styles.navbarLogo}>{logo}</div>

                    <div className={styles.navbarRight}>
                        <ul className={styles.navbarLinks}>
                            {links.map(link => (
                                <li key={link.label}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.navbarActions}>
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
                            {langSlot}
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
                                <a href={link.href} onClick={onDrawerClose}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.mobileDrawerFooter}>
                        <button className={styles.mobileSearchBtn} onClick={() => {
                            onDrawerClose();
                            onSearchToggle();
                        }}>
                            Axtar
                        </button>
                        {langSlot}
                    </div>
                </div>
            </div>

            <div
                className={cn(styles.searchOverlay, searchOpen && styles.searchOverlayOpen)}
                onClick={onSearchToggle}
            />
            <div className={cn(styles.searchPopup, searchOpen && styles.searchPopupOpen)}>
                <div className={styles.searchInputWrapper}>
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
                <div className={styles.searchSuggestions}>
                    <div className={styles.searchSuggestionsBorder} />
                    {filtered.map((item, i) => (
                        <div key={i} className={styles.searchSuggestionItem}>{item}</div>
                    ))}
                </div>
            </div>
        </>
    );
}