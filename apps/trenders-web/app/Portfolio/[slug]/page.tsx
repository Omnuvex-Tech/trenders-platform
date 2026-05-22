import { notFound } from 'next/navigation';
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import { PortfolioDetailHeroUI } from '@repo/ui';
import { PortfolioDetailStepsUI } from '@repo/ui';
import { PortfolioDetailServiceUI } from '@repo/ui';
import { PortfolioDetailStrategyUI } from '@repo/ui';
import { PortfolioDetailOverlayUI } from '@repo/ui';
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";

function toAbsUrl(path: string) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${process.env.API_URL}${path}`;
}

function toAbsUrls(images: string[]) {
  return (images ?? []).map(toAbsUrl);
}

function stripHtml(html: string) {
  return (html ?? "").replace(/<[^>]*>/g, "").trim();
}

async function getPortfolio(slug: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/portfolio/slug/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function renderSection(section: any, index: number) {
  switch (section.type) {
    // case 'hero': {
    //   const images = toAbsUrls(section.images ?? []);
    //   return (
    //     <PortfolioDetailHeroUI
    //       key={index}
    //       heroImage={images[0] ?? ''}
    //       heroImageAlt={stripHtml(section.title ?? '')}
    //       number={section.number ?? ''}
    //       title={section.title ?? ''}
    //       description={section.description ?? ''}
    //       imagesAlt={stripHtml(section.title ?? '')}
    //       galleryImages={images.slice(1).map((src) => ({ src }))}
    //     />
    //   );
    // }

case 'hero': {
  const images = toAbsUrls(section.images ?? []);
  return (
    <PortfolioDetailHeroUI
      key={index}
      heroImage={images[0] ?? ''}
      heroImageAlt={section.imagesAlt ?? ''}
      number={section.number ?? ''}
      title={section.title ?? ''}
      description={section.description ?? ''}
      imagesAlt={section.imagesAlt ?? ''}
      galleryImages={images.slice(1).map((src) => ({ src, alt: section.imagesAlt ?? '' }))}
    />
  );
}

    case 'steps': {
      return (
        <PortfolioDetailStepsUI
          key={index}
          description={section.description ?? ''}
          steps={section.steps ?? []}
        />
      );
    }
    case 'service': {
      return (
        <PortfolioDetailServiceUI
          key={index}
          badge={section.badge ?? ''}
          bigNumber={section.bigNumber ?? ''}
          title={section.title ?? ''}
          descriptions={section.descriptions ?? []}
          items={(section.items ?? []).map((item: any) => ({
            number: item.number,
            title: item.title,
            images: toAbsUrls(item.images ?? []),
            imagesAlt: item.imagesAlt ?? '',
          }))}
        />
      );
    }
    case 'strategy': {
      return (
        <PortfolioDetailStrategyUI
          key={index}
          badge={section.badge ?? ''}
          title={section.title ?? ''}
          quote={section.quote ?? ''}
          mainImage={toAbsUrl(section.mainImage ?? '')}
          quoteImage={toAbsUrl(section.quoteImage ?? '')}
          quoteImageAlt={section.quoteImageAlt ?? ''}
          smallImages={toAbsUrls(section.smallImages ?? ['', '']) as [string, string]}
          smallImagesAlt={section.smallImagesAlt ?? ''} 
          descriptions={section.descriptions ?? []}
        />
      );
    }
    case 'overlay': {
      return (
        <PortfolioDetailOverlayUI
          key={index}
          badge={section.badge ?? ''}
          title={section.title ?? ''}
          image={toAbsUrl(section.image ?? '')}
          imageAlt={section.imageAlt ?? ''}
          descriptions={section.descriptions ?? []}
        />
      );
    }
    default:
      return null;
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [portfolio, langResponse, translationResponse] = await Promise.all([
    getPortfolio(slug),
    api.get<Language[]>(config.endpoints.languages.list),
    api.get<Translation[]>(config.endpoints.translations.list, { locale: 'az' }),
  ]);

  if (!portfolio) notFound();

  return (
    <div className="flex min-h-svh w-full flex-col items-start justify-start">
      <NavbarWrapper
        locale="az"
        languages={langResponse.data ?? []}
        initialTranslations={translationResponse.data ?? []}
      />
      {(portfolio.sections ?? []).map((section: any, i: number) =>
        renderSection(section, i)
      )}
      <ContactWrapper />
    </div>
  );
}