import { TestimonialsUI } from "@repo/ui";
import type { Testimonial as UITestimonial } from "@repo/ui";

interface LocalizedString {
  [key: string]: string;
}

interface TestimonialAPI {
  id: number;
  company: LocalizedString;
  quote: LocalizedString;
  name: LocalizedString;
  role: LocalizedString;
  image: string;
  altText?: string;
}

interface SectionAPI {
  id: number;
  title: LocalizedString;
  description: LocalizedString;
  testimonials: TestimonialAPI[];
}

async function getTestimonials(): Promise<SectionAPI | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/testimonials`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

interface TestimonialsWrapperProps {
  locale?: string;
}

export async function TestimonialsWrapper({ locale = "az" }: TestimonialsWrapperProps) {
  const section = await getTestimonials();

  if (!section || section.testimonials.length === 0) return null;

  const getLocalizedValue = (obj: LocalizedString | any, lang: string) => {
    if (!obj) return "";
    return obj[lang] || obj["az"] || "";
  };

  const title = getLocalizedValue(section.title, locale);
  const description = getLocalizedValue(section.description, locale);

  const testimonials: UITestimonial[] = section.testimonials.map((t) => ({
    id: t.id,
    company: getLocalizedValue(t.company, locale),
    quote: getLocalizedValue(t.quote, locale),
    name: getLocalizedValue(t.name, locale),
    role: getLocalizedValue(t.role, locale),
    image: t.image.startsWith("http")
      ? t.image
      : `${process.env.API_URL}${t.image}`,
    altText: t.altText,
  }));

  return (
    <TestimonialsUI
      title={title}
      description={description}
      testimonials={testimonials}
    />
  );
}