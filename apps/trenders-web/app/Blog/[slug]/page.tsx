import { notFound } from 'next/navigation';
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ContactWrapper } from "@/app/components/Contact/contact-wrapper";
import {
  BlogDetailPageHeroUI,
  BlogDetailContentUI,
  BlogDetailArticleUI,
} from '@repo/ui';
import { api } from "@/lib/api";
import { config } from "@/config";
import type { Language, Translation } from "@repo/types/types";

function toAbsUrl(path: string) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${process.env.API_URL}${path}`;
}

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/blog/slug/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function renderSection(section: any, index: number, blog: any) {
  switch (section.type) {

    case 'hero': {
      return (
        <BlogDetailPageHeroUI
          key={index}
          heroImage={toAbsUrl(section.heroImage ?? '')}
          heroImageAlt={section.heroImageAlt ?? ''}
          hashtag={section.hashtag ?? ''}
          title={section.title ?? ''}
          paragraphs={(section.paragraphs ?? []).filter(Boolean)}
        author={{
            name: blog.author?.name ?? '',
            role: blog.author?.role ?? '',
            avatar: toAbsUrl(blog.author?.avatar ?? ''),
            href: blog.author?.slug ? `/BlogAuthor/${blog.author.slug}` : undefined,
          }}
        />
      );
    }

    case 'content': {
      return (
        <BlogDetailContentUI
          key={index}
          heroImage={toAbsUrl(section.heroImage ?? '')}
          heroImageAlt={section.heroImageAlt ?? ''}
          overlapTitle={section.overlapTitle ?? ''}
          introParagraphs={(section.introParagraphs ?? []).filter(Boolean)}
          sections={(section.sections ?? []).map((s: any) => ({
            title: s.title ?? '',
            paragraphs: (s.paragraphs ?? []).filter(Boolean),
          }))}
          bottomImages={{
            left: toAbsUrl(section.bottomImages?.left ?? ''),
            leftAlt: section.bottomImages?.leftAlt ?? '',
            right: toAbsUrl(section.bottomImages?.right ?? ''),
            rightAlt: section.bottomImages?.rightAlt ?? '',
          }}
        />
      );
    }

 case 'article': {
      return (
        <BlogDetailArticleUI
          key={index}
          sections={(section.sections ?? []).map((s: any) => ({
            blocks: (s.blocks ?? []).map((b: any) => ({
              type: b.type,
              content: b.content ?? '',
            })),
            hashHeading: s.hashHeading ?? '',
            heading: s.heading ?? '',
            paragraphs: (s.paragraphs ?? []).filter(Boolean),
            hashSections: (s.hashSections ?? []).map((hs: any) => ({
              tag: hs.tag ?? '',
              paragraphs: (hs.paragraphs ?? []).filter(Boolean),
            })),
            sideImage: s.sideImage ? toAbsUrl(s.sideImage) : undefined,
            sideImageAlt: s.sideImageAlt ?? '',
          }))}
          hashtags={
            Array.isArray(section.hashtags)
              ? section.hashtags
              : typeof section.hashtags === 'string'
                ? section.hashtags
                    .split(/[,\s]+/)
                    .map((t: string) => t.trim())
                    .filter(Boolean)
                : []
          }
        />
      );
    }

    default:
      return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [blog, langResponse, translationResponse] = await Promise.all([
    getBlog(slug),
    api.get<Language[]>(config.endpoints.languages.list),
    api.get<Translation[]>(config.endpoints.translations.list, { locale: 'az' }),
  ]);

  if (!blog || !blog.isVisible) notFound();

  return (
    <div className="flex min-h-svh w-full flex-col items-start justify-start">
      <NavbarWrapper
        locale="az"
        languages={langResponse.data ?? []}
        initialTranslations={translationResponse.data ?? []}
      />
     {(blog.sections ?? [])
    .filter((section: any) => section.isVisible !== false)
    .map((section: any, i: number) =>
        renderSection(section, i, blog)
    )}
      <ContactWrapper />
    </div>
  );
}