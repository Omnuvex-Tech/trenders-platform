import { FaqUI } from "@repo/ui";
import type { FaqItem } from "@repo/ui";

type LocalizedString = Record<string, string>;

interface FaqAPI {
  id: number;
  question: LocalizedString;
  answer: LocalizedString;
  isVisible: boolean;
  order: number;
}

function getLocalizedValue(obj: LocalizedString | any, lang: string): string {
  if (!obj) return "";
  return obj[lang] || obj["az"] || "";
}

async function getFaqs(): Promise<FaqAPI[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/faq/public`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function FaqWrapper({ locale = "az" }: { locale?: string }) {
  const data = await getFaqs();

  if (!data || data.length === 0) return null;

  const items: FaqItem[] = data.map((faq) => ({
    id: faq.id,
    question: getLocalizedValue(faq.question, locale),
    answer: getLocalizedValue(faq.answer, locale),
  }));

  return <FaqUI items={items} />;
}