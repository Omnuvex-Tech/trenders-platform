
// // "use client";

// // import React, { useRef, useState } from "react";
// // import styles from "../../styles/VacancyDetail/vacancydetail.module.css";

// // export interface VacancyDetailSection {
// //     title: string;
// //     type: "text" | "skills" | "bullets";
// //     content?: string;
// //     skills?: string[];
// //     bullets?: string[];
// // }

// // export interface VacancyDetailContact {
// //     email: string;
// //     emailHref?: string;
// //     emailLabel?: string;
// //     phone: string;
// //     phoneHref?: string;
// //     phoneLabel?: string;
// //     location: string;
// //     locationLabel?: string;
// //     embedUrl?: string;
// // }

// // export interface VacancyDetailUIProps {
// //     backLabel?: string;
// //     backHref?: string;
// //     pageTitle?: string;
// //     jobTitle: string;
// //     vacancyId?: number;
// //     vacancyTitle?: string;
// //     sections: VacancyDetailSection[];
// //     applyTitle?: string;
// //     contact: VacancyDetailContact;
// //     mapComponent?: React.ReactNode;
// //     onSubmit?: (data: FormData) => Promise<void>;
// //     nameLabel?: string;
// //     namePlaceholder?: string;
// //     messageLabel?: string;
// //     messagePlaceholder?: string;
// //     phoneLabel?: string;
// //     phonePlaceholder?: string;
// //     emailLabel?: string;
// //     emailPlaceholder?: string;
// //     cvLabel?: string;
// //     cvPlaceholder?: string;
// //     submitLabel?: string;
// // }

// // export function VacancyDetailUI({
// //     backHref = "#",
// //     pageTitle,
// //     jobTitle,
// //     vacancyId,
// //     vacancyTitle,
// //     sections,
// //     applyTitle = "APPLY NOW",
// //     contact,
// //     mapComponent,
// //     onSubmit,
// //     nameLabel = "Name",
// //     namePlaceholder = "Your name*",
// //     messageLabel = "Message",
// //     messagePlaceholder = "Your message",
// //     phoneLabel = "Phone",
// //     phonePlaceholder = "Your phone*",
// //     emailLabel = "Email",
// //     emailPlaceholder = "Your email*",
// //     cvLabel = "CV yüklə*",
// //     cvPlaceholder = "pdf, png, jpg",
// //     submitLabel = "Göndər",
// // }: VacancyDetailUIProps) {
// //     const [name, setName] = useState("");
// //     const [message, setMessage] = useState("");
// //     const [phone, setPhone] = useState("");
// //     const [email, setEmail] = useState("");
// //     const [cv, setCv] = useState<File | null>(null);
// //     const [submitting, setSubmitting] = useState(false);
// //     const [submitted, setSubmitted] = useState(false);
// //     const [error, setError] = useState("");
// //     const fileRef = useRef<HTMLInputElement>(null);

// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!onSubmit) return;
// //         const phoneDigits = phone.replace(/\D/g, "");
// //         if (!name || !email || !phone || !cv) {
// //             setError("Ad, email, telefon və CV məcburidir.");
// //             setSubmitted(false);
// //             return;
// //         }
// //         if (phoneDigits.length < 6) {
// //             setError("Telefon ən azı 6 rəqəm olmalıdır.");
// //             setSubmitted(false);
// //             return;
// //         }
// //         setSubmitting(true);
// //         setError("");
// //         try {
// //             const fd = new FormData();
// //             fd.append("name", name);
// //             fd.append("email", email);
// //             fd.append("phone", phone);
// //             fd.append("message", message);
// //             fd.append("cv", cv);
// //             if (vacancyId) fd.append("vacancyId", String(vacancyId));
// //             if (vacancyTitle) fd.append("vacancyTitle", vacancyTitle);
// //             await onSubmit(fd);
// //             setSubmitted(true);
// //             setName(""); setMessage(""); setPhone(""); setEmail(""); setCv(null);
// //             if (fileRef.current) fileRef.current.value = "";
// //         } catch {
// //             setError("Göndərilmədi, yenidən cəhd edin.");
// //         } finally {
// //             setSubmitting(false);
// //         }
// //     };

