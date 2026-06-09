"use client";

import styles from "../../styles/About/aboutteam.module.css";

export interface AboutTeamMember {
    id: number;
    image: string;
    imageAlt?: string;
    name: string;
    role: string;
    href?: string;
}

export interface AboutTeamUIProps {
    title: React.ReactNode;
    description: string;
    ctaLabel?: string;
    ctaHref?: string;
    members: AboutTeamMember[];
}

export function AboutTeamUI({
    title,
    description,
    ctaLabel = "Keçid edin →",
    ctaHref = "#",
    members,
}: AboutTeamUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                    <a href={ctaHref} className={styles.ctaBtn}>{ctaLabel}</a>
                </div>
                <div className={styles.grid}>
                    {members.map((member) => (
                        <div key={member.id} className={styles.card}>
                            <img
                                src={member.image}
                                alt={member.imageAlt || member.name}
                                className={styles.cardImg}
                            />
                            <a href={member.href || "#"} className={styles.plusBtn} aria-label={`${member.name} haqqında ətraflı`}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                    <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </a>
                            <div className={styles.cardInfo}>
                                <span className={styles.memberName}>{member.name}</span>
                                <span className={styles.memberRole}>{member.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}