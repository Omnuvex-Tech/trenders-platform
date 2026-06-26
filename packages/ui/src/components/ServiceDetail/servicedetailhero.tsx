"use client";

import styles from "../../styles/ServiceDetail/servicedetailhero.module.css";
import React from "react";

export interface ServiceDetailStat {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

export interface ServiceDetailHeroUIProps {
    heroImage: string;
    badge: string;
    title: string;
    descriptions: string[];
    stats: ServiceDetailStat[];
    quoteText: string;
    bottomImage: string;
    bottomImageAlt?: string;
}

export function ServiceDetailHeroUI({
    heroImage,
    badge,
    title,
    descriptions,
    stats,
    quoteText,
    bottomImage,
    bottomImageAlt = "",
}: ServiceDetailHeroUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {/* Hero şəkil */}
                <div className={styles.heroWrap}>
                    <img src={heroImage} alt={title} className={styles.heroImg} />
                </div>

                {/* Overlay — şəkildən başlayır, aşağıya davam edir */}
                <div className={styles.overlayWrap}>
                    <div className={styles.overlay}>
                        <span className={styles.badge}>{badge}</span>
                        <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                        {descriptions.map((d, i) => (
                            <div key={i} className={styles.desc} dangerouslySetInnerHTML={{ __html: d }} />
                        ))}                     
                    </div>
                </div>

                {/* Quote */}
                <div className={styles.quoteWrap}>
                    <span className={styles.quoteIcon}>"</span>
                    <div className={styles.quoteText} dangerouslySetInnerHTML={{ __html: quoteText as string }} />  </div>

                {/* Bottom şəkil */}
                <div className={styles.bottomWrap}>
                    <img src={bottomImage} alt={bottomImageAlt} className={styles.bottomImg} />
                </div>
            </div>
        </section>
    );
}























// "use client";

// import styles from "../../styles/ServiceDetail/servicedetailhero.module.css";
// import React, { useEffect, useRef } from "react";

// export interface ServiceDetailStat {
//     label: string;
//     value: string;
//     icon?: React.ReactNode;
// }

// export interface ServiceDetailHeroUIProps {
//     heroImage: string;
//     badge: string;
//     title: string;
//     descriptions: string[];
//     stats: ServiceDetailStat[];
//     quoteText: string;
//     bottomImage: string;
//     bottomImageAlt?: string;
// }

// function useReveal() {
//     const ref = useRef<HTMLElement>(null);

//     useEffect(() => {
//         const el = ref.current;
//         if (!el) return;

//         const run = () => {
//             el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child, i) => {
//                 child.style.transitionDelay = `${i * 0.08}s`;
//                 child.classList.add(styles.revealVisible);
//             });
//         };

//         const observer = new IntersectionObserver(
//             (entries: IntersectionObserverEntry[]) => {
//                 if (entries[0]?.isIntersecting) {
//                     run();
//                 }
//             },
//             { threshold: 0.1 }
//         );
//         observer.observe(el);
//         return () => observer.disconnect();
//     }, []);

//     return ref;
// }

// export function ServiceDetailHeroUI({
//     heroImage,
//     badge,
//     title,
//     descriptions,
//     quoteText,
//     bottomImage,
//     bottomImageAlt = "",
// }: ServiceDetailHeroUIProps) {
//     const sectionRef = useReveal();

//     return (
//         <section className={styles.section} ref={sectionRef}>
//             <div className={styles.inner}>

//                 <div data-reveal className={`${styles.heroWrap} ${styles.reveal}`}>
//                     <img src={heroImage} alt={title} className={styles.heroImg} />
//                 </div>

//                 <div className={styles.overlayWrap}>
//                     <div className={styles.overlay}>
//                         <span data-reveal className={`${styles.badge} ${styles.reveal}`}>
//                             {badge}
//                         </span>

//                         <div
//                             data-reveal
//                             className={`${styles.title} ${styles.reveal}`}
//                             dangerouslySetInnerHTML={{ __html: title }}
//                         />

//                         {descriptions.map((d, i) => (
//                             <div
//                                 key={i}
//                                 data-reveal
//                                 className={`${styles.desc} ${styles.reveal}`}
//                                 dangerouslySetInnerHTML={{ __html: d }}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 <div className={styles.quoteWrap}>
//                     <span data-reveal className={`${styles.quoteIcon} ${styles.reveal}`}>"</span>
//                     <div
//                         data-reveal
//                         className={`${styles.quoteText} ${styles.reveal}`}
//                         dangerouslySetInnerHTML={{ __html: quoteText }}
//                     />
//                 </div>

//                 <div data-reveal className={`${styles.bottomWrap} ${styles.reveal}`}>
//                     <img src={bottomImage} alt={bottomImageAlt} className={styles.bottomImg} />
//                 </div>

//             </div>
//         </section>
//     );
// }