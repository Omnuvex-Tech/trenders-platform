"use client";

import { useState, useEffect, useCallback } from "react";
import { HeroUI } from "@repo/ui";
import type { HeroCard } from "@repo/ui";

const BASE_CARDS: HeroCard[] = [
    { label: "Branding", image: "/images/sdetail2.png" },
    { label: "Website", image: "/images/sdetail3.png" },
    { label: "Content", image: "/images/service3.png" },
];

const AUTOPLAY_MS = 3000;

export function HeroWrapper() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState<HeroCard[]>([]);

    useEffect(() => {
        const infiniteList = Array.from({ length: 50 }, (_, i) => BASE_CARDS[i % BASE_CARDS.length]!);
        setVisibleCards(infiniteList);
    }, []);

    useEffect(() => {
        if (visibleCards.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                // Əgər sona yaxınlaşsaq sıfırlamaq üçün təhlükəsizlik şərti
                if (prevIndex >= visibleCards.length - 4) {
                    return 0;
                }
                return prevIndex + 1;
            });
        }, AUTOPLAY_MS);

        return () => clearInterval(timer);
    }, [visibleCards]);

    const handleDetailClick = useCallback((label: string) => {
        console.log(`Navigating to detail page for: ${label}`);
    }, []);

    return (
        <HeroUI
            subtitle="Sizin tərəfinizdən"
            title={<>seçilən <strong>Marketing</strong> Agentliyi</>}
            infoText={
                <p>
                    <strong>Marketing analitikası:</strong> məlumatların incəliklərini deşifrə
                    edərək qələbəyə gedən yolunuzu işıqlandırın. Məlumatların incəliklərini deşifrə
                </p>
            }
            visibleCards={visibleCards}
            currentIndex={currentIndex}
            onDetailClick={handleDetailClick}
        />
    );
}