// "use client";

// import styles from "../../styles/BlogAuthor/blogauthorhero.module.css";

// export interface BlogAuthorSkill {
//     label: string;
// }

// export interface BlogAuthorHeroAuthor {
//     name: string;
//     role: string;
//     avatar: string;
//     linkedinHref?: string;
//     bio: string;
//     skillsTitle?: string;
//     skills: BlogAuthorSkill[];
// }

// export interface BlogAuthorHeroPost {
//     id: number;
//     image: string;
//     imageAlt?: string;
//     category: string;
//     date: string;
//     title: string;
//     excerpt: string;
//     readHref?: string;
//     readLabel?: string;
// }

// export interface BlogAuthorHeroUIProps {
//     author: BlogAuthorHeroAuthor;
//     postsTitle: string;
//     posts: BlogAuthorHeroPost[];
// }

// export function BlogAuthorHeroUI({ author, postsTitle, posts }: BlogAuthorHeroUIProps) {
//     return (
//         <section className={styles.section}>
//             <div className={styles.inner}>

//                 <h2 className={styles.postsTitle}>{postsTitle}</h2>

//                 <div className={styles.contentRow}>

//                     <aside className={styles.authorCard}>
//                         <div className={styles.avatarWrap}>
//                             <img src={author.avatar} alt={author.name} className={styles.avatar} />
//                             {author.linkedinHref && (
//                                 <a href={author.linkedinHref} className={styles.linkedinBadge} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
//                                     <svg width="10" height="19" viewBox="0 0 24 24" fill="white">
//                                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                                     </svg>
//                                 </a>
//                             )}
//                         </div>

//                         <div className={styles.authorInfo}>
//                             <h2 className={styles.authorName}>{author.name}</h2>
//                             <p className={styles.authorRole}>{author.role}</p>
//                         </div>

//                         <p className={styles.authorBio}>{author.bio}</p>

//                         <div className={styles.skillsBlock}>
//                             {author.skillsTitle && (
//                                 <span className={styles.skillsTitle}>{author.skillsTitle}</span>
//                             )}
//                             <div className={styles.skillsList}>
//                                 {author.skills.map((skill, i) => (
//                                     <span key={i} className={styles.skill}>{skill.label}</span>
//                                 ))}
//                             </div>
//                         </div>
//                     </aside>

//                     <div className={styles.postsList}>
//                         {posts.map((post) => (
//                             <div key={post.id} className={styles.postItem}>
//                                 <img src={post.image} alt={post.imageAlt || post.title} className={styles.postImg} />
//                                 <div className={styles.postContent}>
//                                     <div className={styles.postMeta}>
//                                         <span className={styles.postCategory}>{post.category}</span>
//                                         <span className={styles.postDate}>{post.date}</span>
//                                     </div>
//                                     <h3 className={styles.postTitle}>{post.title}</h3>
//                                     <p className={styles.postExcerpt}>{post.excerpt}</p>
//                                     <a href={post.readHref || "#"} className={styles.readBtn}>
//                                         {post.readLabel || "Məqaləni oxu"}
//                                     </a>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                 </div>
//             </div>
//         </section>
//     );
// }























"use client";

import styles from "../../styles/BlogAuthor/blogauthorhero.module.css";

export interface BlogAuthorSkill {
    label: string;
}

export interface BlogAuthorHeroAuthor {
    name: string;
    role: string;
    avatar: string;
    linkedinHref?: string;
    bio: string;
    skillsTitle?: string;
    skills: BlogAuthorSkill[];
}

export interface BlogAuthorHeroPost {
    id: number;
    image: string;
    imageAlt?: string;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    readHref?: string;
    readLabel?: string;
}

export interface BlogAuthorHeroUIProps {
    author: BlogAuthorHeroAuthor;
    postsTitle: string;
    posts: BlogAuthorHeroPost[];
}

export function BlogAuthorHeroUI({ author, postsTitle, posts }: BlogAuthorHeroUIProps) {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.contentRow}>

                    <aside className={styles.authorCard}>
                        <div className={styles.avatarWrap}>
                            <img src={author.avatar} alt={author.name} className={styles.avatar} />
                            {author.linkedinHref && (
                                <a href={author.linkedinHref} className={styles.linkedinBadge} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <svg width="10" height="19" viewBox="0 0 24 24" fill="white">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                        <div className={styles.authorInfo}>
                            <h2 className={styles.authorName}>{author.name}</h2>
                            <p className={styles.authorRole}>{author.role}</p>
                        </div>
                        <p className={styles.authorBio}>{author.bio}</p>
                        <div className={styles.skillsBlock}>
                            {author.skillsTitle && (
                                <span className={styles.skillsTitle}>{author.skillsTitle}</span>
                            )}
                            <div className={styles.skillsList}>
                                {author.skills.map((skill, i) => (
                                    <span key={i} className={styles.skill}>{skill.label}</span>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* postsWrap — postsTitle + postsList birlikdə */}
                    <div className={styles.postsWrap}>
                        <h2 className={styles.postsTitle}>{postsTitle}</h2>
                        <div className={styles.postsList}>
                            {posts.map((post) => (
                                <div key={post.id} className={styles.postItem}>
                                    <img src={post.image} alt={post.imageAlt || post.title} className={styles.postImg} />
                                    <div className={styles.postContent}>
                                        <div className={styles.postMeta}>
                                            <span className={styles.postCategory}>{post.category}</span>
                                            <span className={styles.postDate}>{post.date}</span>
                                        </div>
                                        <h3 className={styles.postTitle}>{post.title}</h3>
                                        <p className={styles.postExcerpt}>{post.excerpt}</p>
                                        <a href={post.readHref || "#"} className={styles.readBtn}>
                                            {post.readLabel || "Məqaləni oxu"}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}