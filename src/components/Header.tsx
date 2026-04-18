"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("header");
  const { isLoggedIn, customer } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#c1c1c1]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-[#ff385c]">
              soxy
            </span>
            <span className="text-xl font-bold text-[#ff385c]">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/#how-it-works"
              className="text-[#222222] hover:text-[#ff385c] transition text-sm font-medium"
            >
              {t("howItWorks")}
            </Link>
            <Link
              href="/#pricing"
              className="text-[#222222] hover:text-[#ff385c] transition text-sm font-medium"
            >
              {t("pricing")}
            </Link>
            <Link
              href="/#about"
              className="text-[#222222] hover:text-[#ff385c] transition text-sm font-medium"
            >
              {t("about")}
            </Link>
            <LanguageSwitcher />
            {/* User icon / Account link */}
            <Link
              href="/account"
              className="flex items-center gap-1.5 text-[#222222] hover:text-[#ff385c] transition text-sm font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>
                {isLoggedIn ? customer?.firstName || t("account") : t("signIn")}
              </span>
            </Link>
            <Link
              href="/subscribe"
              className="bg-[#ff385c] text-white px-5 py-2 rounded-lg hover:bg-[#e00b41] transition font-medium text-sm"
            >
              {t("subscribe")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-full bg-[#f2f2f2] hover:shadow-md transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 text-[#222222]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#c1c1c1]">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#how-it-works"
                className="text-[#222222] hover:text-[#ff385c] transition font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("howItWorks")}
              </Link>
              <Link
                href="/#pricing"
                className="text-[#222222] hover:text-[#ff385c] transition font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("pricing")}
              </Link>
              <Link
                href="/#about"
                className="text-[#222222] hover:text-[#ff385c] transition font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("about")}
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-2 text-[#222222] hover:text-[#ff385c] transition font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {isLoggedIn ? customer?.firstName || t("account") : t("signIn")}
              </Link>
              <Link
                href="/subscribe"
                className="bg-[#ff385c] text-white px-5 py-2.5 rounded-lg text-center hover:bg-[#e00b41] transition font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("subscribe")}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
