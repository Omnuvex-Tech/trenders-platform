"use client";

import styles from "../../styles/Blog/blog.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion"; // ← Framer Motion əlavə olundu

export interface BlogPost {
  id: number;
  image: string;
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

export interface BlogUIProps {
  title: string;
  allPostsLabel: string;
  allPostsHref?: string;
  allPostsNewTab?: boolean;
  posts: BlogPost[];
}

export function BlogUI({ title, allPostsLabel, allPostsHref, allPostsNewTab = false, posts }: BlogUIProps) {

  const router = useRouter();

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };
  return (
    <section className={styles.section}>
      <div className={styles.blogDivider}></div>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Link
            href={allPostsHref}
            className={styles.allPostsBtn}
            target={allPostsNewTab ? "_blank" : "_self"}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>{allPostsLabel}</span>
            <svg
              style={{ position: 'relative', zIndex: 2 }}
              width="16" height="16" viewBox="0 0 36 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M22 2L30 8L22 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <motion.div
  className={styles.grid}
  variants={gridVariants}
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
          {posts.map(post => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              className={styles.card}
              style={{ cursor: "pointer" }}
              onClick={() => router.push(post.href || "#")}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className={styles.imageWrap}>
                <img src={post.image} alt={post.imageAlt || post.title} className={styles.image} />
                
                <span className={styles.category}>{post.category}</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>

                <div className={styles.author}>
                  {post.authorHref ? (
                    <Link
                      href={post.authorHref}
                      className={styles.authorLink}
                      style={{ display: "flex", alignItems: "center", gap: "8px" }}
                      onClick={e => e.stopPropagation()}
                    >
                      <img
                        src={post.authorImage}
                        alt={post.authorImageAlt || post.authorName}
                        className={styles.authorImg}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p className={styles.authorName}>{post.authorName}</p>
                        <p className={styles.date}>{post.date}</p>
                      </div>
                    </Link>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <img
                        src={post.authorImage}
                        alt={post.authorImageAlt || post.authorName}
                        className={styles.authorImg}
                      />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p className={styles.authorName}>{post.authorName}</p>
                        <p className={styles.date}>{post.date}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}