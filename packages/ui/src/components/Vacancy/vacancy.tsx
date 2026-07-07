

"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/Vacancy/vacancy.module.css";

export interface VacancyItem {
    id: number;
    date: string;
    closingDate?: string;
    isNew?: boolean;
    newLabel?: string;
    title: string;
    filterTagLabels: string[]; 
    detailLabel?: string;
    detailHref?: string;
    category: string;
}

export interface VacancyUIProps {
    title: string;
    filterTags: string[];
    dropdownLabel?: string;
    dropdownOptions: string[];
    vacancies: VacancyItem[];
}

// Üst başlıq və filtrlərin axıcı gəlişi üçün konteyner
const headerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Yazıların və kartların focal.inc üslubunda yayvari (spring) sürüşmə animasiyası
const generalItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 65,
            damping: 15,
            duration: 0.5,
        },
    },
};

export function VacancyUI({
    title,
    filterTags,
    dropdownLabel = "Vakansiya seçin",
    dropdownOptions,
    vacancies,
}: VacancyUIProps) {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!dropdownOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [dropdownOpen]);

    const filtered = vacancies.filter((v) => {
        if (selectedOption) return v.category === selectedOption;
        if (activeFilter) return v.filterTagLabels.includes(activeFilter);
        return true;
    });

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                
                {/* 1. HİSSƏ: Başlıq və Filtrlər bloku. Ekrana girdiyi an kartları gözləmədən dərhal açılır */}
                <motion.div 
                    className={styles.header}
                    variants={headerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-5%" }}
                >
                    <motion.h2 variants={generalItemVariants} className={styles.title}>
                        {title}
                    </motion.h2>
                    
                    <motion.div variants={generalItemVariants} className={styles.filters}>
                        {filterTags.map((tag) => (
                            <button
                                key={tag}
                                className={`${styles.filterTag} ${activeFilter === tag ? styles.filterTagActive : ""}`}
                                onClick={() => {
                                    setActiveFilter(activeFilter === tag ? null : tag);
                                    setSelectedOption(null);
                                }}
                            >
                                {tag}
                            </button>
                        ))}

                        <div className={styles.dropdownWrap} ref={dropdownRef}>
                            <button
                                className={`${styles.dropdownBtn} ${dropdownOpen ? styles.dropdownBtnOpen : ""}`}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {selectedOption || dropdownLabel}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div className={styles.dropdownList}>
                                    <div className={styles.dropdownInner}>
                                        {dropdownOptions.map((opt) => (
                                            <button
                                                key={opt}
                                                className={`${styles.dropdownOption} ${selectedOption === opt ? styles.dropdownOptionActive : ""}`}
                                                onClick={() => {
                                                    setSelectedOption(selectedOption === opt ? null : opt);
                                                    setActiveFilter(null);
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>

                {/* 2. HİSSƏ: Vakansiyalar Qridi. Hər bir kart fərdi olaraq ekranda görünən anda tetiklenir */}
                <div className={styles.grid}>
                    {filtered.map((vacancy) => (
                        <motion.div 
                            key={vacancy.id} 
                            className={styles.card}
                            variants={generalItemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }} // Hər fərdi kart ekran sahəsinə girdiyi an animasiya olunur
                        >
                            {vacancy.isNew && vacancy.newLabel && (
                                <span className={styles.newBadge}>{vacancy.newLabel}</span>
                            )}
                            <div className={styles.cardTop}>
                                <span className={styles.cardDate}>{vacancy.date}</span>
                                {vacancy.closingDate && (
                                    <span className={styles.cardClosingDate}>
                                        {vacancy.closingDate}
                                    </span>
                                )}
                            </div>
                            <h3 className={styles.cardTitle}>{vacancy.title}</h3>
                            <div className={styles.tagList}>
                                {vacancy.filterTagLabels.map((label, i) => (
                                    <span key={i} className={styles.tag}>{label}</span>
                                ))}
                            </div>
                            <div className={styles.cardBottom}>
                                <a href={vacancy.detailHref || "#"} className={styles.detailLink}>
                                    {vacancy.detailLabel}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}