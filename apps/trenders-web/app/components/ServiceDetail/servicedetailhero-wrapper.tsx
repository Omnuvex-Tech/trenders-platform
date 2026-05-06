import { ServiceDetailHeroUI } from "@repo/ui";

export function ServiceDetailHeroWrapper() {
    return (
        <ServiceDetailHeroUI
            heroImage="/images/sdetail1.png"
            badge="Brendinq"
            title="Sizi Trend Edəcək Marketinq Agentliyi"
            descriptions={[
                "Müasir rəqabətli iş dünyasında brendinq hər hansı uğurlu marketinq strategiyasının mühüm aspektinə çevrilib. Güclü brend biznese özünü rəqiblərindən fərqləndirməyə, müştəriləri arasında etibar və inam yaratmağa və istehlakçıların şüurunda qalıcı təəssürat yaratmağa kömək edə bilər.",
                "Məhz buna görə də getdikcə daha çox şirkət Bakıda, Azərbaycanda yerləşən yerli agentlik olan Trenders kimi marketinq agentliklərinin təqdim etdiyi brendinq xidmətlərinə müraciət edir. Trendersin fərqini bilmək üçün isə xidmətimizi bizdən eşidin.",
            ]}
            stats={[
                { label: "Dönüşüm", value: "35%" },
                { label: "Təəssüratlar", value: "2.3M" },
                { label: "Müştərilər", value: "3456" },
                { label: "Kliklər", value: "+98%" },
            ]}
            quoteText={
                <>
                    Trenders bizneslərə öz brendlərini yaratmaqda, məhsul və ya xidmətlərini{" "}
                    <strong>effektiv şəkildə satmaqda kömək etmək üzrə ixtisaslaşaraq xidmət göstərən marketinq agentliyidir.</strong>
                </>
            }
            bottomImage="/images/sdetail2.png"
            bottomImageAlt="Whitestone Estate"
        />
    );
}