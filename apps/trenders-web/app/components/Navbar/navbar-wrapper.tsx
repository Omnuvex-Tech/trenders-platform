import { NavbarUI } from "@repo/ui";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher/language-switcher";
import type { Language, Translation } from "@repo/types/types";
import Image from "next/image";
import Link from "next/link";
import { NavbarClient } from "./navbar-client";

function toAbsUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${process.env.API_URL}${path}`;
}

async function getNavbarData() {
  try {
    const res = await fetch(`${process.env.API_URL}/navbar-settings`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

interface NavbarProps {
  languages: Language[];
  locale: string;
  initialTranslations: Translation[];
}

export async function NavbarWrapper({ locale, languages, initialTranslations }: NavbarProps) {
  const data = await getNavbarData();

  const links = data?.links
    ? [...data.links]
        .filter((l: any) => l.isVisible)
        .sort((a: any, b: any) => a.order - b.order)
        .map((l: any) => ({ label: l.label, href: l.href, openInNewTab: l.openInNewTab }))
    : [];

const logo = (
  <Link href="/">
    {data?.logoImage ? (
      <img
        src={toAbsUrl(data.logoImage)}
        alt={data.logoText || "Logo"}
        width={147}
        height={45}
      />
    ) : (
      <img
        src="/images/logo-svg.svg"
        alt={data?.logoText || "Trenders"}
        width={147}
        height={45}
      />
    )}
  </Link>
);

  return (
    <NavbarClient
      logo={logo}
      links={links}
      showSearch={data?.showSearch ?? true}
      showLang={data?.showLang ?? true}
      langSlot={
        <LanguageSwitcher
          languages={languages}
          initialTranslations={initialTranslations}
          locale={locale}
        />
      }
    />
  );
}