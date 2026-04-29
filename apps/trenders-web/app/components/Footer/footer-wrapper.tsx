import { FooterUI } from "@repo/ui";

export function FooterWrapper() {
    return (
        <FooterUI
            logoSrc="/images/footer-logo.png"
            navLinks={[
                { label: "Haqqımızda", href: "#" },
                { label: "Servis", href: "#" },
                { label: "Proyektlər", href: "#" },
                { label: "Karyera", href: "#" },
                { label: "Vakansiyalar", href: "#" },
                { label: "Blog", href: "#" },
            ]}
            socialLinks={[
                { label: "Twitter", href: "#" },
                { label: "Facebook", href: "#" },
                { label: "Instagram", href: "#" },
                { label: "Github", href: "#" },
                { label: "TikTok", href: "#" },
            ]}
            copyrightYear={2023}
            copyrightName="Trenders"
        />
    );
}