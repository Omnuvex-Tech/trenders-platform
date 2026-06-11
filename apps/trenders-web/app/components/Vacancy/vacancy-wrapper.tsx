import { VacancyUI } from "@repo/ui";
import type { VacancyItem } from "@repo/ui";

type LocalizedString = Record<string, string>;

function getL(obj: LocalizedString | any, lang: string): string {
  if (!obj) return "";
  return obj[lang] || obj["az"] || "";
}

interface VacancyCategory {
  id: number;
  name: LocalizedString;
}

interface VacancyFromAPI {
  id: number;
  title: LocalizedString;
  slug: string;
  tags: LocalizedString[];
  isNew: boolean;
  newLabel: LocalizedString | null;
  isVisible: boolean;
  order: number;
  categoryId: number;
  category: VacancyCategory;
  createdAt: string;
  startDate: string | null;
  isStartDateVisible: boolean;
  closingDate: string | null;
  isDateVisible: boolean;
}

interface VacancyHeader {
  id: number;
  title: LocalizedString;
}

interface VacancyData {
  header: VacancyHeader | null;
  categories: VacancyCategory[];
  vacancies: VacancyFromAPI[];
}

async function getVacancyData(): Promise<VacancyData> {
  try {
    const [headerRes, categoriesRes, vacanciesRes] = await Promise.all([
      fetch(`${process.env.API_URL}/vacancy/header`, { cache: "no-store" }),
      fetch(`${process.env.API_URL}/vacancy/categories`, { cache: "no-store" }),
      fetch(`${process.env.API_URL}/vacancy`, { cache: "no-store" }),
    ]);
    const [header, categories, vacancies] = await Promise.all([
      headerRes.ok ? headerRes.json() : null,
      categoriesRes.ok ? categoriesRes.json() : [],
      vacanciesRes.ok ? vacanciesRes.json() : [],
    ]);
    return { header, categories, vacancies };
  } catch {
    return { header: null, categories: [], vacancies: [] };
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr)
    .toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
    .toUpperCase();
}

export async function VacancyWrapper({ locale = "az" }: { locale?: string }) {
  const { header, categories, vacancies } = await getVacancyData();

  const visibleVacancies = vacancies.filter((v) => v.isVisible);
  if (visibleVacancies.length === 0) return null;

  const vacancyItems: VacancyItem[] = visibleVacancies.map((v) => {
    const startStr = v.isStartDateVisible && v.startDate ? formatDate(v.startDate) : undefined;
    const closingStr = v.isDateVisible && v.closingDate ? formatDate(v.closingDate) : undefined;
    const dateStr = startStr && closingStr
      ? `${startStr} — ${closingStr}`
      : startStr || closingStr || "";
    return {
      id: v.id,
      date: dateStr,
      isNew: !!v.newLabel,
      newLabel: getL(v.newLabel, locale) || undefined,
      title: getL(v.title, locale),
      category: getL(v.category.name, locale),
      tags: v.tags.slice(0, 5).map((tag) => ({
        label: getL(tag, locale),
      })),
      detailHref: `/${locale}/Vacancy/${v.slug}`,
    };
  });

  const categoryNames = categories.map((c) => getL(c.name, locale));

  return (
    <VacancyUI
      title={getL(header?.title, locale) || "Vakansiyalar"}
      filterTags={categoryNames}
      dropdownLabel="Vakansiya seçin"
      dropdownOptions={categoryNames}
      vacancies={vacancyItems}
    />
  );
}