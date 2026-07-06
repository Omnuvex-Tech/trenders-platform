// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import styles from "../../styles/BlogPage/bloggrid.module.css";

// export interface BlogGridItem {
//     id: number;
//     image: string;
//     gif?: string;
//     imageAlt?: string;
//     category: string;
//     title: string;
//     excerpt: string;
//     authorImage: string;
//     authorImageAlt?: string;
//     authorName: string;
//     authorHref?: string;
//     date: string;
//     href?: string;
// }

// export interface BlogGridUIProps {
//     posts: BlogGridItem[];
//     moreButtonText: string;
// }
// export function BlogGridUI({
//     posts,
//     moreButtonText,
// }: BlogGridUIProps) {
//     const [visibleCount, setVisibleCount] = useState(3);

//     const handleShowMore = () => {
//         setVisibleCount((prev) => Math.min(prev + 3, posts.length));
//     };

//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>
//                 <div className={styles.grid}>
//                     {posts.slice(0, visibleCount).map((post) => (
//                         <div key={post.id} className={styles.card}>
//                             <Link href={post.href || "#"} className={styles.imageWrap}>
//                                 <img
//                                     src={post.image}
//                                     alt={post.imageAlt || post.title}
//                                     className={`${styles.image} ${post.gif ? styles.imageStatic : ""}`}
//                                 />
//                                 {post.gif && (
//                                     post.gif.toLowerCase().endsWith('.mp4') ? (
//                                         <video
//                                             src={post.gif}
//                                             className={`${styles.image} ${styles.imageGif}`} loop
//                                             muted
//                                             playsInline
//                                         />
//                                     ) : (
//                                         <img
//                                             src={post.gif}
//                                             alt=""
//                                             className={`${styles.image} ${styles.imageGif}`} />
//                                     )
//                                 )}
//                                 <span className={styles.category}>
//                                     {post.category}
//                                 </span>
//                             </Link>

//                             <div className={styles.content}>
//                                 <Link
//                                     href={post.href || "#"}
//                                     className={styles.titleLink}
//                                 >
//                                     <div
//                                         className={styles.postTitle}
//                                         dangerouslySetInnerHTML={{
//                                             __html: post.title,
//                                         }}
//                                     />
//                                 </Link>

//                                 <div
//                                     className={styles.excerpt}
//                                     dangerouslySetInnerHTML={{
//                                         __html: post.excerpt,
//                                     }}
//                                 />

//                                 <div className={styles.author}>
//                                     {post.authorHref ? (
//                                         <Link
//                                             href={post.authorHref}
//                                             className={styles.authorLink}
//                                             style={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 gap: "8px",
//                                             }}
//                                         >
//                                             <img
//                                                 src={post.authorImage}
//                                                 alt={
//                                                     post.authorImageAlt ||
//                                                     post.authorName
//                                                 }
//                                                 className={styles.authorImg}
//                                             />
//                                             <div
//                                                 style={{
//                                                     display: "flex",
//                                                     flexDirection: "column",
//                                                 }}
//                                             >
//                                                 <p className={styles.authorName}>
//                                                     {post.authorName}
//                                                 </p>
//                                                 <p className={styles.date}>
//                                                     {post.date}
//                                                 </p>
//                                             </div>
//                                         </Link>
//                                     ) : (
//                                         <div
//                                             style={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 gap: "8px",
//                                             }}
//                                         >
//                                             <img
//                                                 src={post.authorImage}
//                                                 alt={
//                                                     post.authorImageAlt ||
//                                                     post.authorName
//                                                 }
//                                                 className={styles.authorImg}
//                                             />
//                                             <div
//                                                 style={{
//                                                     display: "flex",
//                                                     flexDirection: "column",
//                                                 }}
//                                             >
//                                                 <p className={styles.authorName}>
//                                                     {post.authorName}
//                                                 </p>
//                                                 <p className={styles.date}>
//                                                     {post.date}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {posts.length > visibleCount && (
//                     <div className={styles.moreBtnWrapper}>
//                         <button
//                             type="button"
//                             onClick={handleShowMore}
//                             className={styles.projectsMoreBtn}
//                         >
//                             {moreButtonText}                            <svg
//                                 width="16"
//                                 height="16"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="1.8"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             >
//                                 <line x1="5" y1="12" x2="19" y2="12" />
//                                 <polyline points="12 5 19 12 12 19" />
//                             </svg>
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }













