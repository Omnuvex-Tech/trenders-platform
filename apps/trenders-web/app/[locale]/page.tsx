import type { Translation } from "@repo/types/types";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES, isSupportedLocale } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { HeroWrapper } from "@/app/components/Hero/hero-wrapper";
import { ProjectsWrapper } from "@/app/components/Project/project-wrapper";
import { PartnersWrapper } from "@/app/components/Partners/partners-wrapper";
import { TestimonialsWrapper } from "@/app/components/Testimonials/testimonials-wrapper";
import { TeamWrapper } from "@/app/components/Team/team-wrapper";
import { BlogWrapper } from "@/app/components/Blog/blog-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { FaqWrapper } from "@/app/components/Faq/faq-wrapper";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  try {
    const res = await fetch(`${process.env.API_URL}/page-meta/home`, {
      cache: "no-store",
    });
    const data = await res.json();
    return {
      title: data?.seoTitle?.[locale] || "Ana Səhifə",
      description: data?.seoDescription?.[locale] || "",
      keywords: data?.seoKeywords?.[locale] || "",
    };
  } catch {
    return { title: "Ana Səhifə" };
  }
}


export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    if (!isSupportedLocale(locale)) {
        notFound();
    }

    const translationResponse = await api.get<Translation[]>(config.endpoints.translations.list, { locale });

    return (
        <div className="flex min-h-svh w-full flex-col items-center justify-start pt-0 pb-8">
            <NavbarWrapper 
                locale={locale} 
                languages={STATIC_LANGUAGES}
                initialTranslations={translationResponse.data ?? []}
            />
            <HeroWrapper locale={locale} />
            <ProjectsWrapper locale={locale} />
            <PartnersWrapper locale={locale} />
            <TestimonialsWrapper locale={locale} />
            <TeamWrapper locale={locale} />
            <BlogWrapper locale={locale} />
            <ContactWrapper locale={locale} />
            <FaqWrapper locale={locale} />
        </div>
    );
}

