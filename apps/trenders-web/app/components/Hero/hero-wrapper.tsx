// "use client";

// import { useState, useRef } from "react";
// import { HeroUI } from "@repo/ui";
// import type { HeroCard, HeroStat } from "@repo/ui";

// const BASE_CARDS: HeroCard[] = [
//     {
//         label: "Financial",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #D0EDFF 13.09%, #419CD3 383.01%)",
//         border: "linear-gradient(132.52deg, rgba(0,45,255,0.18) -26.71%, rgba(71,95,208,0.2) 143.92%)",
//         borderWidth: 2,
//     },
//     {
//         label: "Ai",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #94D6FF 13.09%, #419CD3 383.01%)",
//         border: null,
//         borderWidth: 0,
//     },
//     {
//         label: "Marketing",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #BEC9F9 13.09%, #4258BE 383.01%)",
//         border: "linear-gradient(99.29deg, #D0EDFF 13.09%, #419CD3 383.01%)",
//         borderWidth: 1,
//     },
//     {
//         label: "Inovation",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #A2C2FB 13.09%, #628AD0 383.01%)",
//         border: null,
//         borderWidth: 0,
//     },
//     {
//         label: "Elevate",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #BEC9F9 13.09%, #4258BE 383.01%)",
//         border: "linear-gradient(99.29deg, #D0EDFF 13.09%, #419CD3 383.01%)",
//         borderWidth: 1,
//     },
//     {
//         label: "Transform",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #94D6FF 13.09%, #419CD3 383.01%)",
//         border: null,
//         borderWidth: 0,
//     },
// ];

// const STATS: HeroStat[] = [
//     { label: "Təəssüratlar", value: "2.3M" },
//     { label: "Dönüşüm",      value: "35%"  },
//     { label: "Müştərilər",   value: "3456" },
//     { label: "Kliklər",      value: "+98%" },
// ];

// const N              = BASE_CARDS.length;
// const TOTAL          = 60;
// const INITIAL_ACTIVE = 20;
// const ANIM_DURATION  = 1000;

// export function HeroWrapper() {
//     const [active,         setActive        ] = useState(INITIAL_ACTIVE);
//     const [leftLimit,      setLeftLimit     ] = useState(-2);
//     const [rightLimit,     setRightLimit    ] = useState(4);
//     const [displayedImage, setDisplayedImage] = useState(BASE_CARDS[INITIAL_ACTIVE % N]!.image);
//     const [incomingImage,  setIncomingImage ] = useState<string | null>(null);
//     const [dir,            setDir           ] = useState<"left" | "right" | null>(null);
//     const animatingRef = useRef(false);
//     const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);

//     const cards = Array.from({ length: TOTAL }, (_, i) => BASE_CARDS[i % N] as HeroCard);

//     const handleCardClick = (pos: number) => {
//         if (pos === 0 || animatingRef.current) return;
//         animatingRef.current = true;

//         const shift     = pos > 0 ? pos - 1 : pos + 1;
//         const newActive = active + shift;
//         const newImage  = (cards[newActive % N] as HeroCard).image;
//         const direction = pos > 0 ? "left" : "right";

//         setActive(a  => a + shift);
//         setLeftLimit(l  => l - shift);
//         setRightLimit(r => r - shift);
//         setIncomingImage(newImage);
//         setDir(direction);

//         if (timerRef.current) clearTimeout(timerRef.current);
//         timerRef.current = setTimeout(() => {
//             setDisplayedImage(newImage);
//             setIncomingImage(null);
//             setDir(null);
//             animatingRef.current = false;
//         }, ANIM_DURATION);
//     };

//     const leftCards: { card: HeroCard; pos: number; idx: number }[] = [];
//     for (let pos = leftLimit; pos <= -1; pos++) {
//         const i = active + pos;
//         if (i < 0 || i >= TOTAL) continue;
//         const card = cards[i];
//         if (!card) continue;
//         leftCards.push({ card, pos, idx: i });
//     }

//     const rightCards: { card: HeroCard; pos: number; idx: number }[] = [];
//     for (let pos = 1; pos <= rightLimit; pos++) {
//         const i = active + pos;
//         if (i < 0 || i >= TOTAL) continue;
//         const card = cards[i];
//         if (!card) continue;
//         rightCards.push({ card, pos, idx: i });
//     }

