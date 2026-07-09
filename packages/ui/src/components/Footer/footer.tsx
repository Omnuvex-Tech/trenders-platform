"use client";

import styles from "../../styles/Footer/footer.module.css";

export interface FooterLink {
    id?: number;
    label?: string;
    href: string;
    icon?: string;
}

export interface FooterContactItem {
    label: string;
    value: string;
    href?: string;
}

export interface FooterUIProps {
    logoSrc: string;
    logoAlt?: string;
    description: string;
    navLinks: FooterLink[];
    socialLinks: FooterLink[];
    contactItems: FooterContactItem[];
    copyrightText: string;
    privacyLabel?: string;
    privacyHref?: string;
}

export function FooterUI({
    logoSrc,
    logoAlt,
    description,
    navLinks,
    socialLinks,
    contactItems,
    copyrightText,
    privacyLabel = "Məxfilik siyasəti | Bütün hüquqlar qorunur",
    privacyHref = "#",
}: FooterUIProps) {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <img src={logoSrc} alt={logoAlt ?? ""} className={styles.logo} />

                    <p className={styles.description}>{description}</p>

                    <div className={styles.socials}>
                        {socialLinks.map((link) => (
                            <a
                                key={link.id ?? link.href}
                                href={link.href}
                                className={styles.socialBtn}
                                aria-label={link.label ?? ""}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.icon && (
                                    <img
                                        src={link.icon}
                                        alt={link.label ?? ""}
                                        width={16}
                                        height={16}
                                        style={{ objectFit: "contain" }}
                                    />
                                )}
                            </a>
                        ))}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <a
                                key={link.id ?? link.href}
                                href={link.href}
                                className={styles.navLink}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className={styles.contactCol}>
                        {contactItems.map((item) => (
                            <div key={item.label} className={styles.contactItem}>
                                <p className={styles.contactLabel}>{item.label}</p>

                                {item.href ? (
                                    <a href={item.href} className={styles.contactValue}>
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className={styles.contactValue}>{item.value}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.bottom}>
                <p className={styles.copyright}>{copyrightText}</p>

                <a href={privacyHref} className={styles.privacy}>
                    {privacyLabel}
                </a>
            </div>
        </footer>
    );
}