import { PortfolioDetailStepsUI } from "@repo/ui";

export function PortfolioDetailStepsWrapper() {
    return (
        <PortfolioDetailStepsUI
            description={
                <>
                    Agentliyimizin brend strategiyası xidmətlərinə{" "}
                    <strong>
                        bazar araşdırması, rəqabət təhlili, brend memarlığı və brend qaydaları  daxildir.
                    </strong>{" "}
                   
                </>
            }
            steps={[
                { number: "01", label: "Saytın məqsədinin müəyyən edilməsi olur" },
                { number: "02", label: "Sayt üçün texniki tapşırığın yaradılması" },
                { number: "03", label: "Kontentin mütləq hazırlanması" },
                { number: "04", label: "Prototipləmə işlərin vacib tutulması" },
            ]}
        />
    );
}