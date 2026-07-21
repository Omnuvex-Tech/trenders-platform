"use client";

import { motion, Variants } from "framer-motion";
import styles from "../../styles/ServiceDetail/servicedetailcontent.module.css";

export interface ServiceDetailContentItem {
    number: string;
    badge: string;
    title: string;
    descriptions: string[];
    quote: string;
    quoteImage: string;
    subText?: string;
    image?: string;
    imageAlt?: string;
    contactLabel?: string;
}

export interface ServiceDetailContentUIProps {
    items: ServiceDetailContentItem[];
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

export function ServiceDetailContentUI({ items }: ServiceDetailContentUIProps) {
    const handleScrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {items.map((item, i) => (
                    <div key={i} className={styles.block}>
                                                <motion.div 
                            className={styles.row}
                            variants={blockVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            style={{ willChange: "transform, opacity" }}
                        >
                            <span className={styles.number}>
                                {item.number}
                            </span>

                            <div className={styles.content}>
                                <span className={styles.badge}>
                                    {item.badge}
                                </span>

                                <div
                                    className={styles.title}
                                    dangerouslySetInnerHTML={{ __html: item.title }}
                                />

                                {item.descriptions.map((desc, j) => (
                                    <div
                                        key={j}
                                        className={styles.desc}
                                        dangerouslySetInnerHTML={{ __html: desc }}
                                    />
                                ))}

                                {item.contactLabel && (
                                    <button
                                        className={styles.contactBtn}
                                        onClick={handleScrollToContact}
                                    >
                                        {item.contactLabel}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                        {item.quote && (
                            <motion.div 
                                className={styles.quoteSection}
                                variants={blockVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                style={{ willChange: "transform, opacity" }}
                            >
                                <div className={styles.quoteText}>
                                    <div className={styles.quoteInner}>
                                        <span className={styles.quoteMark}>"</span>
                                        <div 
                                            className={styles.quoteLight}
                                            dangerouslySetInnerHTML={{ __html: item.quote }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.quoteImgWrap}>
                                    <img src={item.quoteImage} alt="Quote side" className={styles.quoteImg} />
                                </div>
                            </motion.div>
                        )}
                        {item.subText && (
                            <motion.div
                                className={styles.subText}
                                variants={blockVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                style={{ willChange: "transform, opacity" }}
                                dangerouslySetInnerHTML={{ __html: item.subText }}
                            />
                        )}
                        {item.image && (
                            <motion.div 
                                className={styles.imageWrap}
                                variants={blockVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                style={{ willChange: "transform, opacity" }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.imageAlt || ""}
                                    className={styles.image}
                                />
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}