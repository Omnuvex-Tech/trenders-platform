// "use client";

// import { useState, useRef, useCallback } from "react";
// import styles from "../../styles/Team/team.module.css";
// import { flushSync } from "react-dom";

// export interface TeamMember {
//     id: number;
//     name: string;
//     role: string;
//     image: string;
// }

// export interface TeamUIProps {
//     title: string;
//     members: TeamMember[];
//     featuredImage: string;
// }

// export function TeamUI({ title, members, featuredImage }: TeamUIProps) {
//     const total = members.length;
//     const VISIBLE = 3;

//     const getIdx = useCallback((i: number) => ((i % total) + total) % total, [total]);

//     const getCards = useCallback((cur: number) => Array.from({ length: VISIBLE + 2 }, (_, i) => {
//         const idx = getIdx(cur - 1 + i);
//         return members[idx];
//     }), [members, getIdx, total]);

//     const [current, setCurrent] = useState(0);
//     const [sliding, setSliding] = useState(false);
//     const [cards, setCards] = useState(() => getCards(0));

//     const trackRef = useRef<HTMLDivElement | null>(null);
//     const initialized = useRef(false);

//     const cardW = useCallback(() => {
//     if (typeof window !== "undefined") {
//         if (window.innerWidth <= 400) {
//             return window.innerWidth - 28 + 12;
//         }
//         if (window.innerWidth <= 600) {
//             return window.innerWidth - 40 + 12;
//         }
//     }
//     const track = trackRef.current;
//     if (!track || !track.children[0]) return 312;
//     return (track.children[0] as HTMLElement).offsetWidth + 20;
// }, []);

//  const slide = useCallback((dir: "left" | "right") => {
//         if (sliding) return;
//         setSliding(true);

//         const track = trackRef.current;
//         if (!track) return;

//         const cw = cardW();

//         track.style.transition = 'transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)';
//         track.style.transform = `translateX(${dir === 'right' ? -cw * 2 : 0}px)`;

//         const onEnd = () => {
//             track.removeEventListener("transitionend", onEnd);

//             const next = getIdx(dir === "right" ? current + 1 : current - 1);

//             flushSync(() => {
//                 setCurrent(next);
//                 setCards(getCards(next));
//             });

//             track.style.transition = "none";
//             track.style.transform = `translateX(${-cw}px)`;
//             track.getBoundingClientRect();

//             setSliding(false);
//         };

//         track.addEventListener("transitionend", onEnd);
//     }, [sliding, current, cardW, getIdx, getCards]);

//     return (
//         <section className={styles.section}>
//             <div className={styles.teamDivider}></div>
//             <div className={styles.inner}>
//                 <div className={styles.left}>
//                     <h2 className={styles.title}>{title}</h2>
//                     <div className={styles.arrows}>
//                         <button className={styles.arrowBtn} onClick={() => slide("left")} aria-label="Əvvəlki">
//                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <polyline points="15 18 9 12 15 6" />
//                             </svg>
//                         </button>
//                         <button className={`${styles.arrowBtn} ${styles.arrowBtnActive}`} onClick={() => slide("right")} aria-label="Növbəti">
//                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                 <polyline points="9 18 15 12 9 6" />
//                             </svg>
//                         </button>
//                     </div>

//                     <div className={styles.featuredWrap}>
//                         <img src={featuredImage} alt="team" className={styles.featuredImg} />
//                         <div className={styles.featuredOverlay} />
//                     </div>
//                 </div>

//                 <div className={styles.cards}>
//                     <div
//                         className={styles.cardsTrack}
//                         ref={(el) => {
//                             trackRef.current = el;
//                             if (el && !initialized.current) {
//                                 const cw = (el.children[0] as HTMLElement)?.offsetWidth + 20 || 312;
//                                 el.style.transition = "none";
//                                 el.style.transform = `translateX(${-cw}px)`;
//                                 initialized.current = true;
//                             }
//                         }}
//                     >
//                         {cards.map((member, pos) => {
//                             if (!member) return null;
//                             return (
//                                 <div key={`${member.id}-${pos}`} className={styles.card}>
//                                     <img src={member.image} alt={member.name} className={styles.memberImg} />
//                                     <button className={styles.plusBtn} aria-label="Ətraflı">
//                                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//                                             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                                             <line x1="12" y1="5" x2="12" y2="19" />
//                                             <line x1="5" y1="12" x2="19" y2="12" />
//                                         </svg>
//                                     </button>
//                                     <div className={styles.memberInfo}>
//                                         <p className={styles.memberName}>{member.name}</p>
//                                         <p className={styles.memberRole}>{member.role}</p>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }











"use client";

import styles from "../../styles/Team/team.module.css";

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
}

export interface TeamUIProps {
    title: string;
    members: TeamMember[];
    featuredImage: string;
    goHref?: string;
}

export function TeamUI({ title, members, featuredImage, goHref = "/team" }: TeamUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.teamDivider}></div>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <h2 className={styles.title}>{title}</h2>

                    <a href={goHref} className={styles.goBtn}>
                        Keçid edin
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>

                    <div className={styles.featuredWrap}>
                        <img src={featuredImage} alt="team" className={styles.featuredImg} />
                        <div className={styles.featuredOverlay} />
                    </div>
                </div>

                <div className={styles.cards}>
                    <div className={styles.cardsTrack}>
                        {members.map((member) => (
                            <div key={member.id} className={styles.card}>
                                <img src={member.image} alt={member.name} className={styles.memberImg} />
                                <button className={styles.plusBtn} aria-label="Ətraflı">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                                <div className={styles.memberInfo}>
                                    <p className={styles.memberName}>{member.name}</p>
                                    <p className={styles.memberRole}>{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}