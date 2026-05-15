"use client";

import React, { useRef, useState } from "react";
import styles from "../../styles/VacancyDetail/vacancydetail.module.css";

export interface VacancyDetailSection {
    title: string;
    type: "text" | "skills" | "bullets";
    content?: string;
    skills?: string[];
    bullets?: string[];
}

export interface VacancyDetailContact {
    email: string;
    emailHref?: string;
    phone: string;
    phoneHref?: string;
    location: string;
    embedUrl?: string;
}

export interface VacancyDetailUIProps {
    backLabel?: string;
    backHref?: string;
    pageTitle?: string;
    jobTitle: string;
    sections: VacancyDetailSection[];
    applyTitle?: string;
    contact: VacancyDetailContact;
    mapComponent?: React.ReactNode;
    onSubmit?: (data: { name: string; phone: string; email: string; cv: File | null }) => void;
    namePlaceholder?: string;
    phonePlaceholder?: string;
    emailPlaceholder?: string;
    cvLabel?: string;
    cvPlaceholder?: string;
    submitLabel?: string;
}

export function VacancyDetailUI({
    backLabel = "Vakansiya",
    backHref = "#",
    pageTitle,
    jobTitle,
    sections,
    applyTitle = "APPLY NOW",
    contact,
    mapComponent,
    onSubmit,
    namePlaceholder = "Your name*",
    phonePlaceholder = "Your phone*",
    emailPlaceholder = "Your email*",
    cvLabel = "Cv yüklə",
    cvPlaceholder = "pdf, png, jpg",
    submitLabel = "Göndər",
}: VacancyDetailUIProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [cv, setCv] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.({ name, phone, email, cv });
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Back header */}
                <div className={styles.backRow}>
                    <a href={backHref} className={styles.backLink}>
                        <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        <span>{pageTitle || backLabel}</span>
                    </a>
                </div>

                {/* Content row */}
                <div className={styles.contentRow}>

                    {/* Sol: Vakansiya detalı */}
                    <div className={styles.left}>
                        <h1 className={styles.jobTitle}>{jobTitle}</h1>

                        {sections.map((section, i) => (
                            <div key={i} className={styles.sectionBlock}>
                                <h3 className={styles.sectionTitle}>{section.title}</h3>

                                {section.type === "text" && section.content && (
                                    <p className={styles.sectionText}>{section.content}</p>
                                )}

                                {section.type === "skills" && section.skills && (
                                    <div className={styles.skillTags}>
                                        {section.skills.map((skill, j) => (
                                            <span key={j} className={styles.skillTag}>{skill}</span>
                                        ))}
                                    </div>
                                )}

                                {section.type === "bullets" && section.bullets && (
                                    <ul className={styles.bulletList} style={{ listStyle: "none", padding: 0 }}>
                                        {section.bullets.map((bullet, j) => (
                                            <li
                                                key={j}
                                                className={styles.bulletItem}
                                                style={{ paddingLeft: "1.2em", textIndent: "-1.2em" }}
                                            >
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Sağ: Form + xəritə + kontakt */}
                    <aside className={styles.right}>

                        {/* Apply title - formCard xaricində */}
                        <div>
                            <h2 className={styles.applyTitle}>{applyTitle}</h2>
                            <div className={styles.formCard}>
                                <form className={styles.form} onSubmit={handleSubmit}>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Name</label>
                                        <input
                                            type="text"
                                            placeholder={namePlaceholder}
                                            className={styles.fieldInput}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Phone</label>
                                        <input
                                            type="tel"
                                            placeholder={phonePlaceholder}
                                            className={styles.fieldInput}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Email</label>
                                        <input
                                            type="email"
                                            placeholder={emailPlaceholder}
                                            className={styles.fieldInput}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>{cvLabel}</label>
                                        <div className={styles.fileRow} onClick={() => fileRef.current?.click()}>
                                            <span className={styles.filePlaceholder}>
                                                {cv ? cv.name : cvPlaceholder}
                                            </span>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="16 16 12 12 8 16" />
                                                <line x1="12" y1="12" x2="12" y2="21" />
                                                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                            </svg>
                                            <input
                                                ref={fileRef}
                                                type="file"
                                                accept=".pdf,.png,.jpg,.jpeg"
                                                className={styles.fileInput}
                                                onChange={(e) => setCv(e.target.files?.[0] || null)}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.submitRow}>
                                        <button type="submit" className={styles.submitBtn}>
                                            {submitLabel}
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>

                        {/* Xəritə - yalnız xəritə, border var */}
                        <div className={styles.mapCard}>
                            <div className={styles.mapWrap}>
                                {mapComponent}
                            </div>
                        </div>

                        {/* Kontakt - mapCard xaricində, aşağıda sərbəst */}
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Email Adres</span>
                                <a href={contact.emailHref || `mailto:${contact.email}`} className={styles.contactValue}>
                                    {contact.email} →
                                </a>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Phone</span>
                                <a href={contact.phoneHref || `tel:${contact.phone}`} className={styles.contactValue}>
                                    {contact.phone} →
                                </a>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Location</span>
                                <span className={styles.contactValuePlain}>{contact.location}</span>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </section>
    );
}