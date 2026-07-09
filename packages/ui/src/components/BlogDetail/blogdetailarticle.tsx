"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/BlogDetail/blogdetailarticle.module.css";

export interface BlogDetailHashSection {
  tag: string;
  paragraphs: string[];
}

export type BlogDetailBlock =
  | { type: "heading"; content: string }
  | { type: "paragraph"; content: string };

export interface BlogDetailArticleSection {
  blocks?: BlogDetailBlock[];
  hashHeading?: string;
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

const blockFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 16
    }
  }
};

const sideImageAnimation: Variants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 16
    }
  }
};

const hashtagContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const hashtagItem: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 14 }
  }
};

function normalizeBlocks(section: BlogDetailArticleSection): BlogDetailBlock[] {
  if (section.blocks && section.blocks.length > 0) return section.blocks;
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
            <motion.div 
              key={i} 
              variants={blockFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8%" }}
              className={styles.block}
            >
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
              {section.hashSections && section.hashSections.length > 0 && (
                <>
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
                      
                      <motion.div 
                        variants={sideImageAnimation}
                        className={styles.rightCol}
                      >
                        <img
                          src={section.sideImage}
                          alt={section.sideImageAlt ?? ""}
                          className={styles.sideImg}
                        />
                      </motion.div>
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
            </motion.div>
          );
        })}

        {hashtags && hashtags.length > 0 && (
          <motion.div 
            variants={hashtagContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.hashtags}
          >
            {hashtags.map((tag, i) => (
              <motion.span 
                key={i} 
                variants={hashtagItem}
                className={styles.hashtag}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}