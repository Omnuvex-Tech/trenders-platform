import type { Translation } from "@repo/types/types"
import { NotFoundUI } from "@repo/ui"
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper"
import { STATIC_LANGUAGES } from "@/config/locales"
import { api } from "@/lib/api"
import { config } from "@/config"
import { isSupportedLocale } from "@/config/locales"
import { notFound } from "next/navigation"

type Locale = "az" | "en" | "ru"

const NOT_FOUND_COPY = {
  az: { title: "Səhifə tapılmadı", description: "Axtardığınız səhifə silinib, adı dəyişib və ya heç vaxt mövcud olmayıb.", button: "Ana səhifəyə qayıt" },
  en: { title: "Page not found", description: "The page you're looking for has been removed, renamed, or never existed.", button: "Back to Home page" },
  ru: { title: "Страница не найдена", description: "Страница, которую вы ищете, была удалена, переименована или никогда не существовала.", button: "На главную" },
} as const satisfies Record<Locale, { title: string; description: string; button: string }>

export default async function CatchAllNotFound({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params

  if (!isSupportedLocale(rawLocale)) {
    notFound()
  }

  const locale = rawLocale as Locale
  const copy = NOT_FOUND_COPY[locale]

  let translations: Translation[] = []
  try {
    const res = await api.get<Translation[]>(config.endpoints.translations.list, { locale })
    translations = res.data ?? []
  } catch {
    translations = []
  }

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <NavbarWrapper
        locale={locale}
        languages={STATIC_LANGUAGES}
        initialTranslations={translations}
      />
      <NotFoundUI
        title={copy.title}
        description={copy.description}
        buttonLabel={copy.button}
        homeHref={locale === "az" ? "/" : `/${locale}`}
      />
    </div>
  )
}