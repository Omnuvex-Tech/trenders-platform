"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NavbarUI } from "@repo/ui";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher/language-switcher";
import type { Language, Translation } from "@repo/types/types";

const NAV_LINKS = [
    { label: "Haqqımızda", href: "/About" },
    { label: "Service", href: "/Service" },
    { label: "Portfolio", href: "/Portfolio" },
    { label: "Vakansiyalar", href: "/Vacancy" },
    { label: "Blog", href: "/Blog" },
    { label: "Əlaqə", href: "/Contact" },
];

const SUGGESTIONS = [
    "agencyai",
    "agencystile",
    "agencyproject",
    "agencyargument",
    "agencyportfolio",
    "agencyprojectai",
];

interface NavbarProps {
    languages: Language[];
    locale: string;
    initialTranslations: Translation[];
}

export function NavbarWrapper({ locale, languages, initialTranslations }: NavbarProps) {
        const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <NavbarUI
            logo={
                <Link href="/">
                    <Image
                        src="/images/logo-svg.svg"
                        alt="Trenders"
                        width={147}
                        height={45}
                        priority
                    />
                </Link>
            }
            links={NAV_LINKS}
           langSlot={
    <LanguageSwitcher
        languages={languages}
        initialTranslations={initialTranslations}
        locale={locale}       
    />
            }
            searchOpen={searchOpen}
            searchValue={searchValue}
            drawerOpen={drawerOpen}
            onSearchToggle={() => setSearchOpen(prev => !prev)}
            onSearchChange={setSearchValue}
            onDrawerToggle={() => setDrawerOpen(prev => !prev)}
            onDrawerClose={() => setDrawerOpen(false)}
            suggestions={SUGGESTIONS}
        />
    );
}