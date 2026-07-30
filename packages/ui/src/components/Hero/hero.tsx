"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../../styles/Hero/hero.module.css";

export interface HeroCard {
    label: string;
    image: string;
}

export interface HeroUIProps {
    title: string;
    infoText: string;
    primaryBtnText: string;
    secondaryBtnText: string;
    visibleCards: HeroCard[];
    currentIndex: number;
    onDetailClick: (label: string) => void;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
}

const DRAG_THRESHOLD = 6; // px — bundan az hərəkət "klik" sayılır, çox olarsa "drag"

export function HeroUI({
    title, infoText, primaryBtnText, secondaryBtnText,
    visibleCards, onPrimaryClick, onDetailClick, onSecondaryClick,
}: HeroUIProps) {
    const CARD_WIDTH = 342;
    const GAP = 24;
    const STEP = CARD_WIDTH + GAP;
    const baseCount = Math.ceil(visibleCards.length / 2);
    const displayCards = visibleCards.slice(0, baseCount);
    const totalCards = displayCards.length;
    const totalWidth = totalCards * STEP;
    const loopWidth = totalWidth + GAP;
    const duration = totalCards * 5;
    const speed = loopWidth / duration;

    const trackRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef(0);
    const pointerDownRef = useRef(false); // pointer basılıdır (hələ drag olmaya bilər)
    const capturedRef = useRef(false); // pointer capture həqiqətən verilib
    const hasDraggedRef = useRef(false);
    const dragStartRef = useRef({ x: 0, offset: 0, pointerId: 0 });
    const rafRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const applyTransform = useCallback(() => {
        const track = trackRef.current;
        if (track) track.style.transform = `translateX(${offsetRef.current}px)`;
    }, []);

    useEffect(() => {
        lastTimeRef.current = null;

        const tick = (time: number) => {
            if (lastTimeRef.current === null) lastTimeRef.current = time;
            const dt = (time - lastTimeRef.current) / 1000;
            lastTimeRef.current = time;

            if (!capturedRef.current) {
                let next = offsetRef.current - speed * dt;
                next = next % loopWidth;
                if (next > 0) next -= loopWidth;
                offsetRef.current = next;
                applyTransform();
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [speed, loopWidth, applyTransform]);

    const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        pointerDownRef.current = true;
        capturedRef.current = false;
        hasDraggedRef.current = false;
        dragStartRef.current = { x: e.clientX, offset: offsetRef.current, pointerId: e.pointerId };
        // Diqqət: burada setPointerCapture ÇAĞIRILMIR — yalnız real drag başlayanda.
    }, []);

    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!pointerDownRef.current) return;
        const delta = e.clientX - dragStartRef.current.x;

        if (!capturedRef.current) {
            if (Math.abs(delta) <= DRAG_THRESHOLD) return; // hələ klikdi, drag sayma
            // threshold aşıldı — indi real drag başlayır
            capturedRef.current = true;
            hasDraggedRef.current = true;
            trackRef.current?.setPointerCapture(dragStartRef.current.pointerId);
            setIsDragging(true);
        }

        offsetRef.current = dragStartRef.current.offset + delta;
        applyTransform();
    }, [applyTransform]);

    const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        if (!pointerDownRef.current) return;
        pointerDownRef.current = false;

        if (capturedRef.current) {
            capturedRef.current = false;
            try { trackRef.current?.releasePointerCapture(dragStartRef.current.pointerId); } catch { /* already released */ }

            let normalized = offsetRef.current % loopWidth;
            if (normalized > 0) normalized -= loopWidth;
            offsetRef.current = normalized;
            applyTransform();
            setIsDragging(false);
        }
    }, [loopWidth, applyTransform]);

    const handleCardClick = useCallback((label: string) => {
        if (hasDraggedRef.current) return; // drag idi, klik sayma
        onDetailClick(label);
    }, [onDetailClick]);

    return (
        <section className={styles.hero}>
            <div className={styles.heroLeft}>
                <div
                    className={`${styles.heroTitle} ${styles.heroReveal} ${styles.heroReveal1}`}
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <div
                    className={`${styles.heroInfo} ${styles.heroReveal} ${styles.heroReveal2}`}
                    dangerouslySetInnerHTML={{ __html: infoText }}
                />
                <div className={`${styles.heroButtonGroup} ${styles.heroReveal} ${styles.heroReveal3}`}>
                    <button className={styles.btnPrimary} onClick={onPrimaryClick}>
                        {primaryBtnText}
                    </button>
                    <button className={styles.btnSecondary} onClick={onSecondaryClick}>
                        <span>{secondaryBtnText}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.heroSliderTrack}>
                <div
                    ref={trackRef}
                    className={styles.heroSliderContainer}
                    style={{ cursor: isDragging ? "grabbing" : "grab" }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                >
                    {[...displayCards, ...displayCards].map((card, idx) => (
                        <div
                            key={idx}
                            className={styles.heroCardItem}
                            onClick={() => handleCardClick(card.label)}
                        >
                            <img
                                src={card.image}
                                alt={card.label}
                                className={styles.heroImg}
                                draggable={false}
                            />
                            <div className={styles.cardLabel}
                                dangerouslySetInnerHTML={{ __html: card.label }} />
                            <div className={styles.cardActionContainer}>
                                <button
                                    className={styles.actionButton}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={(e) => { e.stopPropagation(); onDetailClick(card.label); }}
                                    aria-label={`${card.label} detallarına bax`}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="3"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className={styles.actionArrow}>
                                        <line x1="7" y1="17" x2="17" y2="7" />
                                        <polyline points="7 7 17 7 17 17" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}