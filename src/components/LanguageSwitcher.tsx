"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";

const languageNames: Record<Locale, { native: string; flag: string }> = {
  en: { native: "EN", flag: "🇺🇸" },
  zh: { native: "中文", flag: "🇨🇳" },
  ms: { native: "BM", flag: "🇲🇾" },
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-white/50 transition text-sm"
        aria-label="Select language"
      >
        <span>{languageNames[locale].flag}</span>
        <span className="font-medium text-gray-700">{languageNames[locale].native}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-gray-50 transition text-sm ${
                locale === loc ? "bg-[#2D5A4A]/5 text-[#2D5A4A]" : "text-gray-700"
              }`}
            >
              <span>{languageNames[loc].flag}</span>
              <span className="font-medium">{languageNames[loc].native}</span>
              {locale === loc && (
                <svg className="w-4 h-4 ml-auto text-[#2D5A4A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
