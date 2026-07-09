
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/PortfolioDetail/portfoliodetailoverlay.module.css";

export interface PortfolioDetailOverlayUIProps {
    image: string;
    imageAlt?: string;
    badge: string;
    title: string;
    descriptions: (string | React.ReactNode)[];
}

const overlayContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, 
        },
    },
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.215, 0.610, 0.355, 1.000],
        },
    },
};

const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 60,
            damping: 15,
            duration: 0.6,
        },
    },
};

export function PortfolioDetailOverlayUI({
    image,
    imageAlt = "",
    badge,
    title,
    descriptions,
}: PortfolioDetailOverlayUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>           
                <motion.div 
                    className={styles.container}
                    variants={overlayContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-12%" }}
                >
                    <motion.img 
                        src={image} 
                        alt={imageAlt} 
                        className={styles.heroImg} 
                        variants={imageVariants}
                    />

                    <motion.div className={styles.content} variants={contentVariants}>
                        <div className={styles.contentTop}>
                            <span className={styles.badge}>{badge}</span>
                            <div
                                className={styles.title}
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                        </div>

                        <div className={styles.contentBottom}>
                            {descriptions.map((desc, i) =>
                                typeof desc === "string" ? (
                                    <div
                                        key={i}
                                        className={styles.desc}
                                        dangerouslySetInnerHTML={{ __html: desc }}
                                    />
                                ) : (
                                    <div key={i} className={styles.desc}>{desc}</div>
                                )
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}