"use client";

import { useState, useEffect, useRef } from "react";
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
}

function getCookieLocale(): string {
  if (typeof document === 'undefined') return 'az';
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  return match?.[1] ?? 'az';
}

export function NavbarClient({ logo, links, showSearch, showLang, langSlot, defaultSuggestions }: NavbarClientProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (searchValue.trim().length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const locale = getCookieLocale();
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchValue)}&locale=${locale}`);
        const data: SearchResult[] = await res.json();
        setResults(data);
      } catch {
        setResults([]);
      }
    }, 300);
  }, [searchValue]);

  const displaySuggestions = searchValue.trim().length < 2 ? defaultSuggestions : results;

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
      suggestions={displaySuggestions}
    />
  );
}