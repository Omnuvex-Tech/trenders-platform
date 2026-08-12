import { PrivacyPolicyUI } from '@repo/ui';
import type { PrivacyPolicySection } from '@repo/ui';

type Locale = "az" | "en" | "ru";

interface PrivacyContent {
  title: string;
  updatedLabel: string;
  updatedDate: string;
  intro: string;
  sections: PrivacyPolicySection[];
}

const CONTENT: Record<Locale, PrivacyContent> = {
  az: {
    title: "Gizlilik Siyasəti",
    updatedLabel: "Son yenilənmə",
    updatedDate: "12 avqust 2026",
    intro:
      "Trenders Team olaraq istifadəçilərimizin şəxsi məlumatlarının təhlükəsizliyinə böyük önəm veririk. Bu Gizlilik Siyasəti saytımızdan istifadə zamanı hansı məlumatların toplandığını, necə istifadə olunduğunu və necə qorunduğunu izah edir.",
    sections: [
      {
        heading: "1.Topladığımız məlumatlar",
        body: [
          "Sayt üzərindəki əlaqə və müraciət formalarını doldurarkən ad, soyad, e-mail ünvanı, telefon nömrəsi və göndərdiyiniz mesaj kimi şəxsi məlumatları təqdim edirsiniz.",
        ],
      },
      {
        heading: "2.Məlumatlardan istifadə məqsədi",
        body: [
          "Toplanan məlumatlar sizinlə operativ əlaqə saxlamaq, sorğularınıza cavab vermək, məhsul və xidmətlərimizi təqdim etmək üçün istifadə olunur. Məlumatlar həmçinin saytın fəaliyyətini yaxşılaşdırmaq və istifadəçi təcrübəsini optimallaşdırmaq məqsədilə analiz oluna bilər."
        ],
      },
      {
        heading: "3.Məlumatların paylaşılması və təhlükəsizliyi",
        body: [
          "Şəxsi məlumatlarınız sizin razılığınız olmadan üçüncü tərəflərə satılmır, icarəyə verilmir və ya ötürülmür.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updatedLabel: "Last updated",
    updatedDate: "August 12, 2026",
    intro:
      "At Trenders Team, we place great importance on the security of our users' personal data. This Privacy Policy explains what information is collected during your use of our website, how it is used, and how it is protected.",
    sections: [
      {
        heading: "1.Information ",
        body: [
          "We Collect When filling out contact and application forms on the website, you provide personal information such as your first name, last name, email address, phone number, and the message you send."
        ],
      },
      {
        heading: "2.Purpose of Information Use ",
        body: [
          "The collected information is used to contact you promptly, respond to your inquiries, and present our products and services. The information may also be analyzed to improve website performance and optimize user experience."
        ],
      },
      {
        heading: "3.Information Sharing and Security ",
        body: [
          "Your personal information will not be sold, rented, or transferred to third parties without your consent.",
        ],
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    updatedLabel: "Последнее обновление",
    updatedDate: "12 августа 2026",
    intro:
      "Trenders Team придаёт большое значение безопасности личных данных наших пользователей. Настоящая Политика конфиденциальности объясняет, какие данные собираются при использовании нашего сайта, как они используются и как защищаются.",
    sections: [
      {
        heading: "1.Собираемая информация ",
        body: [
          "При заполнении форм обратной связи и заявок на сайте вы предоставляете такие персональные данные, как имя, фамилия, адрес электронной почты, номер телефона и отправленное вами сообщение."],
      },
      {
        heading: "2.Цель использования информации ",
        body: [
          "Собранная информация используется для оперативной связи с вами, ответа на ваши запросы, а также для представления наших продуктов и услуг. Информация также может анализироваться с целью улучшения работы сайта и оптимизации пользовательского опыта."
        ],
      },
      {
        heading: "3.Передача и безопасность информации ",
        body: [
          "Ваши персональные данные не продаются, не сдаются в аренду и не передаются третьим лицам без вашего согласия.",
        ],
      },
    ],
  },
};

export async function PrivacyPolicyWrapper({ locale = "az" }: { locale?: string }) {
  const content = CONTENT[(locale as Locale) in CONTENT ? (locale as Locale) : "az"];

  return (
    <PrivacyPolicyUI
      title={content.title}
    //   updatedLabel={content.updatedLabel}
    //   updatedDate={content.updatedDate}
      intro={content.intro}
      sections={content.sections}
    />
  );
}