//     return (
//         <HeroUI
//             subtitle="SİZİN SEÇƏCƏYİNİZ"
//             title="MARKETİNQ AGENTLİYİ"
//             infoText={
//                 <p>
//                     <strong>Marketinq analitikası:</strong> məlumatların incəliklərini
//                     deşifrə edərək rəqəmsal qələbəyə gedən yolunuzu işıqlandırın.
//                 </p>
//             }
//             leftCards={leftCards}
//             rightCards={rightCards}
//             displayedImage={displayedImage}
//             incomingImage={incomingImage}
//             dir={dir}
//             stats={STATS}
//             statsTagline="Fueling growth with data Insights"
//             onCardClick={handleCardClick}
//         />
//     );
// }




















// "use client";

// import { useState, useRef, useCallback, useEffect } from "react";
// import { HeroUI } from "@repo/ui";
// import type { HeroCard, HeroStat } from "@repo/ui";

// const BASE_CARDS: HeroCard[] = [
//     {
//         label: "Financial",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #D0EDFF 13.09%, #419CD3 383.01%)",
//         border: "linear-gradient(132.52deg, rgba(0,45,255,0.18) -26.71%, rgba(71,95,208,0.2) 143.92%)",
//         borderWidth: 2,
//     },
//     {
//         label: "Ai",
//         image: "/images/project9.png",
//         bg: "linear-gradient(99.29deg, #94D6FF 13.09%, #419CD3 383.01%)",
//         border: null,
//         borderWidth: 0,
//     },
//     {
//         label: "Marketing",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #BEC9F9 13.09%, #4258BE 383.01%)",
//         border: "linear-gradient(99.29deg, #D0EDFF 13.09%, #419CD3 383.01%)",
//         borderWidth: 1,
//     },
//     {
//         label: "Inovation",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #A2C2FB 13.09%, #628AD0 383.01%)",
//         border: null,
//         borderWidth: 0,
//     },
//     {
//         label: "Elevate",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #BEC9F9 13.09%, #4258BE 383.01%)",
//         border: "linear-gradient(99.29deg, #D0EDFF 13.09%, #419CD3 383.01%)",
//         borderWidth: 1,
//     },
//     {
//         label: "Transform",
//         image: "/images/bluebubble.jpg",
//         bg: "linear-gradient(99.29deg, #94D6FF 13.09%, #419CD3 383.01%)",
//         border: null,
//         borderWidth: 0,
//     },
// ];

// const STATS: HeroStat[] = [
//     { label: "Təəssüratlar", value: "2.3M" },
//     { label: "Dönüşüm",      value: "35%"  },
//     { label: "Müştərilər",   value: "3456" },
//     { label: "Kliklər",      value: "+98%" },
// ];

// const N              = BASE_CARDS.length;
// const TOTAL          = 60;
// const INITIAL_ACTIVE = 20;
// const ANIM_DURATION  = 1000;
// const AUTOPLAY_MS    = 4000;
// const MOBILE_BP      = 768;

// export function HeroWrapper() {
//     const [active,         setActive        ] = useState(INITIAL_ACTIVE);
//     const [leftLimit,      setLeftLimit     ] = useState(-2);
//     const [rightLimit,     setRightLimit    ] = useState(4);
//     const [displayedImage, setDisplayedImage] = useState(BASE_CARDS[INITIAL_ACTIVE % N]!.image);
//     const [incomingImage,  setIncomingImage ] = useState<string | null>(null);
//     const [dir,            setDir           ] = useState<"left" | "right" | null>(null);
//     const [currentLabel,   setCurrentLabel  ] = useState(BASE_CARDS[INITIAL_ACTIVE % N]!.label);

//     const animatingRef = useRef(false);
//     const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
//     const activeRef    = useRef(INITIAL_ACTIVE);

  
//     const doShift = useCallback((pos: number) => {
//         if (pos === 0 || animatingRef.current) return;
//         animatingRef.current = true;

