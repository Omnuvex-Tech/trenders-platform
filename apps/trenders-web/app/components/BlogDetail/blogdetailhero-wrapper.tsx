import { BlogDetailPageHeroUI } from "@repo/ui";

export function BlogDetailHeroWrapper() {
    return (
        <BlogDetailPageHeroUI
            heroImage="/images/blogdetail4.png"
            heroImageAlt="Young Lions Azerbaijan"
            author={{
                name: "Leyla Axundova",
                role: "Baş İcarçı Direktor",
                avatar: "/images/team3.jpg",
            }}
            hashtag="Design"
            title="Young Lions Azerbaijan: Gənc yaradıcılar üçün beynəlxalq karyera platforması."
            paragraphs={[
                "Müasir rəqabətli iş dünyasında brendinq hər hansı uğurlu marketinq strategiyasının mühüm aspektinə çevrilib. Güclü brend biznesə özünü rəqiblərindən fərqləndirməyə, müştəriləri arasında etibar və inam yaratmağa və istehlakçıların şüurunda qalıcı təəssürat yaratmağa kömək edə bilər. Xidmətlərinə müraciət edir. Trendersin fərqini bilmək üçün isə xidmətimizi bizdən eşidin. Müasir rəqabətli iş dünyasında brendinq hər hansı uğurlu marketinq strategiyasının mühüm aspektinə çevrilib.",
                "Young Lions Azerbaijan 30 yaşadək yaradıcı, media və marketinq mütəxəssisləri üçün nəzərdə tutulmuş beynəlxalq \"Young Lions\" proqramının Azərbaycan üzrə rəsmi seçim mərhələsidir. Bu proqram dünyanın ən nüfuzlu yaradıcılıq tədbirlərindən biri olan Cannes Lions International Festival of Creativity çərçivəsində keçirilir və gənc mütəxəssislərə öz ölkələrini beynəlxalq səviyyədə təmsil etmək imkanı yaradır.Azərbaycan bu proqramda 2022-ci ildən etibarən rəsmi şəkildə iştirak edir. Bu müddət ərzində Young Lions Azerbaijan ölkədə yaradıcı sənayenin inkişafına töhfə verən, yeni nəsil kreativlərin formalaşmasına xidmət edən mühüm platformaya çevrilib. ",
            ]}
        />
    );
}