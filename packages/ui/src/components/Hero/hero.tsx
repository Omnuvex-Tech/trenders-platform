
"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/Hero/hero.module.css";

export interface HeroCard {
    label: string;
    image: string;
}

export interface HeroUIProps {
    title: React.ReactNode;    
    infoText: React.ReactNode;
    primaryBtnText: string;
    secondaryBtnText: string;  
    visibleCards: HeroCard[];
    currentIndex: number;
    onDetailClick: (label: string) => void;
}

export function HeroUI({
    title,
    infoText,
    primaryBtnText,
    secondaryBtnText,
    visibleCards,
    currentIndex,
    onDetailClick,
}: HeroUIProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <section className={styles.hero}>
            
            {/* SOL YAZI VƏ DÜYMƏ BLOKU */}
            <div className={styles.heroLeft}>
                <div className={styles.heroTitle}>
                    <h1 className={styles.heroMain}>{title}</h1>
                </div>
                
                <div className={styles.heroInfo}>
                    {infoText}
                </div>

                <div className={styles.heroButtonGroup}>
                    <button className={styles.btnPrimary}>
                        {primaryBtnText}
                    </button>
                    
                    <button className={styles.btnSecondary}>
                        <span>{secondaryBtnText}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.heroSliderTrack}>
                <div 
                    className={styles.heroSliderContainer}
                    style={{
                        transform: `translateX(-${currentIndex * (342 + 24)}px)`
                    }}
                >
                    {visibleCards.map((card, idx) => {
                        return (
                            <div key={`${card.label}-${idx}`} className={styles.heroCardItem}>
                                <img src={card.image} alt={card.label} className={styles.heroImg} />
                                <div className={styles.cardLabel}>{card.label}</div>
                                
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