// import { VacancyDetailUI } from "@repo/ui";
// import type { VacancyDetailSection } from "@repo/ui";
// import MapComponent from "@/app/components/VacancyDetail/mapcomponent";
// import { submitVacancyForm } from "@/app/actions/vacancy";

// type LocalizedString = Record<string, string>;

// function getL(obj: LocalizedString | any, lang: string): string {
//   if (!obj) return "";
//   return obj[lang] || obj["az"] || "";
// }

// function getStrict(obj: LocalizedString | any, lang: string): string {
//   if (!obj) return "";
//   return obj[lang] || "";
// }

// interface VacancyCategory {
//   id: number;
//   name: LocalizedString;
// }

// interface VacancyFromAPI {
//   id: number;
//   title: LocalizedString;
//   tags: LocalizedString[];
//   skills: LocalizedString[];
//   isNew: boolean;
//   newLabel: LocalizedString | null;
//   isVisible: boolean;
//   order: number;
//   categoryId: number;
//   category: VacancyCategory;
//   createdAt: string;
//   closingDate: string | null;
//   isDateVisible: boolean;
//   aboutRole: LocalizedString | null;
//   responsible: LocalizedString[];
//   responsibleType: "BULLET" | "NUMBERED" | "DASH";
//   requirements: LocalizedString[];
//   requirementsType: "BULLET" | "NUMBERED" | "DASH";
// }

// interface VacancySettings {
//   backLabel: LocalizedString;
//   applyTitle: LocalizedString;
//   aboutRoleLabel: LocalizedString;
//   skillsLabel: LocalizedString;
//   responsibleLabel: LocalizedString;
//   requirementsLabel: LocalizedString;
//   email: string;
//   emailHref: string;
//   phone: string;
//   phoneHref: string;
//   location: LocalizedString;
//   emailLabel: LocalizedString;
//   phoneLabel: LocalizedString;
//   locationLabel: LocalizedString;
//   formNameLabel: LocalizedString;
//   formNamePlaceholder: LocalizedString;
//   formEmailLabel: LocalizedString;
//   formEmailPlaceholder: LocalizedString;
//   formPhoneLabel: LocalizedString;
//   formPhonePlaceholder: LocalizedString;
//   formMessageLabel: LocalizedString;
//   formMessagePlaceholder: LocalizedString;
//   formCvLabel: LocalizedString;
//   formCvPlaceholder: LocalizedString;
//   formSubmitLabel: LocalizedString;
// }

// function getBulletPrefix(type: "BULLET" | "NUMBERED" | "DASH", index: number): string {
//   if (type === "NUMBERED") return `${index + 1}. `;
//   if (type === "DASH") return "- ";
//   return "• ";
// }

// async function getVacancy(slug: string): Promise<VacancyFromAPI | null> {
//   try {
//     const res = await fetch(`${process.env.API_URL}/vacancy/slug/${slug}`, { cache: "no-store" });
//     if (!res.ok) return null;
//     return res.json();
//   } catch { return null; }
// }

// async function getSettings(): Promise<VacancySettings | null> {
//   try {
//     const res = await fetch(`${process.env.API_URL}/vacancy/settings`, { cache: "no-store" });
//     if (!res.ok) return null;
//     return res.json();
//   } catch { return null; }
// }

// export async function VacancyDetailWrapper({
//   slug,
//   locale = "az",
// }: {
//   slug: string;
//   locale?: string;
// }) {
//   const [vacancy, settings] = await Promise.all([getVacancy(slug), getSettings()]);

//   if (!vacancy || !vacancy.isVisible) return null;

//   const s = settings;
//   const sections: VacancyDetailSection[] = [];

//   const aboutRole = getL(vacancy.aboutRole, locale);
//   if (aboutRole) {
//     sections.push({
//       title: getL(s?.aboutRoleLabel, locale) || "About the Role",
//       type: "text",
//       content: aboutRole,
//     });
//   }

//   const skills = vacancy.skills?.map((sk) => getL(sk, locale)).filter(Boolean);
//   if (skills?.length > 0) {
//     sections.push({
//       title: getL(s?.skillsLabel, locale) || "Skills",
//       type: "skills",
//       skills,
//     });
//   }

// const responsible = vacancy.responsible?.map((item) => getStrict(item, locale)).filter(Boolean);  if (responsible?.length > 0) {
//     sections.push({
//       title: getL(s?.responsibleLabel, locale) || "Responsible",
//       type: "bullets",
//       bullets: responsible.map((item, i) => `${getBulletPrefix(vacancy.responsibleType, i)}${item}`),
//     });
//   }

