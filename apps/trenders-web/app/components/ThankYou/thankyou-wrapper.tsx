import { ThankYou } from "@repo/ui";

const TEXT = {
  az: {
    title: "Təşəkkür edirik!",
    subtitle:
      "Müraciətiniz uğurla göndərildi. Komandamız yaxın zamanda sizinlə əlaqə saxlayacaq.",
    button: "Ana səhifəyə qayıt",
  },
  en: {
    title: "Thank you!",
    subtitle:
      "Your submission was sent successfully. Our team will get back to you shortly.",
    button: "Back to homepage",
  },
  ru: {
    title: "Спасибо!",
    subtitle:
      "Ваша заявка успешно отправлена. Наша команда свяжется с вами в ближайшее время.",
    button: "Вернуться на главную",
  },
} as const;

type Locale = keyof typeof TEXT;

export function ThankYouWrapper({ locale }: { locale: string }) {
  const lang: Locale = locale in TEXT ? (locale as Locale) : "az";
  const t = TEXT[lang];

  return (
    <ThankYou
      title={t.title}
      subtitle={t.subtitle}
      buttonLabel={t.button}
      buttonHref={`/${locale}`}
      imageSrc="/images/thank-you.png"
    />
  );
}