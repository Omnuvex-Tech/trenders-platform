"use client";

import React from "react";
import styles from "../../styles/Hero/hero.module.css";

export interface HeroCard {
    label: string;
    image: string;
}

export interface HeroUIProps {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    infoText: React.ReactNode;
    visibleCards: HeroCard[];
    currentIndex: number;
    onDetailClick: (label: string) => void;
}

export function HeroUI({
    title,
    subtitle,
    infoText,
    visibleCards,
    currentIndex,
    onDetailClick,
}: HeroUIProps) {
    const activeCardLabel = visibleCards[currentIndex]?.label || "Branding";

    return (
        <section className={styles.hero}>
            
            {/* SOL BLOK */}
            <div className={styles.heroLeft}>
                <div className={styles.heroTitle}>
                    <h1 className={styles.heroSub}>{subtitle}</h1>
                    <h2 className={styles.heroMain}>{title}</h2>
                </div>
                
                <div className={styles.heroInfo}>
                    {infoText}
                </div>

                <div className={styles.heroButtonGroup}>
                    <button className={styles.btnPrimary}>Bizimlə əlaqə</button>
                    <button className={styles.btnSecondary}>
                        <span>{activeCardLabel}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            {/* SAĞ BLOK */}
            <div className={styles.heroSliderTrack}>
                <div 
                    className={styles.heroSliderContainer}
                    style={{
                        transform: `translateX(-${currentIndex * (290 + 24)}px)`
                    }}
                >
                    {visibleCards.map((card, idx) => {
                        return (
                            <div key={idx} className={styles.heroCardItem}>
                                <img src={card.image} alt={card.label} className={styles.heroImg} />
                                <div className={styles.cardLabel}>{card.label}</div>
                                
                                {/* ─── MAVİ BORDER TAMAMİLƏ SİLİNDİ ─── */}
                                
                                {/* Figmadakı mövqeyi tam tənzimlənmiş oyuq və düymə */}
                                <div className={styles.cardActionContainer}>
                                    <button 
                                        className={styles.actionButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDetailClick(card.label);
                                        }}
                                        aria-label={`${card.label} detallarına bax`}
                                    >
                                        <svg 
                                            width="18" 
                                            height="18" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="3" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            className={styles.actionArrow}
                                        >
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </section>
    );
}