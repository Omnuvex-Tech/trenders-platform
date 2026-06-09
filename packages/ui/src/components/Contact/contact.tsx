
// "use client";

// import { useState } from "react";
// import styles from "../../styles/Contact/contact.module.css";
// import { motion, Variants } from "framer-motion";

// export interface ContactInfo {
//     email: string;
//     phone: string;
//     location: string;
//     hours: string;
//     socials: {
//         twitter?: string;
//         facebook?: string;
//         instagram?: string;
//         github?: string;
//     };
//     hashtags: string[];
// }

// export interface ContactUIProps {
//     title: string;
//     description: string;
//     info: ContactInfo;
//     serviceOptions: string[];
//     budgetOptions: string[];
//     timelineOptions: string[];
//     termsHref?: string;
//     privacyHref?: string;
//     onSubmit?: (data: Record<string, string>) => void;
// }

// export function ContactUI({
//     title,
//     description,
//     info,
//     serviceOptions,
//     budgetOptions,
//     timelineOptions,
//     termsHref = "#",
//     privacyHref = "#",
//     onSubmit,
// }: ContactUIProps) {
//     const [form, setForm] = useState({
//         name: "", email: "", phone: "", service: "", budget: "", timeline: "", message: "",
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit?.(form);
//     };
    
//     const titleContainerVariants: Variants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: { staggerChildren: 0.08 }
//         }
//     };

//     const titleWordVariants: Variants = {
//         hidden: { y: "100%" },
//         visible: {
//             y: 0,
//             transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
//         }
//     };

//     const leftContainerVariants: Variants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//                 delayChildren: 0.2
//             }
//         }
//     };

//     const fadeUpVariants: Variants = {
//         hidden: { opacity: 0, y: 25 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }
//         }
//     };
//     const formContainerVariants: Variants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.08,
//                 delayChildren: 0.3 
//             }
//         }
//     };

//     const words = title.split(" ");

//     return (
//         <section className={styles.section}>
//             <div className={styles.contactDivider}></div>
//             <div className={styles.inner}>
//                                 <motion.div 
//                     className={styles.left}
//                     variants={leftContainerVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.15 }}
//                 >
//                     <motion.h2 
//                         className={styles.title}
//                         variants={titleContainerVariants}
//                         style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
//                     >
//                         {words.map((word, index) => (
//                             <span key={index} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
//                                 <motion.span variants={titleWordVariants} style={{ display: "inline-block" }}>
//                                     {word}
//                                 </motion.span>
//                             </span>
//                         ))}
//                     </motion.h2>

//                     <motion.p className={styles.description} variants={fadeUpVariants}>
//                         {description}
//                     </motion.p>
//                     <div className={styles.infoGrid}>
//                         <motion.div className={styles.infoItem} variants={fadeUpVariants}>
//                             <span className={styles.infoLabel}>Email Adrees</span>
//                             <a href={`mailto:${info.email}`} className={styles.infoValue}>
//                                 {info.email} →
//                             </a>
//                         </motion.div>
//                         <motion.div className={styles.infoItem} variants={fadeUpVariants}>
//                             <span className={styles.infoLabel}>Phone</span>
//                             <a href={`tel:${info.phone}`} className={styles.infoValue}>
//                                 {info.phone} →
//                             </a>
//                         </motion.div>
//                         <motion.div className={styles.infoItem} variants={fadeUpVariants}>
//                             <span className={styles.infoLabel}>Location</span>
//                             <span className={styles.infoValue}>{info.location}</span>
//                         </motion.div>
//                         <motion.div className={styles.infoItem} variants={fadeUpVariants}>
//                             <span className={styles.infoLabel}>Hours:</span>
//                             <span className={styles.infoValue}>{info.hours}</span>
//                         </motion.div>
//                     </div>
//                     <motion.div className={styles.socialsWrap} variants={fadeUpVariants}>
//                         <span className={styles.followLabel}>Follow Us</span>
//                         <div className={styles.socials}>
//                             {Object.entries(info.socials).map(([platform, url]) => {
//                                 if (!url) return null;
//                                 return (
//                                     <motion.a 
//                                         key={platform} 
//                                         href={url} 
//                                         className={styles.socialBtn} 
//                                         aria-label={platform}
//                                         whileHover={{ y: -4, scale: 1.05, transition: { duration: 0.2 } }} 
//                                     >
//                                         {platform === 'twitter' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(87, 149, 255, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>}
//                                         {platform === 'facebook' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(87, 149, 255, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>}
//                                         {platform === 'instagram' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(87, 149, 255, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>}
//                                         {platform === 'github' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(87, 149, 255, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>}
//                                     </motion.a>
//                                 );
//                             })}
//                         </div>
//                     </motion.div>

//                     {/* Hashtag-lər */}
//                     <div className={styles.hashtags}>
//                         {info.hashtags.map((tag, i) => (
//                             <motion.span key={i} className={styles.hashtag} variants={fadeUpVariants}>
//                                 {tag}
//                             </motion.span>
//                         ))}
//                     </div>
//                 </motion.div>
//                 <div className={styles.right}>
//                     <motion.form 
//                         className={styles.form} 
//                         onSubmit={handleSubmit}
//                         variants={formContainerVariants}
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.1 }}
//                     >
//                         <motion.div className={styles.row} variants={fadeUpVariants}>
//                             <div className={styles.field}>
//                                 <label className={styles.label}>Name</label>
//                                 <input className={styles.input} type="text" name="name" placeholder="Your name*" value={form.name} onChange={handleChange} />
//                             </div>
//                             <div className={styles.field}>
//                                 <label className={styles.label}>Email</label>
//                                 <input className={styles.input} type="email" name="email" placeholder="Your email*" value={form.email} onChange={handleChange} />
//                             </div>
//                         </motion.div>

