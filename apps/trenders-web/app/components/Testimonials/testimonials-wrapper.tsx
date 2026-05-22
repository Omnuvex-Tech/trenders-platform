import { TestimonialsUI } from "@repo/ui";
import type { Testimonial } from "@repo/ui";

interface Section {
  id: number;
  title: string;
  description: string;
  testimonials: Testimonial[];
}

async function getTestimonials(): Promise<Section | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/testimonials`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
export async function TestimonialsWrapper() {
  const section = await getTestimonials();

  if (!section || section.testimonials.length === 0) return null;

  const testimonials = section.testimonials.map((t) => ({
    ...t,
    image: t.image.startsWith("http")
      ? t.image
      : `${process.env.API_URL}${t.image}`,
  }));

  return (
    <TestimonialsUI
      title={section.title}
      description={section.description}
      testimonials={testimonials}
    />
  );
}