//         const shift     = pos > 0 ? pos - 1 : pos + 1;
//         const newActive = activeRef.current + shift;
//         activeRef.current = newActive;

//         const newCard   = BASE_CARDS[((newActive % N) + N) % N]!;
//         const direction: "left" | "right" = pos > 0 ? "left" : "right";

//         setActive(newActive);
//         setLeftLimit(l  => l - shift);
//         setRightLimit(r => r - shift);
//         setIncomingImage(newCard.image);
//         setDir(direction);
//         setCurrentLabel(newCard.label);

//         if (animTimerRef.current) clearTimeout(animTimerRef.current);
//         animTimerRef.current = setTimeout(() => {
//             setDisplayedImage(newCard.image);
//             setIncomingImage(null);
//             setDir(null);
//             animatingRef.current = false;
//         }, ANIM_DURATION);
//     }, []);

//     const doNavShift = useCallback((direction: "left" | "right") => {
//         if (animatingRef.current) return;
//         animatingRef.current = true;

//         const shift     = direction === "left" ? 1 : -1;
//         const newActive = activeRef.current + shift;
//         activeRef.current = newActive;

//         const newCard = BASE_CARDS[((newActive % N) + N) % N]!;

//         setActive(newActive);
//         setLeftLimit(l  => l - shift);
//         setRightLimit(r => r - shift);
//         setIncomingImage(newCard.image);
//         setDir(direction);
//         setCurrentLabel(newCard.label);

//         if (animTimerRef.current) clearTimeout(animTimerRef.current);
//         animTimerRef.current = setTimeout(() => {
//             setDisplayedImage(newCard.image);
//             setIncomingImage(null);
//             setDir(null);
//             animatingRef.current = false;
//         }, ANIM_DURATION);
//     }, []);

//     const stopAutoplay = useCallback(() => {
//         if (autoTimerRef.current) clearInterval(autoTimerRef.current);
//         autoTimerRef.current = null;
//     }, []);

//     const startAutoplay = useCallback(() => {
//         stopAutoplay();
//         if (typeof window !== "undefined" && window.innerWidth > MOBILE_BP) return;
//         autoTimerRef.current = setInterval(() => {
//             doNavShift("left");
//         }, AUTOPLAY_MS);
//     }, [doNavShift, stopAutoplay]);

//     useEffect(() => {
//         startAutoplay();
//         const onResize = () => {
//             if (window.innerWidth > MOBILE_BP) {
//                 stopAutoplay();
//             } else if (!autoTimerRef.current) {
//                 startAutoplay();
//             }
//         };
//         window.addEventListener("resize", onResize);
//         return () => {
//             window.removeEventListener("resize", onResize);
//             stopAutoplay();
//         };
//     }, [startAutoplay, stopAutoplay]);

//     const handleCardClick = useCallback((pos: number) => {
//         doShift(pos);
//     }, [doShift]);

//     const handleNav = useCallback((direction: "left" | "right") => {
//         doNavShift(direction);
//         startAutoplay();
//     }, [doNavShift, startAutoplay]);

//     const cards = Array.from({ length: TOTAL }, (_, i) => BASE_CARDS[i % N] as HeroCard);

//     const leftCards: { card: HeroCard; pos: number; idx: number }[] = [];
//     for (let pos = leftLimit; pos <= -1; pos++) {
//         const i = active + pos;
//         if (i < 0 || i >= TOTAL) continue;
//         const card = cards[i];
//         if (!card) continue;
//         leftCards.push({ card, pos, idx: i });
//     }

//     const rightCards: { card: HeroCard; pos: number; idx: number }[] = [];
//     for (let pos = 1; pos <= rightLimit; pos++) {
//         const i = active + pos;
//         if (i < 0 || i >= TOTAL) continue;
//         const card = cards[i];
//         if (!card) continue;
//         rightCards.push({ card, pos, idx: i });
//     }

