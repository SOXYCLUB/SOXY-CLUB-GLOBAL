"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Plan = "starter" | "smart" | "pro";
type Step = 1 | 2 | 3;

interface FormData {
  plan: Plan;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const planPrices = {
  starter: { price: 19.9, pairs: 3 },
  smart: { price: 99.9, pairs: 18 },
  pro: { price: 128.8, pairs: 24 },
};

export default function SubscribePage() {
  const t = useTranslations("subscribe");
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    plan: "smart",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Malaysia",
  });

  const selectedPlan = planPrices[formData.plan];
  const planTranslations = t.raw(`plans.${formData.plan}`) as {
    name: string;
    nameCn: string;
    description: string;
    features: string[];
    badge?: string;
  };

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlanSelect = (plan: Plan) => {
    updateForm("plan", plan);
  };

  const handleNextStep = () => {
    if (step < 3) setStep((step + 1) as Step);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(t("error") + "\n\nError: " + (error instanceof Error ? error.message : "Unknown error"));
      setIsLoading(false);
    }
  };

  const isStep2Valid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.address &&
    formData.city &&
    formData.postalCode;

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h1>
          <p className="text-gray-600">{t("subtitle")}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                  step >= s
                    ? "bg-[#2D5A4A] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 md:w-24 h-1 mx-2 transition ${
                    step > s ? "bg-[#2D5A4A]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-center gap-8 md:gap-16 mb-10 text-sm">
          <span className={step === 1 ? "text-[#2D5A4A] font-medium" : "text-gray-400"}>
            {t("steps.plan")}
          </span>
          <span className={step === 2 ? "text-[#2D5A4A] font-medium" : "text-gray-400"}>
            {t("steps.info")}
          </span>
          <span className={step === 3 ? "text-[#2D5A4A] font-medium" : "text-gray-400"}>
            {t("steps.confirm")}
          </span>
        </div>

        {/* Step 1: Plan Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {(["starter", "smart", "pro"] as Plan[]).map((planKey) => {
                const plan = t.raw(`plans.${planKey}`) as {
                  name: string;
                  nameCn: string;
                  description: string;
                  features: string[];
                  badge?: string;
                };
                const planPrice = planPrices[planKey];
                const isSelected = formData.plan === planKey;
                return (
                  <button
                    key={planKey}
                    onClick={() => handlePlanSelect(planKey)}
                    className={`relative bg-white rounded-2xl p-6 text-left transition border-2 ${
                      isSelected
                        ? "border-[#2D5A4A] shadow-lg"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A94438] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {plan.badge}
                      </div>
                    )}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      <p className="text-sm text-gray-500">{plan.nameCn}</p>
                    </div>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">RM {planPrice.price}</span>
                      <span className="text-gray-500 text-sm ml-1">
                        / {planPrice.pairs} {t("confirmation.pairs")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 text-[#2D5A4A] flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <svg
                          className="w-6 h-6 text-[#2D5A4A]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center pt-6">
              <button
                onClick={handleNextStep}
                className="bg-[#A94438] text-white px-10 py-4 rounded-full font-medium hover:bg-[#8B3830] transition"
              >
                {t("navigation.nextInfo")}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: User Information */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">{t("form.shippingDetails")}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.firstName")} <span className="text-red-500">{t("form.required")}</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateForm("firstName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A4A] focus:border-transparent outline-none transition"
                  placeholder={t("form.placeholder.firstName")}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.lastName")} <span className="text-red-500">{t("form.required")}</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateForm("lastName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A4A] focus:border-transparent outline-none transition"
                  placeholder={t("form.placeholder.lastName")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.email")} <span className="text-red-500">{t("form.required")}</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A4A] focus:border-transparent outline-none transition"
                  placeholder={t("form.placeholder.email")}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.phone")} <span className="text-red-500">{t("form.required")}</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A4A] focus:border-transparent outline-none transition"
                  placeholder={t("form.placeholder.phone")}
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  {t("form.address")} <span className="text-red-500">{t("form.required")}</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A4A] focus:border-transparent outline-none transition"
                  placeholder={t("form.placeholder.address")}
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.city")} <span className="text-red-500">{t("form.required")}</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateForm("city", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A4A] focus:border-transparent outline-none transition"
                  placeholder={t("form.placeholder.city")}
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.state")}
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => updateForm("state", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A4A] focus:border-transparent outline-none transition"
                  placeholder={t("form.placeholder.state")}
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.postalCode")} <span className="text-red-500">{t("form.required")}</span>
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => updateForm("postalCode", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A4A] focus:border-transparent outline-none transition"
                  placeholder={t("form.placeholder.postalCode")}
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("form.country")} <span className="text-red-500">{t("form.required")}</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => updateForm("country", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D5A4A] focus:border-transparent outline-none transition bg-white"
                >
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="China">China</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-8">
              <button
                onClick={handlePrevStep}
                className="px-8 py-3 rounded-full font-medium border border-gray-300 hover:border-gray-400 transition"
              >
                {t("navigation.prev")}
              </button>
              <button
                onClick={handleNextStep}
                disabled={!isStep2Valid}
                className={`px-10 py-3 rounded-full font-medium transition ${
                  isStep2Valid
                    ? "bg-[#A94438] text-white hover:bg-[#8B3830]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {t("navigation.nextConfirm")}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation & Payment */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">{t("confirmation.title")}</h2>

              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{planTranslations.name}</h3>
                    <p className="text-gray-500">{planTranslations.nameCn} · {selectedPlan.pairs} {t("confirmation.pairs")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">RM {selectedPlan.price}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("confirmation.recipient")}</span>
                  <span>{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("confirmation.email")}</span>
                  <span>{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("confirmation.phone")}</span>
                  <span>{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("confirmation.shippingAddress")}</span>
                  <span className="text-right max-w-[60%]">
                    {formData.address}, {formData.city}
                    {formData.state && `, ${formData.state}`}, {formData.postalCode}, {formData.country}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{t("confirmation.shipping")}</span>
                  <span className="text-[#2D5A4A] font-medium">{t("confirmation.free")}</span>
                </div>
                <div className="flex justify-between items-center mt-3 text-xl font-bold">
                  <span>{t("confirmation.total")}</span>
                  <span>RM {selectedPlan.price}</span>
                </div>
              </div>
            </div>

            {/* Payment Notice */}
            <div className="bg-[#2D5A4A]/5 border border-[#2D5A4A]/20 rounded-xl p-6">
              <div className="flex gap-4">
                <svg className="w-6 h-6 text-[#2D5A4A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="font-medium text-[#2D5A4A]">{t("confirmation.securePayment")}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {t("confirmation.paymentInfo")}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <button
                onClick={handlePrevStep}
                className="px-8 py-3 rounded-full font-medium border border-gray-300 hover:border-gray-400 transition"
              >
                {t("navigation.prev")}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-10 py-4 rounded-full font-medium transition flex items-center gap-2 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#A94438] hover:bg-[#8B3830]"
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t("loading")}
                  </>
                ) : (
                  <>
                    {t("confirmation.confirmAndPay")} RM {selectedPlan.price}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
