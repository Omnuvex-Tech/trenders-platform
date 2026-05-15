import { FooterUI } from "@repo/ui";

export function FooterWrapper() {
    return (
        <FooterUI
            logoSrc="/images/footer-logo.png"
            description="Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet"
            navLinks={[
                { label: "Haqqımızda", href: "/About" },
                { label: "Service", href: "/Service" },
                { label: "Portfolio", href: "#" },
                { label: "Vakansiyalar", href: "/Vacancy" },
                { label: "Blog", href: "/Blog" },
                { label: "Əlaqə", href: "#" },
            ]}
            socialLinks={[
                { label: "Facebook", href: "#" },
                { label: "Instagram", href: "#" },
                { label: "TikTok", href: "#" },
                { label: "LinkedIn", href: "#" },
            ]}
            contactItems={[
                {
                    label: "Location",
                    value: "Baku, Sabail Alibayov Gardashlari, 12",
                },
                {
                    label: "Phone",
                    value: "+(994) 502263035",
                    href: "tel:+994502263035",
                },
                {
                    label: "Email Adress",
                    value: "trenders@gmail.com",
                    href: "mailto:trenders@gmail.com",
                },
            ]}
            copyrightYear={2023}
            copyrightName="Trenders"
        />
    );
}