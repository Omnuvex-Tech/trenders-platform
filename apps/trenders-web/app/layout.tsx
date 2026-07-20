import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NotifyProvider, NotifyContainer } from "@repo/ui";
import { QueryProvider } from "@/app/providers";
import { config } from "@/config";
import { FooterWrapper } from "./components/Footer/footer-wrapper";

import "./globals.css";

const API = process.env.NEXT_PUBLIC_API_URL;

function lv(field: Record<string, string> | null | undefined, lang = "az"): string | undefined {
  return field?.[lang] ?? undefined;
}

async function getPageMeta(pageKey: string) {
  try {
    const res = await fetch(`${API}/page-meta/${pageKey}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageMeta = await getPageMeta("home");

  return {
    title: lv(pageMeta?.seoTitle) ?? config.project.projectName,
    description: lv(pageMeta?.seoDescription) ?? config.project.projectDescription,
    keywords: lv(pageMeta?.seoKeywords)?.split(",").map((k: string) => k.trim()) ?? [...config.project.keywords],
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="az">
      <head>
        <meta httpEquiv="Cache-Control" content="no-store" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
     <body>
  <QueryProvider>
    <NotifyProvider>
      <main className="mx-auto w-full">{children}</main>
      <FooterWrapper />
      <NotifyContainer />
    </NotifyProvider>
  </QueryProvider>
</body>

    </html>
  );
}