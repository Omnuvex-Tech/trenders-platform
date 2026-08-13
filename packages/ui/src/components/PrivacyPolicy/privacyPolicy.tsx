import styles from "../../styles/PrivacyPolicy/privacyPolicy.module.css";

export interface PrivacyPolicySection {
  id: number | string;
  title: string;
  description: string;
}

export interface PrivacyPolicyUIProps {
  title: string;
  description: string;
  sections: PrivacyPolicySection[];
}

export function PrivacyPolicyUI({ title, description, sections }: PrivacyPolicyUIProps) {
  return (
    <section className={styles.privacy}>
      <div className={styles.header}>
        <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
      </div>

      <div className={styles.intro} dangerouslySetInnerHTML={{ __html: description }} />

      <div className={styles.sections}>
        {sections.map((section, index) => (
          <div key={section.id} className={styles.section}>
            <div className={styles.sectionHeading}>
              <span className={styles.sectionNumber}>{index + 1}.</span>
              <div dangerouslySetInnerHTML={{ __html: section.title }} />
            </div>
            <div className={styles.sectionText} dangerouslySetInnerHTML={{ __html: section.description }} />
          </div>
        ))}
      </div>
    </section>
  );
}