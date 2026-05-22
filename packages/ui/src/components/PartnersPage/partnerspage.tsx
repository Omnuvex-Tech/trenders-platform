// "use client";

// import styles from "../../styles/PartnersPage/partnerspage.module.css";

// export interface PartnerPageItem {
//     id: number;
//     logo: string;
//     logoAlt: string;
//     description: string;
// }

// export interface PartnersPageUIProps {
//     title: string;
//     partners: PartnerPageItem[];
// }

// export function PartnersPageUI({ title, partners }: PartnersPageUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 <div className={styles.left}>
//                     <h1 className={styles.title}>{title}</h1>
//                 </div>
//                 <div className={styles.grid}>
//                     {partners.map((partner) => (
//                         <div key={partner.id} className={styles.item}>
//                             <div className={styles.logoWrap}>
//                                 <img
//                                     src={partner.logo}
//                                     alt={partner.logoAlt}
//                                     className={styles.logo}
//                                 />
//                             </div>
//                             <p className={styles.description}>{partner.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

















"use client";

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

export function PartnersPageUI({ title, partners }: PartnersPageUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <h1 className={styles.title}>{title}</h1>
                </div>
                <div className={styles.grid}>
                    {partners.map((partner) => (
                        <div key={partner.id} className={styles.item}>
                            <div className={styles.logoWrap}>
                                <img
                                    src={partner.logo}
                                    alt={partner.logoAlt}
                                    className={styles.logo}
                                />
                            </div>
                            <div
                                className={styles.name}
                                dangerouslySetInnerHTML={{ __html: partner.name }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}