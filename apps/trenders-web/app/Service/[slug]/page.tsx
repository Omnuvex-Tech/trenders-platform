import { notFound } from 'next/navigation';
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import {
  ServiceDetailHeroUI,
  ServiceDetailContentUI,
  ServiceDetailOverlayUI,
  ServiceDetailQuoteUI,
} from '@repo/ui';
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";

function toAbsUrl(path: string) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${process.env.API_URL}${path}`;
}

async function getService(slug: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/services/slug/${slug}`, {
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

    case 'hero': {
      return (
        <ServiceDetailHeroUI
          key={index}
          heroImage={toAbsUrl(section.heroImage ?? '')}
          badge={section.badge ?? ''}
          title={section.title ?? ''}
          descriptions={(section.descriptions ?? []).filter(Boolean)}
          stats={(section.stats ?? []).map((s: any) => ({
            label: s.label ?? '',
            value: s.value ?? '',
            icon: s.icon
              ? <img src={toAbsUrl(s.icon)} alt={s.label ?? ''} style={{ width: 24, height: 24 }} />
              : undefined,
          }))}
          quoteText={section.quoteText ?? ''}
          bottomImage={toAbsUrl(section.bottomImage ?? '')}
          bottomImageAlt={section.bottomImageAlt ?? ''}
        />
      );
    }

    case 'content': {
      return (
        <ServiceDetailContentUI
          key={index}
          items={(section.items ?? []).map((item: any) => ({
            number: item.number ?? '',
            badge: item.badge ?? '',
            title: item.title ?? '',
            descriptions: (item.descriptions ?? []).filter(Boolean),
            quote: item.quote ?? null,
            quoteImage: toAbsUrl(item.quoteImage ?? ''),
            subText: item.subText ?? undefined,
            image: item.image ? toAbsUrl(item.image) : undefined,
            imageAlt: item.imageAlt ?? '',

          }))}
        />
      );
    }

    case 'quote': {
      return (
        <ServiceDetailQuoteUI
          key={index}
          number={section.number ?? ''}
          badge={section.badge ?? ''}
          title={section.title ?? ''}
          descriptions={(section.descriptions ?? []).filter(Boolean)}
          quoteImage={toAbsUrl(section.quoteImage ?? '')}
          quoteImageAlt={section.quoteImageAlt ?? ''}
          quoteText={section.quoteText ?? ''}
        />
      );
    }

    case 'overlay': {
      return (
        <ServiceDetailOverlayUI
          key={index}
          image={toAbsUrl(section.image ?? '')}
          imageAlt={section.imageAlt ?? ''}
          badge={section.badge ?? ''}
          title={section.title ?? ''}
          descriptions={(section.descriptions ?? []).filter(Boolean)}
        />
      );
    }


    default:
      return null;
  }


}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [service, langResponse, translationResponse] = await Promise.all([
    getService(slug),
    api.get<Language[]>(config.endpoints.languages.list),
    api.get<Translation[]>(config.endpoints.translations.list, { locale: 'az' }),
  ]);

  if (!service || !service.isVisible) notFound();

  return (
    <div className="flex min-h-svh w-full flex-col items-start justify-start">
      <NavbarWrapper
        locale="az"
        languages={langResponse.data ?? []}
        initialTranslations={translationResponse.data ?? []}
      />
      {(service.sections ?? []).map((section: any, i: number) =>
        renderSection(section, i)
      )}
      <ContactWrapper />
    </div>
  );
}