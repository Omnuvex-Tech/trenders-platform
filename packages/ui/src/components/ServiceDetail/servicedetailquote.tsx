"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/ServiceDetail/servicedetailquote.module.css";

export interface ServiceDetailQuoteUIProps {
    number: string;
    badge: string;
    title: string;
    descriptions: string[];
    quoteImage: string;
    quoteImageAlt?: string;
    quoteText: string;
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

export function ServiceDetailQuoteUI({
    number,
    badge,
    title,
    descriptions,
    quoteImage,
    quoteImageAlt = "",
    quoteText,
}: ServiceDetailQuoteUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                
                <motion.div 
                    className={styles.row}
                    variants={blockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    style={{ willChange: "transform, opacity" }}
                >
                    <span className={styles.number}>
                        {number}
                    </span>
                    
                    <div className={styles.content}>
                        <span className={styles.badge}>
                            {badge}
                        </span>
                        <div 
                            className={styles.title} 
                            dangerouslySetInnerHTML={{ __html: title }} 
                        />
                        {descriptions.map((desc, i) => (
                            <div 
                                key={i} 
                                className={styles.desc} 
                                dangerouslySetInnerHTML={{ __html: desc }} 
                            />
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    className={styles.quoteBlock}
                    variants={blockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    style={{ willChange: "transform, opacity" }}
                >
                    <div className={styles.imgWrap}>
                        <img
                            src={quoteImage}
                            alt={quoteImageAlt}
                            className={styles.img}
                        />
                    </div>

                    <div className={styles.quoteTextWrap}>
                        <div className={styles.quoteText} dangerouslySetInnerHTML={{ __html: quoteText }} />
                        <span className={styles.quoteMark}>"</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}