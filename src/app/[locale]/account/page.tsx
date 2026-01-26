"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function AccountPage() {
  const t = useTranslations("account");

  // TODO: Add authentication check and user data fetching
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-center mb-8">{t("title")}</h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600 text-center mb-6">
            {t("signInPrompt")}
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                {t("password")}
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                placeholder={t("passwordPlaceholder")}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition"
            >
              {t("signIn")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {t("noAccount")}{" "}
            <Link href="/subscribe" className="text-black font-medium hover:underline">
              {t("subscribeNow")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged in view (placeholder)
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Subscription Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t("subscription")}</h2>
          <div className="space-y-2">
            <p className="text-green-600 font-medium">{t("active")}</p>
            <p className="text-gray-600">{t("nextDelivery")}: March 2024</p>
            <p className="text-gray-600">{t("sizeStyle", { size: "M", style: "Mixed" })}</p>
          </div>
          <button className="mt-4 text-sm text-gray-500 hover:text-black transition">
            {t("manageSubscription")}
          </button>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t("deliveryAddress")}</h2>
          <p className="text-gray-600">
            123 Main Street<br />
            Apt 4B<br />
            New York, NY 10001
          </p>
          <button className="mt-4 text-sm text-gray-500 hover:text-black transition">
            {t("updateAddress")}
          </button>
        </div>
      </div>
    </div>
  );
}
