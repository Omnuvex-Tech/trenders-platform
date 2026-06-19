"use client";

import { useState } from "react";
import styles from "../../styles/OurTeam/ourteam.module.css";
import portfolioStyles from "../../styles/Portfolio/portfolio.module.css";

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
    descriptionHtml: string;
    members: OurTeamMember[];
    moreButtonText: string;
}

export function OurTeamUI({ title, descriptionHtml, members, moreButtonText }: OurTeamUIProps) {
    const [visibleCount, setVisibleCount] = useState(8);

    const displayed = members.slice(0, visibleCount);

    const handleShowMore = () => {
        setVisibleCount(prev => Math.min(prev + 4, members.length));
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                </div>

                <div className={styles.grid}>
                    {displayed.map((member) => (
                        <div key={member.id} className={styles.card}>
                            <img
                                src={member.image}
                                alt={member.imageAlt || member.name}
                                className={styles.cardImg}
                            />
                            <a href={member.href || "#"} className={styles.plusBtn}
                                aria-label={`${member.name} haqqında ətraflı`}>
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

                {visibleCount < members.length && (
                    <div className={portfolioStyles.moreBtnWrapper}>
                        <button
                            type="button"
                            onClick={handleShowMore}
                            className={portfolioStyles.projectsMoreBtn}
                        >
                            {moreButtonText}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.8"
                                strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}