//                         <motion.div className={styles.row} variants={fadeUpVariants}>
//                             <div className={styles.field}>
//                                 <label className={styles.label}>Phone</label>
//                                 <input className={styles.input} type="tel" name="phone" placeholder="Your phone*" value={form.phone} onChange={handleChange} />
//                             </div>
//                             <div className={styles.field}>
//                                 <label className={styles.label}>Service</label>
//                                 <div className={styles.selectWrap}>
//                                     <select className={styles.select} name="service" value={form.service} onChange={handleChange}>
//                                         <option value="" disabled>SERVICES</option>
//                                         {serviceOptions.map(o => <option key={o} value={o}>{o}</option>)}
//                                     </select>
//                                     <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
//                                 </div>
//                             </div>
//                         </motion.div>

//                         <motion.div className={styles.row} variants={fadeUpVariants}>
//                             <div className={styles.field}>
//                                 <label className={styles.label}>Budget</label>
//                                 <div className={styles.selectWrap}>
//                                     <select className={styles.select} name="budget" value={form.budget} onChange={handleChange}>
//                                         <option value="" disabled>Estimated Budget</option>
//                                         {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
//                                     </select>
//                                     <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
//                                 </div>
//                             </div>
//                             <div className={styles.field}>
//                                 <label className={styles.label}>Project Timeline</label>
//                                 <div className={styles.selectWrap}>
//                                     <select className={styles.select} name="timeline" value={form.timeline} onChange={handleChange}>
//                                         <option value="" disabled>ASAP</option>
//                                         {timelineOptions.map(o => <option key={o} value={o}>{o}</option>)}
//                                     </select>
//                                     <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
//                                 </div>
//                             </div>
//                         </motion.div>
//                         <motion.div className={styles.field} variants={fadeUpVariants}>
//                             <label className={styles.label}>Message</label>
//                             <textarea className={styles.textarea} name="message" placeholder="Your message" value={form.message} onChange={handleChange} rows={5} />
//                         </motion.div>
//                         <motion.button 
//                             type="submit" 
//                             className={styles.submitBtn} 
//                             variants={fadeUpVariants}
//                             whileHover={{ scale: 1.01, y: -2 }} 
//                             whileTap={{ scale: 0.99 }}
//                         >
//                             Submit Inquiry
//                         </motion.button>

//                         <motion.p className={styles.terms} variants={fadeUpVariants}>
//                             By submitting, you agree to our{" "}
//                             <a href={termsHref} className={styles.termsLink}>Terms</a> and{" "}
//                             <a href={privacyHref} className={styles.termsLink}>Privacy Policy.</a>
//                         </motion.p>
//                     </motion.form>
//                 </div>

//             </div>
//         </section>
//     );
// }





"use client";

import { useState } from "react";
import styles from "../../styles/Contact/contact.module.css";
import { motion, Variants } from "framer-motion";

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

export function ContactUI({
    title,
    description,
    info,
    serviceOptions,
    budgetOptions,
    timelineOptions,
    formLabels,
    termsHref = "#",
    privacyHref = "#",
    onSubmit,
}: ContactUIProps) {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", service: "",
        budget: "", timeline: "", message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!onSubmit) return;
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

    const words = title.split(" ");

    return (
        <section className={styles.section}>
            <div className={styles.contactDivider} />
            <div className={styles.inner}>
                {/* Sol */}
                <motion.div
                    className={styles.left}
                    variants={leftContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
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
                                <motion.a
                                    key={link.id}
                                    href={link.href}
                                    className={styles.socialBtn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -4, scale: 1.05, transition: { duration: 0.2 } }}
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
                                </motion.a>
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

                {/* Sağ — Form */}
                <div className={styles.right}>
                    <motion.form
                        className={styles.form}
                        onSubmit={handleSubmit}
                        variants={formContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
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
                                    value={form.phone} onChange={handleChange} />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.service}</label>
                                <div className={styles.selectWrap}>
                                    <select className={styles.select} name="service"
                                        value={form.service} onChange={handleChange}>
                                        <option value="" disabled>SERVICES</option>
                                        {serviceOptions.map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                    <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className={styles.row} variants={fadeUpVariants}>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.budget}</label>
                                <div className={styles.selectWrap}>
                                    <select className={styles.select} name="budget"
                                        value={form.budget} onChange={handleChange}>
                                        <option value="" disabled>{formLabels.budgetPlaceholder}</option>
                                        {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                    <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>{formLabels.timeline}</label>
                                <div className={styles.selectWrap}>
                                    <select className={styles.select} name="timeline"
                                        value={form.timeline} onChange={handleChange}>
                                        <option value="" disabled>{formLabels.timelinePlaceholder}</option>
                                        {timelineOptions.map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                    <svg className={styles.selectArrow} width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
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
                </div>
            </div>
        </section>
    );
}