// //     return (
// //         <section className={styles.section}>
// //             <div className={styles.inner}>

// //                 {/* Back header */}
// //                 <div className={styles.backRow}>
// //                     <a href={backHref} className={styles.backLink}>
// //                         <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                             <line x1="19" y1="12" x2="5" y2="12" />
// //                             <polyline points="12 19 5 12 12 5" />
// //                         </svg>
// //                         <span>{pageTitle}</span>
// //                     </a>
// //                 </div>

// //                 {/* Content row */}
// //                 <div className={styles.contentRow}>

// //                     {/* Sol: Vakansiya detalı */}
// //                     <div className={styles.left}>
// //                         <h1 className={styles.jobTitle}>{jobTitle}</h1>

// //                         {sections.map((section, i) => (
// //                             <div key={i} className={styles.sectionBlock}>
// //                                 <h3 className={styles.sectionTitle}>{section.title}</h3>

// //                                 {section.type === "text" && section.content && (
// //                                     <p className={styles.sectionText}>{section.content}</p>
// //                                 )}

// //                                 {section.type === "skills" && section.skills && (
// //                                     <div className={styles.skillTags}>
// //                                         {section.skills.map((skill, j) => (
// //                                             <span key={j} className={styles.skillTag}>{skill}</span>
// //                                         ))}
// //                                     </div>
// //                                 )}

// //                                 {section.type === "bullets" && section.bullets && (
// //                                     <ul className={styles.bulletList} style={{ listStyle: "none", padding: 0 }}>
// //                                         {section.bullets.map((bullet, j) => (
// //                                             <li key={j} className={styles.bulletItem}
// //                                                 style={{ paddingLeft: "1.2em", textIndent: "-1.2em" }}>
// //                                                 {bullet}
// //                                             </li>
// //                                         ))}
// //                                     </ul>
// //                                 )}
// //                             </div>
// //                         ))}
// //                     </div>

// //                     {/* Sağ: Form + Xəritə + Kontakt */}
// //                     <aside className={styles.right}>
// //                         <div>
// //                             <h2 className={styles.applyTitle}>{applyTitle}</h2>
// //                             <div className={styles.formCard}>
// //                                 <form className={styles.form} onSubmit={handleSubmit}>

// //                                     <div className={styles.fieldGroup}>
// //                                         <label className={styles.fieldLabel}>{nameLabel}</label>
// //                                         <input type="text" placeholder={namePlaceholder}
// //                                             className={styles.fieldInput}
// //                                             value={name} onChange={e => setName(e.target.value)} required />
// //                                     </div>

// //                                     <div className={styles.fieldGroup}>
// //                                         <label className={styles.fieldLabel}>{messageLabel}</label>
// //                                         <input type="text" placeholder={messagePlaceholder}
// //                                             className={styles.fieldInput}
// //                                             value={message} onChange={e => setMessage(e.target.value)} />
// //                                     </div>

// //                                     <div className={styles.fieldGroup}>
// //                                         <label className={styles.fieldLabel}>{phoneLabel}</label>
// //                                         <input type="tel" placeholder={phonePlaceholder}
// //                                             className={styles.fieldInput}
// //                                             value={phone}
// //                                             onChange={e => {
// //                                                 const val = e.target.value.replace(/[^\d+\-() ]/g, "");
// //                                                 setPhone(val);
// //                                             }} required />
// //                                     </div>

// //                                     <div className={styles.fieldGroup}>
// //                                         <label className={styles.fieldLabel}>{emailLabel}</label>
// //                                         <input type="email" placeholder={emailPlaceholder}
// //                                             className={styles.fieldInput}
// //                                             value={email} onChange={e => setEmail(e.target.value)} required />
// //                                     </div>

// //                                     <div className={styles.fieldGroup}>
// //                                         <label className={styles.fieldLabel}>{cvLabel}</label>
// //                                         <div className={styles.fileRow} onClick={() => fileRef.current?.click()}>
// //                                             <span className={styles.filePlaceholder}>
// //                                                 {cv ? cv.name : cvPlaceholder}
// //                                             </span>
// //                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
// //                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                                                 <polyline points="16 16 12 12 8 16" />
// //                                                 <line x1="12" y1="12" x2="12" y2="21" />
// //                                                 <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
// //                                             </svg>
// //                                             <input ref={fileRef} type="file"
// //                                                 accept=".pdf,.doc,.docx"
// //                                                 className={styles.fileInput}
// //                                                 onChange={e => setCv(e.target.files?.[0] || null)} />
// //                                         </div>
// //                                     </div>

