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
      "Trenders Team olaraq istifadəçilərimizin şəxsi məlumatlarının təhlükəsizliyinə önəm veririk. Bu Gizlilik Siyasəti saytımızdan istifadə zamanı hansı məlumatların toplandığını, necə istifadə olunduğunu və qorunduğunu izah edir.",
    sections: [
      {
        heading: "1. Topladığımız məlumatlar",
        body: [
          "Sayt üzərindəki əlaqə formalarını doldurarkən ad, soyad, email ünvanı, telefon nömrəsi və mesaj kimi məlumatları təqdim edirsiniz.",
          "Saytdan istifadə zamanı avtomatik olaraq cihaz, brauzer və IP ünvanı kimi texniki məlumatlar toplana bilər.",
        ],
      },
      {
        heading: "2. Məlumatlardan istifadə məqsədi",
        body: [
          "Toplanan məlumatlar sizinlə əlaqə saxlamaq, sorğularınıza cavab vermək və xidmətlərimizi təqdim etmək üçün istifadə olunur.",
          "Məlumatlar həmçinin saytın fəaliyyətini yaxşılaşdırmaq və istifadəçi təcrübəsini optimallaşdırmaq məqsədilə analiz oluna bilər.",
        ],
      },
      {
        heading: "3. Cookie-lər",
        body: [
          "Saytımız istifadəçi təcrübəsini yaxşılaşdırmaq üçün cookie-lərdən istifadə edir. Brauzer parametrlərindən cookie-ləri idarə edə və ya deaktiv edə bilərsiniz.",
        ],
      },
      {
        heading: "4. Məlumatların paylaşılması",
        body: [
          "Şəxsi məlumatlarınız sizin razılığınız olmadan üçüncü tərəflərə satılmır və ya icarəyə verilmir.",
          "Qanuni tələblər əsasında müvafiq dövlət qurumları ilə məlumat paylaşıla bilər.",
        ],
      },
      {
        heading: "5. Məlumatların qorunması",
        body: [
          "Şəxsi məlumatlarınızın təhlükəsizliyini təmin etmək üçün müvafiq texniki və təşkilati tədbirlər görülür.",
        ],
      },
      {
        heading: "6. İstifadəçi hüquqları",
        body: [
          "Şəxsi məlumatlarınıza giriş əldə etmək, onları düzəltmək və ya silinməsini tələb etmək hüququna maliksiniz.",
          "Bu hüquqlardan istifadə etmək üçün aşağıdakı əlaqə vasitələrindən bizimlə əlaqə saxlaya bilərsiniz.",
        ],
      },
      {
        heading: "7. Dəyişikliklər",
        body: [
          "Bu Gizlilik Siyasəti zaman-zaman yenilənə bilər. Dəyişikliklər bu səhifədə yerləşdirilməklə qüvvəyə minir.",
        ],
      },
      {
        heading: "8. Əlaqə",
        body: [
          "Gizlilik Siyasəti ilə bağlı suallarınız üçün: Sabah Residence, 20 Ziya Yusifzadə, Bakı 1003 ünvanına, +994 50 226 30 35 nömrəsinə və ya sayt üzərindəki əlaqə formasına müraciət edə bilərsiniz.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updatedLabel: "Last updated",
    updatedDate: "August 12, 2026",
    intro:
      "At Trenders Team, we value the security of our users' personal data. This Privacy Policy explains what information is collected, how it is used, and how it is protected when you use our website.",
    sections: [
      {
        heading: "1. Information we collect",
        body: [
          "When filling out contact forms on our website, you provide information such as your name, email address, phone number, and message.",
          "Technical information such as device, browser, and IP address may be collected automatically while using the site.",
        ],
      },
      {
        heading: "2. Purpose of use",
        body: [
          "Collected information is used to contact you, respond to your inquiries, and provide our services.",
          "Data may also be analyzed to improve the site's performance and optimize user experience.",
        ],
      },
      {
        heading: "3. Cookies",
        body: [
          "Our website uses cookies to improve user experience. You can manage or disable cookies through your browser settings.",
        ],
      },
      {
        heading: "4. Data sharing",
        body: [
          "Your personal data is not sold or rented to third parties without your consent.",
          "Data may be shared with relevant government authorities based on legal requirements.",
        ],
      },
      {
        heading: "5. Data protection",
        body: [
          "Appropriate technical and organizational measures are taken to ensure the security of your personal data.",
        ],
      },
      {
        heading: "6. Your rights",
        body: [
          "You have the right to access, correct, or request the deletion of your personal data.",
          "You can contact us using the details below to exercise these rights.",
        ],
      },
      {
        heading: "7. Changes",
        body: [
          "This Privacy Policy may be updated from time to time. Changes take effect once posted on this page.",
        ],
      },
      {
        heading: "8. Contact",
        body: [
          "For questions regarding this Privacy Policy, you can reach us at Sabah Residence, 20 Ziya Yusifzade, Baku 1003, at +994 50 226 30 35, or via the contact form on our website.",
        ],
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    updatedLabel: "Последнее обновление",
    updatedDate: "12 августа 2026",
    intro:
      "Компания Trenders Team придаёт большое значение безопасности персональных данных пользователей. Данная Политика конфиденциальности разъясняет, какая информация собирается, как она используется и защищается при использовании нашего сайта.",
    sections: [
      {
        heading: "1. Собираемая информация",
        body: [
          "При заполнении контактных форм на сайте вы предоставляете такие данные, как имя, адрес электронной почты, номер телефона и сообщение.",
          "При использовании сайта автоматически могут собираться технические данные, такие как устройство, браузер и IP-адрес.",
        ],
      },
      {
        heading: "2. Цель использования данных",
        body: [
          "Собранная информация используется для связи с вами, ответа на ваши запросы и предоставления наших услуг.",
          "Данные также могут анализироваться для улучшения работы сайта и оптимизации пользовательского опыта.",
        ],
      },
      {
        heading: "3. Cookie-файлы",
        body: [
          "Наш сайт использует cookie-файлы для улучшения пользовательского опыта. Вы можете управлять или отключить cookie-файлы в настройках браузера.",
        ],
      },
      {
        heading: "4. Передача данных",
        body: [
          "Ваши персональные данные не продаются и не передаются в аренду третьим лицам без вашего согласия.",
          "Данные могут передаваться соответствующим государственным органам на основании законных требований.",
        ],
      },
      {
        heading: "5. Защита данных",
        body: [
          "Для обеспечения безопасности ваших персональных данных принимаются соответствующие технические и организационные меры.",
        ],
      },
      {
        heading: "6. Права пользователя",
        body: [
          "Вы имеете право на доступ к своим персональным данным, их исправление или удаление.",
          "Для реализации этих прав вы можете связаться с нами по контактным данным ниже.",
        ],
      },
      {
        heading: "7. Изменения",
        body: [
          "Данная Политика конфиденциальности может периодически обновляться. Изменения вступают в силу с момента публикации на этой странице.",
        ],
      },
      {
        heading: "8. Контакты",
        body: [
          "По вопросам, связанным с настоящей Политикой конфиденциальности, вы можете обратиться по адресу: Sabah Residence, 20 Ziya Yusifzadə, Баку 1003, по телефону +994 50 226 30 35 или через контактную форму на сайте.",
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