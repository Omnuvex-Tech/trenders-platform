"use client";

import styles from "../../styles/OurTeam/ourteam.module.css";

export interface OurTeamMember {
    id: number;
    image: string;
    imageAlt?: string;
    name: string;
    role: string;
    href?: string;
}

export interface OurTeamUIProps {
    title: string;
    descriptionText: string;
    descriptionLink?: string;
    members: OurTeamMember[];
}

export function OurTeamUI({
    title,
    descriptionText,
    descriptionLink,
    members,
}: OurTeamUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>
                        {descriptionText}{" "}
                            <span  className={styles.descriptionLink}>
                                {descriptionLink}
                            </span>

                    </p>
                </div>

                {/* Grid */}
                <div className={styles.grid}>
                    {members.map((member) => (
                        <a key={member.id} href={member.href || "#"} className={styles.card}>
                            <img
                                src={member.image}
                                alt={member.imageAlt || member.name}
                                className={styles.cardImg}
                            />

                            {/* Sağ-yuxarı + button */}
                            <div className={styles.plusBtn}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                    <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </div>

                            {/* Sol-alt: ad + vəzifə */}
                            <div className={styles.cardInfo}>
                                <span className={styles.memberName}>{member.name}</span>
                                <span className={styles.memberRole}>{member.role}</span>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
}