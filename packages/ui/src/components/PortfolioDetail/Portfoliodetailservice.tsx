// 'use client'

// import styles from '../../styles/PortfolioDetail/portfolioDetailService.module.css'

// export interface PortfolioDetailServiceItem {
//   number: string
//   title: string
//   imagesAlt?: string;
//   images: string[]
// }
// export interface PortfolioDetailServiceProps {
//   badge: string;
//   title: string;
//   bigNumber: string;
//   descriptions: (string | React.ReactNode)[];
//   items: PortfolioDetailServiceItem[];

// }

// export function PortfolioDetailServiceUI({
//   badge, title, bigNumber, descriptions, items,
// }: PortfolioDetailServiceProps) {
//   return (
//     <section className={styles.section}>
//       <div className={styles.inner}>
//         <div className={styles.top}>
//           <span className={styles.bigNumber}>{bigNumber}</span>
//           <div className={styles.topContent}>
//             <span className={styles.badge}>{badge}</span>
//             <div
//               className={styles.title}
//               dangerouslySetInnerHTML={{ __html: title }}
//             />            <div className={styles.descriptions}>
//               {descriptions.map((desc, i) =>
//                 typeof desc === "string" ? (
//                   <div
//                     key={i}
//                     className={styles.desc}
//                     dangerouslySetInnerHTML={{ __html: desc }}
//                   />
//                 ) : (
//                   <div key={i} className={styles.desc}>{desc}</div>
//                 )
//               )}
//             </div>
//           </div>
//         </div>

//         <div className={styles.grid}>
//           {items[0] && (
//             <div className={styles.row}>
//               <div className={styles.imgWrap}>
//                 <img src={items[0].images[0]} alt={items[0].imagesAlt || ""} className={styles.img} />
//               </div>
//               <div className={styles.numberBlock}>
//                 <span className={styles.number}>{items[0].number}</span>
//                 <p className={styles.itemTitle}>{items[0].title}</p>
//               </div>
//               <div className={styles.imgWrap}>
//                 <img src={items[0].images[1]} alt={items[0].imagesAlt || ""} className={styles.img} />
//               </div>
//               <div className={styles.imgWrap}>
//                 <img src={items[0].images[2]} alt={items[0].imagesAlt || ""} className={styles.img} /> </div>
//             </div>
//           )}
//           {items[1] && (
//             <div className={styles.row}>
//               <div className={styles.empty} />
//               <div className={styles.imgWrap}>
//                 <img src={items[1].images[0]} alt={items[1].imagesAlt || ""} className={styles.img} />
//               </div>
//               <div className={styles.numberBlock}>
//                 <span className={styles.number}>{items[1].number}</span>
//                 <p className={styles.itemTitle}>{items[1].title}</p>
//               </div>
//               <div className={styles.imgWrap}>
//                 <img src={items[1].images[1]} alt={items[1].imagesAlt || ""} className={styles.img} /> </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }


















'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import styles from '../../styles/PortfolioDetail/portfolioDetailService.module.css'

export interface PortfolioDetailServiceItem {
  number: string
  title: string
  imagesAlt?: string
  images: string[]
}

export interface PortfolioDetailServiceProps {
  badge: string
  title: string
  bigNumber: string
  descriptions: (string | React.ReactNode)[]
  items: PortfolioDetailServiceItem[]
}

// Elementlərin ekrana girəndə focal.inc tərzində müstəqil açılış animasiyası
const rowContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Sıra ekrana girəndə içindəki şəkillər növbə ilə gəlir
    },
  },
}

const childItemVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 65,
      damping: 15,
      duration: 0.6,
    },
  },
}

export function PortfolioDetailServiceUI({
  badge, title, bigNumber, descriptions, items,
}: PortfolioDetailServiceProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        
        {/* 1. ÜST MƏTN HİSSƏSİ: Ekrana girəndə digərlərindən asılı olmadan ayrıca açılır */}
        <motion.div 
          className={styles.top}
          variants={rowContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.span variants={childItemVariants} className={styles.bigNumber}>
            {bigNumber}
          </motion.span>
          <div className={styles.topContent}>
            <motion.span variants={childItemVariants} className={styles.badge}>
              {badge}
            </motion.span>
            <motion.div
              variants={childItemVariants}
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <motion.div variants={childItemVariants} className={styles.descriptions}>
              {descriptions.map((desc, i) =>
                typeof desc === "string" ? (
                  <div
                    key={i}
                    className={styles.desc}
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                ) : (
                  <div key={i} className={styles.desc}>{desc}</div>
                )
              )}
            </motion.div>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {/* 2. BİRİNCİ SIRA (İlk 3 proyekt bloku): Skrol edib bura çatanda animasiya tətiklənir */}
          {items[0] && (
            <motion.div 
              className={styles.row}
              variants={rowContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }} // Ekranın altına 15% daxil olan kimi işə düşür
            >
              <motion.div className={styles.imgWrap} variants={childItemVariants}>
                <img src={items[0].images[0]} alt={items[0].imagesAlt || ""} className={styles.img} />
              </motion.div>
              
              <motion.div className={styles.numberBlock} variants={childItemVariants}>
                <span className={styles.number}>{items[0].number}</span>
                <p className={styles.itemTitle}>{items[0].title}</p>
              </motion.div>
              
              <motion.div className={styles.imgWrap} variants={childItemVariants}>
                <img src={items[0].images[1]} alt={items[0].imagesAlt || ""} className={styles.img} />
              </motion.div>
              
              <motion.div className={styles.imgWrap} variants={childItemVariants}>
                <img src={items[0].images[2]} alt={items[0].imagesAlt || ""} className={styles.img} />
              </motion.div>
            </motion.div>
          )}

          {/* 3. İKİNCİ SIRA (Aşağıdakı 2 proyekt bloku): Sən skrolla lap aşağı düşəndə ayrıca tetiklenecek */}
          {items[1] && (
            <motion.div 
              className={styles.row}
              variants={rowContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }} // Yuxarıdan tam asılısız, yalnız bu sıra görünəndə işləyir
            >
              <div className={styles.empty} />
              
              <motion.div className={styles.imgWrap} variants={childItemVariants}>
                <img src={items[1].images[0]} alt={items[1].imagesAlt || ""} className={styles.img} />
              </motion.div>
              
              <motion.div className={styles.numberBlock} variants={childItemVariants}>
                <span className={styles.number}>{items[1].number}</span>
                <p className={styles.itemTitle}>{items[1].title}</p>
              </motion.div>
              
              <motion.div className={styles.imgWrap} variants={childItemVariants}>
                <img src={items[1].images[1]} alt={items[1].imagesAlt || ""} className={styles.img} />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}