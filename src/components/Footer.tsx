"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-white border-t border-[#c1c1c1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold tracking-tight text-[#ff385c]">soxy</span>
              <span className="text-xl font-bold text-[#ff385c]">.</span>
            </div>
            <p className="text-[#6a6a6a] max-w-md leading-relaxed text-sm">
              {t("tagline")}<br />
              {t("taglineEn")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222222] text-sm">{t("quickLinks")}</h4>
            <ul className="space-y-3 text-[#6a6a6a] text-sm">
              <li>
                <Link href="/#how-it-works" className="hover:text-[#222222] transition">
                  {t("howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#222222] transition">
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="hover:text-[#222222] transition">
                  {t("subscribeLink")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#222222] transition">
                  {t("aboutUs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-[#222222] text-sm">{t("support")}</h4>
            <ul className="space-y-3 text-[#6a6a6a] text-sm">
              <li>
                <Link href="/faq" className="hover:text-[#222222] transition">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#222222] transition">
                  {t("shippingInfo")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#222222] transition">
                  {t("contactUs")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#c1c1c1] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6a6a6a] text-sm">
            &copy; {new Date().getFullYear()} SOXY. {t("copyright")}
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-[#428bff] hover:underline transition">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms" className="text-[#428bff] hover:underline transition">
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
