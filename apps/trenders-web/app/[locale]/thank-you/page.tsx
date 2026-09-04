// import type { Metadata } from "next";
// import { ThankYouWrapper } from "@/app/components/ThankYou/thankyou-wrapper";
// import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";


// export const metadata: Metadata = {
//   title: "Təşəkkür edirik | Trenders",
//   robots: {
//     index: false,
//     follow: false,
//   },
// };

// export default async function ThankYouPage({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params;
//   return <ThankYouWrapper locale={locale} />;
// }



import type { Metadata } from "next";
import type { Translation } from "@repo/types/types";
import { api } from "@/lib/api";
import { config } from "@/config";
import { STATIC_LANGUAGES } from "@/config/locales";
import { NavbarWrapper } from "@/app/components/Navbar/navbar-wrapper";
import { ThankYouWrapper } from "@/app/components/ThankYou/thankyou-wrapper";

export const metadata: Metadata = {
  title: "Təşəkkür edirik | Trenders",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const translationResponse = await api.get<Translation[]>(
    config.endpoints.translations.list,
    { locale }
  );

  return (
    <div >
      <NavbarWrapper
        locale={locale}
        languages={STATIC_LANGUAGES}
        initialTranslations={translationResponse.data ?? []}
      />
            <ThankYouWrapper locale={locale} />

    </div>
    
  );
}