"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import styles from "../../styles/BlogPage/bloggrid.module.css";

export interface BlogGridItem {
    id: number;
    image: string;
    gif?: string;
    imageAlt?: string;
    category: string;
    title: string;
    excerpt: string;
    authorImage: string;
    authorImageAlt?: string;
    authorName: string;
    authorHref?: string;
    date: string;
    href?: string;
}

export interface BlogGridUIProps {
    posts: BlogGridItem[];
    moreButtonText: string;
}

// Kartların ekrana domino effekti ilə daxil olması üçün variantlar
const gridAnimation: Variants = {
    hidden: () => ({ opacity: 0, y: 25 }),
    visible: (customIndex: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 18,
            delay: (customIndex % 3) * 0.08 // Hər sətirdəki elementlər ardıcıl gəlsin
        }
    })
};

// XƏTANI ÖNLƏYƏN HOVER VARIANTI
const hoverVariant: Variants = {
    hover: {
        y: -6,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 18,
            mass: 0.4
        }
    }
};

export function BlogGridUI({
    posts,
    moreButtonText,
}: BlogGridUIProps) {
    const [visibleCount, setVisibleCount] = useState(3);

    const handleShowMore = () => {
        setVisibleCount((prev) => Math.min(prev + 3, posts.length));
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.grid}>
                    {posts.slice(0, visibleCount).map((post, i) => (
                        <motion.div 
                            key={post.id} 
                            className={styles.card}
                            custom={i}
                            variants={gridAnimation}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-4%" }}
                            
                            // Təhlükəsiz Hover tətbiqi
                            whileHover="hover"
                        >
                            {/* TypeScript xətasını sıfırlayan köməkçi element */}
                            <motion.span variants={hoverVariant} style={{ display: "none" }} />

                            <Link href={post.href || "#"} className={styles.imageWrap}>
                                <img
                                    src={post.image}
                                    alt={post.imageAlt || post.title}
                                    className={`${styles.image} ${post.gif ? styles.imageStatic : ""}`}
                                />
                                {post.gif && (
                                    post.gif.toLowerCase().endsWith('.mp4') ? (
                                        <video
                                            src={post.gif}
                                            className={`${styles.image} ${styles.imageGif}`} 
                                            loop
                                            muted
                                            playsInline
                                            autoPlay
                                        />
                                    ) : (
                                        <img
                                            src={post.gif}
                                            alt=""
                                            className={`${styles.image} ${styles.imageGif}`} 
                                        />
                                    )
                                )}
                                <span className={styles.category}>
                                    {post.category}
                                </span>
                            </Link>

                            <div className={styles.content}>
                                <Link
                                    href={post.href || "#"}
                                    className={styles.titleLink}
                                >
                                    <div
                                        className={styles.postTitle}
                                        dangerouslySetInnerHTML={{
                                            __html: post.title,
                                        }}
                                    />
                                </Link>

                                <div
                                    className={styles.excerpt}
                                    dangerouslySetInnerHTML={{
                                        __html: post.excerpt,
                                    }}
                                />

                                <div className={styles.author}>
                                    {post.authorHref ? (
                                        <Link
                                            href={post.authorHref}
                                            className={styles.authorLink}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            <img
                                                src={post.authorImage}
                                                alt={post.authorImageAlt || post.authorName}
                                                className={styles.authorImg}
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <p className={styles.authorName}>
                                                    {post.authorName}
                                                </p>
                                                <p className={styles.date}>
                                                    {post.date}
                                                </p>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            <img
                                                src={post.authorImage}
                                                alt={post.authorImageAlt || post.authorName}
                                                className={styles.authorImg}
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <p className={styles.authorName}>
                                                    {post.authorName}
                                                </p>
                                                <p className={styles.date}>
                                                    {post.date}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {posts.length > visibleCount && (
                    <div className={styles.moreBtnWrapper}>
                        <button
                            type="button"
                            onClick={handleShowMore}
                            className={styles.projectsMoreBtn}
                        >
                            {moreButtonText}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
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