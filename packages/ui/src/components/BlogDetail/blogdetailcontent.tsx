// "use client";

// import styles from "../../styles/BlogDetail/blogdetailcontent.module.css";

// export interface BlogDetailSection {
//     title: string;
//     paragraphs: string[];
// }

// export interface BlogDetailContentUIProps {
//     heroImage: string;
//     heroImageAlt?: string;
//     overlapTitle: string;
//     introParagraphs: string[];
//     sections: BlogDetailSection[];
//     bottomImages: {
//         left: string;
//         leftAlt?: string;
//         right: string;
//         rightAlt?: string;
//     };
// }

// export function BlogDetailContentUI({
//     heroImage,
//     heroImageAlt = "",
//     overlapTitle,
//     introParagraphs,
//     sections,
//     bottomImages,
// }: BlogDetailContentUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                  <div className={styles.heroWrap}>
//                     <img
//                         src={heroImage}
//                         alt={heroImageAlt}
//                         className={styles.heroImg}
//                     />
//                      <div className={styles.overlapBlock}>
//                         <h2 className={styles.overlapTitle}>{overlapTitle}</h2>
//                     </div>
//                 </div>
//                  <div className={styles.introBlock}>
//                     {introParagraphs.map((p, i) => (
//                         <p key={i} className={styles.paragraph}>{p}</p>
//                     ))}
//                 </div>  
//                 <div className={styles.sections}>
//                     {sections.map((section, i) => (
//                         <div key={i} className={styles.sectionBlock}>
//                             <h3 className={styles.sectionTitle}>{section.title}</h3>
//                             <div className={styles.sectionParagraphs}>
//                                 {section.paragraphs.map((p, j) => (
//                                     <p key={j} className={styles.paragraph}>{p}</p>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className={styles.bottomImages}>
//                     <img
//                         src={bottomImages.left}
//                         alt={bottomImages.leftAlt || ""}
//                         className={styles.bottomImgLeft}
//                     />
//                     <img
//                         src={bottomImages.right}
//                         alt={bottomImages.rightAlt || ""}
//                         className={styles.bottomImgRight}
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// }


























"use client";

import styles from "../../styles/BlogDetail/blogdetailcontent.module.css";

export interface BlogDetailSection {
    title: string;
    paragraphs: string[];
}

export interface BlogDetailContentUIProps {
    heroImage: string;
    heroImageAlt?: string;
    overlapTitle: string;
    introParagraphs: string[];
    sections: BlogDetailSection[];
    bottomImages: {
        left: string;
        leftAlt?: string;
        right: string;
        rightAlt?: string;
    };
}

export function BlogDetailContentUI({
    heroImage,
    heroImageAlt = "",
    overlapTitle,
    introParagraphs,
    sections,
    bottomImages,
}: BlogDetailContentUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                <div className={styles.heroWrap}>
                    <img
                        src={heroImage}
                        alt={heroImageAlt}
                        className={styles.heroImg}
                    />
                </div>

                <div className={styles.overlapBlock}>
                    <h2 className={styles.overlapTitle}>{overlapTitle}</h2>
                </div>

                <div className={styles.introBlock}>
                    {introParagraphs.map((p, i) => (
                        <p key={i} className={styles.paragraph}>{p}</p>
                    ))}
                </div>

                <div className={styles.sections}>
                    {sections.map((section, i) => (
                        <div key={i} className={styles.sectionBlock}>
                            <h3 className={styles.sectionTitle}>{section.title}</h3>
                            <div className={styles.sectionParagraphs}>
                                {section.paragraphs.map((p, j) => (
                                    <p key={j} className={styles.paragraph}>{p}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.bottomImages}>
                    <img
                        src={bottomImages.left}
                        alt={bottomImages.leftAlt || ""}
                        className={styles.bottomImgLeft}
                    />
                    <img
                        src={bottomImages.right}
                        alt={bottomImages.rightAlt || ""}
                        className={styles.bottomImgRight}
                    />
                </div>

            </div>
        </section>
    );
}