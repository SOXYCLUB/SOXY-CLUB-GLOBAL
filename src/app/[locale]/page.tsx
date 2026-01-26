"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  const tPricing = useTranslations("home.pricing");

  return (
    <div>
      {/* ========== 1. HERO SECTION ========== */}
      <section className="bg-[#F5F0E8] min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full mb-8">
            <svg className="w-4 h-4 text-[#2D5A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span className="text-sm font-medium text-[#2D5A4A]">{t("hero.badge")}</span>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              {t("hero.title")}<br />
              {t("hero.titleLine2").replace("。", "")}<span className="text-[#2D5A4A]">。</span>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-gray-700 mb-4">
              {t("hero.subtitle")}
            </p>
            <p className="text-lg text-gray-600 mb-3">
              {t("hero.description1")}
            </p>
            <p className="text-lg text-gray-600 mb-3">
              {t("hero.description2")}
            </p>
            <p className="text-base text-gray-500 italic mb-10">
              {t("hero.tagline")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 bg-[#A94438] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#8B3830] transition"
              >
                {t("hero.ctaSubscribe")}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-gray-400 px-8 py-4 rounded-full text-lg font-medium hover:border-gray-600 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {t("hero.ctaLearnMore")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 2. PAIN POINTS SECTION ========== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("painPoints.title")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("painPoints.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pain Point 1 */}
            <div className="bg-[#F5F0E8] rounded-2xl p-8">
              <div className="w-14 h-14 bg-[#A94438]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#A94438]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t("painPoints.hard.title")}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t("painPoints.hard.description")}
              </p>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-[#F5F0E8] rounded-2xl p-8">
              <div className="w-14 h-14 bg-[#A94438]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#A94438]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t("painPoints.oneSize.title")}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t("painPoints.oneSize.description")}
              </p>
            </div>

            {/* Pain Point 3 */}
            <div className="bg-[#F5F0E8] rounded-2xl p-8">
              <div className="w-14 h-14 bg-[#A94438]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#A94438]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t("painPoints.bacteria.title")}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t("painPoints.bacteria.description")}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-medium text-[#2D5A4A]">
              {t("painPoints.quote")}
            </p>
            <p className="text-lg text-gray-600 mt-2">
              {t("painPoints.quoteSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ========== 3. THE SOXY MODEL ========== */}
      <section id="how-it-works" className="py-24 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("model.title")}</h2>
            <p className="text-xl text-gray-600">{t("model.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-[#2D5A4A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">{t("model.step1.title")}</h3>
              <p className="text-[#2D5A4A] font-medium mb-4">{t("model.step1.subtitle")}</p>
              <p className="text-gray-600 leading-relaxed">
                {t("model.step1.description")}
              </p>
              <div className="mt-4 inline-block bg-[#2D5A4A]/10 text-[#2D5A4A] px-4 py-2 rounded-full text-sm font-medium">
                {t("model.step1.badge")}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-[#2D5A4A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">{t("model.step2.title")}</h3>
              <p className="text-[#2D5A4A] font-medium mb-4">{t("model.step2.subtitle")}</p>
              <p className="text-gray-600 leading-relaxed">
                {t("model.step2.description")}
              </p>
              <div className="mt-4 inline-block bg-[#2D5A4A]/10 text-[#2D5A4A] px-4 py-2 rounded-full text-sm font-medium">
                {t("model.step2.badge")}
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-[#2D5A4A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">{t("model.step3.title")}</h3>
              <p className="text-[#2D5A4A] font-medium mb-4">{t("model.step3.subtitle")}</p>
              <p className="text-gray-600 leading-relaxed">
                {t("model.step3.description")}
              </p>
              <div className="mt-4 inline-block bg-[#2D5A4A]/10 text-[#2D5A4A] px-4 py-2 rounded-full text-sm font-medium">
                {t("model.step3.badge")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. ENGINEERING SECTION ========== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("engineering.title")}</h2>
            <p className="text-xl text-gray-600">{t("engineering.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Material */}
            <div className="border border-gray-200 rounded-2xl p-6 hover:border-[#2D5A4A] transition">
              <div className="text-4xl mb-4">🧶</div>
              <h3 className="text-lg font-bold mb-2">{t("engineering.material.title")}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("engineering.material.description")}
              </p>
            </div>

            {/* Technology */}
            <div className="border border-gray-200 rounded-2xl p-6 hover:border-[#2D5A4A] transition">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-lg font-bold mb-2">{t("engineering.technology.title")}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("engineering.technology.description")}
              </p>
            </div>

            {/* The Fit */}
            <div className="border border-gray-200 rounded-2xl p-6 hover:border-[#2D5A4A] transition">
              <div className="text-4xl mb-4">📐</div>
              <h3 className="text-lg font-bold mb-2">{t("engineering.fit.title")}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("engineering.fit.description")}
              </p>
            </div>

            {/* Detail */}
            <div className="border border-gray-200 rounded-2xl p-6 hover:border-[#2D5A4A] transition">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-lg font-bold mb-2">{t("engineering.detail.title")}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("engineering.detail.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5. PRICING SECTION ========== */}
      <section id="pricing" className="py-24 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{tPricing("title")}</h2>
            <p className="text-xl text-gray-600">{tPricing("subtitle")}</p>
          </div>

          {/* Price Comparison */}
          <div className="bg-white rounded-2xl p-6 mb-12 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">{tPricing("comparison.mall")}</span>
              <span className="text-gray-500 line-through">{tPricing("comparison.mallPrice")}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-[#2D5A4A]">{tPricing("comparison.soxy")}</span>
              <span className="text-[#2D5A4A]">{tPricing("comparison.soxyPrice")}</span>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              {tPricing("comparison.daily")}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 border-2 border-transparent hover:border-[#2D5A4A] transition">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{tPricing("starter.name")}</h3>
                <p className="text-gray-500 mb-6">{tPricing("starter.subtitle")}</p>
                <div className="text-4xl font-bold mb-2">{tPricing("starter.price")}</div>
                <p className="text-gray-500 mb-8">{tPricing("starter.pairs")}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {(tPricing.raw("starter.features") as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-[#2D5A4A]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/subscribe?plan=starter"
                className="block w-full text-center border-2 border-[#2D5A4A] text-[#2D5A4A] py-3 rounded-full font-medium hover:bg-[#2D5A4A] hover:text-white transition"
              >
                {tPricing("starter.cta")}
              </Link>
            </div>

            {/* Smart Year - Best Value */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[#2D5A4A] relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#A94438] text-white px-4 py-1 rounded-full text-sm font-medium">
                {tPricing("smart.badge")}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{tPricing("smart.name")}</h3>
                <p className="text-gray-500 mb-6">{tPricing("smart.subtitle")}</p>
                <div className="text-4xl font-bold mb-2">{tPricing("smart.price")}</div>
                <p className="text-gray-500 mb-8">{tPricing("smart.pairs")}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {(tPricing.raw("smart.features") as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-[#2D5A4A]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/subscribe?plan=smart"
                className="block w-full text-center bg-[#A94438] text-white py-3 rounded-full font-medium hover:bg-[#8B3830] transition"
              >
                {tPricing("smart.cta")}
              </Link>
            </div>

            {/* Pro Year */}
            <div className="bg-white rounded-2xl p-8 border-2 border-transparent hover:border-[#2D5A4A] transition">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{tPricing("pro.name")}</h3>
                <p className="text-gray-500 mb-6">{tPricing("pro.subtitle")}</p>
                <div className="text-4xl font-bold mb-2">{tPricing("pro.price")}</div>
                <p className="text-gray-500 mb-8">{tPricing("pro.pairs")}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {(tPricing.raw("pro.features") as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-[#2D5A4A]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/subscribe?plan=pro"
                className="block w-full text-center border-2 border-[#2D5A4A] text-[#2D5A4A] py-3 rounded-full font-medium hover:bg-[#2D5A4A] hover:text-white transition"
              >
                {tPricing("pro.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 6. BRAND STORY SECTION ========== */}
      <section id="about" className="py-24 bg-[#2D5A4A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.title")}</h2>
            <p className="text-xl text-white/70">{t("about.subtitle")}</p>
          </div>

          <div className="prose prose-lg prose-invert mx-auto">
            <blockquote className="text-2xl font-light italic border-l-4 border-white/30 pl-6 mb-8">
              {t("about.quote")}
            </blockquote>

            <p className="text-white/80 leading-relaxed mb-6">
              {t("about.paragraph1")}<strong className="text-white">{t("about.paragraph1Bold")}</strong>
            </p>

            <p className="text-white/80 leading-relaxed mb-6">
              {t("about.paragraph2")}
            </p>

            <p className="text-2xl font-bold text-center mt-12">
              {t("about.slogan")}<br />
              <span className="text-white/70 font-normal">{t("about.sloganSubtitle")}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            {t("cta.subtitle")}
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center justify-center gap-2 bg-[#A94438] text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-[#8B3830] transition"
          >
            {t("cta.button")}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
