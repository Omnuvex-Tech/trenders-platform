"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/ServiceDetail/servicedetailoverlay.module.css";

export interface ServiceDetailOverlayUIProps {
    image: string;
    imageAlt?: string;
    badge: string;
    title: string;
    descriptions: string[];
}

const ultraSmoothEase = [0.25, 1, 0.2, 1] as const;

const blockVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 45 
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.6,
            ease: ultraSmoothEase,
        },
    },
};

export function ServiceDetailOverlayUI({
    image,
    imageAlt = "",
    badge,
    title,
    descriptions,
}: ServiceDetailOverlayUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.container}>
                    
                    <motion.div 
                        className={styles.heroImgWrap}
                        variants={blockVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <img
                            src={image}
                            alt={imageAlt}
                            className={styles.heroImg}
                        />
                    </motion.div>

                    <motion.div 
                        className={styles.content}
                        variants={blockVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <div className={styles.contentTop}>
                            <span className={styles.badge}>{badge}</span>
                            <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                        </div>
                        <div className={styles.contentBottom}>
                            {descriptions.map((desc, i) => (
                                <div key={i} className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}