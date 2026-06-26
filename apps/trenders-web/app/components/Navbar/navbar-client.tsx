"use client";

import React from "react";
import { NavbarUI } from "@repo/ui";

interface SearchResult {
  title: string;
  url: string;
  breadcrumb: string;
  excerpt: string;
}

interface NavbarClientProps {
  logo: React.ReactNode;
  links: { label: string; href: string; openInNewTab?: boolean }[];
  showSearch: boolean;
  showLang: boolean;
  langSlot?: React.ReactNode;
  defaultSuggestions: SearchResult[];
  locale: string;
}

export function NavbarClient({
  logo,
  links,
  showSearch,
  showLang,
  langSlot,
  defaultSuggestions,
  locale,
}: NavbarClientProps) {
  return (
    <NavbarUI
      logo={logo}
      links={links}
      langSlot={langSlot}
      showSearch={showSearch}
      showLang={showLang}
      searchOpen={false}
      searchValue=""
      drawerOpen={false}
      onSearchToggle={() => {}}
      onSearchChange={() => {}}
      onDrawerToggle={() => {}}
      onDrawerClose={() => {}}
      suggestions={defaultSuggestions}
      locale={locale}
    />
  );
}