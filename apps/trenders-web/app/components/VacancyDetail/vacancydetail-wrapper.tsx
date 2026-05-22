import { VacancyDetailUI } from "@repo/ui";
import type { VacancyDetailSection } from "@repo/ui";
import MapComponent from "@/app/components/VacancyDetail/mapcomponent";

interface VacancyCategory {
  id: number;
  name: string;
}

interface VacancyFromAPI {
  id: number;
  title: string;
  tags: string[];
  skills: string[];
  isNew: boolean;
  newLabel: string | null;
  isVisible: boolean;
  order: number;
  categoryId: number;
  category: VacancyCategory;
  createdAt: string;
  closingDate: string | null;
  isDateVisible: boolean;
  aboutRole: string | null;
  responsible: string[];
  responsibleType: "BULLET" | "NUMBERED" | "DASH";
  requirements: string[];
  requirementsType: "BULLET" | "NUMBERED" | "DASH";
}

interface VacancySettings {
  backLabel: string;
  applyTitle: string;
  aboutRoleLabel: string;
  skillsLabel: string;
  responsibleLabel: string;
  requirementsLabel: string;
  email: string;
  emailHref: string;
  phone: string;
  phoneHref: string;
  location: string;
  emailLabel: string;
  phoneLabel: string;
  locationLabel: string;
}

function getBulletPrefix(type: "BULLET" | "NUMBERED" | "DASH", index: number): string {
  if (type === "NUMBERED") return `${index + 1}. `;
  if (type === "DASH") return "- ";
  return "• ";
}

async function getVacancy(slug: string): Promise<VacancyFromAPI | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/vacancy/slug/${slug}`, {  
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getSettings(): Promise<VacancySettings | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/vacancy-settings`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function VacancyDetailWrapper({ slug }: { slug: string }) {
  const [vacancy, settings] = await Promise.all([
    getVacancy(slug),
    getSettings(),
  ]);

  if (!vacancy || !vacancy.isVisible) return null;
  const s = settings;

  const sections: VacancyDetailSection[] = [];

  if (vacancy.aboutRole) {
    sections.push({
      title: s?.aboutRoleLabel || "About the Role",
      type: "text",
      content: vacancy.aboutRole,
    });
  }

  if (vacancy.skills && vacancy.skills.length > 0) {
    sections.push({
      title: s?.skillsLabel || "Skills",
      type: "skills",
      skills: vacancy.skills,
    });
  }

  if (vacancy.responsible && vacancy.responsible.length > 0) {
    sections.push({
      title: s?.responsibleLabel || "Responsible",
      type: "bullets",
      bullets: vacancy.responsible.map((item, i) =>
        `${getBulletPrefix(vacancy.responsibleType, i)}${item}`
      ),
    });
  }

  if (vacancy.requirements && vacancy.requirements.length > 0) {
    sections.push({
      title: s?.requirementsLabel || "Requirements",
      type: "bullets",
      bullets: vacancy.requirements.map((item, i) =>
        `${getBulletPrefix(vacancy.requirementsType, i)}${item}`
      ),
    });
  }

  return (
    <VacancyDetailUI
      backHref="/Vacancy"
      pageTitle={s?.backLabel || "Vakansiyalar"}
      jobTitle={vacancy.title}
      sections={sections}
      applyTitle={s?.applyTitle || "APPLY NOW"}
    contact={{
        email: s?.email || "",
        emailHref: s?.emailHref || "",
        emailLabel: s?.emailLabel || "Email Adres",
        phone: s?.phone || "",
        phoneHref: s?.phoneHref || "",
        phoneLabel: s?.phoneLabel || "Phone",
        location: s?.location || "",
        locationLabel: s?.locationLabel || "Location",
      }}
      mapComponent={<MapComponent />}
    />
  );
}