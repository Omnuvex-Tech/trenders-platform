
"use client";

import { useState, useRef, useMemo } from "react";
import type { Language, LanguageSwitcherProps } from "@repo/types/types";
import { cn } from "../../lib/utils";
import styles from "../../styles/Navbar/languageswitcher.module.css";

const LanguageSwitcher = ({
    languages,
    defLang,
    locale,
    onLocaleChange,
    variant = "desktop",
}: LanguageSwitcherProps & {
    locale: string;
    onLocaleChange: (locale: string) => void;
    variant?: "desktop" | "mobile";
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const activeLocale = locale || defLang;

    const activeLang = useMemo(() => {
        const lang = languages.find((l) => l.code === activeLocale);
        return { code: (lang?.code || activeLocale || "az").toUpperCase() };
    }, [activeLocale, languages]);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
    };

    return (
        <div
            className={styles.wrap}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button type="button" className={styles.trigger} aria-haspopup="listbox" aria-expanded={isOpen}>
                <span>{activeLang.code}</span>
            </button>


                {isOpen && (
                <div className={cn(styles.dropdown, variant === "mobile" && styles.dropdownMobile)}>
                    <div className={styles.dropdownBorder} />
                    {languages.map((lang) => {
                        const isActive = lang.code === activeLocale;
                        const code = lang.code.toUpperCase();
                        return (
                            <button
                                key={lang.id}
                                type="button"
                                className={cn(styles.option, isActive && styles.optionActive)}
                                onClick={() => { onLocaleChange(lang.code); setIsOpen(false); }}
                                role="option"
                                aria-selected={isActive}
                            >
                                {code}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export { LanguageSwitcher };