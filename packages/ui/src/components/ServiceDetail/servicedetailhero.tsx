
"use client";

import styles from "../../styles/ServiceDetail/servicedetailhero.module.css";
import React, { useEffect, useRef, useState } from "react";

export interface ServiceDetailStat {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

export interface ServiceDetailHeroUIProps {
    heroImage: string;
    badge: string;
    title: string;
    descriptions: string[];
    stats: ServiceDetailStat[];
    quoteText: string;
    bottomImage: string;
    bottomImageAlt?: string;
}


function useRevealOnScroll<T extends HTMLElement>(threshold = 0.15) {
    const ref = useRef<T | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    useEffect(() => {
        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                setIsVisible(true);
            }
        };
        window.addEventListener("pageshow", handlePageShow);
        return () => window.removeEventListener("pageshow", handlePageShow);
    }, []);

    return { ref, isVisible };
}

export function ServiceDetailHeroUI({
    heroImage,
    badge,
    title,
    descriptions,
    stats,
    quoteText,
    bottomImage,
    bottomImageAlt = "",
}: ServiceDetailHeroUIProps) {
    const hero = useRevealOnScroll<HTMLDivElement>();
    const overlay = useRevealOnScroll<HTMLDivElement>();
    const quote = useRevealOnScroll<HTMLDivElement>();
    const bottom = useRevealOnScroll<HTMLDivElement>();

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div
                    ref={hero.ref}
                    className={`${styles.heroWrap} ${styles.revealItem} ${hero.isVisible ? styles.visible : ""}`}
                >
                    <img src={heroImage} alt={title} className={styles.heroImg} />
                </div>
                <div
                    ref={overlay.ref}
                    className={styles.overlayWrap}
                >
                    <div className={styles.overlay}>
                        <span
                            className={`${styles.badge} ${styles.revealItem} ${overlay.isVisible ? styles.visible : ""}`}
                            style={{ transitionDelay: "0.05s" }}
                        >
                            {badge}
                        </span>
                        <div
                            className={`${styles.title} ${styles.revealItem} ${overlay.isVisible ? styles.visible : ""}`}
                            style={{ transitionDelay: "0.15s" }}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                        {descriptions.map((d, i) => (
                            <div
                                key={i}
                                className={`${styles.desc} ${styles.revealItem} ${overlay.isVisible ? styles.visible : ""}`}
                                style={{ transitionDelay: `${0.25 + i * 0.1}s` }}
                                dangerouslySetInnerHTML={{ __html: d }}
                            />
                        ))}
                    </div>
                </div>

                <div
                    ref={quote.ref}
                    className={`${styles.quoteWrap} ${styles.revealItem} ${quote.isVisible ? styles.visible : ""}`}
                >
                    <span className={styles.quoteIcon}>"</span>
                    <div className={styles.quoteText} dangerouslySetInnerHTML={{ __html: quoteText as string }} />
                </div>

                <div
                    ref={bottom.ref}
                    className={`${styles.bottomWrap} ${styles.revealItem} ${bottom.isVisible ? styles.visible : ""}`}
                >
                    <img src={bottomImage} alt={bottomImageAlt} className={styles.bottomImg} />
                </div>
            </div>
        </section>
    );
}