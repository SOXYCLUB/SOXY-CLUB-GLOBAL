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
    <header className="sticky top-0 z-50 bg-[#F5F0E8] border-b border-[#E5DFD5]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-semibold tracking-tight text-[#2D5A4A]">
              soxy
            </span>
            <span className="text-2xl text-[#2D5A4A]">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#how-it-works"
              className="text-gray-700 hover:text-[#2D5A4A] transition font-medium"
            >
              {t("howItWorks")}
            </Link>
            <Link
              href="/#pricing"
              className="text-gray-700 hover:text-[#2D5A4A] transition font-medium"
            >
              {t("pricing")}
            </Link>
            <Link
              href="/#about"
              className="text-gray-700 hover:text-[#2D5A4A] transition font-medium"
            >
              {t("about")}
            </Link>
            <LanguageSwitcher />
            {/* User icon / Account link */}
            <Link
              href="/account"
              className="flex items-center gap-1.5 text-gray-700 hover:text-[#2D5A4A] transition font-medium"
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
              <span className="text-sm">
                {isLoggedIn ? customer?.firstName || t("account") : t("signIn")}
              </span>
            </Link>
            <Link
              href="/subscribe"
              className="bg-[#A94438] text-white px-6 py-2.5 rounded-full hover:bg-[#8B3830] transition font-medium"
            >
              {t("subscribe")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-[#2D5A4A]"
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
          <div className="md:hidden py-4 border-t border-[#E5DFD5]">
            <div className="flex flex-col space-y-4">
              <Link
                href="/#how-it-works"
                className="text-gray-700 hover:text-[#2D5A4A] transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("howItWorks")}
              </Link>
              <Link
                href="/#pricing"
                className="text-gray-700 hover:text-[#2D5A4A] transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("pricing")}
              </Link>
              <Link
                href="/#about"
                className="text-gray-700 hover:text-[#2D5A4A] transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("about")}
              </Link>
              {/* Mobile account link */}
              <Link
                href="/account"
                className="flex items-center gap-2 text-gray-700 hover:text-[#2D5A4A] transition font-medium"
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
                className="bg-[#A94438] text-white px-6 py-2.5 rounded-full text-center hover:bg-[#8B3830] transition font-medium"
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
