"use client";

import React from "react";
import styles from "../../styles/BlogDetail/blogdetailarticle.module.css";

export interface BlogDetailHashSection {
  tag: string;
  paragraphs: string[];
}

export type BlogDetailBlock =
  | { type: "heading"; content: string }
  | { type: "paragraph"; content: string };

export interface BlogDetailArticleSection {
  /** New format */
  blocks?: BlogDetailBlock[];
  hashHeading?: string;
  /** Legacy fallback */
  heading?: string;
  paragraphs?: string[];
  hashSections?: BlogDetailHashSection[];
  sideImage?: string;
  sideImageAlt?: string;
}

export interface BlogDetailArticleUIProps {
  sections: BlogDetailArticleSection[];
  hashtags?: string[];
}

/** Normalize: support both old and new section formats */
function normalizeBlocks(section: BlogDetailArticleSection): BlogDetailBlock[] {
  if (section.blocks && section.blocks.length > 0) return section.blocks;
  // Legacy fallback
  const blocks: BlogDetailBlock[] = [];
  if (section.heading) blocks.push({ type: "heading", content: section.heading });
  for (const p of section.paragraphs ?? []) {
    if (p) blocks.push({ type: "paragraph", content: p });
  }
  return blocks;
}

export function BlogDetailArticleUI({ sections, hashtags }: BlogDetailArticleUIProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {sections.map((section, i) => {
          const blocks = normalizeBlocks(section);
          const hasSide = section.hashSections?.length && section.sideImage;

          return (
            <div key={i} className={styles.block}>

              {/* Blocks: heading / paragraph */}
              {blocks.map((block, j) =>
                block.type === "heading" ? (
                  <div
                    key={j}
                    className={styles.heading}
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                ) : (
                  <div
                    key={j}
                    className={styles.paragraph}
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                )
              )}

              {/* Hash bölmələri */}
              {section.hashSections && section.hashSections.length > 0 && (
                <>
                  {/* Ümumi hash başlığı */}
                  {section.hashHeading && (
                    <div
                      className={styles.heading}
                      dangerouslySetInnerHTML={{ __html: section.hashHeading }}
                    />
                  )}

                  {hasSide ? (
                    <div className={styles.twoCol}>
                      <div className={styles.leftCol}>
                        {section.hashSections.map((hs, k) => (
                          <div key={k} className={styles.hashBlock}>
                            <div
                              className={styles.hashTag}
                              dangerouslySetInnerHTML={{ __html: hs.tag }}
                            />
                            {hs.paragraphs.map((p, l) => (
                              <div
                                key={l}
                                className={styles.paragraph}
                                dangerouslySetInnerHTML={{ __html: p }}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className={styles.rightCol}>
                        <img
                          src={section.sideImage}
                          alt={section.sideImageAlt ?? ""}
                          className={styles.sideImg}
                        />
                      </div>
                    </div>
                  ) : (
                    section.hashSections.map((hs, k) => (
                      <div key={k} className={styles.hashBlock}>
                        <div
                          className={styles.hashTag}
                          dangerouslySetInnerHTML={{ __html: hs.tag }}
                        />
                        {hs.paragraphs.map((p, l) => (
                          <div
                            key={l}
                            className={styles.paragraph}
                            dangerouslySetInnerHTML={{ __html: p }}
                          />
                        ))}
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          );
        })}

        {hashtags && hashtags.length > 0 && (
          <div className={styles.hashtags}>
            {hashtags.map((tag, i) => (
              <span key={i} className={styles.hashtag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}