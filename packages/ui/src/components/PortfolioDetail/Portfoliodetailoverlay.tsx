// "use client";

// import styles from "../../styles/PortfolioDetail/portfoliodetailoverlay.module.css";

// export interface PortfolioDetailOverlayUIProps {
//     image: string;
//     imageAlt?: string;
//     badge: string;
//     title: string;
//     descriptions: (string | React.ReactNode)[];
// }

// export function PortfolioDetailOverlayUI({
//     image,
//     imageAlt = "",
//     badge,
//     title,
//     descriptions,
// }: PortfolioDetailOverlayUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 <div className={styles.container}>
//                     <img src={image} alt={imageAlt} className={styles.heroImg} />
//                     <div className={styles.content}>
//                         <div className={styles.contentTop}>
//                             <span className={styles.badge}>{badge}</span>
// <div
//   className={styles.title}
//   dangerouslySetInnerHTML={{ __html: title }}
// />                        </div>
//                         <div className={styles.contentBottom}>
//                             {descriptions.map((desc, i) =>
//                                 typeof desc === "string" ? (
//                                     <div
//                                         key={i}
//                                         className={styles.desc}
//                                         dangerouslySetInnerHTML={{ __html: desc }}
//                                     />
//                                 ) : (
//                                     <div key={i} className={styles.desc}>{desc}</div>
//                                 )
//                             )}
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
import styles from "../../styles/PortfolioDetail/portfoliodetailoverlay.module.css";

export interface PortfolioDetailOverlayUIProps {
    image: string;
    imageAlt?: string;
    badge: string;
    title: string;
    descriptions: (string | React.ReactNode)[];
}

// Konteyner animasiyası: Ekrana girən andaca alt elementləri sırayla tetikler
const overlayContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Şəkil və mətn blokları 0.15s fərqlə ard-arda gəlir
        },
    },
};

// Şəkil üçün focal.inc üslubunda böyüyərək açılma effekti
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

// Mətn blokları üçün aşağıdan yuxarı zərif yayvari sürüşmə
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
                {/* İstifadəçi skrol edib tam bu container-ə çatdıqda animasiya müstəqil tetiklenir.
                  Səhifənin digər yuxarı hissələrindən tamamilə asılısız işləyir.
                */}
                <motion.div 
                    className={styles.container}
                    variants={overlayContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-12%" }} // Ekrana %12 daxil olan kimi işə düşür
                >
                    {/* Arxa fon şəkli ayrıca animasiya olunur */}
                    <motion.img 
                        src={image} 
                        alt={imageAlt} 
                        className={styles.heroImg} 
                        variants={imageVariants}
                    />

                    <div className={styles.content}>
                        {/* Üst mətn bloku (Badge və Başlıq) */}
                        <motion.div className={styles.contentTop} variants={contentVariants}>
                            <span className={styles.badge}>{badge}</span>
                            <div
                                className={styles.title}
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                        </motion.div>

                        {/* Alt mətn bloku (Təsvirlər) */}
                        <motion.div className={styles.contentBottom} variants={contentVariants}>
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
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}