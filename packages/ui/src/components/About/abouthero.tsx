"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/About/abouthero.module.css";

export interface AboutHeroStat {
    icon?: string;
    label: string;
    value: string;
}

export interface AboutHeroUIProps {
    heroImage: string;
    heroImageAlt?: string;
    badge: string;
    title: string;
    paragraphs: string[];
    stats?: AboutHeroStat[];
}

function useCountUp(target: number, shouldStart: boolean, duration = 1400) {
    const [value, setValue] = useState(0);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!shouldStart || startedRef.current) return;
        startedRef.current = true;

        let startTime: number | null = null;
        let rafId: number;

        const step = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));

            if (progress < 1) {
                rafId = requestAnimationFrame(step);
            }
        };

        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [shouldStart, target, duration]);

    return value;
}

function AnimatedStatValue({ value, shouldStart }: { value: string; shouldStart: boolean }) {
    const match = value.match(/^(\D*)(\d+)(\D*)$/);

    if (!match) {
        return <span className={styles.statValue}>{value}</span>;
    }

    const prefix = match[1] ?? "";
    const numberStr = match[2] ?? "0";
    const suffix = match[3] ?? "";
    const target = parseInt(numberStr, 10);
    const count = useCountUp(target, shouldStart);

    return (
        <span className={styles.statValue}>
            {prefix}
            {count}
            {suffix}
        </span>
    );
}

export function AboutHeroUI({
    heroImage, heroImageAlt = "", badge, title, paragraphs, stats = [],
}: AboutHeroUIProps) {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const statsBarRef = useRef<HTMLDivElement | null>(null);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const el = innerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item, i) => {
                        setTimeout(() => {
                            item.classList.add(styles.revealVisible!);
                        }, i * 120);
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const el = statsBarRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setStatsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.inner} ref={innerRef}>

                <div
                    data-reveal
                    className={`${styles.heroWrap} ${styles.reveal}`}
                >
                    <img src={heroImage} alt={heroImageAlt} className={styles.heroImg} />
                </div>

                <div className={styles.content}>
                    <div className={styles.left}>
                        <span
                            data-reveal
                            className={`${styles.badge} ${styles.reveal}`}
                        >
                            {badge}
                        </span>
                        <h1
                            data-reveal
                            className={`${styles.title} ${styles.reveal}`}
                        >
                            {title}
                        </h1>

                        {paragraphs.map((p, i) => (
                            <div
                                key={i}
                                data-reveal
                                className={`${styles.paragraph} ${styles.reveal}`}
                                dangerouslySetInnerHTML={{ __html: p }}
                            />
                        ))}
                    </div>

                    {stats.length > 0 && (
                        <div className={styles.right}>
                            <div
                                ref={statsBarRef}
                                data-reveal
                                className={`${styles.statsBar} ${styles.reveal}`}
                            >
                                {stats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className={styles.statItem}
                                    >
                                        <AnimatedStatValue value={stat.value} shouldStart={statsVisible} />
                                        <div className={styles.statBottom}>
                                            {stat.icon && (
                                                stat.icon.startsWith("http") || stat.icon.startsWith("/")
                                                    ? <img src={stat.icon} alt="" className={styles.statIcon} />
                                                    : <span className={styles.statIcon}>{stat.icon}</span>
                                            )}
                                            <span className={styles.statLabel}>{stat.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}