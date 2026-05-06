import { ServiceDetailQuoteUI } from "@repo/ui";

export function ServiceDetailQuoteWrapper() {
    return (
        <ServiceDetailQuoteUI
            number="03"
            badge="Brendinq"
            title="Brend İdarəetmə:"
            descriptions={[
                "Brend menecmenti markanın şəxsiyyətini və reputasiyasını zamanla saxlamaq və gücləndirmək üçün davam edən prosesdir. Bu, brend qavrayışının monitorinqini, brend aktivlərinin idarə olunmasını və bütün brend temas nöqtələrində ardıcıllığın təmin edilməsini əhatə edir. Trendlər müştərilərə brendlərinin zamanla güclü və aktual qalmasını təmin edən hərtərəfli brend idarəetmə strategiyaları hazırlamağa kömək edir. Agentliyimizin brend idarəçiliyi xidmətlərinə brend auditləri, brend monitorinqi və brend aktivlərinin idarə edilməsi daxildir.",
                "Brend auditləri, brendin dəyərlərinə və mesajlaşmalarına uyğun olduğundan əmin olmaq üçün brendin bütün aspektlərinin nəzərdən keçirilməsini əhatə edir. Brend monitorinqi potensial problemləri və ya imkanları müəyyən etmək üçün müxtəlif kanallar üzrə brend haqqında qeydləri və müştəri reaksiyalarını izləməyi əhatə edir.",
                "Brend aktivlərinin idarə edilməsi loqotiplər və vizual elementlər kimi bütün brend aktivlərinin brendin paylaşımlar etdiyi platformalarda müasir və ardıcıl olmasını təmin etməyi nəzərdə tutur.",
            ]}
            quoteImage="/images/pdetail9.png"
            quoteImageAlt="Brend memarlığı"
            quoteText={
                <>
                    Brend memarlığı brend adları, loqolar və sloqanlar kimi{" "}
                    <strong>brend elementlərinin aydın iyerarxiyasının inkişaf etdirilməsi prosesidir</strong>
                </>
            }
        />
    );
}