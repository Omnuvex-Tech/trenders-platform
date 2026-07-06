// "use client";

// import React from "react";
// import styles from "../../styles/ServiceDetail/servicedetailcontent.module.css";

// export interface ServiceDetailContentItem {
//     number: string;
//     badge: string;
//     title: string;
//     descriptions: string[];
//     quote: string;
//     quoteImage: string;
//     subText?: string;
//     image?: string;
//     imageAlt?: string;
//     contactLabel?: string;
// }

// export interface ServiceDetailContentUIProps {
//     items: ServiceDetailContentItem[];
// }

// export function ServiceDetailContentUI({ items }: ServiceDetailContentUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 {items.map((item, i) => (
//                     <div key={i} className={styles.block}>
//                         <div className={styles.row}>
//                             <span className={styles.number}>{item.number}</span>
//                             <div className={styles.content}>
//                                 <span className={styles.badge}>{item.badge}</span>
//                                 <div className={styles.title} dangerouslySetInnerHTML={{ __html: item.title }} />
//                                 {item.descriptions.map((desc, j) => (
//                                     <div key={j} className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />
//                                 ))}
//                                 {item.contactLabel && (
//                                     <button
//                                         className={styles.contactBtn}
//                                         onClick={() => {
//                                             document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
//                                         }}
//                                     >
//                                         {item.contactLabel}
//                                     </button>
//                                 )}
//                             </div>
//                         </div>

//                         {item.quote && (
//                             <div className={styles.quoteSection}>
//                                 <div className={styles.quoteText}>
//                                     <div className={styles.quoteInner}>
//                                         <span className={styles.quoteMark}>"</span>
//                                         <div className={styles.quoteLight} dangerouslySetInnerHTML={{ __html: item.quote ?? '' }} />
//                                     </div>
//                                 </div>
//                                 <div className={styles.quoteImgWrap}>
//                                     <img src={item.quoteImage} alt="Quote side" className={styles.quoteImg} />
//                                 </div>
//                             </div>
//                         )}

//                         {item.subText && (
//                             <div className={styles.subText} dangerouslySetInnerHTML={{ __html: item.subText as string }} />
//                         )}

//                         {item.image && (
//                             <div className={styles.imageWrap}>
//                                 <img
//                                     src={item.image}
//                                     alt={item.imageAlt || ""}
//                                     className={styles.image}
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }







"use client";

import React from "react";
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

// Tipləri Framer Motion-un öz "Variants" tipi ilə təyin edirik
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
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
                    <motion.div
                        key={i}
                        className={styles.block}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                    >
                        <div className={styles.row}>
                            <motion.span variants={itemVariants} className={styles.number}>
                                {item.number}
                            </motion.span>

                            <div className={styles.content}>
                                <motion.span variants={itemVariants} className={styles.badge}>
                                    {item.badge}
                                </motion.span>

                                <motion.div
                                    variants={itemVariants}
                                    className={styles.title}
                                    dangerouslySetInnerHTML={{ __html: item.title }}
                                />

                                {item.descriptions.map((desc, j) => (
                                    <motion.div
                                        key={j}
                                        variants={itemVariants}
                                        className={styles.desc}
                                        dangerouslySetInnerHTML={{ __html: desc }}
                                    />
                                ))}

                                {item.contactLabel && (
                                    <motion.button
                                        variants={itemVariants}
                                        className={styles.contactBtn}
                                        onClick={handleScrollToContact}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {item.contactLabel}
                                    </motion.button>
                                )}
                            </div>
                        </div>

                        {item.quote && (
                            <motion.div variants={itemVariants} className={styles.quoteSection}>
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
                                variants={itemVariants}
                                className={styles.subText}
                                dangerouslySetInnerHTML={{ __html: item.subText }}
                            />
                        )}

                        {item.image && (
                            <motion.div variants={itemVariants} className={styles.imageWrap}>
                                <img
                                    src={item.image}
                                    alt={item.imageAlt || ""}
                                    className={styles.image}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}