// const requirements = vacancy.requirements?.map((item) => getStrict(item, locale)).filter(Boolean);  if (requirements?.length > 0) {
//     sections.push({
//       title: getL(s?.requirementsLabel, locale) || "Requirements",
//       type: "bullets",
//       bullets: requirements.map((item, i) => `${getBulletPrefix(vacancy.requirementsType, i)}${item}`),
//     });
//   }

//   return (
//     <VacancyDetailUI
//       backHref={`/${locale}/Vacancy`}
//       pageTitle={getL(s?.backLabel, locale) || "Vakansiyalar"}
//       jobTitle={getL(vacancy.title, locale)}
//       vacancyId={vacancy.id}
//       vacancyTitle={getL(vacancy.title, locale)}
//       sections={sections}
//       applyTitle={getL(s?.applyTitle, locale) || "APPLY NOW"}
//       contact={{
//         email: s?.email || "",
//         emailHref: s?.emailHref || "",
//         emailLabel: getL(s?.emailLabel, locale) || "Email Adres",
//         phone: s?.phone || "",
//         phoneHref: s?.phoneHref || "",
//         phoneLabel: getL(s?.phoneLabel, locale) || "Phone",
//         location: getL(s?.location, locale) || "",
//         locationLabel: getL(s?.locationLabel, locale) || "Location",
//       }}
//       mapComponent={<MapComponent />}
//       nameLabel={getL(s?.formNameLabel, locale) || "Name"}
//       namePlaceholder={getL(s?.formNamePlaceholder, locale) || "Your name*"}
//       emailLabel={getL(s?.formEmailLabel, locale) || "Email"}
//       emailPlaceholder={getL(s?.formEmailPlaceholder, locale) || "Your email*"}
//       phoneLabel={getL(s?.formPhoneLabel, locale) || "Phone"}
//       phonePlaceholder={getL(s?.formPhonePlaceholder, locale) || "Your phone*"}
//       messageLabel={getL(s?.formMessageLabel, locale) || "Message"}
//       messagePlaceholder={getL(s?.formMessagePlaceholder, locale) || "Your message"}
//       cvLabel={getL(s?.formCvLabel, locale) || "CV yüklə*"}
//       cvPlaceholder={getL(s?.formCvPlaceholder, locale) || "pdf, png, jpg"}
//       submitLabel={getL(s?.formSubmitLabel, locale) || "Göndər"}
//       onSubmit={submitVacancyForm}
//     />
//   );
// }











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

  const skills = vacancy.skills?.map((sk) => getL(sk, locale)).filter(Boolean);
  if (skills?.length > 0) {
    sections.push({
      title: getL(s?.skillsLabel, locale) || "Skills",
      type: "skills",
      skills,
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
      pageTitle={getL(s?.backLabel, locale) || "Vakansiyalar"}
      jobTitle={getL(vacancy.title, locale)}
      tags={tags}
      vacancyId={vacancy.id}
      vacancyTitle={getL(vacancy.title, locale)}
      sections={sections}
      applyTitle={getL(s?.applyTitle, locale) || "APPLY NOW"}
      contact={{
        email: s?.email || "",
        emailHref: s?.emailHref || "",
        emailLabel: getL(s?.emailLabel, locale) || "Email Adres",
        phone: s?.phone || "",
        phoneHref: s?.phoneHref || "",
        phoneLabel: getL(s?.phoneLabel, locale) || "Phone",
        location: getL(s?.location, locale) || "",
        locationLabel: getL(s?.locationLabel, locale) || "Location",
      }}
      mapComponent={<MapComponent />}
      nameLabel={getL(s?.formNameLabel, locale) || "Name"}
      namePlaceholder={getL(s?.formNamePlaceholder, locale) || "Your name*"}
      emailLabel={getL(s?.formEmailLabel, locale) || "Email"}
      emailPlaceholder={getL(s?.formEmailPlaceholder, locale) || "Your email*"}
      phoneLabel={getL(s?.formPhoneLabel, locale) || "Phone"}
      phonePlaceholder={getL(s?.formPhonePlaceholder, locale) || "Your phone*"}
      messageLabel={getL(s?.formMessageLabel, locale) || "Message"}
      messagePlaceholder={getL(s?.formMessagePlaceholder, locale) || "Your message"}
      cvLabel={getL(s?.formCvLabel, locale) || "CV yüklə*"}
      cvPlaceholder={getL(s?.formCvPlaceholder, locale) || "pdf, png, jpg"}
      submitLabel={getL(s?.formSubmitLabel, locale) || "Göndər"}
      onSubmit={submitVacancyForm}
    />
  );
}