// //                                     {submitted && (
// //                                         <p style={{ color: "#16a34a", fontSize: 13, fontWeight: 500, margin: "4px 0" }}>
// //                                             ✓ Müraciətiniz göndərildi!
// //                                         </p>
// //                                     )}
// //                                     {error && (
// //                                         <p style={{ color: "#dc2626", fontSize: 13, margin: "4px 0" }}>{error}</p>
// //                                     )}

// //                                     <div className={styles.submitRow}>
// //                                         <button type="submit" className={styles.submitBtn} disabled={submitting}>
// //                                             {submitting ? "Göndərilir..." : submitLabel}
// //                                             {!submitting && (
// //                                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
// //                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                                                     <polyline points="9 18 15 12 9 6" />
// //                                                 </svg>
// //                                             )}
// //                                         </button>
// //                                     </div>

// //                                 </form>
// //                             </div>
// //                         </div>

// //                         <div className={styles.mapCard}>
// //                             <div className={styles.mapWrap}>{mapComponent}</div>
// //                         </div>

// //                         <div className={styles.contactInfo}>
// //                             <div className={styles.contactItem}>
// //                                 <span className={styles.contactLabel}>{contact.emailLabel || "Email Adres"}</span>
// //                                 <a href={contact.emailHref || `mailto:${contact.email}`} className={styles.contactValue}>
// //                                     {contact.email}
// //                                 </a>
// //                             </div>
// //                             <div className={styles.contactItem}>
// //                                 <span className={styles.contactLabel}>{contact.phoneLabel || "Phone"}</span>
// //                                 <a href={contact.phoneHref || `tel:${contact.phone}`} className={styles.contactValue}>
// //                                     {contact.phone}
// //                                 </a>
// //                             </div>
// //                             <div className={styles.contactItem}>
// //                                 <span className={styles.contactLabel}>{contact.locationLabel || "Location"}</span>
// //                                 <span className={styles.contactValuePlain}>{contact.location}</span>
// //                             </div>
// //                         </div>
// //                     </aside>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // }






// "use client";

// import React, { useRef, useState } from "react";
// import { motion, Variants } from "framer-motion";
// import styles from "../../styles/VacancyDetail/vacancydetail.module.css";

// export interface VacancyDetailSection {
//     title: string;
//     type: "text" | "skills" | "bullets";
//     content?: string;
//     skills?: string[];
//     bullets?: string[];
// }

// export interface VacancyDetailContact {
//     email: string;
//     emailHref?: string;
//     emailLabel?: string;
//     phone: string;
//     phoneHref?: string;
//     phoneLabel?: string;
//     location: string;
//     locationLabel?: string;
//     embedUrl?: string;
// }

// export interface VacancyDetailUIProps {
//     backLabel?: string;
//     backHref?: string;
//     pageTitle?: string;
//     jobTitle: string;
//     vacancyId?: number;
//     vacancyTitle?: string;
//     sections: VacancyDetailSection[];
//     applyTitle?: string;
//     contact: VacancyDetailContact;
//     mapComponent?: React.ReactNode;
//     onSubmit?: (data: FormData) => Promise<void>;
//     nameLabel?: string;
//     namePlaceholder?: string;
//     messageLabel?: string;
//     messagePlaceholder?: string;
//     phoneLabel?: string;
//     phonePlaceholder?: string;
//     emailLabel?: string;
//     emailPlaceholder?: string;
//     cvLabel?: string;
//     cvPlaceholder?: string;
//     submitLabel?: string;
// }

// const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//         opacity: 1,
//         transition: {
//             staggerChildren: 0.12,
//         },
//     },
// };

// const revealVariants: Variants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             type: "spring",
//             stiffness: 70,
//             damping: 16,
//             duration: 0.5,
//         },
//     },
// };

