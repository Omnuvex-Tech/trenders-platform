import styles from "../../styles/PrivacyPolicy/privacyPolicy.module.css";

export interface PrivacyPolicySection {
  heading: string;
  body: string[];
}

export interface PrivacyPolicyUIProps {
  title: string;
//   updatedLabel: string;
//   updatedDate: string;
  intro: string;
  sections: PrivacyPolicySection[];
}

export function PrivacyPolicyUI({
  title,
//   updatedLabel,
//   updatedDate,
  intro,
  sections,
}: PrivacyPolicyUIProps) {
  return (
    <section className={styles.privacy}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {/* <p className={styles.updated}>
          {updatedLabel}: {updatedDate}
        </p> */}
      </div>

      <p className={styles.intro}>{intro}</p>

      <div className={styles.sections}>
        {sections.map((section) => (
          <div key={section.heading} className={styles.section}>
            <h2 className={styles.sectionHeading}>{section.heading}</h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className={styles.sectionText}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}