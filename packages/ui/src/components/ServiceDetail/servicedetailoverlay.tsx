// "use client";

// import styles from "../../styles/ServiceDetail/servicedetailoverlay.module.css";

// export interface ServiceDetailOverlayUIProps {
//     image: string;
//     imageAlt?: string;
//     badge: string;
//     title: string;
//     descriptions: string[];
// }

// export function ServiceDetailOverlayUI({
//     image,
//     imageAlt = "",
//     badge,
//     title,
//     descriptions,
// }: ServiceDetailOverlayUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 <div className={styles.container}>
//                     <div className={styles.heroImgWrap}>
//                         <img
//                             src={image}
//                             alt={imageAlt}
//                             className={styles.heroImg}
//                         />
//                     </div>
//                     <div className={styles.content}>
//                         <div className={styles.contentTop}>
//                             <span className={styles.badge}>{badge}</span>
//                             <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
//                         </div>
//                         <div className={styles.contentBottom}>
//                             {descriptions.map((desc, i) => (
//                                 <div key={i} className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }





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

// Konteyner animasiya variantı (Ardıcıl açılış üçün)
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Alt elementlər 0.15 saniyə fərqlə gəlir
        },
    },
};

// Elementlərin fərdi animasiya variantı (Focal.inc fade-in/reveal tərzi)
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

export function ServiceDetailOverlayUI({
    image,
    imageAlt = "",
    badge,
    title,
    descriptions,
}: ServiceDetailOverlayUIProps) {
    return (
        <section className={styles.section}>
            <motion.div 
                className={styles.inner}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className={styles.container}>
                    <motion.div variants={itemVariants} className={styles.heroImgWrap}>
                        <img
                            src={image}
                            alt={imageAlt}
                            className={styles.heroImg}
                        />
                    </motion.div>
                   <motion.div variants={itemVariants} className={styles.content}>
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
            </motion.div>
        </section>
    );
}