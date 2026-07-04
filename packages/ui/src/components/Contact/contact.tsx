

"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../../styles/Contact/contact.module.css";

export interface ContactSocialLink {
    id: number;
    icon: string | null;
    href: string;
}

export interface ContactInfo {
    emailLabel: string;
    email: string;
    phoneLabel: string;
    phone: string;
    locationLabel: string;
    location: string;
    hoursLabel: string;
    hours: string;
    followUsLabel: string;
    socialLinks: ContactSocialLink[];
    hashtags: string[];
}

export interface ContactUIProps {
    title: string;
    description: string;
    info: ContactInfo;
    serviceOptions: string[];
    budgetOptions: string[];
    timelineOptions: string[];
    formLabels: {
        name: string;
        namePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        phone: string;
        phonePlaceholder: string;
        service: string;
        budget: string;
        budgetPlaceholder: string;
        timeline: string;
        timelinePlaceholder: string;
        message: string;
        messagePlaceholder: string;
        submit: string;
    };
    termsHref?: string;
    privacyHref?: string;
    onSubmit?: (data: Record<string, string>) => Promise<void>;
}

type DropdownKey = "service" | "budget" | "timeline";

function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                if (entries[0]?.isIntersecting) {
                    el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child, i) => {
                        child.style.transitionDelay = `${i * 0.07}s`;
                       child.classList.add(styles.revealVisible!);
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function CustomSelect({
    name, options, placeholder, value, openDropdown, setOpenDropdown, setForm,
}: {
    name: DropdownKey; options: string[]; placeholder: string; value: string;
    openDropdown: DropdownKey | null; setOpenDropdown: (v: DropdownKey | null) => void;
    setForm: React.Dispatch<React.SetStateAction<any>>;
}) {
    const isOpen = openDropdown === name;
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen, setOpenDropdown]);

    return (
        <div
            ref={wrapRef}
            className={styles.customSelectWrap}
            style={{ zIndex: isOpen ? 50 : 1 }}
        >
            <div
                className={`${styles.customSelectTrigger} ${isOpen ? styles.customSelectTriggerOpen : ""}`}
                onClick={() => setOpenDropdown(isOpen ? null : name)}
            >
                <span className={value ? styles.customSelectValue : styles.customSelectPlaceholder}>
                    {value || placeholder}
                </span>
                <svg
                    className={`${styles.customSelectArrow} ${isOpen ? styles.customSelectArrowOpen : ""}`}
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
            {isOpen && (
                <div className={styles.customSelectDropdown}>
                    <div className={styles.customSelectBorder} />
                    <div className={styles.customSelectList}>
                        {options.map((o, i) => (
                            <div
                                key={i}
                                className={`${styles.customSelectItem} ${value === o ? styles.customSelectItemActive : ""}`}
                                onClick={() => {
                                    setForm((prev: any) => ({ ...prev, [name]: o }));
                                    setOpenDropdown(null);
                                }}
                            >
                                {o}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export function ContactUI({
    title, description, info, serviceOptions, budgetOptions, timelineOptions,
    formLabels, termsHref = "#", privacyHref = "#", onSubmit,
}: ContactUIProps) {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", service: "", budget: "", timeline: "", message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

    const sectionRef = useReveal();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (/^[0-9+\-()\s]*$/.test(val)) setForm(prev => ({ ...prev, phone: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!onSubmit) return;
        if (!form.service || !form.budget || !form.timeline) {
            setError("Zəhmət olmasa bütün sahələri doldurun.");
            return;
        }
        const digitCount = (form.phone.match(/\d/g) || []).length;
        if (digitCount < 6) {
            setError("Telefon nömrəsi ən azı 6 rəqəm olmalıdır.");
            return;
        }
        setSubmitting(true);
        setError("");
        try {
            await onSubmit(form);
            setSubmitted(true);
            setForm({ name: "", email: "", phone: "", service: "", budget: "", timeline: "", message: "" });
        } catch {
            setError("Göndərilmədi, yenidən cəhd edin.");
        } finally {
            setSubmitting(false);
        }
    };

    const words = title.split(" ");

    return (
        <section className={styles.section} id="contact">
            <div className={styles.contactDivider} />
            <div className={styles.inner} ref={sectionRef}>

                {/* ── SOL ── */}
                <div className={styles.left}>
                    <h2 className={styles.title}>
                        {words.map((word, i) => (
                            <span key={i} className={styles.revealWord}>
                                <span data-reveal className={styles.revealInner}>
                                    {word}&nbsp;
                                </span>
                            </span>
                        ))}
                    </h2>

                    <p data-reveal className={`${styles.description} ${styles.reveal}`}>
                        {description}
                    </p>

                    <div className={styles.infoGrid}>
                        <div data-reveal className={`${styles.infoItem} ${styles.reveal}`}>
                            <span className={styles.infoLabel}>{info.emailLabel}</span>
                            <a href={`mailto:${info.email}`} className={styles.infoValue}>{info.email} →</a>
                        </div>
                        <div data-reveal className={`${styles.infoItem} ${styles.reveal}`}>
                            <span className={styles.infoLabel}>{info.phoneLabel}</span>
                            <a href={`tel:${info.phone}`} className={styles.infoValue}>{info.phone} →</a>
                        </div>
                        <div data-reveal className={`${styles.infoItem} ${styles.reveal}`}>
                            <span className={styles.infoLabel}>{info.locationLabel}</span>
                            <span className={styles.infoValue}>{info.location}</span>
                        </div>
                        <div data-reveal className={`${styles.infoItem} ${styles.reveal}`}>
                            <span className={styles.infoLabel}>{info.hoursLabel}</span>
                            <span className={styles.infoValue}>{info.hours}</span>
                        </div>
                    </div>

                    <div data-reveal className={`${styles.socialsWrap} ${styles.reveal}`}>
                        <span className={styles.followLabel}>{info.followUsLabel}</span>
                        <div className={styles.socials}>
                            {info.socialLinks.map(link => (
                                <a key={link.id} href={link.href} className={styles.socialBtn}
                                    target="_blank" rel="noopener noreferrer">
                                    {link.icon && (
                                        <img src={link.icon} alt="" width={16} height={16}
                                            style={{ objectFit: "contain" }} />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div data-reveal className={`${styles.hashtags} ${styles.reveal}`}>
                        {info.hashtags.map((tag, i) => (
                            <span key={i} className={styles.hashtag}>{tag}</span>
                        ))}
                    </div>
                </div>

                {/* ── SAĞ ── */}
                <div className={styles.right}>
                    <form className={styles.form} onSubmit={handleSubmit}>

                        <div data-reveal className={`${styles.row} ${styles.reveal}`}>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.name}</label>
                                <input className={styles.input} type="text" name="name"
                                    placeholder={formLabels.namePlaceholder}
                                    value={form.name} onChange={handleChange} required />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.email}</label>
                                <input className={styles.input} type="email" name="email"
                                    placeholder={formLabels.emailPlaceholder}
                                    value={form.email} onChange={handleChange} required />
                            </div>
                        </div>

                        <div data-reveal className={`${styles.row} ${styles.reveal}`}>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.phone}</label>
                                <input className={styles.input} type="tel" name="phone"
                                    placeholder={formLabels.phonePlaceholder}
                                    value={form.phone} onChange={handlePhoneChange} required />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.service}</label>
                                <CustomSelect name="service" options={serviceOptions}
                                    placeholder="SERVICES" value={form.service}
                                    openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
                                    setForm={setForm} />
                            </div>
                        </div>

                        <div data-reveal className={`${styles.row} ${styles.reveal}`}>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.budget}</label>
                                <CustomSelect name="budget" options={budgetOptions}
                                    placeholder={formLabels.budgetPlaceholder} value={form.budget}
                                    openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
                                    setForm={setForm} />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.timeline}</label>
                                <CustomSelect name="timeline" options={timelineOptions}
                                    placeholder={formLabels.timelinePlaceholder} value={form.timeline}
                                    openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
                                    setForm={setForm} />
                            </div>
                        </div>

                        <div data-reveal className={`${styles.field} ${styles.reveal}`}>
                            <label className={styles.label}>{formLabels.message}</label>
                            <textarea className={styles.textarea} name="message"
                                placeholder={formLabels.messagePlaceholder}
                                value={form.message} onChange={handleChange} rows={5} required />
                        </div>

                        {submitted && (
                            <p style={{ color: "#16a34a", fontSize: 14, fontWeight: 500 }}>
                                ✓ Mesajınız göndərildi, tezliklə əlaqə saxlayacağıq!
                            </p>
                        )}
                        {error && (
                            <p style={{ color: "#dc2626", fontSize: 14 }}>{error}</p>
                        )}

                        <div data-reveal className={styles.reveal}>
                            <button type="submit" className={styles.submitBtn} disabled={submitting}>
                                {submitting ? "Göndərilir..." : formLabels.submit}
                            </button>
                        </div>

                        <p data-reveal className={`${styles.terms} ${styles.reveal}`}>
                            By submitting, you agree to our{" "}
                            <a href={termsHref} className={styles.termsLink}>Terms</a> and{" "}
                            <a href={privacyHref} className={styles.termsLink}>Privacy Policy.</a>
                        </p>

                    </form>
                </div>
            </div>
        </section>
    );
}