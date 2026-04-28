"use client";

import { useState } from "react";
import styles from "../../styles/Contact/contact.module.css";

export interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    hours: string;
    socials: {
        twitter?: string;
        facebook?: string;
        instagram?: string;
        github?: string;
    };
    hashtags: string[];
}

export interface ContactUIProps {
    title: string;
    description: string;
    info: ContactInfo;
    serviceOptions: string[];
    budgetOptions: string[];
    timelineOptions: string[];
    termsHref?: string;
    privacyHref?: string;
    onSubmit?: (data: Record<string, string>) => void;
}

export function ContactUI({
    title,
    description,
    info,
    serviceOptions,
    budgetOptions,
    timelineOptions,
    termsHref = "#",
    privacyHref = "#",
    onSubmit,
}: ContactUIProps) {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", service: "", budget: "", timeline: "", message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(form);
    };

    return (
        <section className={styles.section}>
            <div className={styles.contactDivider}></div>
            <div className={styles.inner}>
                {/* Sol tərəf */}
                <div className={styles.left}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Email Adrees</span>
                            <a href={`mailto:${info.email}`} className={styles.infoValue}>
                                {info.email} →
                            </a>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Phone</span>
                            <a href={`tel:${info.phone}`} className={styles.infoValue}>
                                {info.phone} →
                            </a>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Location</span>
                            <span className={styles.infoValue}>{info.location}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Hours:</span>
                            <span className={styles.infoValue}>{info.hours}</span>
                        </div>
                    </div>

                    <div className={styles.socialsWrap}>
                        <span className={styles.followLabel}>Follow Us</span>
                        <div className={styles.socials}>
                            {info.socials.twitter && (
                                <a href={info.socials.twitter} className={styles.socialBtn} aria-label="Twitter">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                                    </svg>
                                </a>
                            )}
                            {info.socials.facebook && (
                                <a href={info.socials.facebook} className={styles.socialBtn} aria-label="Facebook">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                    </svg>
                                </a>
                            )}
                            {info.socials.instagram && (
                                <a href={info.socials.instagram} className={styles.socialBtn} aria-label="Instagram">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                    </svg>
                                </a>
                            )}
                            {info.socials.github && (
                                <a href={info.socials.github} className={styles.socialBtn} aria-label="GitHub">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    <div className={styles.hashtags}>
                        {info.hashtags.map((tag, i) => (
                            <span key={i} className={styles.hashtag}>{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Sağ tərəf — form */}
                <div className={styles.right}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Name</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="name"
                                    placeholder="Your name*"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Email</label>
                                <input
                                    className={styles.input}
                                    type="email"
                                    name="email"
                                    placeholder="Your email*"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Phone</label>
                                <input
                                    className={styles.input}
                                    type="tel"
                                    name="phone"
                                    placeholder="Your phone*"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Service</label>
                                <div className={styles.selectWrap}>
                                    <select
                                        className={styles.select}
                                        name="service"
                                        value={form.service}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>SERVICES</option>
                                        {serviceOptions.map(o => (
                                            <option key={o} value={o}>{o}</option>
                                        ))}
                                    </select>
                                    <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Budget</label>
                                <div className={styles.selectWrap}>
                                    <select
                                        className={styles.select}
                                        name="budget"
                                        value={form.budget}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Estimated Budget</option>
                                        {budgetOptions.map(o => (
                                            <option key={o} value={o}>{o}</option>
                                        ))}
                                    </select>
                                    <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Project Timeline</label>
                                <div className={styles.selectWrap}>
                                    <select
                                        className={styles.select}
                                        name="timeline"
                                        value={form.timeline}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>ASAP</option>
                                        {timelineOptions.map(o => (
                                            <option key={o} value={o}>{o}</option>
                                        ))}
                                    </select>
                                    <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Message</label>
                            <textarea
                                className={styles.textarea}
                                name="message"
                                placeholder="Your message"
                                value={form.message}
                                onChange={handleChange}
                                rows={5}
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Submit Inquiry
                        </button>

                        <p className={styles.terms}>
                            By submitting, you agree to our{" "}
                            <a href={termsHref} className={styles.termsLink}>Terms</a>
                            {" "}and{" "}
                            <a href={privacyHref} className={styles.termsLink}>Privacy Policy.</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}