// export function VacancyDetailUI({
//     backHref = "#",
//     pageTitle,
//     jobTitle,
//     vacancyId,
//     vacancyTitle,
//     sections,
//     applyTitle = "APPLY NOW",
//     contact,
//     mapComponent,
//     onSubmit,
//     nameLabel = "Name",
//     namePlaceholder = "Your name*",
//     messageLabel = "Message",
//     messagePlaceholder = "Your message",
//     phoneLabel = "Phone",
//     phonePlaceholder = "Your phone*",
//     emailLabel = "Email",
//     emailPlaceholder = "Your email*",
//     cvLabel = "CV yüklə*",
//     cvPlaceholder = "pdf, png, jpg",
//     submitLabel = "Göndər",
// }: VacancyDetailUIProps) {
//     const [name, setName] = useState("");
//     const [message, setMessage] = useState("");
//     const [phone, setPhone] = useState("");
//     const [email, setEmail] = useState("");
//     const [cv, setCv] = useState<File | null>(null);
//     const [submitting, setSubmitting] = useState(false);
//     const [submitted, setSubmitted] = useState(false);
//     const [error, setError] = useState("");
//     const fileRef = useRef<HTMLInputElement>(null);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!onSubmit) return;
//         const phoneDigits = phone.replace(/\D/g, "");
//         if (!name || !email || !phone || !cv) {
//             setError("Ad, email, telefon və CV məcburidir.");
//             setSubmitted(false);
//             return;
//         }
//         if (phoneDigits.length < 6) {
//             setError("Telefon ən azı 6 rəqəm olmalıdır.");
//             setSubmitted(false);
//             return;
//         }
//         setSubmitting(true);
//         setError("");
//         try {
//             const fd = new FormData();
//             fd.append("name", name);
//             fd.append("email", email);
//             fd.append("phone", phone);
//             fd.append("message", message);
//             fd.append("cv", cv);
//             if (vacancyId) fd.append("vacancyId", String(vacancyId));
//             if (vacancyTitle) fd.append("vacancyTitle", vacancyTitle);
//             await onSubmit(fd);
//             setSubmitted(true);
//             setName(""); setMessage(""); setPhone(""); setEmail(""); setCv(null);
//             if (fileRef.current) fileRef.current.value = "";
//         } catch {
//             setError("Göndərilmədi, yenidən cəhd edin.");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>

//                 {/* 1. GERİ QAYITMA LİNKİ (Səhifə açılan kimi müstəqil animasiya olunur) */}
//                 <motion.div 
//                     className={styles.backRow}
//                     variants={revealVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     <a href={backHref} className={styles.backLink}>
//                         <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <line x1="19" y1="12" x2="5" y2="12" />
//                             <polyline points="12 19 5 12 12 5" />
//                         </svg>
//                         <span>{pageTitle}</span>
//                     </a>
//                 </motion.div>

//                 <div className={styles.contentRow}>

//                     {/* 2. SOL TƏRƏF: Vakansiya Başlığı və Detalları */}
//                     <div className={styles.left}>
//                         <motion.h1 
//                             className={styles.jobTitle}
//                             variants={revealVariants}
//                             initial="hidden"
//                             animate="visible"
//                         >
//                             {jobTitle}
//                         </motion.h1>

//                         {/* Hər bir mətn bloku skrol edilib görünən anda müstəqil canlanır */}
//                         {sections.map((section, i) => (
//                             <motion.div 
//                                 key={i} 
//                                 className={styles.sectionBlock}
//                                 variants={revealVariants}
//                                 initial="hidden"
//                                 whileInView="visible"
//                                 viewport={{ once: true, margin: "-8%" }}
//                             >
//                                 <h3 className={styles.sectionTitle}>{section.title}</h3>

//                                 {section.type === "text" && section.content && (
//                                     <p className={styles.sectionText}>{section.content}</p>
//                                 )}

//                                 {section.type === "skills" && section.skills && (
//                                     <div className={styles.skillTags}>
//                                         {section.skills.map((skill, j) => (
//                                             <span key={j} className={styles.skillTag}>{skill}</span>
//                                         ))}
//                                     </div>
//                                 )}

