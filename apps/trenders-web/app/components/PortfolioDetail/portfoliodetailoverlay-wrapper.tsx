import { PortfolioDetailOverlayUI } from "@repo/ui";

export function PortfolioDetailOverlayWrapper() {
    return (
        <PortfolioDetailOverlayUI
            image="/images/pdetail11.png"
            imageAlt="Brend Kimliyi"
            badge="Brendinq"
            title="Brend Kimliyi:"
            descriptions={[
                "Brend identifikasiyası brendin vizual və emosional ifadəsidir. Bura müştərilərin marka ilə əlaqələndirdiyi bütün vizual elementlər, məsələn, loqolar, rəng sxemləri, tipoqrafiya və təsvirlər daxildir. Trendlər müştərilərə öz brendlərinin mahiyyətini əks etdirən, onları rəqiblərindən fərqləndirən, unikal və yaddaqalan brend şəxsiyyətlərini inkişaf etdirməyə kömək edir. Bizim brend identifikasiyası xidmətlərimizə loqo dizaynı, vizual brend dizaynı və brend stilistikası daxildir.",
                "Loqo dizaynı brendi təmsil edən fərqli vizual simvolun yaradılması prosesidir. Trenders-in dizayn komandası yaddaqalan, özünəməxsus və brend hekayəsinə uyğun loqolar hazırlamaq üçün müştərilərə sıx əməkdaşlıq edir. Vizual brend dizaynına brendin şəxsiyyətini və dəyərlərini çatdıran hərtərəfli vizual elementlərin hazırlanması daxildir.",
            ]}
        />
    );
}