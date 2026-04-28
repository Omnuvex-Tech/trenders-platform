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

import { useState, useRef, useCallback, useEffect } from "react";
import styles from '../../styles/Testimonials/testimonials.module.css'
import { flushSync } from "react-dom";

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
    const total = testimonials.length;
    const [current, setCurrent] = useState(0);
    const [sliding, setSliding] = useState(false);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const initialized = useRef(false);

    const getIdx = useCallback((i: number) => ((i % total) + total) % total, [total]);

    const cardW = useCallback(() => {
        const track = trackRef.current;
        if (!track || !track.children[0]) return 340;
        return (track.children[0] as HTMLElement).offsetWidth + 24;
    }, []);

    const getCards = useCallback((cur: number) => [
        testimonials[getIdx(cur - 1)],
        testimonials[getIdx(cur)],
        testimonials[getIdx(cur + 1)],
        testimonials[getIdx(cur + 2)],
    ], [testimonials, getIdx]);

    const [cards, setCards] = useState(() => getCards(0));

    const slide = useCallback((dir: "left" | "right") => {
        if (sliding) return;
        setSliding(true);

        const track = trackRef.current;
        if (!track) return;

        const cw = cardW();

        track.style.transition = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(${dir === 'right' ? -cw * 2 : 0}px)`;

        const onEnd = () => {
            track.removeEventListener("transitionend", onEnd);

            const next = getIdx(dir === "right" ? current + 1 : current - 1);

            flushSync(() => {
                setCurrent(next);
                setCards(getCards(next));
            });

            track.style.transition = "none";
            track.style.transform = `translateX(${-cw}px)`;
            track.getBoundingClientRect();

            setSliding(false);
        };

        track.addEventListener("transitionend", onEnd);
    }, [sliding, current, cardW, getIdx, getCards]);

    const slideRef = useRef<(dir: "left" | "right") => void>(() => {});

useEffect(() => {
    slideRef.current = slide;
}, [slide]);

useEffect(() => {
    const interval = setInterval(() => {
        slideRef.current("right");
    }, 4000);
    return () => clearInterval(interval);
}, []);

    return (
        <section className={styles.section}>
            <div className={styles.testimonialsDivider} />

            <div className={styles.inner}>
                <div className={styles.left}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.arrows}>
                        <button className={styles.arrowBtn} onClick={() => slide("left")} aria-label="Əvvəlki">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button className={`${styles.arrowBtn} ${styles.arrowBtnActive}`} onClick={() => slide("right")} aria-label="Növbəti">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={styles.cards}>
                    <div
                        className={styles.cardsTrack}
                        ref={(el) => {
                            trackRef.current = el;
                            if (el && !initialized.current) {
                                const cw = (el.children[0] as HTMLElement)?.offsetWidth + 24 || 340;
                                el.style.transition = "none";
                                el.style.transform = `translateX(${-cw}px)`;
                                initialized.current = true;
                            }
                        }}
                    >
                        {cards.map((t, pos) => {
                            if (!t) return null;
                            return (
                                <div key={`${t.id}-${pos}`} className={styles.card}>
                                    <p className={styles.company}>{t.company}</p>
                                    <div className={styles.quoteIcon}>"</div>
                                    <p className={styles.quote}>{t.quote}</p>
                                    <div className={styles.author}>
                                        <img src={t.image} alt={t.name} className={styles.avatar} />
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
            </div>
        </section>
    );
}