"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  const tPricing = useTranslations("home.pricing");

  return (
    <div>
      {/* ========== 1. HERO SECTION ========== */}
      <section className="bg-white min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[14px] mb-8 text-sm font-semibold text-[#222222]"
            style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
          >
            <svg className="w-4 h-4 text-[#ff385c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>{t("hero.badge")}</span>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-[#222222]" style={{ letterSpacing: "-0.44px" }}>
              {t("hero.title")}<br />
              {t("hero.titleLine2").replace("。", "")}<span className="text-[#ff385c]">。</span>
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-[#6a6a6a] mb-4">
              {t("hero.subtitle")}
            </p>
            <p className="text-lg text-[#6a6a6a] mb-3">
              {t("hero.description1")}
            </p>
            <p className="text-lg text-[#6a6a6a] mb-3">
              {t("hero.description2")}
            </p>
            <p className="text-base text-[#6a6a6a] italic mb-10">
              {t("hero.tagline")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 bg-[#ff385c] text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-[#e00b41] transition"
                style={{ boxShadow: "rgba(0,0,0,0.04) 0px 2px 6px" }}
              >
                {t("hero.ctaSubscribe")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-[#c1c1c1] px-8 py-3 rounded-lg text-base font-medium text-[#222222] hover:shadow-md transition bg-white"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {t("hero.ctaLearnMore")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 2. PAIN POINTS SECTION ========== */}
      <section className="py-24 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-4xl font-bold mb-4 text-[#222222]" style={{ letterSpacing: "-0.44px" }}>
              {t("painPoints.title")}
            </h2>
            <p className="text-xl text-[#6a6a6a] font-medium">
              {t("painPoints.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pain Point 1 */}
            <div
              className="bg-white rounded-[20px] p-8"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="w-12 h-12 bg-[#fff0f3] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#ff385c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-[22px] font-semibold mb-3 text-[#222222]" style={{ letterSpacing: "-0.44px" }}>{t("painPoints.hard.title")}</h3>
              <p className="text-[#6a6a6a] leading-relaxed text-sm">
                {t("painPoints.hard.description")}
              </p>
            </div>

            {/* Pain Point 2 */}
            <div
              className="bg-white rounded-[20px] p-8"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="w-12 h-12 bg-[#fff0f3] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#ff385c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-[22px] font-semibold mb-3 text-[#222222]" style={{ letterSpacing: "-0.44px" }}>{t("painPoints.oneSize.title")}</h3>
              <p className="text-[#6a6a6a] leading-relaxed text-sm">
                {t("painPoints.oneSize.description")}
              </p>
            </div>

            {/* Pain Point 3 */}
            <div
              className="bg-white rounded-[20px] p-8"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="w-12 h-12 bg-[#fff0f3] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#ff385c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-[22px] font-semibold mb-3 text-[#222222]" style={{ letterSpacing: "-0.44px" }}>{t("painPoints.bacteria.title")}</h3>
              <p className="text-[#6a6a6a] leading-relaxed text-sm">
                {t("painPoints.bacteria.description")}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-semibold text-[#222222]" style={{ letterSpacing: "-0.18px" }}>
              {t("painPoints.quote")}
            </p>
            <p className="text-base text-[#6a6a6a] mt-2">
              {t("painPoints.quoteSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ========== 3. THE SOXY MODEL ========== */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-4xl font-bold mb-4 text-[#222222]" style={{ letterSpacing: "-0.44px" }}>{t("model.title")}</h2>
            <p className="text-xl text-[#6a6a6a] font-medium">{t("model.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div
              className="bg-white rounded-[20px] p-8 text-center border border-[#c1c1c1]"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="w-14 h-14 bg-[#222222] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-[20px] font-semibold mb-2 text-[#222222]" style={{ letterSpacing: "-0.18px" }}>{t("model.step1.title")}</h3>
              <p className="text-[#ff385c] font-medium mb-4 text-sm">{t("model.step1.subtitle")}</p>
              <p className="text-[#6a6a6a] leading-relaxed text-sm">
                {t("model.step1.description")}
              </p>
              <div className="mt-4 inline-block bg-[#f2f2f2] text-[#222222] px-4 py-2 rounded-[14px] text-xs font-semibold">
                {t("model.step1.badge")}
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="bg-white rounded-[20px] p-8 text-center border border-[#c1c1c1]"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="w-14 h-14 bg-[#222222] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-[20px] font-semibold mb-2 text-[#222222]" style={{ letterSpacing: "-0.18px" }}>{t("model.step2.title")}</h3>
              <p className="text-[#ff385c] font-medium mb-4 text-sm">{t("model.step2.subtitle")}</p>
              <p className="text-[#6a6a6a] leading-relaxed text-sm">
                {t("model.step2.description")}
              </p>
              <div className="mt-4 inline-block bg-[#f2f2f2] text-[#222222] px-4 py-2 rounded-[14px] text-xs font-semibold">
                {t("model.step2.badge")}
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="bg-white rounded-[20px] p-8 text-center border border-[#c1c1c1]"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="w-14 h-14 bg-[#222222] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-[20px] font-semibold mb-2 text-[#222222]" style={{ letterSpacing: "-0.18px" }}>{t("model.step3.title")}</h3>
              <p className="text-[#ff385c] font-medium mb-4 text-sm">{t("model.step3.subtitle")}</p>
              <p className="text-[#6a6a6a] leading-relaxed text-sm">
                {t("model.step3.description")}
              </p>
              <div className="mt-4 inline-block bg-[#f2f2f2] text-[#222222] px-4 py-2 rounded-[14px] text-xs font-semibold">
                {t("model.step3.badge")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. ENGINEERING SECTION ========== */}
      <section className="py-24 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-4xl font-bold mb-4 text-[#222222]" style={{ letterSpacing: "-0.44px" }}>{t("engineering.title")}</h2>
            <p className="text-xl text-[#6a6a6a] font-medium">{t("engineering.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Material */}
            <div
              className="bg-white rounded-[20px] p-6 hover:shadow-lg transition-shadow cursor-default"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="text-4xl mb-4">🧶</div>
              <h3 className="text-[16px] font-semibold mb-2 text-[#222222]">{t("engineering.material.title")}</h3>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">
                {t("engineering.material.description")}
              </p>
            </div>

            {/* Technology */}
            <div
              className="bg-white rounded-[20px] p-6 hover:shadow-lg transition-shadow cursor-default"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-[16px] font-semibold mb-2 text-[#222222]">{t("engineering.technology.title")}</h3>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">
                {t("engineering.technology.description")}
              </p>
            </div>

            {/* The Fit */}
            <div
              className="bg-white rounded-[20px] p-6 hover:shadow-lg transition-shadow cursor-default"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="text-4xl mb-4">📐</div>
              <h3 className="text-[16px] font-semibold mb-2 text-[#222222]">{t("engineering.fit.title")}</h3>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">
                {t("engineering.fit.description")}
              </p>
            </div>

            {/* Detail */}
            <div
              className="bg-white rounded-[20px] p-6 hover:shadow-lg transition-shadow cursor-default"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-[16px] font-semibold mb-2 text-[#222222]">{t("engineering.detail.title")}</h3>
              <p className="text-[#6a6a6a] text-sm leading-relaxed">
                {t("engineering.detail.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5. PRICING SECTION ========== */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-4xl font-bold mb-4 text-[#222222]" style={{ letterSpacing: "-0.44px" }}>{tPricing("title")}</h2>
            <p className="text-xl text-[#6a6a6a] font-medium">{tPricing("subtitle")}</p>
          </div>

          {/* Price Comparison */}
          <div
            className="bg-white rounded-[20px] p-6 mb-12 max-w-2xl mx-auto"
            style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#6a6a6a] text-sm">{tPricing("comparison.mall")}</span>
              <span className="text-[#6a6a6a] text-sm line-through">{tPricing("comparison.mallPrice")}</span>
            </div>
            <div className="flex justify-between items-center text-base font-bold">
              <span className="text-[#222222]">{tPricing("comparison.soxy")}</span>
              <span className="text-[#ff385c]">{tPricing("comparison.soxyPrice")}</span>
            </div>
            <p className="text-center text-xs text-[#6a6a6a] mt-4">
              {tPricing("comparison.daily")}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div
              className="bg-white rounded-[20px] p-8 border border-[#c1c1c1] hover:border-[#222222] transition-colors"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="text-center">
                <h3 className="text-[20px] font-semibold mb-2 text-[#222222]">{tPricing("starter.name")}</h3>
                <p className="text-[#6a6a6a] mb-6 text-sm">{tPricing("starter.subtitle")}</p>
                <div className="text-4xl font-bold mb-2 text-[#222222]">{tPricing("starter.price")}</div>
                <p className="text-[#6a6a6a] mb-8 text-sm">{tPricing("starter.pairs")}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {(tPricing.raw("starter.features") as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-[#6a6a6a] text-sm">
                    <svg className="w-4 h-4 text-[#ff385c] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/subscribe?plan=starter"
                className="block w-full text-center border border-[#222222] text-[#222222] py-3 rounded-lg font-medium hover:bg-[#f2f2f2] transition text-sm"
              >
                {tPricing("starter.cta")}
              </Link>
            </div>

            {/* Smart Year - Best Value */}
            <div
              className="bg-white rounded-[20px] p-8 border-2 border-[#ff385c] relative"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff385c] text-white px-4 py-1 rounded-[14px] text-xs font-semibold whitespace-nowrap">
                {tPricing("smart.badge")}
              </div>
              <div className="text-center">
                <h3 className="text-[20px] font-semibold mb-2 text-[#222222]">{tPricing("smart.name")}</h3>
                <p className="text-[#6a6a6a] mb-6 text-sm">{tPricing("smart.subtitle")}</p>
                <div className="text-4xl font-bold mb-2 text-[#222222]">{tPricing("smart.price")}</div>
                <p className="text-[#6a6a6a] mb-8 text-sm">{tPricing("smart.pairs")}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {(tPricing.raw("smart.features") as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-[#6a6a6a] text-sm">
                    <svg className="w-4 h-4 text-[#ff385c] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/subscribe?plan=smart"
                className="block w-full text-center bg-[#ff385c] text-white py-3 rounded-lg font-medium hover:bg-[#e00b41] transition text-sm"
              >
                {tPricing("smart.cta")}
              </Link>
            </div>

            {/* Pro Year */}
            <div
              className="bg-white rounded-[20px] p-8 border border-[#c1c1c1] hover:border-[#222222] transition-colors"
              style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
            >
              <div className="text-center">
                <h3 className="text-[20px] font-semibold mb-2 text-[#222222]">{tPricing("pro.name")}</h3>
                <p className="text-[#6a6a6a] mb-6 text-sm">{tPricing("pro.subtitle")}</p>
                <div className="text-4xl font-bold mb-2 text-[#222222]">{tPricing("pro.price")}</div>
                <p className="text-[#6a6a6a] mb-8 text-sm">{tPricing("pro.pairs")}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {(tPricing.raw("pro.features") as string[]).map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-[#6a6a6a] text-sm">
                    <svg className="w-4 h-4 text-[#ff385c] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/subscribe?plan=pro"
                className="block w-full text-center border border-[#222222] text-[#222222] py-3 rounded-lg font-medium hover:bg-[#f2f2f2] transition text-sm"
              >
                {tPricing("pro.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 6. BRAND STORY SECTION ========== */}
      <section id="about" className="py-24 bg-[#222222] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-4xl font-bold mb-4" style={{ letterSpacing: "-0.44px" }}>{t("about.title")}</h2>
            <p className="text-xl text-white/60 font-medium">{t("about.subtitle")}</p>
          </div>

          <div className="prose prose-lg prose-invert mx-auto">
            <blockquote className="text-2xl font-medium italic border-l-4 border-[#ff385c] pl-6 mb-8 text-white/90">
              {t("about.quote")}
            </blockquote>

            <p className="text-white/70 leading-relaxed mb-6 text-sm">
              {t("about.paragraph1")}<strong className="text-white font-semibold">{t("about.paragraph1Bold")}</strong>
            </p>

            <p className="text-white/70 leading-relaxed mb-6 text-sm">
              {t("about.paragraph2")}
            </p>

            <p className="text-2xl font-bold text-center mt-12" style={{ letterSpacing: "-0.18px" }}>
              {t("about.slogan")}<br />
              <span className="text-white/50 font-medium text-lg">{t("about.sloganSubtitle")}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[28px] md:text-4xl font-bold mb-6 text-[#222222]" style={{ letterSpacing: "-0.44px" }}>
            {t("cta.title")}
          </h2>
          <p className="text-xl text-[#6a6a6a] font-medium mb-10">
            {t("cta.subtitle")}
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center justify-center gap-2 bg-[#ff385c] text-white px-10 py-3 rounded-lg text-base font-medium hover:bg-[#e00b41] transition"
            style={{ boxShadow: "rgba(0,0,0,0.04) 0px 2px 6px" }}
          >
            {t("cta.button")}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
