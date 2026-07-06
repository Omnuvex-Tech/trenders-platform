// "use client";

// import React from "react";
// import styles from "../../styles/ServiceDetail/servicedetailquote.module.css";

// export interface ServiceDetailQuoteUIProps {
//     number: string;
//     badge: string;
//     title: string;
//     descriptions: string[];
//     quoteImage: string;
//     quoteImageAlt?: string;
//     quoteText: string;
// }

// export function ServiceDetailQuoteUI({
//     number,
//     badge,
//     title,
//     descriptions,
//     quoteImage,
//     quoteImageAlt = "",
//     quoteText,
// }: ServiceDetailQuoteUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 <div className={styles.row}>
//                     <span className={styles.number}>{number}</span>
//                     <div className={styles.content}>
//                         <span className={styles.badge}>{badge}</span>
//                         <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
//                         {descriptions.map((desc, i) => (
//                             <div key={i} className={styles.desc} dangerouslySetInnerHTML={{ __html: desc }} />
//                         ))}
//                     </div>
//                 </div>

//                 <div className={styles.quoteBlock}>
//                     <div className={styles.imgWrap}>
//                         <img
//                             src={quoteImage}
//                             alt={quoteImageAlt}
//                             className={styles.img}
//                         />
//                     </div>

//                     <div className={styles.quoteTextWrap}>
//                         <div className={styles.quoteText} dangerouslySetInnerHTML={{ __html: quoteText as string }} />                        <span className={styles.quoteMark}>"</span>
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// }




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

// Framer Motion üçün explicit xətasız animasiya tipləri
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Alt elementlərin növbə ilə 0.15 saniyə fərqlə gəlməsi
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
            <motion.div 
                className={styles.inner}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
            >
                <div className={styles.row}>
                    <motion.span variants={itemVariants} className={styles.number}>
                        {number}
                    </motion.span>
                    
                    <div className={styles.content}>
                        <motion.span variants={itemVariants} className={styles.badge}>
                            {badge}
                        </motion.span>
                                                <motion.div 
                            variants={itemVariants} 
                            className={styles.title} 
                            dangerouslySetInnerHTML={{ __html: title }} 
                        />
                                                {descriptions.map((desc, i) => (
                            <motion.div 
                                key={i} 
                                variants={itemVariants} 
                                className={styles.desc} 
                                dangerouslySetInnerHTML={{ __html: desc }} 
                            />
                        ))}
                    </div>
                </div>

                <motion.div variants={itemVariants} className={styles.quoteBlock}>
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

            </motion.div>
        </section>
    );
}