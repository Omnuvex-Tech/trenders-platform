// "use client";

// import styles from "../../styles/PortfolioDetail/portfolioDetailHero.module.css";


// export interface PortfolioDetailHeroUIProps {
//     heroImage: string;
//     heroImageAlt?: string;
//     number: string;
//     imagesAlt?: string;
//     title: string;
//     description: React.ReactNode | string;
//     galleryImages: { src: string; alt?: string }[];
//     contactLabel?: string; // "Bizimlə əlaqə" və ya lokaldan gələcək
//     onContactClick?: () => void;
// }

// export function PortfolioDetailHeroUI({
//     heroImage, heroImageAlt = "", number, title, description,
//     galleryImages, imagesAlt = "",
//     contactLabel,
//     onContactClick,
// }: PortfolioDetailHeroUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.heroImageWrap}>
//                 <img src={heroImage} alt={heroImageAlt} className={styles.heroImage} />
//             </div>
//             <div className={styles.inner}>
//                 <div className={styles.titleBlock}>
//                     <span className={styles.number}>{number}</span>
//                     <div className={styles.titleContent}>
//                         <div
//                             className={styles.title}
//                             dangerouslySetInnerHTML={{ __html: title }}
//                         />
//                         {typeof description === "string" ? (
//                             <div
//                                 className={styles.description}
//                                 dangerouslySetInnerHTML={{ __html: description }}
//                             />
//                         ) : (
//                             <div className={styles.description}>{description}</div>
//                         )}

//                         {/* ── Bizimlə əlaqə button ── */}
//                         <button
//                             className={styles.contactBtn}
//                             onClick={() => {
//                                 document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
//                             }}
//                         >
//                             {contactLabel}
//                         </button>
//                     </div>
//                 </div>

//                 <div className={styles.gallery}>
//                     {galleryImages.slice(0, 2).length > 0 && (
//                         <div className={styles.galleryTop}>
//                             {galleryImages.slice(0, 2).map((img, i) => (
//                                 <div key={i} className={styles.galleryTopItem}>
//                                     <img src={img.src} alt={imagesAlt || img.alt || ""} className={styles.galleryImg} />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     {galleryImages[2] && (
//                         <div className={styles.galleryBottom}>
//                             <img src={galleryImages[2].src} alt={imagesAlt || galleryImages[2].alt || ""} className={styles.galleryImg} />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/PortfolioDetail/portfolioDetailHero.module.css";

export interface PortfolioDetailHeroUIProps {
    heroImage: string;
    heroImageAlt?: string;
    number: string;
    imagesAlt?: string;
    title: string;
    description: React.ReactNode | string;
    galleryImages: { src: string; alt?: string }[];
    contactLabel?: string;
    onContactClick?: () => void;
}

// Əsas konteyner üçün kaskad tetikleyici
const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Elementlər ard-arda düzgün ritmlə gəlir
        },
    },
};

// Yazıların və xüsusilə description elementinin təmiz yayvari (spring) animasiyası
const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 75,
            damping: 17,
            duration: 0.5,
        },
    },
};

// Şəkillərin yumşaq böyümə animasiyası
const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.215, 0.610, 0.355, 1.000],
        },
    },
};

export function PortfolioDetailHeroUI({
    heroImage,
    heroImageAlt = "",
    number,
    title,
    description,
    galleryImages,
    imagesAlt = "",
    contactLabel,
    onContactClick,
}: PortfolioDetailHeroUIProps) {
    
    const handleScrollToContact = () => {
        if (onContactClick) {
            onContactClick();
        } else {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className={styles.section}>
            {/* Əsas Böyük Arxa Fon Şəkli - Ekranda görünən kimi yumşaqca açılır */}
            <motion.div 
                className={styles.heroImageWrap}
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-5%" }}
            >
                <img src={heroImage} alt={heroImageAlt} className={styles.heroImage} />
            </motion.div>

            <div className={styles.inner}>
                {/* Mətn bloku - viewport təyini sayəsində uida görünən andaca zərrə qədər donmadan açılır */}
                <motion.div 
                    className={styles.titleBlock}
                    variants={textContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-8%" }}
                >
                    <motion.span variants={textItemVariants} className={styles.number}>
                        {number}
                    </motion.span>
                    
                    <div className={styles.titleContent}>
                        <motion.div
                            variants={textItemVariants}
                            className={styles.title}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                        
                        {/* Description bloku - strukturu qorunaraq zərifcə animasiya edilir */}
                        <motion.div 
                            variants={textItemVariants}
                            className={styles.descriptionWrapper}
                        >
                            {typeof description === "string" ? (
                                <div
                                    className={styles.description}
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            ) : (
                                <div className={styles.description}>{description}</div>
                            )}
                        </motion.div>

                        {contactLabel && (
                            <motion.button
                                variants={textItemVariants}
                                className={styles.contactBtn}
                                onClick={handleScrollToContact}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                {contactLabel}
                            </motion.button>
                        )}
                    </div>
                </motion.div>

                {/* Alt Qalereya Şəkilləri */}
                <div className={styles.gallery}>
                    {galleryImages.slice(0, 2).length > 0 && (
                        <div className={styles.galleryTop}>
                            {galleryImages.slice(0, 2).map((img, i) => (
                                <motion.div 
                                    key={i} 
                                    className={styles.galleryTopItem}
                                    variants={imageVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-5%" }}
                                >
                                    <img src={img.src} alt={imagesAlt || img.alt || ""} className={styles.galleryImg} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    
                    {galleryImages[2] && (
                        <motion.div 
                            className={styles.galleryBottom}
                            variants={imageVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-5%" }}
                        >
                            <img src={galleryImages[2].src} alt={imagesAlt || galleryImages[2].alt || ""} className={styles.galleryImg} />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}