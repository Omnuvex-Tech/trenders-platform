"use client";

import { useState } from "react";
import { NavbarUI } from "@repo/ui";

const SUGGESTIONS = [
  "agencyai",
  "agencystile",
  "agencyproject",
  "agencyargument",
  "agencyportfolio",
  "agencyprojectai",
];

interface NavbarClientProps {
  logo: React.ReactNode;
  links: { label: string; href: string; openInNewTab?: boolean }[];
  showSearch: boolean;
  showLang: boolean;
  langSlot?: React.ReactNode;
}

export function NavbarClient({ logo, links, showSearch, showLang, langSlot }: NavbarClientProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <NavbarUI
      logo={logo}
      links={links}
      langSlot={langSlot}
      showSearch={showSearch}
      showLang={showLang}
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