//                                 {section.type === "bullets" && section.bullets && (
//                                     <ul className={styles.bulletList} style={{ listStyle: "none", padding: 0 }}>
//                                         {section.bullets.map((bullet, j) => (
//                                             <li key={j} className={styles.bulletItem}
//                                                 style={{ paddingLeft: "1.2em", textIndent: "-1.2em" }}>
//                                                 {bullet}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* 3. SAĞ TƏRƏF: Form + Map + Kontakt (Ayrıca bir kaskad konteyneri) */}
//                     <motion.aside 
//                         className={styles.right}
//                         variants={containerVariants}
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, margin: "-5%" }}
//                     >
//                         {/* Form Kartı */}
//                         <motion.div variants={revealVariants}>
//                             <h2 className={styles.applyTitle}>{applyTitle}</h2>
//                             <div className={styles.formCard}>
//                                 <form className={styles.form} onSubmit={handleSubmit}>
//                                     <div className={styles.fieldGroup}>
//                                         <label className={styles.fieldLabel}>{nameLabel}</label>
//                                         <input type="text" placeholder={namePlaceholder}
//                                             className={styles.fieldInput}
//                                             value={name} onChange={e => setName(e.target.value)} required />
//                                     </div>

//                                     <div className={styles.fieldGroup}>
//                                         <label className={styles.fieldLabel}>{messageLabel}</label>
//                                         <input type="text" placeholder={messagePlaceholder}
//                                             className={styles.fieldInput}
//                                             value={message} onChange={e => setMessage(e.target.value)} />
//                                     </div>

//                                     <div className={styles.fieldGroup}>
//                                         <label className={styles.fieldLabel}>{phoneLabel}</label>
//                                         <input type="tel" placeholder={phonePlaceholder}
//                                             className={styles.fieldInput}
//                                             value={phone}
//                                             onChange={e => {
//                                                 const val = e.target.value.replace(/[^\d+\-() ]/g, "");
//                                                 setPhone(val);
//                                             }} required />
//                                     </div>

//                                     <div className={styles.fieldGroup}>
//                                         <label className={styles.fieldLabel}>{emailLabel}</label>
//                                         <input type="email" placeholder={emailPlaceholder}
//                                             className={styles.fieldInput}
//                                             value={email} onChange={e => setEmail(e.target.value)} required />
//                                     </div>

//                                     <div className={styles.fieldGroup}>
//                                         <label className={styles.fieldLabel}>{cvLabel}</label>
//                                         <div className={styles.fileRow} onClick={() => fileRef.current?.click()}>
//                                             <span className={styles.filePlaceholder}>
//                                                 {cv ? cv.name : cvPlaceholder}
//                                             </span>
//                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                 <polyline points="16 16 12 12 8 16" />
//                                                 <line x1="12" y1="12" x2="12" y2="21" />
//                                                 <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
//                                             </svg>
//                                             <input ref={fileRef} type="file"
//                                                 accept=".pdf,.doc,.docx"
//                                                 className={styles.fileInput}
//                                                 onChange={e => setCv(e.target.files?.[0] || null)} />
//                                         </div>
//                                     </div>

//                                     {submitted && (
//                                         <p style={{ color: "#16a34a", fontSize: 13, fontWeight: 500, margin: "4px 0" }}>
//                                             ✓ Müraciətiniz göndərildi!
//                                         </p>
//                                     )}
//                                     {error && (
//                                         <p style={{ color: "#dc2626", fontSize: 13, margin: "4px 0" }}>{error}</p>
//                                     )}

//                                     <div className={styles.submitRow}>
//                                         <button type="submit" className={styles.submitBtn} disabled={submitting}>
//                                             {submitting ? "Göndərilir..." : submitLabel}
//                                             {!submitting && (
//                                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                                     <polyline points="9 18 15 12 9 6" />
//                                                 </svg>
//                                             )}
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </motion.div>

//                         {/* Xəritə Kartı (Formun ardınca gəlir) */}
//                         <motion.div variants={revealVariants} className={styles.mapCard}>
//                             <div className={styles.mapWrap}>{mapComponent}</div>
//                         </motion.div>

