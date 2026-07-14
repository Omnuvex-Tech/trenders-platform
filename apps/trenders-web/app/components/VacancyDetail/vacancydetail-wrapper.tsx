import { VacancyDetailUI } from "@repo/ui";
import type { VacancyDetailSection } from "@repo/ui";
import MapComponent from "@/app/components/VacancyDetail/mapcomponent";
import { submitVacancyForm } from "@/app/actions/vacancy";

type LocalizedString = Record<string, string>;

function getL(obj: LocalizedString | any, lang: string): string {
  if (!obj) return "";
  return obj[lang] || obj["az"] || "";
}

function getStrict(obj: LocalizedString | any, lang: string): string {
  if (!obj) return "";
  return obj[lang] || "";
}

interface VacancyCategory {
  id: number;
  name: LocalizedString;
}

interface VacancyFilterTagAPI {
  id: number;
  label: LocalizedString;
}

interface VacancyFromAPI {
  id: number;
  title: LocalizedString;
  tags: LocalizedString[];
  filterTags?: VacancyFilterTagAPI[];
  skills: LocalizedString[];
  isNew: boolean;
  newLabel: LocalizedString | null;
  isVisible: boolean;
  order: number;
  categoryId: number;
  category: VacancyCategory;
  createdAt: string;
  closingDate: string | null;
  isDateVisible: boolean;
  aboutRole: LocalizedString | null;
  responsible: LocalizedString[];
  responsibleType: "BULLET" | "NUMBERED" | "DASH";
  requirements: LocalizedString[];
  requirementsType: "BULLET" | "NUMBERED" | "DASH";
}

interface VacancySettings {
  backLabel: LocalizedString;
  applyTitle: LocalizedString;
  aboutRoleLabel: LocalizedString;
  skillsLabel: LocalizedString;
  responsibleLabel: LocalizedString;
  requirementsLabel: LocalizedString;
  email: string;
  emailHref: string;
  phone: string;
  phoneHref: string;
  location: LocalizedString;
  emailLabel: LocalizedString;
  phoneLabel: LocalizedString;
  locationLabel: LocalizedString;
  formNameLabel: LocalizedString;
  formNamePlaceholder: LocalizedString;
  formEmailLabel: LocalizedString;
  formEmailPlaceholder: LocalizedString;
  formPhoneLabel: LocalizedString;
  formPhonePlaceholder: LocalizedString;
  formMessageLabel: LocalizedString;
  formMessagePlaceholder: LocalizedString;
  formCvLabel: LocalizedString;
  formCvPlaceholder: LocalizedString;
  formSubmitLabel: LocalizedString;
}

function getBulletPrefix(type: "BULLET" | "NUMBERED" | "DASH", index: number): string {
  if (type === "NUMBERED") return `${index + 1}. `;
  if (type === "DASH") return "- ";
  return "• ";
}

async function getVacancy(slug: string): Promise<VacancyFromAPI | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/vacancy/slug/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function getSettings(): Promise<VacancySettings | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/vacancy/settings`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export async function VacancyDetailWrapper({
  slug,
  locale = "az",
}: {
  slug: string;
  locale?: string;
}) {
  const [vacancy, settings] = await Promise.all([getVacancy(slug), getSettings()]);

  if (!vacancy || !vacancy.isVisible) return null;

  const s = settings;
  const sections: VacancyDetailSection[] = [];

  const tags = (vacancy.filterTags ?? []).map((ft) => getL(ft.label, locale)).filter(Boolean);

  const aboutRole = getL(vacancy.aboutRole, locale);
  if (aboutRole) {
    sections.push({
      title: getL(s?.aboutRoleLabel, locale) || "About the Role",
      type: "text",
      content: aboutRole,
    });
  }

  if (tags.length > 0) {
    sections.push({
      title: getL(s?.skillsLabel, locale) || "Skills",
      type: "skills",
      skills: tags,
    });
  }

  const responsible = vacancy.responsible?.map((item) => getStrict(item, locale)).filter(Boolean);
  if (responsible?.length > 0) {
    sections.push({
      title: getL(s?.responsibleLabel, locale) || "Responsible",
      type: "bullets",
      bullets: responsible.map((item, i) => `${getBulletPrefix(vacancy.responsibleType, i)}${item}`),
    });
  }

  const requirements = vacancy.requirements?.map((item) => getStrict(item, locale)).filter(Boolean);
  if (requirements?.length > 0) {
    sections.push({
      title: getL(s?.requirementsLabel, locale) || "Requirements",
      type: "bullets",
      bullets: requirements.map((item, i) => `${getBulletPrefix(vacancy.requirementsType, i)}${item}`),
    });
  }

  return (
    <VacancyDetailUI
      backHref={`/${locale}/Vacancy`}
      pageTitle={getL(s?.backLabel, locale)}
      jobTitle={getL(vacancy.title, locale)}
      vacancyId={vacancy.id}
      vacancyTitle={getL(vacancy.title, locale)}
      sections={sections}
      applyTitle={getL(s?.applyTitle, locale) }
      contact={{
        email: s?.email || "",
        emailHref: s?.emailHref || "",
        emailLabel: getL(s?.emailLabel, locale) ,
        phone: s?.phone || "",
        phoneHref: s?.phoneHref || "",
        phoneLabel: getL(s?.phoneLabel, locale) ,
        location: getL(s?.location, locale) || "",
        locationLabel: getL(s?.locationLabel, locale) ,
      }}
     mapComponent={<MapComponent lat={40.351556} lng={49.832056} />}
      mapLink="https://www.google.com/maps/place/TRENDERS/@40.3510338,49.832239,18.62z/data=!4m12!1m5!3m4!2zNDDCsDIxJzA1LjYiTiA0OcKwNDknNTUuNCJF!8m2!3d40.35156!4d49.83206!3m5!1s0xa4a8976b3b45e41:0xb00ab757d1fb334c!8m2!3d40.35089!4d49.8326318!16s%2Fg%2F11q9m6gs4m?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
      nameLabel={getL(s?.formNameLabel, locale) }
      namePlaceholder={getL(s?.formNamePlaceholder, locale) }
      emailLabel={getL(s?.formEmailLabel, locale) }
      emailPlaceholder={getL(s?.formEmailPlaceholder, locale) }
      phoneLabel={getL(s?.formPhoneLabel, locale) }
      phonePlaceholder={getL(s?.formPhonePlaceholder, locale) }
      messageLabel={getL(s?.formMessageLabel, locale)}
      messagePlaceholder={getL(s?.formMessagePlaceholder, locale) }
      cvLabel={getL(s?.formCvLabel, locale) }
      cvPlaceholder={getL(s?.formCvPlaceholder, locale) }
      submitLabel={getL(s?.formSubmitLabel, locale) }
      onSubmit={submitVacancyForm}
    />
  );
}