"use client";

import React from "react";
import styles from "../../styles/Hero/hero.module.css";


export interface HeroCard {
    label: string;
    image: string;
    bg: string;
    border: string | null;
    borderWidth: number;
}

export interface HeroStat {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

export interface HeroUIProps {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    infoText: React.ReactNode;
    leftCards: { card: HeroCard; pos: number; idx: number }[];
    rightCards: { card: HeroCard; pos: number; idx: number }[];
    displayedImage: string;
    incomingImage: string | null;
    dir: "left" | "right" | null;
    stats: HeroStat[];
    statsTagline?: string;
    onCardClick: (pos: number) => void;
}

export function HeroUI({
    title,
    subtitle,
    infoText,
    leftCards,
    rightCards,
    displayedImage,
    incomingImage,
    dir,
    stats,
    statsTagline,
    onCardClick,
}: HeroUIProps) {
    return (
        <section className={styles.hero}>
            {/* Top */}
            <div className={styles.heroTop}>
                <div className={styles.heroTitle}>
                    <h1 className={styles.heroSub}>{subtitle}</h1>
                    <h2 className={styles.heroMain}>{title}</h2>
                </div>
                <div className={styles.heroInfo}>
                    <span className={styles.heroDiamond}>◆</span>
                    <div>{infoText}</div>
                </div>
            </div>

            {/* Slider */}
            <div className={styles.heroSliderWrapper}>
                {/* Sol kartlar */}
                <div className={styles.heroCardsLeft}>
                    {leftCards.map(({ card, pos, idx }) => (
                        <div
                            key={idx}
                            className={styles.heroSideCard}
                            style={{ background: card.bg } as React.CSSProperties}
                            onClick={() => onCardClick(pos)}
                        >
                            {card.border && (
                                <div
                                    className={styles.cardBorderOverlay}
                                    style={{
                                        "--border-gradient": card.border,
                                        "--border-width": `${card.borderWidth}px`,
                                    } as React.CSSProperties}
                                />
                            )}
                            <span>{card.label}</span>
                        </div>
                    ))}
                </div>

                {/* Aktiv kart */}
                <div className={styles.heroActive}>
                    <img
                        key={`out-${displayedImage}-${dir}`}
                        src={displayedImage}
                        alt="hero"
                        className={`${styles.heroImg} ${
                            dir === "left"
                                ? styles.animOutLeft
                                : dir === "right"
                                ? styles.animOutRight
                                : styles.animStatic
                        }`}
                    />
                    {incomingImage && dir && (
                        <img
                            key={`in-${incomingImage}-${dir}`}
                            src={incomingImage}
                            alt="hero incoming"
                            className={`${styles.heroImg} ${
                                dir === "left" ? styles.animInRight : styles.animInLeft
                            }`}
                        />
                    )}
                </div>

                {/* Sağ kartlar */}
                <div className={styles.heroCardsRight}>
                    {rightCards.map(({ card, pos, idx }) => (
                        <div
                            key={idx}
                            className={styles.heroSideCard}
                            style={{ background: card.bg } as React.CSSProperties}
                            onClick={() => onCardClick(pos)}
                        >
                            {card.border && (
                                <div
                                    className={styles.cardBorderOverlay}
                                    style={{
                                        "--border-gradient": card.border,
                                        "--border-width": `${card.borderWidth}px`,
                                    } as React.CSSProperties}
                                />
                            )}
                            <span>{card.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className={styles.heroStatsWrap}>
                <div className={styles.heroStatsRow}>
                    <div className={styles.heroStatCards}>
                        {stats.map((stat, i) => (
                            <div key={i} className={styles.heroStatCard}>
                                <div className={styles.heroStatIcon}>{stat.icon}</div>
                                <div>
                                    <p className={styles.heroStatLabel}>{stat.label}</p>
                                    <p className={styles.heroStatValue}>{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {statsTagline && (
                        <p className={styles.heroStatsTagline}>{statsTagline}</p>
                    )}
                </div>
                <hr className={styles.heroDivider} />
            </div>
        </section>
    );
}