//                         {/* Əlaqə məlumatları bloku */}
//                         <motion.div variants={revealVariants} className={styles.contactInfo}>
//                             <div className={styles.contactItem}>
//                                 <span className={styles.contactLabel}>{contact.emailLabel || "Email Adres"}</span>
//                                 <a href={contact.emailHref || `mailto:${contact.email}`} className={styles.contactValue}>
//                                     {contact.email}
//                                 </a>
//                             </div>
//                             <div className={styles.contactItem}>
//                                 <span className={styles.contactLabel}>{contact.phoneLabel || "Phone"}</span>
//                                 <a href={contact.phoneHref || `tel:${contact.phone}`} className={styles.contactValue}>
//                                     {contact.phone}
//                                 </a>
//                             </div>
//                             <div className={styles.contactItem}>
//                                 <span className={styles.contactLabel}>{contact.locationLabel || "Location"}</span>
//                                 <span className={styles.contactValuePlain}>{contact.location}</span>
//                             </div>
//                         </motion.div>
//                     </motion.aside>

//                 </div>
//             </div>
//         </section>
//     );
// }










"use client";

import React, { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
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
    emailLabel?: string;
    phone: string;
    phoneHref?: string;
    phoneLabel?: string;
    location: string;
    locationLabel?: string;
    embedUrl?: string;
}

export interface VacancyDetailUIProps {
    backLabel?: string;
    backHref?: string;
    pageTitle?: string;
    jobTitle: string;
    tags?: string[];
    vacancyId?: number;
    vacancyTitle?: string;
    sections: VacancyDetailSection[];
    applyTitle?: string;
    contact: VacancyDetailContact;
    mapComponent?: React.ReactNode;
    onSubmit?: (data: FormData) => Promise<void>;
    nameLabel?: string;
    namePlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    phoneLabel?: string;
    phonePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    cvLabel?: string;
    cvPlaceholder?: string;
    submitLabel?: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 16,
            duration: 0.5,
        },
    },
};

