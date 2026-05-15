import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NotifyProvider, NotifyContainer } from "@repo/ui";
import { QueryProvider } from "@/app/providers";
import { config } from "@/config";
import { NavbarWrapper } from "./components/Navbar/navbar-wrapper";
import { FooterWrapper } from "./components/Footer/footer-wrapper";

import "./globals.css";

export const metadata: Metadata = {
  title: config.project.projectName,
  description: config.project.projectDescription,
  keywords: [...config.project.keywords],
};

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