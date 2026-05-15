import { BlogDetailContentUI } from "@repo/ui";

export function BlogDetailContentWrapper() {
    return (
        <BlogDetailContentUI
            heroImage="/images/blogdetail3.png"
            heroImageAlt="Young Lions Azerbaijan"
            overlapTitle="Sizi Trend Edəcək Marketinq Agentliyi"
            introParagraphs={[
                "Young Lions Azerbaijan 30 yaşadək yaradıcı, media və marketinq mütəxəssisləri üçün nəzərdə tutulmuş beynəlxalq \"Young Lions\" proqramının Azərbaycan üzrə rəsmi seçim mərhələsidir. Bu proqram dünyanın ən nüfuzlu yaradıcılıq tədbirlərindən biri olan Cannes Lions International Festival of Creativity çərçivəsində keçirilir və gənc mütəxəssislərə öz ölkələrini beynəlxalq səviyyədə təmsil etmək imkanı yaradır.",
                "Azərbaycan bu proqramda 2022-ci ildən etibarən rəsmi şəkildə iştirak edir. Bu müddət ərzində Young Lions Azerbaijan ölkədə yaradıcı sənayenin inkişafına töhfə verən, yeni nəsil kreativlərin formalaşmasına xidmət edən mühüm platformaya çevrilib.",
            ]}
            sections={[
                {
                    title: "Young Lions Azerbaijan nədir?",
                    paragraphs: [
                        "Young Lions Azerbaijan 30 yaşadək yaradıcı, media və marketinq mütəxəssisləri üçün nəzərdə tutulmuş beynəlxalq \"Young Lions\" proqramının Azərbaycan üzrə rəsmi seçim mərhələsidir. Bu proqram dünyanın ən nüfuzlu yaradıcılıq tədbirlərindən biri olan Cannes Lions International Festival of Creativity çərçivəsində keçirilir və gənc mütəxəssislərə öz ölkələrini beynəlxalq səviyyədə təmsil etmək imkanı yaradır.",
                        "Azərbaycan bu proqramda 2022-ci ildən etibarən rəsmi şəkildə iştirak edir. Bu müddət ərzində Young Lions Azerbaijan ölkədə yaradıcı sənayenin inkişafına töhfə verən, yeni nəsil kreativlərin formalaşmasına xidmət edən mühüm platformaya çevrilib.",
                        "Young Lions Azerbaijan artıq 3 ildir ki, ölkəmizdə keçirilir. İlk dəfə yerli kreativlərin təşkili ilə Azərbaycan beynəlxalq Young Lions şəbəkəsinə qoşulub. Sonrakı illərdə yarışmaya maraq artıb və hər il daha çox komanda qeydiyyatdan keçib.",
                        "Bu artım həm yerli kreativ sənayenin inkişafını, həm də gənc mütəxəssislərin beynəlxalq platformalara çıxış olan marağını göstərir.",
                    ],
                },
            ]}
            bottomImages={{
                left: "/images/blogdetail2.png",
                leftAlt: "Festival of Creativity",
                right: "/images/blogdetail1.png",
                rightAlt: "Unleash Your Inner Lion",
            }}
        />
    );
}