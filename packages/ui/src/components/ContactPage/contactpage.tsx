"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../../styles/ContactPage/contactpage.module.css";
import { motion, Variants } from "framer-motion";

export interface ContactPageSocialLink {
    id: number;
    icon: string | null;
    href: string;
}

export interface ContactPageInfo {
    emailLabel: string;
    email: string;
    phoneLabel: string;
    phone: string;
    locationLabel: string;
    location: string;
    hoursLabel: string;
    hours: string;
    followUsLabel: string;
    socialLinks: ContactPageSocialLink[];
    hashtags: string[];
}

export interface ContactPageUIProps {
    title: string;
    description: string;
    image?: string | null;
    imageAlt?: string;
    info: ContactPageInfo;
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
   mapComponent?: React.ReactNode;
    mapLink?: string;
    termsHref?: string;
    privacyHref?: string;
    onSubmit?: (data: Record<string, string>) => Promise<void>;
}

export function ContactPageUI({
    title,
    description,
    image,
    imageAlt,
    info,
    serviceOptions,
    budgetOptions,
    timelineOptions,
    formLabels,
    mapComponent,
    mapLink,
    termsHref = "#",
    privacyHref = "#",
    onSubmit,
}: ContactPageUIProps) {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", service: "",
        budget: "", timeline: "", message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [openDropdown, setOpenDropdown] = useState<"service" | "budget" | "timeline" | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (/^[0-9+\-()\s]*$/.test(val)) {
            setForm(prev => ({ ...prev, phone: val }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!onSubmit) return;

        const digitCount = (form.phone.match(/\d/g) || []).length;
        if (form.phone && digitCount < 6) {
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

    const titleContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    };

    const titleWordVariants: Variants = {
        hidden: { y: "100%" },
        visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
    };

    const leftContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const } },
    };

    const formContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
    };

    type DropdownKey = "service" | "budget" | "timeline";

    const CustomSelect = ({
        name,
        options,
        placeholder,
        value,
        dropdownKey,
    }: {
        name: DropdownKey;
        options: string[];
        placeholder: string;
        value: string;
        dropdownKey: DropdownKey;
    }) => {
        const isOpen = openDropdown === dropdownKey;
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
        }, [isOpen]);

        return (
            <div ref={wrapRef} className={styles.customSelectWrap}>
                <div
                    className={`${styles.customSelectTrigger} ${isOpen ? styles.customSelectTriggerOpen : ""}`}
                    onClick={() => setOpenDropdown(isOpen ? null : dropdownKey)}
                >
                    <span className={value ? styles.customSelectValue : styles.customSelectPlaceholder}>
                        {value || placeholder}
                    </span>
                    <svg
                        className={`${styles.customSelectArrow} ${isOpen ? styles.customSelectArrowOpen : ""}`}
                        width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2"
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
                                        setForm(prev => ({ ...prev, [name]: o }));
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
    };

    const words = title.split(" ");

    return (
        <section className={styles.section} id="contact">
            <div className={styles.inner}>
                <motion.div
                    className={styles.left}
                    variants={leftContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                >
                    <motion.h2
                        className={styles.title}
                        variants={titleContainerVariants}
                        style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
                    >
                        {words.map((word, index) => (
                            <span key={index} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                                <motion.span variants={titleWordVariants} style={{ display: "inline-block" }}>
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </motion.h2>

                    <motion.p className={styles.description} variants={fadeUpVariants}>
                        {description}
                    </motion.p>

                    {image && (
                        <motion.div className={styles.officeImageWrap} variants={fadeUpVariants}>
                            <img
                                src={image}
                                alt={imageAlt || ""}
                                className={styles.officeImage}
                            />
                        </motion.div>
                    )}

                    <div className={styles.infoGrid}>
                        <motion.div className={styles.infoItem} variants={fadeUpVariants}>
                            <span className={styles.infoLabel}>{info.emailLabel}</span>
                            <a href={`mailto:${info.email}`} className={styles.infoValue}>
                                {info.email} →
                            </a>
                        </motion.div>
                        <motion.div className={styles.infoItem} variants={fadeUpVariants}>
                            <span className={styles.infoLabel}>{info.phoneLabel}</span>
                            <a href={`tel:${info.phone}`} className={styles.infoValue}>
                                {info.phone} →
                            </a>
                        </motion.div>
                        <motion.div className={styles.infoItem} variants={fadeUpVariants}>
                            <span className={styles.infoLabel}>{info.locationLabel}</span>
                            <span className={styles.infoValue}>{info.location}</span>
                        </motion.div>
                        <motion.div className={styles.infoItem} variants={fadeUpVariants}>
                            <span className={styles.infoLabel}>{info.hoursLabel}</span>
                            <span className={styles.infoValue}>{info.hours}</span>
                        </motion.div>
                    </div>

                    <motion.div className={styles.socialsWrap} variants={fadeUpVariants}>
                        <span className={styles.followLabel}>{info.followUsLabel}</span>
                        <div className={styles.socials}>
                            {info.socialLinks.map(link => (
                                <a
                                    key={link.id}
                                    href={link.href}
                                    className={styles.socialBtn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.icon && (
                                        <img
                                            src={link.icon}
                                            alt=""
                                            width={16}
                                            height={16}
                                            style={{ objectFit: "contain" }}
                                        />
                                    )}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <div className={styles.hashtags}>
                        {info.hashtags.map((tag, i) => (
                            <motion.span key={i} className={styles.hashtag} variants={fadeUpVariants}>
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
                <div className={styles.right}>
                    <motion.form
                        className={styles.form}
                        onSubmit={handleSubmit}
                        variants={formContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.1 }}
                    >
                        <motion.div className={styles.row} variants={fadeUpVariants}>
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
                        </motion.div>

                        <motion.div className={styles.row} variants={fadeUpVariants}>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.phone}</label>
                                <input className={styles.input} type="tel" name="phone"
                                    placeholder={formLabels.phonePlaceholder}
                                    value={form.phone} onChange={handlePhoneChange} />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.service}</label>
                                <CustomSelect
                                    name="service"
                                    dropdownKey="service"
                                    options={serviceOptions}
                                    placeholder={formLabels.servicePlaceholder} 
                                    value={form.service}
                                />                           
                            </div>
                        </motion.div>

                        <motion.div className={styles.row} variants={fadeUpVariants}>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.budget}</label>
                                <CustomSelect
                                    name="budget"
                                    dropdownKey="budget"
                                    options={budgetOptions}
                                    placeholder={formLabels.budgetPlaceholder}
                                    value={form.budget}
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.timeline}</label>
                                <CustomSelect
                                    name="timeline"
                                    dropdownKey="timeline"
                                    options={timelineOptions}
                                    placeholder={formLabels.timelinePlaceholder}
                                    value={form.timeline}
                                />
                            </div>
                        </motion.div>

                        <motion.div className={styles.field} variants={fadeUpVariants}>
                            <label className={styles.label}>{formLabels.message}</label>
                            <textarea className={styles.textarea} name="message"
                                placeholder={formLabels.messagePlaceholder}
                                value={form.message} onChange={handleChange} rows={5} />
                        </motion.div>

                        {submitted && (
                            <motion.p
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ color: "#16a34a", fontSize: 14, fontWeight: 500 }}
                            >
                                ✓ Mesajınız göndərildi, tezliklə əlaqə saxlayacağıq!
                            </motion.p>
                        )}
                        {error && (
                            <p style={{ color: "#dc2626", fontSize: 14 }}>{error}</p>
                        )}

                        <motion.button
                            type="submit"
                            className={styles.submitBtn}
                            variants={fadeUpVariants}
                            whileHover={{ scale: 1.01, y: -2 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={submitting}
                        >
                            {submitting ? "Göndərilir..." : formLabels.submit}
                        </motion.button>

                        <motion.p className={styles.terms} variants={fadeUpVariants}>
                            By submitting, you agree to our{" "}
                            <a href={termsHref} className={styles.termsLink}>Terms</a> and{" "}
                            <a href={privacyHref} className={styles.termsLink}>Privacy Policy.</a>
                        </motion.p>
                    </motion.form>

                   {mapComponent && (
                        <div className={styles.mapCard}>
                            <div className={styles.mapWrap}>
                                {mapComponent}
                                {mapLink && (
                                    <a
                                        href={mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.mapButton}
                                    >
                                        View on map
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}