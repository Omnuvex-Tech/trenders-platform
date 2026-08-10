// apps/trenders-web/src/app/not-found.tsx
import type { Translation } from "@repo/types/types"
import { NotFoundUI } from "@repo/ui"
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper"
import { STATIC_LANGUAGES } from "@/config/locales"
import { api } from "@/lib/api"
import { config } from "@/config"

type Locale = "az" | "en" | "ru"

const NOT_FOUND_COPY = {
  az: {
    title: "Səhifə tapılmadı",
    description: "Axtardığınız səhifə silinib, adı dəyişib və ya heç vaxt mövcud olmayıb.",
    button: "Ana səhifəyə qayıt",
  },
  en: {
    title: "Page not found",
    description: "The page you're looking for has been removed, renamed, or never existed.",
    button: "Back to homepage",
  },
  ru: {
    title: "Страница не найдена",
    description: "Страница, которую вы ищете, была удалена, переименована или никогда не существовала.",
    button: "На главную",
  },
} as const satisfies Record<Locale, { title: string; description: string; button: string }>

export default async function RootNotFound() {
  const locale: Locale = "az"
  const copy = NOT_FOUND_COPY[locale]

  let translations: Translation[] = []
  try {
    const res = await api.get<Translation[]>(config.endpoints.translations.list, { locale })
    translations = res.data ?? []
  } catch {
    translations = []
  }

  return (
    <div className="flex min-h-svh w-full flex-col items-start justify-start">
      <NavbarWrapper
        locale={locale}
        languages={STATIC_LANGUAGES}
        initialTranslations={translations}
      />
      <NotFoundUI
        title={copy.title}
        description={copy.description}
        buttonLabel={copy.button}
        homeHref={`/${locale}`}
      />
    </div>
  )
}