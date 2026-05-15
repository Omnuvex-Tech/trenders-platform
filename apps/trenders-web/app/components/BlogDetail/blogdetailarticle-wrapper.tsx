import { BlogDetailArticleUI } from "@repo/ui";

export function BlogDetailArticleWrapper() {
    return (
        <BlogDetailArticleUI
            mainTitle="Yarışmanın Azərbaycanda keçirilmə tarixi"
            sections={[
                {
                    paragraphs: [
                        `Young Lions Azerbaijan 30 yaşadək yaradıcı, media və marketinq mütəxəssisləri üçün nəzərdə tutulmuş beynəlxalq "Young Lions" proqramının Azərbaycan üzrə rəsmi seçim mərhələsidir. Bu proqram dünyanın ən nüfuzlu yaradıcılıq tədbirlərindən biri olan Cannes Lions International Festival of Creativity çərçivəsində keçirilir və gənc mütəxəssislərə öz ölkələrini beynəlxalq səviyyədə təmsil etmək imkanı yaradır.`,
                        `Azərbaycan bu proqramda 2022-ci ildən etibarən rəsmi şəkildə iştirak edir. Bu müddət ərzində Young Lions Azerbaijan ölkədə yaradıcı sənayenin inkişafına töhfə verən, yeni nəsil kreativlərin formalaşmasına xidmət edən mühüm platformaya çevrilib.`,
                    ],
                },
                {
                    heading: "Young Lions Azerbaijan nədir?",
                    paragraphs: [
                        `Young Lions Azerbaijan 30 yaşadək yaradıcı, media və marketinq mütəxəssisləri üçün nəzərdə tutulmuş beynəlxalq “Young Lions” proqramının Azərbaycan üzrə rəsmi seçim mərhələsidir. Bu proqram dünyanın ən nüfuzlu yaradıcılıq tədbirlərindən biri olan Cannes Lions International Festival of Creativity çərçivəsində keçirilir və gənc mütəxəssislərə öz ölkələrini beynəlxalq səviyyədə təmsil etmək imkanı yaradır.

Azərbaycan bu proqramda 2022-ci ildən etibarən rəsmi şəkildə iştirak edir. Bu müddət ərzində Young Lions Azerbaijan ölkədə yaradıcı sənayenin inkişafına töhfə verən, yeni nəsil kreativlərin formalaşmasına xidmət edən mühüm platformaya çevrilib.`,
                        `Young Lions Azerbaijan artıq 3 ildir ki, ölkəmizdə keçirilir. İlk dəfə yerli mərhələnin təşkili ilə Azərbaycan beynəlxalq Young Lions şəbəkəsinə qoşulub. Sonrakı illərdə yarışmaya maraq artıb və hər il daha çox komanda qeydiyyatdan keçib.

Bu artım həm yerli kreativ sənayenin inkişafını, həm də gənc mütəxəssislərin beynəlxalq platformalara çıxışa olan marağını göstərir.`,
                    ],
                },
                {
                    heading: "Kateqoriyalar",
                    hashSections: [
                        {
                            tag: "Dizayn kateqoriyası",
                            paragraphs: [
                                "Bu kateqoriyada iştirakçılara branding üzərində işləmək tapşırılır. Komandalar verilən brifə uyğun olaraq brend üçün konseptual vizual həll hazırlayırlar.",
                                "Hazırlanan iş bir A4 formatlı səhifədə təqdim edilməlidir. Bu səhifədə brend ideyası, əsas vizual istiqamət və dizayn yanaşması aydın şəkildə göstərilməlidir. Məqsəd iştirakçının brend düşüncə tərzini, vizual strategiya qurmaq bacarığını və ideyanı kompakt formada ifadə etmək qabiliyyətini nümayiş etdirməkdir.",
                            ],
                        },
                        {
                            tag: "Film kateqoriyası",
                            paragraphs: [
                                "Bu kateqoriyada iştirakçılara branding üzərində işləmək tapşırılır. Komandalar verilən brifə uyğun olaraq brend üçün konseptual vizual həll hazırlayırlar.",
                                "Hazırlanan iş bir A4 formatlı səhifədə təqdim edilməlidir. Bu səhifədə brend ideyası, əsas vizual istiqamət və dizayn yanaşması aydın şəkildə göstərilməlidir. Məqsəd iştirakçının brend düşüncə tərzini, vizual strategiya qurmaq bacarığını və ideyanı kompakt formada ifadə etmək qabiliyyətini nümayiş etdirməkdir.",
                            ],
                        },
                        {
                            tag: "Print kateqoriyası",
                            paragraphs: [
                                "Print kateqoriyasında iştirakçılardan yalnız bir poster hazırlanması tələb olunur. Poster 4:5 ölçü formatında təqdim edilməli və tək bir vizual üzərindən ideya ifadə olunmalıdır. Bu kateqoriyanın əsas məqsədi bir fikri minimum vasitələrlə, maksimum təsirlə çatdırmaqdır. Güclü başlıq, aydın vizual metafora və kompozisiya əsas rol oynayır. Print kateqoriyası ideyanın sadəliyi və bir baxışda başa düşülməsi prinsipi üzərində qurulub.",
                            ],
                        },
                    ],
                    sideImage: "/images/blogdetail1.png",
                    sideImageAlt: "Festival of Creativity",
                },
            ]}
            hashtags={[
                "#aiblog",
                "#aidesign",
                "#management",
                "#projectmanager",
                "#aimotion",
                "#baku",
                "#azerbaijan",
                "#agencyai",
            ]}
        />
    );
}