//     return (
//         <HeroUI
//             subtitle="SİZİN SEÇƏCƏYİNİZ"
//             title="MARKETİNQ AGENTLİYİ"
//             infoText={
//                 <p>
//                     <strong>Marketinq analitikası:</strong> məlumatların incəliklərini
//                     deşifrə edərək rəqəmsal qələbəyə gedən yolunuzu işıqlandırın.
//                 </p>
//             }
//             leftCards={leftCards}
//             rightCards={rightCards}
//             displayedImage={displayedImage}
//             incomingImage={incomingImage}
//             dir={dir}
//             stats={STATS}
//             statsTagline="Fueling growth with data Insights"
//             onCardClick={handleCardClick}
//             currentLabel={currentLabel}
//             onNav={handleNav}
//         />
//     );
// }



























"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { HeroUI } from "@repo/ui";
import type { HeroCard, HeroStat } from "@repo/ui";

const BASE_CARDS: HeroCard[] = [
    {
        label: "Financial",
        image: "/images/bluebubble.jpg",
        bg: "linear-gradient(99.29deg, #D0EDFF 13.09%, #419CD3 383.01%)",
        border: "linear-gradient(132.52deg, rgba(0,45,255,0.18) -26.71%, rgba(71,95,208,0.2) 143.92%)",
        borderWidth: 2,
    },
    {
        label: "Ai",
        image: "/images/project9.png",
        bg: "linear-gradient(99.29deg, #94D6FF 13.09%, #419CD3 383.01%)",
        border: null,
        borderWidth: 0,
    },
    {
        label: "Marketing",
        image: "/images/bluebubble.jpg",
        bg: "linear-gradient(99.29deg, #BEC9F9 13.09%, #4258BE 383.01%)",
        border: "linear-gradient(99.29deg, #D0EDFF 13.09%, #419CD3 383.01%)",
        borderWidth: 1,
    },
    {
        label: "Inovation",
        image: "/images/bluebubble.jpg",
        bg: "linear-gradient(99.29deg, #A2C2FB 13.09%, #628AD0 383.01%)",
        border: null,
        borderWidth: 0,
    },
    {
        label: "Elevate",
        image: "/images/bluebubble.jpg",
        bg: "linear-gradient(99.29deg, #BEC9F9 13.09%, #4258BE 383.01%)",
        border: "linear-gradient(99.29deg, #D0EDFF 13.09%, #419CD3 383.01%)",
        borderWidth: 1,
    },
    {
        label: "Transform",
        image: "/images/bluebubble.jpg",
        bg: "linear-gradient(99.29deg, #94D6FF 13.09%, #419CD3 383.01%)",
        border: null,
        borderWidth: 0,
    },
];

const STATS: HeroStat[] = [
    { label: "Təəssüratlar", value: "2.3M" },
    { label: "Dönüşüm",      value: "35%"  },
    { label: "Müştərilər",   value: "3456" },
    { label: "Kliklər",      value: "+98%" },
];

const N              = BASE_CARDS.length;
const TOTAL          = 60;
const INITIAL_ACTIVE = 20;
const ANIM_DURATION  = 1000;
const AUTOPLAY_MS    = 4000;
const MOBILE_BP      = 768;

