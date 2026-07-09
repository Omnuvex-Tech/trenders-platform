"use client";

import { motion, Variants } from "framer-motion";
import styles from "../../styles/PartnersPage/partnerspage.module.css";

export interface PartnerPageItem {
    id: number;
    logo: string;
    logoAlt: string;
    name: string;
}

export interface PartnersPageUIProps {
    title: string;
    partners: PartnerPageItem[];
}

const LARGE_LOGO_PARTNERS = ["toyota", "parabokt", "arabian"];

export function PartnersPageUI({ title, partners }: PartnersPageUIProps) {
        const gridVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1] as const
            }
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <h1 className={styles.title}>{title}</h1>
                </div>
                
                <motion.div 
                    className={styles.grid}
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {partners.map((partner) => {
                        const alt = partner.logoAlt?.toLowerCase() ?? "";
                        const isLargeLogo = LARGE_LOGO_PARTNERS.some((name) =>
                            alt.includes(name)
                        );
                        
                        return (
                            <motion.div 
                                key={partner.id} 
                                className={styles.item}
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.25 } }} 
                            >
                                <div className={styles.logoWrap}>
                                    <img
                                        src={partner.logo}
                                        alt={partner.logoAlt}
                                        className={`${styles.logo} ${
                                            isLargeLogo ? styles.logoLarge : ""
                                        }`}
                                    />
                                </div>
                                <div
                                    className={styles.name}
                                    dangerouslySetInnerHTML={{ __html: partner.name }}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}