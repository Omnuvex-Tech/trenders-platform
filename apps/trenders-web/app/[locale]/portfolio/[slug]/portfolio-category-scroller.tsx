"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function normalize(text: string) {
    return (text ?? "")
        .toLowerCase()
        .replace(/ə/g, "e")
        .replace(/ğ/g, "g")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ç/g, "c");
}

export function PortfolioCategoryScroller() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {
        if (!category) return;
        const target = normalize(category);

      const timer = setTimeout(() => {
            const elements = document.querySelectorAll("[data-badge]");
            for (const el of Array.from(elements)) {
                const badge = el.getAttribute("data-badge") || "";
                if (normalize(badge) === target) {
                    const navbarOffset = 100; // navbarın hündürlüyünə görə tənzimlə
                    const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset;
                    window.scrollTo({ top, behavior: "smooth" });
                    break;
                }
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [category]);

    return null;
}