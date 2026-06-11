import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocaleStore {
  locale: string;
  setLocale: (locale: string) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: "az",
      setLocale: (locale) => {
        set({ locale });
        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
      },
    }),
    {
      name: "locale",
    }
  )
);