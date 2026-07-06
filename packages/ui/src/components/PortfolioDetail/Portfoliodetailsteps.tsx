// "use client";

// import React from "react";
// import styles from "../../styles/PortfolioDetail/portfolioDetailSteps.module.css";

// export interface PortfolioDetailStep {
//     number: string;
//     label: string;
// }

// export interface PortfolioDetailStepsUIProps {
//     description: string | React.ReactNode;
//     steps: PortfolioDetailStep[];
// }

// export function PortfolioDetailStepsUI({
//     description,
//     steps,
// }: PortfolioDetailStepsUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 {typeof description === "string" ? (
//                     <div
//                         className={styles.description}
//                         dangerouslySetInnerHTML={{ __html: description }}
//                     />
//                 ) : (
//                     <div className={styles.description}>{description}</div>
//                 )}

//                 <div className={styles.staircase}>
//                     {steps.map((step, i) => (
//                         <div key={i} className={styles.card} style={{ marginTop: `${i * 100}px` }}>
//                             <span className={styles.stepNumber}>/{step.number}</span>
//                             <p className={styles.stepLabel}>{step.label}</p>
//                         </div>
//                     ))}
//                     {[1, 2, 3].map((_, i) => (
//                         <div
//                             key={`divider-${i}`}
//                             className={styles.divider}
//                             style={{ left: `${(i + 1) * 25}%` }}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }





"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/PortfolioDetail/portfolioDetailSteps.module.css";

export interface PortfolioDetailStep {
    number: string;
    label: string;
}

export interface PortfolioDetailStepsUIProps {
    description: string | React.ReactNode;
    steps: PortfolioDetailStep[];
}

// Konteyner animasiyası (Addımları sırayla ard-arda çıxarmaq üçün)
const staircaseVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18, // Hər addım kartı və xətt ardıcıl ritmlə gəlir
        },
    },
};

// Ümumi elementlərin (Mətn və Kartların) aşağıdan yuxarı zərif yayvari animasiyası
const singleItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 16,
            duration: 0.5,
        },
    },
};

// Şaquli xətlərin (Divider) yuxarıdan aşağıya uzanma animasiyası
const dividerVariants: Variants = {
    hidden: { scaleY: 0, originY: 0 }, 
    visible: {
        scaleY: 1,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        },
    },
};

export function PortfolioDetailStepsUI({
    description,
    steps,
}: PortfolioDetailStepsUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                
                {/* 1. HİSSƏ: Description mətni ekrana gələn kimi dərhal müstəqil işə düşür */}
                <motion.div
                    variants={singleItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
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

                {/* 2. HİSSƏ: Pilləkən (Staircase) addımları istifadəçi skrol edib bura çatanda canlanır */}
                <motion.div 
                    className={styles.staircase}
                    variants={staircaseVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-12%" }} // Kartlar görünən kimi zəncirvari başlayır
                >
                    {steps.map((step, i) => (
                        <motion.div 
                            key={i} 
                            className={styles.card} 
                            style={{ marginTop: `${i * 100}px` }}
                            variants={singleItemVariants} // Hər kart öz növbəsində yuxarı sürüşür
                        >
                            <span className={styles.stepNumber}>/{step.number}</span>
                            <p className={styles.stepLabel}>{step.label}</p>
                        </motion.div>
                    ))}

                    {/* Aradakı xətlər də kartların ardınca sırayla uzanır */}
                    {[1, 2, 3].map((_, i) => (
                        <motion.div
                            key={`divider-${i}`}
                            className={styles.divider}
                            style={{ left: `${(i + 1) * 25}%` }}
                            variants={dividerVariants}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}