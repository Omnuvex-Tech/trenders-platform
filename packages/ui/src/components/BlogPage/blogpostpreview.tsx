"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/BlogPage/blogpostpreview.module.css";

export interface BlogDetailAuthor {
    name: string;
    avatar: string;
    href?: string;
}

export interface BlogDetailHeroUIProps {
    href?: string;
    image: string;
    gif?: string;
    imageAlt?: string;
    overlayBadge: string;
    overlayTitle: string;
    badge: string;
    title: string;
    description: string;
    author: BlogDetailAuthor;
    date: string;
}

const imageAnimation: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 18,
        }
    }
};

const contentAnimation: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 18,
            delay: 0.1
        }
    }
};

const hoverVariant: Variants = {
    hover: {
        y: -4,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 16,
            mass: 0.4
        }
    }
};

export function BlogDetailHeroUI({
    href = "#",
    image,
    imageAlt = "",
    overlayBadge,
    overlayTitle,
    badge,
    title,
    gif,
    description,
    author,
    date,
}: BlogDetailHeroUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.card}>
                    <motion.div
                        variants={imageAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.imageWrap}
                        style={{ display: "block" }}
                    >
                        <Link href={href}>
                            <img src={image} alt={imageAlt} className={`${styles.image} ${gif ? styles.imageStatic : ""}`} />
                            {gif && (
                                gif.toLowerCase().endsWith('.mp4') ? (
                                    <video
                                        src={gif}
                                        className={`${styles.image} ${styles.imageGif}`} 
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={gif}
                                        alt=""
                                        className={`${styles.image} ${styles.imageGif}`} 
                                    />
                                )
                            )}
                        </Link>
                    </motion.div>
                    <motion.div 
                        variants={contentAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={styles.content}
                    >
                        <span className={styles.badge}>{badge}</span>
                        
                        <Link href={href} className={styles.titleLink}>
                            <motion.span variants={hoverVariant} style={{ display: "none" }} />
                            
                            <motion.div 
                                className={styles.title} 
                                dangerouslySetInnerHTML={{ __html: title }} 
                                whileHover="hover"
                            />
                        </Link>
                        
                        <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
                        
                        <div className={styles.meta} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {author.href ? (
                                <Link href={author.href} className={styles.authorLink} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <img src={author.avatar} alt={author.name} className={styles.avatar} />
                                    <div className={styles.authorInfo}>
                                        <span className={styles.authorName}>{author.name}</span>
                                        <span className={styles.date}>{date}</span>
                                    </div>
                                </Link>
                            ) : (
                                <>
                                    <img src={author.avatar} alt={author.name} className={styles.avatar} />
                                    <div className={styles.authorInfo}>
                                        <span className={styles.authorName}>{author.name}</span>
                                        <span className={styles.date}>{date}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}