"use client";

import styles from "../../styles/Service/service.module.css";

export interface ServiceItem {
    label: string;
}

export interface Service {
    id: number;
    number: string;
    title: string;
    description: string;
    image: string;
    gif?: string;
    badge: string;
    imageDescription: string;
    items: ServiceItem[];
    portfolioHref?: string;
    detailHref?: string;
}

export interface ServicesUIProps {
    title: string;
    services: Service[];
}

export function ServicesUI({ title, services }: ServicesUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <h1 className={styles.pageTitle}>{title}</h1>

                <div className={styles.servicesList}>
                    {services.map((service, index) => {
                        const isEven = index % 2 !== 0;
                        return (
                            <div
                                key={service.id}
                                className={`${styles.serviceRow} ${isEven ? styles.serviceRowReverse : ""}`}
                            >
                                {/* Şəkil tərəfi */}

                               <div className={`${styles.imageWrap} ${service.gif ? styles.imageWrapWithGif : ''}`}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className={`${styles.image} ${styles.imageStatic}`}
                                    />
                                    {service.gif && (
                                        <img
                                            src={service.gif}
                                            alt=""
                                            className={`${styles.image} ${styles.imageGif}`}
                                        />
                                    )}
                                    <div className={styles.imageOverlay}>
                                        <span className={styles.badge}>{service.badge}</span>
                                        <p className={styles.imageDesc}>{service.imageDescription}</p>
                                    </div>
                                </div>

                                {/* Məzmun tərəfi */}
                                <div className={styles.content}>

                                    <div className={styles.numberWrap}>
                                        <span className={styles.number}>{service.number}</span>
                                        <div className={styles.textContent}>
                                            <h2 className={styles.title}>{service.title}</h2>
                                            <p className={styles.description}>{service.description}</p>
                                        </div>
                                    </div>

                                    <div className={styles.bottomContent}>
                                        <div className={styles.items}>
                                            {service.items.map((item, i) => (
                                                <div key={i} className={styles.item}>
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span>{item.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className={styles.actions}>
                                            <a href={service.portfolioHref || "#"} className={styles.portfolioBtn}>
                                                Portfolio
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </a>
                                            <a href={service.detailHref || "#"} className={styles.detailBtn}>
                                                DAHA ƏTRAFLΙ
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}