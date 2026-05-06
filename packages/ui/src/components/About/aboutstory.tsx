"use client";

import React from "react";
import styles from "../../styles/About/aboutstory.module.css";

export interface AboutStoryBlock {
    title: string;
    paragraphs: React.ReactNode[];
    image?: string;
    imageAlt?: string;
}

export interface AboutStoryUIProps {
    blocks: AboutStoryBlock[];
}

export function AboutStoryUI({ blocks }: AboutStoryUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {blocks.map((block, i) => (
                    <div key={i} className={styles.block}>
                        <h2 className={styles.title}>{block.title}</h2>
                        <div className={styles.paragraphs}>
                            {block.paragraphs.map((p, j) => (
                                <p key={j} className={styles.paragraph}>{p}</p>
                            ))}
                        </div>
                        {block.image && (
                            <div className={styles.imageWrap}>
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