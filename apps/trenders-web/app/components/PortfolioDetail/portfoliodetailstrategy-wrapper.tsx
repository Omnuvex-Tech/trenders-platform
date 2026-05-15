'use client'

import { PortfolioDetailStrategyUI } from '@repo/ui'

export function PortfolioDetailStrategyWrapper() {
    return (
        <PortfolioDetailStrategyUI
            quote={
               <>
                    Agentliyimizin brend strategiyası xidmətlərinə{" "}
                    <strong>
                        bazar araşdırması, rəqabət təhlili, brend memarlığı və brend qaydaları  daxildir.
                    </strong>{" "}
                   
                </>
            }
            mainImage="/images/pdetail10.png"
            smallImages={['/images/pdetail7.png', '/images/pdetail8.png']}
            quoteImage="/images/pdetail9.png"
            title="Brend strategiyasının qurulması "
            badge="Brendinq"
            descriptions={[
                "Brend strategiyası, markanın uzunmüddətli məqsədlərinə çatmaq üçün planlaşdırılmış addımlar toplusudur. Bu proses brendin dəyərlərini, missiyasını və vizyonunu aydın şəkildə müəyyənləşdirir.",
                "Effektiv strategiya müştərilərlə emosional bağ qurmağa, rəqiblərdən fərqlənməyə və bazarda güclü mövqe tutmağa imkan verir. Bizim yanaşmamız brendin əsas güclü tərəflərini ön plana çıxarır."
            ]}
        />
    )
}
