

"use client";

import React from "react";
import styles from "../../styles/Hero/hero.module.css";

export interface HeroCard {
    label: string;
    image: string;
}

export interface HeroUIProps {
    title: string;
    infoText: string;
    primaryBtnText: string;
    secondaryBtnText: string;
    visibleCards: HeroCard[];
    currentIndex: number;
    onDetailClick: (label: string) => void;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
}

export function HeroUI({
    title, infoText, primaryBtnText, secondaryBtnText,
    visibleCards, onPrimaryClick, onDetailClick, onSecondaryClick,
}: HeroUIProps) {
    const CARD_WIDTH = 342;
    const GAP = 24;
    const STEP = CARD_WIDTH + GAP;
    const baseCount = Math.ceil(visibleCards.length / 2);
    const displayCards = visibleCards.slice(0, baseCount);
    const totalCards = displayCards.length;
    const totalWidth = totalCards * STEP;
   const duration = totalCards * 5;

    return (
        <section className={styles.hero}>
            <div className={styles.heroLeft}>
                <div
                    className={`${styles.heroTitle} ${styles.heroReveal} ${styles.heroReveal1}`}
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <div
                    className={`${styles.heroInfo} ${styles.heroReveal} ${styles.heroReveal2}`}
                    dangerouslySetInnerHTML={{ __html: infoText }}
                />
                <div className={`${styles.heroButtonGroup} ${styles.heroReveal} ${styles.heroReveal3}`}>
                    <button className={styles.btnPrimary} onClick={onPrimaryClick}>
                        {primaryBtnText}
                    </button>
                    <button className={styles.btnSecondary} onClick={onSecondaryClick}>
                        <span>{secondaryBtnText}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.heroSliderTrack}>
                <div
                    className={styles.heroSliderContainer}
                    style={{
                        animationDuration: `${duration}s`,
                        // CSS var ile total width ver
                        ["--total-width" as any]: `${totalWidth}px`,
                    }}
                >
                    {[...displayCards, ...displayCards].map((card, idx) => (
                        <div key={idx} className={styles.heroCardItem}>
                            <img src={card.image} alt={card.label} className={styles.heroImg} />
                            <div className={styles.cardLabel}
                                dangerouslySetInnerHTML={{ __html: card.label }} />
                            <div className={styles.cardActionContainer}>
                                <button
                                    className={styles.actionButton}
                                    onClick={(e) => { e.stopPropagation(); onDetailClick(card.label); }}
                                    aria-label={`${card.label} detallarına bax`}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="3"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className={styles.actionArrow}>
                                        <line x1="7" y1="17" x2="17" y2="7" />
                                        <polyline points="7 7 17 7 17 17" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}