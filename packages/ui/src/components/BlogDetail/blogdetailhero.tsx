// "use client";

// import styles from "../../styles/BlogDetail/blogdetailhero.module.css";
// export interface BlogDetailHeroAuthor {
//     name: string;
//     role: string;
//     avatar: string;
//     href?: string;
// }

// export interface BlogDetailPageHeroUIProps {
//     heroImage: string;
//     heroImageAlt?: string;
//     author: BlogDetailHeroAuthor;
//     hashtag: string;
//     title: string;
//     paragraphs: string[];
// }

// export function BlogDetailPageHeroUI({
//     heroImage,
//     heroImageAlt = "",
//     author,
//     hashtag,
//     title,
//     paragraphs,
// }: BlogDetailPageHeroUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 <div className={styles.heroWrap}>
//                     <img
//                         src={heroImage}
//                         alt={heroImageAlt}
//                         className={styles.heroImg}
//                     />
//                    {author.href ? (
//                         <a href={author.href} className={styles.authorCard}>
//                             <img
//                                 src={author.avatar}
//                                 alt={author.name}
//                                 className={styles.authorAvatar}
//                             />
//                             <div className={styles.authorInfo}>
//                                 <span className={styles.authorName}>{author.name}</span>
//                                 <span className={styles.authorRole}>{author.role}</span>
//                             </div>
//                         </a>
//                     ) : (
//                         <div className={styles.authorCard}>
//                             <img
//                                 src={author.avatar}
//                                 alt={author.name}
//                                 className={styles.authorAvatar}
//                             />
//                             <div className={styles.authorInfo}>
//                                 <span className={styles.authorName}>{author.name}</span>
//                                 <span className={styles.authorRole}>{author.role}</span>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 <div className={styles.textBlock}>
//                     <span className={styles.hashtag}>{hashtag}</span>
//                     <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
//                     <div className={styles.paragraphs}>

//                         {paragraphs.map((p, i) => (
//                             <div key={i} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: p }} />
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// }




"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/BlogDetail/blogdetailhero.module.css";

export interface BlogDetailHeroAuthor {
    name: string;
    role: string;
    avatar: string;
    href?: string;
}

export interface BlogDetailPageHeroUIProps {
    heroImage: string;
    heroImageAlt?: string;
    author: BlogDetailHeroAuthor;
    hashtag: string;
    title: string;
    paragraphs: string[];
}

// Ana vizual hissə üçün animasiya variantı (Aşağıdan yuxarıya rəvan gəlmə)
const heroWrapAnimation: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 75,
            damping: 18,
        }
    }
};

// Mətn elementlərinin növbəli (stagger) gəlməsi üçün konteyner variantı
const containerAnimation: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

// Hər bir mətn elementi üçün fərdi animasiya
const itemAnimation: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { type: "spring", stiffness: 90, damping: 16 }
    }
};

export function BlogDetailPageHeroUI({
    heroImage,
    heroImageAlt = "",
    author,
    hashtag,
    title,
    paragraphs,
}: BlogDetailPageHeroUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                
                {/* Sol/Üst hissə: Əsas şəkil və Müəllif kartı */}
                <motion.div 
                    variants={heroWrapAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    className={styles.heroWrap}
                >
                    <img
                        src={heroImage}
                        alt={heroImageAlt}
                        className={styles.heroImg}
                    />
                    {author.href ? (
                        <Link href={author.href} className={styles.authorCard}>
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className={styles.authorAvatar}
                            />
                            <div className={styles.authorInfo}>
                                <span className={styles.authorName}>{author.name}</span>
                                <span className={styles.authorRole}>{author.role}</span>
                            </div>
                        </Link>
                    ) : (
                        <div className={styles.authorCard}>
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className={styles.authorAvatar}
                            />
                            <div className={styles.authorInfo}>
                                <span className={styles.authorName}>{author.name}</span>
                                <span className={styles.authorRole}>{author.role}</span>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Sağ/Alt hissə: Mətn bloku (Domino effekti ilə açılır) */}
                <motion.div 
                    variants={containerAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={styles.textBlock}
                >
                    <motion.span variants={itemAnimation} className={styles.hashtag}>
                        {hashtag}
                    </motion.span>
                    
                    <motion.div 
                        variants={itemAnimation}
                        className={styles.title} 
                        dangerouslySetInnerHTML={{ __html: title }} 
                    />
                    
                    <div className={styles.paragraphs}>
                        {paragraphs.map((p, i) => (
                            <motion.div 
                                key={i} 
                                variants={itemAnimation}
                                className={styles.paragraph} 
                                dangerouslySetInnerHTML={{ __html: p }} 
                            />
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}