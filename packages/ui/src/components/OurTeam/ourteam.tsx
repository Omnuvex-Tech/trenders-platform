// "use client";

// import { useState } from "react";
// import styles from "../../styles/OurTeam/ourteam.module.css";
// import portfolioStyles from "../../styles/Portfolio/portfolio.module.css";

// export interface OurTeamMember {
//     id: number;
//     image: string;
//     imageAlt?: string;
//     name: string;
//     role: string;
//     href?: string;
// }

// export interface OurTeamUIProps {
//     title: string;
//     descriptionHtml: string;
//     members: OurTeamMember[];
//     moreButtonText: string;
// }

// export function OurTeamUI({ title, descriptionHtml, members, moreButtonText }: OurTeamUIProps) {
//     const [visibleCount, setVisibleCount] = useState(8);

//     const displayed = members.slice(0, visibleCount);

//     const handleShowMore = () => {
//         setVisibleCount(prev => Math.min(prev + 4, members.length));
//     };

//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 <div className={styles.header}>
//                     <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
//                     <div className={styles.description} dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
//                 </div>

//                 <div className={styles.grid}>
//                     {displayed.map((member) => (
//                         <div key={member.id} className={styles.card}>
//                             <img
//                                 src={member.image}
//                                 alt={member.imageAlt || member.name}
//                                 className={styles.cardImg}
//                             />
//                             <a href={member.href || "#"} className={styles.plusBtn}
//                                 aria-label={`${member.name} haqqında ətraflı`}>
//                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                                     <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
//                                     <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
//                                 </svg>
//                             </a>
//                             <div className={styles.cardInfo}>
//                                 <span className={styles.memberName}>{member.name}</span>
//                                 <span className={styles.memberRole}>{member.role}</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {visibleCount < members.length && (
//                     <div className={portfolioStyles.moreBtnWrapper}>
//                         <button
//                             type="button"
//                             onClick={handleShowMore}
//                             className={portfolioStyles.projectsMoreBtn}
//                         >
//                             {moreButtonText}
//                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//                                 stroke="currentColor" strokeWidth="1.8"
//                                 strokeLinecap="round" strokeLinejoin="round">
//                                 <line x1="5" y1="12" x2="19" y2="12" />
//                                 <polyline points="12 5 19 12 12 19" />
//                             </svg>
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }


















"use client";

import { useState, useMemo } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import styles from "../../styles/OurTeam/ourteam.module.css";
import portfolioStyles from "../../styles/Portfolio/portfolio.module.css";

export interface OurTeamMember {
    id: number;
    image: string;
    imageAlt?: string;
    name: string;
    role: string;
    href?: string;
}

export interface OurTeamUIProps {
    title: string;
    descriptionHtml: string;
    members: OurTeamMember[];
    moreButtonText: string;
}

// Təsvir blokunun animasiyası
const descriptionAnimation: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 20,
            delay: 0.1
        }
    }
};

// XƏTANI HƏLL EDƏN HİSSƏ: Tip xətası verməməsi üçün Variants tipini və funksiya strukturunu düzəltdik
const cardVariants: Variants = {
    hidden: () => ({ 
        opacity: 0, 
        y: 35,
        scale: 0.96 
    }),
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 16,
            delay: (index % 4) * 0.08,
            duration: 0.5
        }
    })
};

export function OurTeamUI({ title, descriptionHtml, members, moreButtonText }: OurTeamUIProps) {
    const [visibleCount, setVisibleCount] = useState(8);

    const displayed = useMemo(() => {
        return members.slice(0, visibleCount);
    }, [members, visibleCount]);

    const handleShowMore = () => {
        setVisibleCount(prev => Math.min(prev + 4, members.length));
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                
                {/* Header bloku */}
                <div className={styles.header}>
                    <motion.h1 
                        className={styles.title} 
                        dangerouslySetInnerHTML={{ __html: title }}
                        initial={{ opacity: 0, y: -15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    />
                    
                    {/* Təsvir hissəsi */}
                    <motion.div 
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                        variants={descriptionAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    />
                </div>

                {/* Komanda Qridi */}
                <div className={styles.grid}>
                    <AnimatePresence mode="popLayout">
                        {displayed.map((member, index) => (
                            <motion.div 
                                key={member.id} 
                                className={styles.card}
                                custom={index} 
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-5%" }}
                                layout
                                
                                // Smooth hover effekti
                                whileHover={{
                                    y: -6,
                                    zIndex: 10,
                                    transition: {
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 20,
                                        mass: 0.5
                                    }
                                }}
                            >
                                <img
                                    src={member.image}
                                    alt={member.imageAlt || member.name}
                                    className={styles.cardImg}
                                />
                                
                                {/* Dairəvi Plus Düyməsi */}
                                <a 
                                    href={member.href || "#"} 
                                    className={styles.plusBtn}
                                    aria-label={`${member.name} haqqında ətraflı`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}
                                >
                                    <svg 
                                        width="14" 
                                        height="14" 
                                        viewBox="0 0 14 14" 
                                        fill="none" 
                                        style={{ display: "block", width: "14px", height: "14px" }}
                                    >
                                        <path 
                                            d="M7 1V13M1 7H13" 
                                            stroke="white" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>

                                <div className={styles.cardInfo}>
                                    <span className={styles.memberName}>{member.name}</span>
                                    <span className={styles.memberRole}>{member.role}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* "Daha çox" Düyməsi */}
                {visibleCount < members.length && (
                    <motion.div 
                        className={portfolioStyles.moreBtnWrapper}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <button
                            type="button"
                            onClick={handleShowMore}
                            className={portfolioStyles.projectsMoreBtn}
                        >
                            {moreButtonText}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}