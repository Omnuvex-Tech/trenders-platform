// "use client";

// import styles from "../../styles/BlogDetail/blogdetailcontent.module.css";

// export interface BlogDetailSection {
//     title: string;
//     paragraphs: string[];
// }

// export interface BlogDetailContentUIProps {
//     heroImage: string;
//     heroImageAlt?: string;
//     overlapTitle: string;
//     introParagraphs: string[];
//     sections: BlogDetailSection[];
//     bottomImages: {
//         left: string;
//         leftAlt?: string;
//         right: string;
//         rightAlt?: string;
//     };
// }

// export function BlogDetailContentUI({
//     heroImage,
//     heroImageAlt = "",
//     overlapTitle,
//     introParagraphs,
//     sections,
//     bottomImages,
// }: BlogDetailContentUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>

//                 <div className={styles.heroWrap}>
//                     <img
//                         src={heroImage}
//                         alt={heroImageAlt}
//                         className={styles.heroImg}
//                     />
//                 </div>

//                 <div className={styles.overlapBlock}>
//                     <div className={styles.overlapTitle} dangerouslySetInnerHTML={{ __html: overlapTitle }} />
//                 </div>

//                 <div className={styles.introBlock}>
//                     {introParagraphs.map((p, i) => (
//                         <div key={i} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: p }} />
//                     ))}
//                 </div>

//                 <div className={styles.sections}>
//                     {sections.map((section, i) => (
//                         <div key={i} className={styles.sectionBlock}>
//                             <div className={styles.sectionTitle} dangerouslySetInnerHTML={{ __html: section.title }} />
//                             <div className={styles.sectionParagraphs}>
//                                 {section.paragraphs.map((p, j) => (
//                                     <div key={j} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: p }} />
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className={styles.bottomImages}>
//                     <img
//                         src={bottomImages.left}
//                         alt={bottomImages.leftAlt || ""}
//                         className={styles.bottomImgLeft}
//                     />
//                     <img
//                         src={bottomImages.right}
//                         alt={bottomImages.rightAlt || ""}
//                         className={styles.bottomImgRight}
//                     />
//                 </div>

//             </div>
//         </section>
//     );
// }





"use client";

import { motion, Variants } from "framer-motion";
import styles from "../../styles/BlogDetail/blogdetailcontent.module.css";

export interface BlogDetailSection {
    title: string;
    paragraphs: string[];
}

export interface BlogDetailContentUIProps {
    heroImage: string;
    heroImageAlt?: string;
    overlapTitle: string;
    introParagraphs: string[];
    sections: BlogDetailSection[];
    bottomImages: {
        left: string;
        leftAlt?: string;
        right: string;
        rightAlt?: string;
    };
}

// Yuxarıdakı əsas şəkil üçün böyümə animasiyası
const heroAnimation: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 60,
            damping: 18
        }
    }
};

// Ümumi mətn bloklarının aşağıdan yuxarı rəvan gəlməsi üçün
const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 16
        }
    }
};

// Alt şəkillərin fərdi animasiyası (Soldan və sağdan daxil olma)
const imageLeftAnimation: Variants = {
    hidden: { opacity: 0, x: -25 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 70, damping: 16 }
    }
};

const imageRightAnimation: Variants = {
    hidden: { opacity: 0, x: 25 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 70, damping: 16 }
    }
};

export function BlogDetailContentUI({
    heroImage,
    heroImageAlt = "",
    overlapTitle,
    introParagraphs,
    sections,
    bottomImages,
}: BlogDetailContentUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Əsas Şəkil */}
                <motion.div 
                    variants={heroAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={styles.heroWrap}
                >
                    <img
                        src={heroImage}
                        alt={heroImageAlt}
                        className={styles.heroImg}
                    />
                </motion.div>

                {/* Overlap Başlıq Bloku */}
                <motion.div 
                    variants={fadeUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    className={styles.overlapBlock}
                >
                    <div className={styles.overlapTitle} dangerouslySetInnerHTML={{ __html: overlapTitle }} />
                </motion.div>

                {/* Giriş Paraqrafları */}
                <div className={styles.introBlock}>
                    {introParagraphs.map((p, i) => (
                        <motion.div 
                            key={i} 
                            variants={fadeUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-5%" }}
                            className={styles.paragraph} 
                            dangerouslySetInnerHTML={{ __html: p }} 
                        />
                    ))}
                </div>

                {/* Alt Bölmələr (Hər başlıq və mətni qrup halında gəlir) */}
                <div className={styles.sections}>
                    {sections.map((section, i) => (
                        <motion.div 
                            key={i} 
                            variants={fadeUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            className={styles.sectionBlock}
                        >
                            <div className={styles.sectionTitle} dangerouslySetInnerHTML={{ __html: section.title }} />
                            <div className={styles.sectionParagraphs}>
                                {section.paragraphs.map((p, j) => (
                                    <div key={j} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: p }} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Alt Yan-Yana Şəkillər */}
                <div className={styles.bottomImages}>
                    <motion.img
                        variants={imageLeftAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        src={bottomImages.left}
                        alt={bottomImages.leftAlt || ""}
                        className={styles.bottomImgLeft}
                    />
                    <motion.img
                        variants={imageRightAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        src={bottomImages.right}
                        alt={bottomImages.rightAlt || ""}
                        className={styles.bottomImgRight}
                    />
                </div>

            </div>
        </section>
    );
}