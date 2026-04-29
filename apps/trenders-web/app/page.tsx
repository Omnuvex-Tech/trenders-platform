import type { Language, Translation } from "@repo/types/types";
import { api } from "@/lib/api";
import { config } from "@/config";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { HeroWrapper } from "@/app/components/Hero/hero-wrapper";
import { ProjectsWrapper } from "./components/Project/project-wrapper";
import { PartnersWrapper } from "./components/Partners/partners-wrapper";
import { TestimonialsWrapper } from "./components/Testimonials/testimonials-wrapper";
import { TeamWrapper } from "./components/Team/team-wrapper";
import { BlogWrapper } from "./components/Blog/blog-wrapper";
import { ContactWrapper } from "./components/Contact/contact-wrapper";
import {FaqWrapper} from "./components/Faq/faq-wrapper"
import { FooterWrapper } from "./components/Footer/footer-wrapper";



export default async function HomePage() {

    const langResponse = await api.get<Language[]>(config.endpoints.languages.list);

    if (!langResponse.success || !langResponse.data) {
        return (
            <div className="flex min-h-svh items-center justify-center py-8">
                <p className="text-destructive">{langResponse.message}</p>
            </div>
        );
    }

    const translationResponse = await api.get<Translation[]>(config.endpoints.translations.list, { "locale": "az" });

    return (
        <div className="flex min-h-svh w-full flex-col items-start justify-start">
            <NavbarWrapper 
                locale={"az"} 
                languages={langResponse.data}
                initialTranslations={translationResponse.data ?? []}
            />
            <HeroWrapper />
            <ProjectsWrapper/>
            <PartnersWrapper/>
            <TestimonialsWrapper/>
            <TeamWrapper/>
            <BlogWrapper/>
            <ContactWrapper/>
            <FaqWrapper/>
            <FooterWrapper/>

        </div>
    );
}