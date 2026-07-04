"use client";

import React, { useEffect, useRef } from "react";
import styles from "../../styles/About/aboutstory.module.css";

export interface AboutStoryBlock {
    title: string;
    paragraphs: string[];
    image?: string;
    imageAlt?: string;
}

export interface AboutStoryUIProps {
    blocks: AboutStoryBlock[];
}

export function AboutStoryUI({ blocks }: AboutStoryUIProps) {
    const innerRef = useRef<HTMLDivElement | null>(null);

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

    return (
        <section className={styles.section}>
            <div className={styles.inner} ref={innerRef}>
                {blocks.map((block, i) => (
                    <div key={i} className={styles.block}>
                        <h2
                            data-reveal
                            className={`${styles.title} ${styles.reveal}`}
                        >
                            {block.title}
                        </h2>
                        <div className={styles.paragraphs}>
                            {block.paragraphs.map((p, j) => (
                                <div
                                    key={j}
                                    data-reveal
                                    className={`${styles.paragraph} ${styles.reveal}`}
                                    dangerouslySetInnerHTML={{ __html: p }}
                                />
                            ))}
                        </div>
                        {block.image && (
                            <div
                                data-reveal
                                className={`${styles.imageWrap} ${styles.reveal}`}
                            >
                                <img
                                    src={block.image}
                                    alt={block.imageAlt || ""}
                                    className={styles.image}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}