export function VacancyDetailUI({
    backHref = "#",
    pageTitle,
    jobTitle,
    tags = [],
    vacancyId,
    vacancyTitle,
    sections,
    applyTitle = "APPLY NOW",
    contact,
    mapComponent,
    onSubmit,
    nameLabel = "Name",
    namePlaceholder = "Your name*",
    messageLabel = "Message",
    messagePlaceholder = "Your message",
    phoneLabel = "Phone",
    phonePlaceholder = "Your phone*",
    emailLabel = "Email",
    emailPlaceholder = "Your email*",
    cvLabel = "CV yüklə*",
    cvPlaceholder = "pdf, png, jpg",
    submitLabel = "Göndər",
}: VacancyDetailUIProps) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [cv, setCv] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!onSubmit) return;
        const phoneDigits = phone.replace(/\D/g, "");
        if (!name || !email || !phone || !cv) {
            setError("Ad, email, telefon və CV məcburidir.");
            setSubmitted(false);
            return;
        }
        if (phoneDigits.length < 6) {
            setError("Telefon ən azı 6 rəqəm olmalıdır.");
            setSubmitted(false);
            return;
        }
        setSubmitting(true);
        setError("");
        try {
            const fd = new FormData();
            fd.append("name", name);
            fd.append("email", email);
            fd.append("phone", phone);
            fd.append("message", message);
            fd.append("cv", cv);
            if (vacancyId) fd.append("vacancyId", String(vacancyId));
            if (vacancyTitle) fd.append("vacancyTitle", vacancyTitle);
            await onSubmit(fd);
            setSubmitted(true);
            setName(""); setMessage(""); setPhone(""); setEmail(""); setCv(null);
            if (fileRef.current) fileRef.current.value = "";
        } catch {
            setError("Göndərilmədi, yenidən cəhd edin.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* 1. GERİ QAYITMA LİNKİ (Səhifə açılan kimi müstəqil animasiya olunur) */}
                <motion.div
                    className={styles.backRow}
                    variants={revealVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <a href={backHref} className={styles.backLink}>
                        <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        <span>{pageTitle}</span>
                    </a>
                </motion.div>

                <div className={styles.contentRow}>

                    {/* 2. SOL TƏRƏF: Vakansiya Başlığı və Detalları */}
                    <div className={styles.left}>
                        <motion.h1
                            className={styles.jobTitle}
                            variants={revealVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {jobTitle}
                        </motion.h1>

                        {tags.length > 0 && (
                            <motion.div
                                className={styles.skillTags}
                                variants={revealVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {tags.map((tag, i) => (
                                    <span key={i} className={styles.skillTag}>{tag}</span>
                                ))}
                            </motion.div>
                        )}

                        {/* Hər bir mətn bloku skrol edilib görünən anda müstəqil canlanır */}
                        {sections.map((section, i) => (
                            <motion.div
                                key={i}
                                className={styles.sectionBlock}
                                variants={revealVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-8%" }}
                            >
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
                                            <li key={j} className={styles.bulletItem}
                                                style={{ paddingLeft: "1.2em", textIndent: "-1.2em" }}>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* 3. SAĞ TƏRƏF: Form + Map + Kontakt (Ayrıca bir kaskad konteyneri) */}
                    <motion.aside
                        className={styles.right}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-5%" }}
                    >
                        {/* Form Kartı */}
                        <motion.div variants={revealVariants}>
                            <h2 className={styles.applyTitle}>{applyTitle}</h2>
                            <div className={styles.formCard}>
                                <form className={styles.form} onSubmit={handleSubmit}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>{nameLabel}</label>
                                        <input type="text" placeholder={namePlaceholder}
                                            className={styles.fieldInput}
                                            value={name} onChange={e => setName(e.target.value)} required />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>{messageLabel}</label>
                                        <input type="text" placeholder={messagePlaceholder}
                                            className={styles.fieldInput}
                                            value={message} onChange={e => setMessage(e.target.value)} />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>{phoneLabel}</label>
                                        <input type="tel" placeholder={phonePlaceholder}
                                            className={styles.fieldInput}
                                            value={phone}
                                            onChange={e => {
                                                const val = e.target.value.replace(/[^\d+\-() ]/g, "");
                                                setPhone(val);
                                            }} required />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>{emailLabel}</label>
                                        <input type="email" placeholder={emailPlaceholder}
                                            className={styles.fieldInput}
                                            value={email} onChange={e => setEmail(e.target.value)} required />
                                    </div>

                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>{cvLabel}</label>
                                        <div className={styles.fileRow} onClick={() => fileRef.current?.click()}>
                                            <span className={styles.filePlaceholder}>
                                                {cv ? cv.name : cvPlaceholder}
                                            </span>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="16 16 12 12 8 16" />
                                                <line x1="12" y1="12" x2="12" y2="21" />
                                                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                            </svg>
                                            <input ref={fileRef} type="file"
                                                accept=".pdf,.doc,.docx"
                                                className={styles.fileInput}
                                                onChange={e => setCv(e.target.files?.[0] || null)} />
                                        </div>
                                    </div>

                                    {submitted && (
                                        <p style={{ color: "#16a34a", fontSize: 13, fontWeight: 500, margin: "4px 0" }}>
                                            ✓ Müraciətiniz göndərildi!
                                        </p>
                                    )}
                                    {error && (
                                        <p style={{ color: "#dc2626", fontSize: 13, margin: "4px 0" }}>{error}</p>
                                    )}

                                    <div className={styles.submitRow}>
                                        <button type="submit" className={styles.submitBtn} disabled={submitting}>
                                            {submitting ? "Göndərilir..." : submitLabel}
                                            {!submitting && (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>

                        {/* Xəritə Kartı (Formun ardınca gəlir) */}
                        <motion.div variants={revealVariants} className={styles.mapCard}>
                            <div className={styles.mapWrap}>{mapComponent}</div>
                        </motion.div>

                        {/* Əlaqə məlumatları bloku */}
                        <motion.div variants={revealVariants} className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>{contact.emailLabel || "Email Adres"}</span>
                                <a href={contact.emailHref || `mailto:${contact.email}`} className={styles.contactValue}>
                                    {contact.email}
                                </a>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>{contact.phoneLabel || "Phone"}</span>
                                <a href={contact.phoneHref || `tel:${contact.phone}`} className={styles.contactValue}>
                                    {contact.phone}
                                </a>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>{contact.locationLabel || "Location"}</span>
                                <span className={styles.contactValuePlain}>{contact.location}</span>
                            </div>
                        </motion.div>
                    </motion.aside>

                </div>
            </div>
        </section>
    );
}