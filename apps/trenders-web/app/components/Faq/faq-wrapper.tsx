import { FaqUI } from "@repo/ui";  // və ya nə varsa import

async function getFaqs() {
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
  const items = await getFaqs();
  return <FaqUI items={items} />;
}