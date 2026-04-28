// "use client";

// import { useState, useRef } from "react";
// import styles from '../../styles/Testimonials/testimonials.module.css'

// export interface Testimonial {
//     id: number;
//     company: string;
//     quote: string;
//     name: string;
//     role: string;
//     image: string;
// }

// export interface TestimonialsUIProps {
//     title: string;
//     description: string;
//     testimonials: Testimonial[];
// }

// function TestimonialCard({ t, cardClass }: { t: Testimonial; cardClass: string }) {
//     const [expanded, setExpanded] = useState(false);
//     const isLong = t.quote.length > 100;

//     return (
//         <div 
//             className={`${cardClass} ${expanded ? styles.cardExpanded : ""}`}
//             onClick={() => isLong && setExpanded(prev => !prev)}
//             style={{ cursor: isLong ? "pointer" : "default" }}
//         >
//             <p className={styles.company}>{t.company}</p>
//             <div className={styles.quoteIcon}>"</div>
//             <p className={styles.quote}>
//                 {isLong && !expanded
//                     ? t.quote.slice(0, 100) + "..."
//                     : t.quote}
//             </p>
//             <div className={styles.author}>
//                 <img src={t.image} alt={t.name} className={styles.avatar} />
//                 <div>
//                     <p className={styles.name}>{t.name}</p>
//                     <p className={styles.role}>{t.role}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export function TestimonialsUI({ title, description, testimonials }: TestimonialsUIProps) {
//     const [current, setCurrent] = useState(0);
//     const [animating, setAnimating] = useState(false);
//     const [direction, setDirection] = useState<"left" | "right" | null>(null);
//     const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//     const total = testimonials.length;

//     const getIndex = (offset: number) => (current + offset + total) % total;

//     const slide = (dir: "left" | "right") => {
//         if (animating) return;
//         setAnimating(true);
//         setDirection(dir);

//         if (timerRef.current) clearTimeout(timerRef.current);
//         timerRef.current = setTimeout(() => {
//             setCurrent(prev =>
//                 dir === "right"
//                     ? (prev + 1) % total
//                     : (prev - 1 + total) % total
//             );
//             setAnimating(false);
//             setDirection(null);
//         }, 420);
//     };

//     const firstIdx = getIndex(0);
//     const secondIdx = getIndex(1);

//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 <div className={styles.left}>
//                     <h2 className={styles.title}>{title}</h2>
//                     <p className={styles.description}>{description}</p>
//                     <div className={styles.arrows}>
//                         <button
//                             className={styles.arrowBtn}
//                             onClick={() => slide("left")}
//                             aria-label="Əvvəlki"
//                         >
//                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
//                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <polyline points="15 18 9 12 15 6" />
//                             </svg>
//                         </button>
//                         <button
//                             className={`${styles.arrowBtn} ${styles.arrowBtnActive}`}
//                             onClick={() => slide("right")}
//                             aria-label="Növbəti"
//                         >
//                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
//                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <polyline points="9 18 15 12 9 6" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>

//                 <div className={styles.cards}>
//                     {[firstIdx, secondIdx].map((idx, pos) => {
//                         const t = testimonials[idx];
//                         if (!t) return null;
//                         let cardClass = styles.card;
//                         if (animating && direction === "right") {
//                             cardClass += pos === 0 ? ` ${styles.slideOutLeft}` : ` ${styles.slideInRight}`;
//                         } else if (animating && direction === "left") {
//                             cardClass += pos === 0 ? ` ${styles.slideInLeft}` : ` ${styles.slideOutRight}`;
//                         }
//                         return (
//                             <TestimonialCard key={`${idx}-${pos}`} t={t} cardClass={cardClass} />
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
//     );
// }








"use client";

import { useState, useRef } from "react";
import styles from '../../styles/Testimonials/testimonials.module.css'

export interface Testimonial {
    id: number;
    company: string;
    quote: string;
    name: string;
    role: string;
    image: string;
}

export interface TestimonialsUIProps {
    title: string;
    description: string;
    testimonials: Testimonial[];
}

export function TestimonialsUI({ title, description, testimonials }: TestimonialsUIProps) {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState<"left" | "right" | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const total = testimonials.length;

    const getIndex = (offset: number) => (current + offset + total) % total;

    const slide = (dir: "left" | "right") => {
        if (animating) return;
        setAnimating(true);
        setDirection(dir);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setCurrent(prev =>
                dir === "right"
                    ? (prev + 1) % total
                    : (prev - 1 + total) % total
            );
            setAnimating(false);
            setDirection(null);
        }, 420);
    };

    const firstIdx = getIndex(0);
    const secondIdx = getIndex(1);

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                {/* Sol tərəf — başlıq */}
                <div className={styles.left}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.arrows}>
                        <button
                            className={styles.arrowBtn}
                            onClick={() => slide("left")}
                            aria-label="Əvvəlki"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            className={`${styles.arrowBtn} ${styles.arrowBtnActive}`}
                            onClick={() => slide("right")}
                            aria-label="Növbəti"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Sağ tərəf — kartlar */}
                <div className={styles.cards}>
                    {[firstIdx, secondIdx].map((idx, pos) => {
                        const t = testimonials[idx];
                        if (!t) return null;
                        let cardClass = styles.card;
                        if (animating && direction === "right") {
                            cardClass += pos === 0 ? ` ${styles.slideOutLeft}` : ` ${styles.slideInRight}`;
                        } else if (animating && direction === "left") {
                            cardClass += pos === 0 ? ` ${styles.slideInLeft}` : ` ${styles.slideOutRight}`;
                        }
                        return (
                            <div key={`${idx}-${pos}`} className={cardClass}>
                                <p className={styles.company}>{t.company}</p>
                                <div className={styles.quoteIcon}>"</div>                                
                                <p className={styles.quote}>{t.quote}</p>
                                <div className={styles.author}>
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className={styles.avatar}
                                    />
                                    <div>
                                        <p className={styles.name}>{t.name}</p>
                                        <p className={styles.role}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}