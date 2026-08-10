import Link from "next/link"
import styles from "../../styles/NotFound/NotFound.module.css";

export interface NotFoundUIProps {
  title: string
  description: string
  buttonLabel: string
  homeHref: string
}

export function NotFoundUI({ title, description, buttonLabel, homeHref }: NotFoundUIProps) {
  return (
    <section className={styles.wrapper}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <Link href={homeHref} className={styles.button}>
        {buttonLabel}
      </Link>
    </section>
  )
}