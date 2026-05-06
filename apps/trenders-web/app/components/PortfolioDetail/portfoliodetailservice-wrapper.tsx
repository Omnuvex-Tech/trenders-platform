'use client'

import { PortfolioDetailServiceUI } from '@repo/ui'

export function PortfolioDetailServiceWrapper() {
  return (
    <PortfolioDetailServiceUI
      badge="Brendinq"
       bigNumber="02"
      title="Satyın məqsədinin müəəyən edilməsi olunur"
      descriptions={[
        "Brendin pozisiyası, markanın rəqiblərinə nisbətən bazarda özünəməxsus mövqeyinin müəyyən edilməsi prosesidir. Bu, bir markanın əsas üstünlüklərini və xüsusiyyətlərini müəyyənləşdirməyi və müştərilərə informasiyanı birbaşa şəkildə çatdırmağı əhatə edir. Trendlər müştərilərə onları rəqiblərindən fərqləndirən və müştəriləri ilə güclü emosional əlaqələr quran effektiv brend pozisiyası üçün strategiyaları hazırlamağa kömək edir. Bizim brendin bazar pozisiyası xidmətlərimizə brendin fərqləndirilməsi, hədəf auditoriya təhlili və brend mesajlaşması daxildir.",
        "Brendin diferensiallaşdırılması, brendi rəqiblərindən nəyin fərqləndirdiyini müəyyən etmək prosesidir. Hədəf auditoriyasının təhlili bir markanın hədəf auditoriyasının ehtiyaclarını, üstünlüklərini başa düşməyi və onlarla birbaşa danışan mesajlaşmanı inkişaf etdirməyi əhatə edir. Nəhayət, brend mesajlaşması brendin xidmətlərini müştərilərə birbaşa şəkildə çatdıran aydın və qısa mesajın hazırlanmasını nəzərdə tutur.",
      ]}
      items={[
        {
          number: "01",
          title: "Saytın məqsədinin müəyyən edilməsi olur",
          images: ['/images/pdetail7.png', '/images/pdetail5.png', '/images/pdetail4.png'],
        },
        {
          number: "02",
          title: "Saytın məqsədinin müəyyən edilməsi olur",
          images: ['/images/pdetail8.png', '/images/pdetail6.png'],
        },
      ]}
    />
  )
}