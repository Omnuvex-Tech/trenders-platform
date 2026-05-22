import { PortfolioUI } from '@repo/ui';
import type { PortfolioItem } from '@repo/ui';

function stripHtml(html: string) {
  return (html ?? "").replace(/<[^>]*>/g, "").trim();
}

async function getPortfolios(): Promise<PortfolioItem[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/portfolio/public`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((p: any) => ({
      id: p.id,
      image: p.coverImage.startsWith('http')
        ? p.coverImage
        : `${process.env.API_URL}${p.coverImage}`,
      imageAlt: p.coverImageAlt || stripHtml(p.title ?? ''),
      tags: p.tags,
      title: p.title,
      slug: p.slug,
    }));
  } catch {
    return [];
  }
}

export async function PortfolioWrapper() {
  const projects = await getPortfolios();

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  return (
    <PortfolioUI
      sectionTitle="Portfolio"
      projects={projects}
      showControls={true}
      dropdownLabel="Xidmətləri seçin"
      dropdownOptions={allTags}
    />
  );
}