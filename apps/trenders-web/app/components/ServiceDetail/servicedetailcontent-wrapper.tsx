import { ServiceDetailContentUI } from "@repo/ui";

export function ServiceDetailContentWrapper() {
    return (
        <ServiceDetailContentUI
            items={[
                {
                    number: "01",
                    badge: "Brendinq",
                    title: "Brend Strategiyası:",
                    descriptions: [
                        "Bazar araşdırması brend strategiyasının inkişafının vacib komponentidir. Trenders müştərilərinin hədəf auditoriyasını, ehtiyaclarını və üstünlüklərini daha yaxşı başa düşməyə kömək etmək üçün geniş bazar araşdırması aparır.",
                        "Bu tədqiqat əsas bazar tendensiyalarını, müştəri fikirlərini və brend strategiyasının inkişafına təsir edə biləcək rəqabət mühitini müəyyən etməyə kömək edir. Rəqabət təhlili müştərilərə rəqiblərini tanımağa və bazarda fərqlənmək imkanlarını müəyyən etməyə kömək edir.",
                    ],
                    quote: (
                        <>
                            Agentliyimizin brend strategiyası xidmətlərinə{" "}
                            <strong>bazar araşdırması, rəqabət təhlili, brend memarlığı və brend qaydaları daxildir</strong>
                        </>
                    ),
                    quoteImage: "/images/pdetail9.png",
                    subText: (
                        <>
                            Trenders brend <strong>strategiyası, brend identifikasiyası, brend mesajlaşması, brendin pozisiyası və brendin idarə edilməsi</strong> də daxil olmaqla geniş çeşidli brendinq xidmətləri təklif edir. Xidmətlərimiz daxilində brendinq xidmətinizdən yararlanan şirkətlər üçün hazırladığımız dizayn və loqoları da görə bilərsiniz            </>
                    ),
                },
                {
                    number: "02",
                    badge: "Brendinq",
                    title: "Brend Pozisiyası:",
                    descriptions: [
                        "Brendin pozisiyası, markanın rəqiblərinə nisbətən bazarda özünəməxsus mövqeyinin müəyyən edilməsi prosesidir. Bu, bir markanın əsas üstünlüklərini və xüsusiyyətlərini müəyyənləşdirməyi və müştərilərə informasiyanı birbaşa şəkildə çatdırmağı əhatə edir. Trendlər müştərilərə onları rəqiblərindən fərqləndirən və müştəriləri ilə güclü emosional əlaqələr quran effektiv brend pozisiyası üçün strategiyaları hazırlamağa kömək edir. Bizim brendin bazar pozisiyası xidmətlərimizə brendin fərqləndirilməsi, hədəf auditoriya təhlili və brend mesajlaşması daxildir.",
                        "Brendin diferensiallaşdırılması, brendi rəqiblərindən nəyin fərqləndirdiyini müəyyən etmək prosesidir. Hədəf auditoriyasının təhlili bir markanın hədəf auditoriyasının ehtiyaclarını, üstünlüklərini başa düşməyi və onlarla birbaşa danışan mesajlaşmanı inkişaf etdirməyi əhatə edir. Nəhayət, brend mesajlaşması brendin xidmətlərini müştərilərə birbaşa şəkildə çatdıran aydın və qısa mesajın hazırlanmasını nəzərdə tutur.",
                    ],
                    quote: <></>,
                    quoteImage: "",
                    image: "/images/sdetail3.png",
                    imageAlt: "Ranger Raptor",
                },
            ]}
        />
    );
}