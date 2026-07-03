"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/Service/service.module.css";

export interface ServiceItem {
    label: string;
}

export interface Service {
    id: number;
    number: string;
    title: string;
    imageAlt: string;
    description: string;
    image: string;
    gif?: string;
    badge: string;
    imageDescription: string;
    items: ServiceItem[];
    portfolioHref?: string;
    portfolioNewTab?: boolean;
    portfolioLabel?: string;
    detailHref?: string;
    detailNewTab?: boolean;
    detailLabel?: string;
}

export interface ServicesUIProps {
    title: string;
    services: Service[];
}

const MotionLink = motion(Link);

const rowVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.05 }
    }
};

const imageVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }
    }
};

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
    }
};

const itemsContainerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }
    }
};

export function ServicesUI({ title, services }: ServicesUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <h1 className={styles.pageTitle}>{title}</h1>

                <div className={styles.servicesList}>
                    {services.map((service, index) => {
                        const isEven = index % 2 !== 0;

                        return (
                            <motion.div
                                key={service.id}
                                className={`${styles.serviceRow} ${isEven ? styles.serviceRowReverse : ""}`}
                                variants={rowVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.2 }}
                            >
                                <MotionLink
                                    href={service.detailHref || "#"}
                                    target={service.detailNewTab ? "_blank" : "_self"}
                                    rel={service.detailNewTab ? "noopener noreferrer" : undefined}
                                    className={`${styles.imageWrap} ${service.gif ? styles.imageWrapWithGif : ""}`}
                                    variants={imageVariants}
                                    whileHover={{
                                        scale: 1.035,
                                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                                    }}
                                    style={{ display: "block" }}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.imageAlt}
                                        className={`${styles.image} ${styles.imageStatic}`}
                                    />

                                    {service.gif && (
                                        service.gif.toLowerCase().endsWith('.mp4') ? (
                                            <video
                                                src={service.gif}
                                                className={`${styles.image} ${styles.imageGif}`}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                            />
                                        ) : (
                                            <img
                                                src={service.gif}
                                                alt=""
                                                className={`${styles.image} ${styles.imageGif}`}
                                            />
                                        )
                                    )}

                                    <div className={styles.imageOverlay}>
                                        <span className={styles.badge}>{service.badge}</span>
                                        <div
                                            className={styles.imageDesc}
                                            dangerouslySetInnerHTML={{ __html: service.imageDescription }}
                                        />
                                    </div>
                                </MotionLink>

                                <div className={styles.content}>
                                    <div className={styles.numberWrap}>
                                        <motion.span
                                            className={styles.number}
                                            variants={fadeUpVariants}
                                        >
                                            {service.number}
                                        </motion.span>

                                        <div className={styles.textContent}>
                                            <motion.div
                                                className={styles.title}
                                                variants={fadeUpVariants}
                                                dangerouslySetInnerHTML={{ __html: service.title }}
                                            />
                                            <motion.div
                                                className={styles.description}
                                                variants={fadeUpVariants}
                                                dangerouslySetInnerHTML={{ __html: service.description }}
                                            />
                                        </div>
                                    </div>

                                    <motion.div
                                        className={styles.bottomContent}
                                        variants={fadeUpVariants}
                                    >
                                        <motion.div
                                            className={styles.items}
                                            variants={itemsContainerVariants}
                                        >
                                            {service.items.map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={styles.item}
                                                    variants={itemVariants}
                                                >
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1 5H9M9 5L5 1M9 5L5 9"
                                                            stroke="#1a1a1a"
                                                            strokeWidth="1.2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <span>{item.label}</span>
                                                </motion.div>
                                            ))}
                                        </motion.div>

                                        <div className={styles.actions}>
                                            <Link
                                                href={service.portfolioHref || "#"}
                                                className={styles.portfolioBtn}
                                                target={service.portfolioNewTab ? "_blank" : "_self"}
                                                rel={service.portfolioNewTab ? "noopener noreferrer" : undefined}
                                            >
                                                {service.portfolioLabel || "Portfolio"}
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </Link>

                                            <Link
                                                href={service.detailHref || "#"}
                                                className={`${styles.detailBtn} ${styles.detailBtnDesktop}`}
                                                target={service.detailNewTab ? "_blank" : "_self"}
                                                rel={service.detailNewTab ? "noopener noreferrer" : undefined}
                                            >
                                                {service.detailLabel || "DAHA ƏTRAFLI"}
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </Link>

                                            <Link
                                                href={service.detailHref || "#"}
                                                className={`${styles.detailBtn} ${styles.detailBtnMobile}`}
                                                target={service.detailNewTab ? "_blank" : "_self"}
                                                rel={service.detailNewTab ? "noopener noreferrer" : undefined}
                                            >
                                                {service.detailLabel || "ƏTRAFLI"}
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}