import type { Translation } from "@repo/types/types";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { HeroWrapper } from "@/app/components/Hero/hero-wrapper";
import { ProjectsWrapper } from "./components/Project/project-wrapper";
import { PartnersWrapper } from "./components/Partners/partners-wrapper";
import { TestimonialsWrapper } from "./components/Testimonials/testimonials-wrapper";
import { TeamWrapper } from "./components/Team/team-wrapper";
import { BlogWrapper } from "./components/Blog/blog-wrapper";
import { ContactWrapper } from "./components/Contact/contact-wrapper";
import { FaqWrapper } from "./components/Faq/faq-wrapper"

export default async function HomePage() {
    const translationResponse = await api.get<Translation[]>(config.endpoints.translations.list, { "locale": "az" });

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            <NavbarWrapper
                locale={"az"}
                languages={STATIC_LANGUAGES}
                initialTranslations={translationResponse.data ?? []}
            />
            <HeroWrapper locale="az" />
            <ProjectsWrapper locale="az" />
            <PartnersWrapper locale="az" />
            <TestimonialsWrapper locale="az" />
            <TeamWrapper locale="az" />
            <BlogWrapper locale="az" />
            <ContactWrapper locale="az" />
            <FaqWrapper locale="az" />
        </div>
    );
}


