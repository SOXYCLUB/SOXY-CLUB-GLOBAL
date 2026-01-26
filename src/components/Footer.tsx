"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#2D5A4A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold tracking-tight">soxy</span>
              <span className="text-2xl">.</span>
            </div>
            <p className="text-white/70 max-w-md leading-relaxed">
              {t("tagline")}<br />
              {t("taglineEn")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">{t("quickLinks")}</h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition">
                  {t("howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition">
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="hover:text-white transition">
                  {t("subscribeLink")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition">
                  {t("aboutUs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">{t("support")}</h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  {t("shippingInfo")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  {t("contactUs")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} SOXY. {t("copyright")}
          </p>
          <div className="flex items-center gap-6 text-white/50 text-sm">
            <Link href="/privacy" className="hover:text-white transition">
              {t("privacyPolicy")}
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
