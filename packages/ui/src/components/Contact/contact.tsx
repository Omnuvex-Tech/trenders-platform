"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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
        servicePlaceholder: string;
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
    thankYouHref?: string;
    onSubmit?: (data: Record<string, string>) => Promise<void>;
}

type DropdownKey = "service" | "budget" | "timeline";

const html = (value: string) => ({ __html: value });

const stripTags = (value: string) => value.replace(/<[^>]*>/g, "").trim();

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
                <div
                    className={value ? styles.customSelectValue : styles.customSelectPlaceholder}
                    dangerouslySetInnerHTML={html(value || placeholder)}
                />
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
                                dangerouslySetInnerHTML={html(o)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}




export function ContactUI({
    title, description, info, serviceOptions, budgetOptions, timelineOptions,
    formLabels, termsHref = "#", privacyHref = "#", thankYouHref = "/thank-you", onSubmit,
}: ContactUIProps) {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", service: "", budget: "", timeline: "", message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
      const [error, setError] = useState("");
    const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
    const router = useRouter();

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
            router.push(thankYouHref);
        } catch {
            setError("Göndərilmədi, yenidən cəhd edin.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={styles.section} id="contact">
            <div className={styles.contactDivider} />
            <div className={styles.inner} ref={sectionRef}>
                <div className={styles.left}>
                    <div
                        data-reveal
                        className={`${styles.title} ${styles.reveal}`}
                        dangerouslySetInnerHTML={html(title)}
                    />

                    <div
                        data-reveal
                        className={`${styles.description} ${styles.reveal}`}
                        dangerouslySetInnerHTML={html(description)}
                    />

                    <div className={styles.infoGrid}>
                        <div data-reveal className={`${styles.infoItem} ${styles.reveal}`}>
                            <div className={styles.infoLabel} dangerouslySetInnerHTML={html(info.emailLabel)} />
                            <a href={`mailto:${info.email}`} className={styles.infoValue} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <div dangerouslySetInnerHTML={html(info.email)} /> →
                            </a>
                        </div>
                        <div data-reveal className={`${styles.infoItem} ${styles.reveal}`}>
                            <div className={styles.infoLabel} dangerouslySetInnerHTML={html(info.phoneLabel)} />
                            <a href={`tel:${info.phone}`} className={styles.infoValue} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <div dangerouslySetInnerHTML={html(info.phone)} /> →
                            </a>
                        </div>
                        <div data-reveal className={`${styles.infoItem} ${styles.reveal}`}>
                            <div className={styles.infoLabel} dangerouslySetInnerHTML={html(info.locationLabel)} />
                            <div className={styles.infoValue} dangerouslySetInnerHTML={html(info.location)} />
                        </div>
                        <div data-reveal className={`${styles.infoItem} ${styles.reveal}`}>
                            <div className={styles.infoLabel} dangerouslySetInnerHTML={html(info.hoursLabel)} />
                            <div className={styles.infoValue} dangerouslySetInnerHTML={html(info.hours)} />
                        </div>
                    </div>

                    <div data-reveal className={`${styles.socialsWrap} ${styles.reveal}`}>
                        <div className={styles.followLabel} dangerouslySetInnerHTML={html(info.followUsLabel)} />
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
                            <div key={i} className={styles.hashtag} dangerouslySetInnerHTML={html(tag)} />
                        ))}
                    </div>
                </div>

                <div className={styles.right}>
                    <form className={styles.form} onSubmit={handleSubmit}>

                        <div data-reveal className={`${styles.row} ${styles.reveal}`}>
                            <div className={styles.field}>
                                <div className={styles.label} dangerouslySetInnerHTML={html(formLabels.name)} />
                                <input className={styles.input} type="text" name="name"
                                    placeholder={stripTags(formLabels.namePlaceholder)}
                                    value={form.name} onChange={handleChange} required />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.label} dangerouslySetInnerHTML={html(formLabels.email)} />
                                <input className={styles.input} type="email" name="email"
                                    placeholder={stripTags(formLabels.emailPlaceholder)}
                                    value={form.email} onChange={handleChange} required />
                            </div>
                        </div>

                        <div data-reveal className={`${styles.row} ${styles.reveal}`}>
                            <div className={styles.field}>
                                <div className={styles.label} dangerouslySetInnerHTML={html(formLabels.phone)} />
                                <input className={styles.input} type="tel" name="phone"
                                    placeholder={stripTags(formLabels.phonePlaceholder)}
                                    value={form.phone} onChange={handlePhoneChange} required />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.label} dangerouslySetInnerHTML={html(formLabels.service)} />
                                <CustomSelect name="service" options={serviceOptions}
                                    placeholder={formLabels.servicePlaceholder} value={form.service}
                                    openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
                                    setForm={setForm} />
                            </div>
                        </div>

                        <div data-reveal className={`${styles.row} ${styles.reveal}`}>
                            <div className={styles.field}>
                                <div className={styles.label} dangerouslySetInnerHTML={html(formLabels.budget)} />
                                <CustomSelect name="budget" options={budgetOptions}
                                    placeholder={formLabels.budgetPlaceholder} value={form.budget}
                                    openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
                                    setForm={setForm} />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.label} dangerouslySetInnerHTML={html(formLabels.timeline)} />
                                <CustomSelect name="timeline" options={timelineOptions}
                                    placeholder={formLabels.timelinePlaceholder} value={form.timeline}
                                    openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}
                                    setForm={setForm} />
                            </div>
                        </div>

                        <div data-reveal className={`${styles.field} ${styles.reveal}`}>
                            <div className={styles.label} dangerouslySetInnerHTML={html(formLabels.message)} />
                            <textarea className={styles.textarea} name="message"
                                placeholder={stripTags(formLabels.messagePlaceholder)}
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
                                {submitting ? (
                                    "Göndərilir..."
                                ) : (
                                    <div dangerouslySetInnerHTML={html(formLabels.submit)} />
                                )}
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