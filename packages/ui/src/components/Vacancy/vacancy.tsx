"use client";

import React, { useState } from "react";
import styles from "../../styles/Vacancy/vacancy.module.css";

export interface VacancyTag {
    label: string;
}

export interface VacancyItem {
    id: number;
    date: string;
    isNew?: boolean;
    title: string;
    tags: VacancyTag[];
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

    const filtered = vacancies.filter((v) => {
        if (selectedOption) return v.category === selectedOption;
        if (activeFilter) return v.category === activeFilter;
        return true;
    });

    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.filters}>
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

                        <div className={styles.dropdownWrap}>
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
                            )}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className={styles.grid}>
                    {filtered.map((vacancy) => (
                        <div key={vacancy.id} className={styles.card}>
                            {vacancy.isNew && (
                                <span className={styles.newBadge}>NEW</span>
                            )}
                            <div className={styles.cardTop}>
                                <span className={styles.cardDate}>{vacancy.date}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{vacancy.title}</h3>
                            <div className={styles.tagList}>
                                {vacancy.tags.map((tag, i) => (
                                    <span key={i} className={styles.tag}>{tag.label}</span>
                                ))}
                            </div>
                            <div className={styles.cardBottom}>
                                <a href={vacancy.detailHref || "#"} className={styles.detailLink}>
                                    {vacancy.detailLabel || "DAHA ƏTRAFLΙ"}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}