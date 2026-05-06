"use client";

import React from "react";
import styles from "../../styles/BlogDetail/blogdetailarticle.module.css";

export interface BlogDetailHashSection {
    tag: string;
    paragraphs: string[];
}

export interface BlogDetailArticleSection {
    heading?: string;
    paragraphs?: string[];
    hashSections?: BlogDetailHashSection[];
    sideImage?: string;
    sideImageAlt?: string;
}

export interface BlogDetailArticleUIProps {
    mainTitle: string;
    sections: BlogDetailArticleSection[];
}

export function BlogDetailArticleUI({ mainTitle, sections }: BlogDetailArticleUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <h1 className={styles.mainTitle}>{mainTitle}</h1>

                {sections.map((section, i) => {
                    const hasSide = section.hashSections && section.sideImage;

                    return (
                        <div key={i} className={styles.block}>
                            {section.heading && (
                                <h2 className={styles.heading}>{section.heading}</h2>
                            )}

                            {section.paragraphs?.map((p, j) => (
                                <p key={j} className={styles.paragraph}>{p}</p>
                            ))}

                            {hasSide ? (
                                <div className={styles.twoCol}>
                                    <div className={styles.leftCol}>
                                        {section.hashSections!.map((hs, k) => (
                                            <div key={k} className={styles.hashBlock}>
                                                <h3 className={styles.hashTag}>{hs.tag}</h3>
                                                {hs.paragraphs.map((p, l) => (
                                                    <p key={l} className={styles.paragraph}>{p}</p>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.rightCol}>
                                        <img
                                            src={section.sideImage}
                                            alt={section.sideImageAlt || ""}
                                            className={styles.sideImg}
                                        />
                                    </div>
                                </div>
                            ) : (
                                section.hashSections?.map((hs, k) => (
                                    <div key={k} className={styles.hashBlock}>
                                        <h3 className={styles.hashTag}>{hs.tag}</h3>
                                        {hs.paragraphs.map((p, l) => (
                                            <p key={l} className={styles.paragraph}>{p}</p>
                                        ))}
                                    </div>
                                ))
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}