"use client";

import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import type { Language, LanguageSwitcherProps } from "@repo/types/types";
import { cn } from "../../lib/utils";

const LanguageSwitcher = ({
    languages,
    defLang,
    locale,
    onLocaleChange,
    variant = "desktop",
}: LanguageSwitcherProps & {
    locale: string;
    onLocaleChange: (locale: string) => void;
    variant?: "desktop" | "mobile";
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const activeLocale = locale || defLang;

    const activeLang = useMemo(() => {
        const lang = languages.find((l) => l.code === activeLocale);
        return {
            code: (lang?.code || activeLocale || "az").toUpperCase(),
        };
    }, [activeLocale, languages]);

    const isDesktop = variant === "desktop";

    return (
        <div className="relative">
<button
    type="button"
    className="cursor-pointer text-[15px] font-normal text-[#1a1a1a] bg-none border-none p-0"
    onClick={() => setIsOpen((prev) => !prev)}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
>
    <span>{activeLang.code}</span>
</button>
            {isOpen && (
                <div
                    className={cn(
                        "absolute top-full right-0 z-30 mt-2 rounded-xl border border-[#d7deea] bg-white p-1.5 shadow-[0_10px_24px_rgba(17,24,39,0.12)]",
                        isDesktop ? "min-w-[120px]" : "min-w-[110px]"
                    )}
                >
                    {languages.map((lang) => {
                        const isActive = lang.code === activeLocale;
                        const code = lang.code.toUpperCase();

                        return (
                            <button
                                key={lang.id}
                                type="button"
                                className={cn(
                                    "flex w-full cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-[14px] font-medium text-[#1d2230] transition-colors",
                                    isActive ? "border-[#c7d8fb] bg-[#e7efff]" : "border-transparent hover:bg-[#f3f4f6]"
                                )}
                                onClick={() => {
                                    onLocaleChange(lang.code);
                                    setIsOpen(false);
                                }}
                                role="option"
                                aria-selected={isActive}
                            >
                                <span>{code}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export { LanguageSwitcher };