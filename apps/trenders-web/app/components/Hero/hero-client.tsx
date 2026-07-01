// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { HeroUI } from "@repo/ui";
// import type { HeroCard } from "@repo/ui";

// const AUTOPLAY_MS = 3000;

// interface HeroClientProps {
//   locale: string;
//   baseCards: (HeroCard & { slug: string })[];
//   title: string;
//   description: string;
//   primaryBtnText: string;
//   primaryBtnLink: string;
//   primaryBtnNewTab: boolean;
//   secondaryBtnText: string;
//   secondaryBtnLink: string;
//   secondaryBtnNewTab: boolean;
// }

// export function HeroClient({
//   locale,
//   baseCards,
//   title,
//   description,
//   primaryBtnText,
//   primaryBtnLink,
//   primaryBtnNewTab,
//   secondaryBtnText,
//   secondaryBtnLink,
//   secondaryBtnNewTab,
// }: HeroClientProps) {
//   const router = useRouter();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const visibleCards: HeroCard[] = baseCards.length > 0
//     ? Array.from({ length: 50 }, (_, i) => baseCards[i % baseCards.length]!)
//     : [];

//   useEffect(() => {
//     if (visibleCards.length === 0) return;
//     const timer = setInterval(() => {
//       setCurrentIndex(prev => prev >= visibleCards.length - 4 ? 0 : prev + 1);
//     }, AUTOPLAY_MS);
//     return () => clearInterval(timer);
//   }, [visibleCards.length]);

//   const handleDetailClick = useCallback((label: string) => {
//     const found = baseCards.find(c => c.label === label);
//     if (found?.slug) router.push(`/${locale}/service/${found.slug}`);
//   }, [baseCards, locale, router]);

//   const handlePrimaryClick = () => {
//     if (primaryBtnNewTab) window.open(primaryBtnLink, "_blank");
//     else router.push(primaryBtnLink);
//   };

//   const handleSecondaryClick = () => {
//     if (secondaryBtnNewTab) window.open(secondaryBtnLink, "_blank");
//     else router.push(secondaryBtnLink);
//   };

//   return (
//     <HeroUI
//   title={title}
//   infoText={description}
//       primaryBtnText={primaryBtnText}
//       secondaryBtnText={secondaryBtnText}
//       visibleCards={visibleCards}
//       currentIndex={currentIndex}
//       onDetailClick={handleDetailClick}
//       onPrimaryClick={handlePrimaryClick}
//       onSecondaryClick={handleSecondaryClick}
//     />
//   );
// }




























"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { HeroUI } from "@repo/ui";
import type { HeroCard } from "@repo/ui";

interface HeroClientProps {
  locale: string;
  baseCards: (HeroCard & { slug: string })[];
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  primaryBtnNewTab: boolean;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  secondaryBtnNewTab: boolean;
}

export function HeroClient({
  locale,
  baseCards,
  title,
  description,
  primaryBtnText,
  primaryBtnLink,
  primaryBtnNewTab,
  secondaryBtnText,
  secondaryBtnLink,
  secondaryBtnNewTab,
}: HeroClientProps) {
  const router = useRouter();

  const visibleCards: HeroCard[] = baseCards.length > 0
    ? Array.from({ length: 50 }, (_, i) => baseCards[i % baseCards.length]!)
    : [];

  const handleDetailClick = useCallback((label: string) => {
    const found = baseCards.find(c => c.label === label);
    if (found?.slug) router.push(`/${locale}/service/${found.slug}`);
  }, [baseCards, locale, router]);
  
const handlePrimaryClick = () => {
  if (!primaryBtnLink || primaryBtnLink.trim() === "") {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (primaryBtnNewTab) window.open(primaryBtnLink, "_blank");
  else router.push(primaryBtnLink);
};
  const handleSecondaryClick = () => {
    if (secondaryBtnNewTab) window.open(secondaryBtnLink, "_blank");
    else router.push(secondaryBtnLink);
  };

  return (
    <HeroUI
      title={title}
      infoText={description}
      primaryBtnText={primaryBtnText}
      secondaryBtnText={secondaryBtnText}
      visibleCards={visibleCards}
      currentIndex={0}
      onDetailClick={handleDetailClick}
      onPrimaryClick={handlePrimaryClick}
      onSecondaryClick={handleSecondaryClick}
    />
  );
}