export function HeroWrapper() {
    const [active,         setActive        ] = useState(INITIAL_ACTIVE);
    const [leftLimit,      setLeftLimit     ] = useState(-2);
    const [rightLimit,     setRightLimit    ] = useState(4);
    const [displayedImage, setDisplayedImage] = useState(BASE_CARDS[INITIAL_ACTIVE % N]!.image);
    const [incomingImage,  setIncomingImage ] = useState<string | null>(null);
    const [dir,            setDir           ] = useState<"left" | "right" | null>(null);
    const [currentLabel,   setCurrentLabel  ] = useState(BASE_CARDS[INITIAL_ACTIVE % N]!.label);

    const animatingRef = useRef(false);
    const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const activeRef    = useRef(INITIAL_ACTIVE);

    const cards = Array.from({ length: TOTAL }, (_, i) => BASE_CARDS[i % N] as HeroCard);

    // Desktop kart click — leftLimit/rightLimit dəyişir (orijinal məntiq)
    const doShift = useCallback((pos: number) => {
        if (pos === 0 || animatingRef.current) return;
        animatingRef.current = true;

        const shift     = pos > 0 ? pos - 1 : pos + 1;
        const newActive = activeRef.current + shift;
        activeRef.current = newActive;

        const newCard   = BASE_CARDS[((newActive % N) + N) % N]!;
        const direction: "left" | "right" = pos > 0 ? "left" : "right";

        setActive(newActive);
        setLeftLimit(l  => l - shift);   // ✅ yalnız desktop click-də dəyişir
        setRightLimit(r => r - shift);   // ✅ yalnız desktop click-də dəyişir
        setIncomingImage(newCard.image);
        setDir(direction);
        setCurrentLabel(newCard.label);

        if (animTimerRef.current) clearTimeout(animTimerRef.current);
        animTimerRef.current = setTimeout(() => {
            setDisplayedImage(newCard.image);
            setIncomingImage(null);
            setDir(null);
            animatingRef.current = false;
        }, ANIM_DURATION);
    }, []);

    // Mobile/autoplay — leftLimit/rightLimit-ə toxunmur
    const doNavShift = useCallback((direction: "left" | "right") => {
        if (animatingRef.current) return;
        animatingRef.current = true;

        const shift     = direction === "left" ? 1 : -1;
        const newActive = activeRef.current + shift;
        activeRef.current = newActive;

        const newCard = BASE_CARDS[((newActive % N) + N) % N]!;

        setActive(newActive);
        // ❌ setLeftLimit və setRightLimit yoxdur — mobile limitləri dəyişdirmir
        setIncomingImage(newCard.image);
        setDir(direction);
        setCurrentLabel(newCard.label);

        if (animTimerRef.current) clearTimeout(animTimerRef.current);
        animTimerRef.current = setTimeout(() => {
            setDisplayedImage(newCard.image);
            setIncomingImage(null);
            setDir(null);
            animatingRef.current = false;
        }, ANIM_DURATION);
    }, []);

    const stopAutoplay = useCallback(() => {
        if (autoTimerRef.current) clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
    }, []);

    const startAutoplay = useCallback(() => {
        stopAutoplay();
        if (typeof window !== "undefined" && window.innerWidth > MOBILE_BP) return;
        autoTimerRef.current = setInterval(() => {
            doNavShift("left");
        }, AUTOPLAY_MS);
    }, [doNavShift, stopAutoplay]);

    useEffect(() => {
        startAutoplay();
        const onResize = () => {
            if (window.innerWidth > MOBILE_BP) {
                stopAutoplay();
            } else if (!autoTimerRef.current) {
                startAutoplay();
            }
        };
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            stopAutoplay();
        };
    }, [startAutoplay, stopAutoplay]);

    const handleCardClick = useCallback((pos: number) => {
        doShift(pos);
    }, [doShift]);

    const handleNav = useCallback((direction: "left" | "right") => {
        doNavShift(direction);
        startAutoplay();
    }, [doNavShift, startAutoplay]);

    const leftCards: { card: HeroCard; pos: number; idx: number }[] = [];
    for (let pos = leftLimit; pos <= -1; pos++) {
        const i = active + pos;
        if (i < 0 || i >= TOTAL) continue;
        const card = cards[i];
        if (!card) continue;
        leftCards.push({ card, pos, idx: i });
    }

    const rightCards: { card: HeroCard; pos: number; idx: number }[] = [];
    for (let pos = 1; pos <= rightLimit; pos++) {
        const i = active + pos;
        if (i < 0 || i >= TOTAL) continue;
        const card = cards[i];
        if (!card) continue;
        rightCards.push({ card, pos, idx: i });
    }

    return (
        <HeroUI
            subtitle="SİZİN SEÇƏCƏYİNİZ"
            title="MARKETİNQ AGENTLİYİ"
            infoText={
                <p>
                    <strong>Marketinq analitikası:</strong> məlumatların incəliklərini
                    deşifrə edərək rəqəmsal qələbəyə gedən yolunuzu işıqlandırın.
                </p>
            }
            leftCards={leftCards}
            rightCards={rightCards}
            displayedImage={displayedImage}
            incomingImage={incomingImage}
            dir={dir}
            stats={STATS}
            statsTagline="Fueling growth with data Insights"
            onCardClick={handleCardClick}
            currentLabel={currentLabel}
            onNav={handleNav}
        />
    );
}