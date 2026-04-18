"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";

// ── Address form field type ──
interface AddressFormData {
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
}

const emptyAddress: AddressFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  zip: "",
  country: "",
};

// ── Helper: extract numeric ID from Shopify GID ──
function extractId(gid: string): string {
  const parts = gid.split("/");
  return parts[parts.length - 1];
}

export default function AccountPage() {
  const t = useTranslations("account");
  const { customer, isLoggedIn, isLoading, login, register, logout, refresh } =
    useAuth();

  // Auth form state
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  // Dashboard tab state
  const [dashTab, setDashTab] = useState<"profile" | "addresses" | "orders">(
    "profile"
  );

  // Profile edit state
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");

  // Password state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Address state
  const [addressForm, setAddressForm] = useState<AddressFormData>(emptyAddress);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressMsg, setAddressMsg] = useState("");
  const [addressError, setAddressError] = useState("");

  // Order expand state
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-[#6a6a6a] text-base">{t("loading")}</p>
      </div>
    );
  }

  // ── Auth Handlers ─────────────────────────

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (regPassword !== regConfirm) {
      setError(t("passwordMismatch"));
      return;
    }
    setSubmitting(true);
    try {
      await register(regEmail, regPassword, regFirstName, regLastName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleForgotPassword() {
    if (!loginEmail) return;
    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recover: true, email: loginEmail }),
      });
    } catch {
      // ignore
    }
    setForgotSent(true);
  }

  async function handleLogout() {
    await logout();
  }

  // ── Not logged in: Login / Register ──

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#222222]" style={{ letterSpacing: "-0.44px" }}>{t("title")}</h1>

        <div className="bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}>
          {/* Tabs */}
          <div className="flex border-b border-[#c1c1c1]">
            <button
              onClick={() => {
                setAuthTab("login");
                setError("");
              }}
              className={`flex-1 py-3 text-center font-medium transition text-sm ${
                authTab === "login"
                  ? "text-[#222222] border-b-2 border-[#222222]"
                  : "text-[#6a6a6a] hover:text-[#222222]"
              }`}
            >
              {t("tabLogin")}
            </button>
            <button
              onClick={() => {
                setAuthTab("register");
                setError("");
              }}
              className={`flex-1 py-3 text-center font-medium transition text-sm ${
                authTab === "register"
                  ? "text-[#222222] border-b-2 border-[#222222]"
                  : "text-[#6a6a6a] hover:text-[#222222]"
              }`}
            >
              {t("tabRegister")}
            </button>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-[#fff0f3] text-[#c13515] text-sm rounded-lg border border-[#ff385c]/20">
                {error}
              </div>
            )}

            {/* ── Login Form ── */}
            {authTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="login-email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-[#c1c1c1] rounded-lg focus:ring-2 focus:ring-[#ff385c] focus:border-[#ff385c] outline-none transition text-[#222222] text-sm"
                    placeholder={t("emailPlaceholder")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("password")}
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-[#c1c1c1] rounded-lg focus:ring-2 focus:ring-[#ff385c] focus:border-[#ff385c] outline-none transition text-[#222222] text-sm"
                    placeholder={t("passwordPlaceholder")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#ff385c] text-white py-3 rounded-lg font-medium hover:bg-[#e00b41] transition disabled:opacity-50 text-sm"
                >
                  {submitting ? t("loading") : t("signIn")}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-[#ff385c] hover:underline"
                  >
                    {t("forgotPassword")}
                  </button>
                  {forgotSent && (
                    <p className="text-sm text-[#222222] mt-1">
                      {t("forgotPasswordSent")}
                    </p>
                  )}
                </div>

                <div className="text-center text-sm text-[#6a6a6a]">
                  {t("noAccount")}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("register");
                      setError("");
                    }}
                    className="text-[#ff385c] font-medium hover:underline"
                  >
                    {t("tabRegister")}
                  </button>
                </div>
              </form>
            )}

            {/* ── Register Form ── */}
            {authTab === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="reg-first"
                      className="block text-sm font-medium mb-2"
                    >
                      {t("firstName")}
                    </label>
                    <input
                      type="text"
                      id="reg-first"
                      required
                      value={regFirstName}
                      onChange={(e) => setRegFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-[#c1c1c1] rounded-lg focus:ring-2 focus:ring-[#ff385c] focus:border-[#ff385c] outline-none transition text-[#222222] text-sm"
                      placeholder={t("firstNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="reg-last"
                      className="block text-sm font-medium mb-2"
                    >
                      {t("lastName")}
                    </label>
                    <input
                      type="text"
                      id="reg-last"
                      required
                      value={regLastName}
                      onChange={(e) => setRegLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-[#c1c1c1] rounded-lg focus:ring-2 focus:ring-[#ff385c] focus:border-[#ff385c] outline-none transition text-[#222222] text-sm"
                      placeholder={t("lastNamePlaceholder")}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="reg-email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="reg-email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-[#c1c1c1] rounded-lg focus:ring-2 focus:ring-[#ff385c] focus:border-[#ff385c] outline-none transition text-[#222222] text-sm"
                    placeholder={t("emailPlaceholder")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-password"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("password")}
                  </label>
                  <input
                    type="password"
                    id="reg-password"
                    required
                    minLength={5}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-[#c1c1c1] rounded-lg focus:ring-2 focus:ring-[#ff385c] focus:border-[#ff385c] outline-none transition text-[#222222] text-sm"
                    placeholder={t("passwordPlaceholder")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-confirm"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("confirmPassword")}
                  </label>
                  <input
                    type="password"
                    id="reg-confirm"
                    required
                    minLength={5}
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    className="w-full px-4 py-3 border border-[#c1c1c1] rounded-lg focus:ring-2 focus:ring-[#ff385c] focus:border-[#ff385c] outline-none transition text-[#222222] text-sm"
                    placeholder={t("confirmPasswordPlaceholder")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#ff385c] text-white py-3 rounded-lg font-medium hover:bg-[#e00b41] transition disabled:opacity-50 text-sm"
                >
                  {submitting ? t("loading") : t("register")}
                </button>

                <div className="text-center text-sm text-[#6a6a6a]">
                  {t("hasAccount")}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab("login");
                      setError("");
                    }}
                    className="text-[#ff385c] font-medium hover:underline"
                  >
                    {t("signInLink")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════
  // ── Logged in: Dashboard with 3 Tabs ─────
  // ══════════════════════════════════════════

  const addresses = customer?.addresses?.edges ?? [];
  const orders = customer?.orders?.edges ?? [];
  const defaultAddrId = customer?.defaultAddress?.id;

  // ── Profile handlers ──

  function startEditProfile() {
    setProfileForm({
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
    });
    setProfileMsg("");
    setProfileError("");
    setEditingProfile(true);
  }

  async function handleSaveProfile(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setProfileMsg("");
    setProfileError("");
    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("updateError"));
      await refresh();
      setEditingProfile(false);
      setProfileMsg(t("profileUpdateSuccess"));
    } catch (err) {
      setProfileError(
        err instanceof Error ? err.message : t("updateError")
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordError(t("passwordMismatch"));
      return;
    }
    setSubmitting(true);
    setPasswordMsg("");
    setPasswordError("");
    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("updateError"));
      await refresh();
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPasswordForm(false);
      setPasswordMsg(t("passwordUpdateSuccess"));
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : t("updateError")
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ── Address handlers ──

  function startAddAddress() {
    setAddressForm(emptyAddress);
    setEditingAddressId(null);
    setAddressMsg("");
    setAddressError("");
    setShowAddressForm(true);
  }

  function startEditAddress(addr: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    province: string | null;
    zip: string | null;
    country: string | null;
  }) {
    setAddressForm({
      firstName: addr.firstName || "",
      lastName: addr.lastName || "",
      phone: addr.phone || "",
      address1: addr.address1 || "",
      address2: addr.address2 || "",
      city: addr.city || "",
      province: addr.province || "",
      zip: addr.zip || "",
      country: addr.country || "",
    });
    setEditingAddressId(addr.id);
    setAddressMsg("");
    setAddressError("");
    setShowAddressForm(true);
  }

  async function handleSaveAddress(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setAddressMsg("");
    setAddressError("");
    try {
      if (editingAddressId) {
        const numericId = extractId(editingAddressId);
        const res = await fetch(`/api/account/addresses/${numericId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addressForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || t("updateError"));
      } else {
        const res = await fetch("/api/account/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addressForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || t("updateError"));
      }
      await refresh();
      setShowAddressForm(false);
      setEditingAddressId(null);
      setAddressMsg(t("addressSaveSuccess"));
    } catch (err) {
      setAddressError(
        err instanceof Error ? err.message : t("updateError")
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteAddress(id: string) {
    if (!confirm(t("deleteConfirm"))) return;
    setSubmitting(true);
    setAddressMsg("");
    setAddressError("");
    try {
      const numericId = extractId(id);
      const res = await fetch(`/api/account/addresses/${numericId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("updateError"));
      await refresh();
      setAddressMsg(t("addressDeleteSuccess"));
    } catch (err) {
      setAddressError(
        err instanceof Error ? err.message : t("updateError")
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSetDefault(id: string) {
    setSubmitting(true);
    setAddressMsg("");
    setAddressError("");
    try {
      const numericId = extractId(id);
      const res = await fetch("/api/account/addresses/default", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addressId: numericId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("updateError"));
      await refresh();
      setAddressMsg(t("addressDefaultSuccess"));
    } catch (err) {
      setAddressError(
        err instanceof Error ? err.message : t("updateError")
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ── Status badge helpers ──

  function financialBadge(status: string) {
    const s = status.toUpperCase();
    if (s === "PAID")
      return "bg-[#f2f2f2] text-[#222222]";
    if (s === "PENDING" || s === "AUTHORIZED")
      return "bg-[#fff7e0] text-[#6a6a6a]";
    if (s === "REFUNDED" || s === "PARTIALLY_REFUNDED")
      return "bg-[#f2f2f2] text-[#6a6a6a]";
    return "bg-[#f2f2f2] text-[#6a6a6a]";
  }

  function financialLabel(status: string) {
    const s = status.toUpperCase();
    if (s === "PAID") return t("statusPaid");
    if (s === "PENDING" || s === "AUTHORIZED") return t("statusPending");
    if (s === "REFUNDED" || s === "PARTIALLY_REFUNDED")
      return t("statusRefunded");
    return status;
  }

  function fulfillmentBadge(status: string) {
    const s = status.toUpperCase();
    if (s === "FULFILLED") return "bg-[#f2f2f2] text-[#222222]";
    if (s === "UNFULFILLED" || s === "IN_PROGRESS")
      return "bg-[#fff7e0] text-[#6a6a6a]";
    if (s === "PARTIALLY_FULFILLED")
      return "bg-[#e8f0ff] text-[#428bff]";
    return "bg-[#f2f2f2] text-[#6a6a6a]";
  }

  function fulfillmentLabel(status: string) {
    const s = status.toUpperCase();
    if (s === "FULFILLED") return t("statusFulfilled");
    if (s === "UNFULFILLED" || s === "IN_PROGRESS")
      return t("statusUnfulfilled");
    if (s === "PARTIALLY_FULFILLED") return t("statusPartial");
    return status;
  }

  // ── Input field helper ──
  const inputClass =
    "w-full px-4 py-3 border border-[#c1c1c1] rounded-lg focus:ring-2 focus:ring-[#ff385c] focus:border-[#ff385c] outline-none transition text-[#222222] text-sm";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Welcome header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#222222]" style={{ letterSpacing: "-0.44px" }}>
          {t("welcome", { name: customer?.firstName || "" })}
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-[#6a6a6a] hover:text-[#ff385c] transition border border-[#c1c1c1] px-4 py-2 rounded-lg hover:border-[#ff385c]"
        >
          {t("logout")}
        </button>
      </div>

      {/* ── Dashboard Tab Navigation ── */}
      <div className="flex border-b border-[#c1c1c1] mb-8">
        {(["profile", "addresses", "orders"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setDashTab(tab)}
            className={`flex-1 py-3 text-center font-medium transition text-sm ${
              dashTab === tab
                ? "text-[#222222] border-b-2 border-[#222222]"
                : "text-[#6a6a6a] hover:text-[#222222]"
            }`}
          >
            {t(
              tab === "profile"
                ? "tabProfile"
                : tab === "addresses"
                  ? "tabAddresses"
                  : "tabOrders"
            )}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════ */}
      {/* ── Tab 1: Profile ──────────────── */}
      {/* ════════════════════════════════════ */}
      {dashTab === "profile" && (
        <div className="space-y-6">
          {profileMsg && (
            <div className="p-3 bg-[#f2f2f2] text-[#222222] text-sm rounded-lg border border-[#c1c1c1]">
              {profileMsg}
            </div>
          )}
          {profileError && (
            <div className="p-3 bg-[#fff0f3] text-[#c13515] text-sm rounded-lg border border-[#ff385c]/20">
              {profileError}
            </div>
          )}

          <div className="bg-white rounded-[20px] p-6" style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}>
            {!editingProfile ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[20px] font-semibold text-[#222222]">{t("profile")}</h2>
                  <button
                    onClick={startEditProfile}
                    className="text-sm text-[#ff385c] hover:underline font-medium"
                  >
                    {t("editProfile")}
                  </button>
                </div>
                <div className="space-y-2 text-[#6a6a6a] text-sm">
                  <p>
                    {customer?.firstName} {customer?.lastName}
                  </p>
                  <p>{customer?.email}</p>
                  {customer?.phone && <p>{customer.phone}</p>}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <h2 className="text-[20px] font-semibold mb-2 text-[#222222]">
                  {t("editProfile")}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("firstName")}
                    </label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      value={profileForm.firstName}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("lastName")}
                    </label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      value={profileForm.lastName}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    required
                    className={inputClass}
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    className={inputClass}
                    value={profileForm.phone}
                    placeholder={t("phonePlaceholder")}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#ff385c] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e00b41] transition disabled:opacity-50 text-sm"
                  >
                    {submitting ? t("loading") : t("save")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProfile(false)}
                    className="text-[#222222] hover:bg-[#f2f2f2] px-6 py-2 rounded-lg border border-[#c1c1c1] transition text-sm"
                  >
                    {t("cancel")}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Password change section */}
          <div className="bg-white rounded-[20px] p-6" style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}>
            {passwordMsg && (
              <div className="mb-4 p-3 bg-[#f2f2f2] text-[#222222] text-sm rounded-lg border border-[#c1c1c1]">
                {passwordMsg}
              </div>
            )}
            {passwordError && (
              <div className="mb-4 p-3 bg-[#fff0f3] text-[#c13515] text-sm rounded-lg border border-[#ff385c]/20">
                {passwordError}
              </div>
            )}
            <button
              onClick={() => {
                setShowPasswordForm(!showPasswordForm);
                setPasswordMsg("");
                setPasswordError("");
              }}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-[20px] font-semibold text-[#222222]">{t("changePassword")}</h2>
              <span className="text-[#6a6a6a] text-xl">
                {showPasswordForm ? "\u2212" : "+"}
              </span>
            </button>
            {showPasswordForm && (
              <form
                onSubmit={handleChangePassword}
                className="mt-4 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("newPassword")}
                  </label>
                  <input
                    type="password"
                    required
                    minLength={5}
                    className={inputClass}
                    placeholder={t("newPasswordPlaceholder")}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("confirmNewPassword")}
                  </label>
                  <input
                    type="password"
                    required
                    minLength={5}
                    className={inputClass}
                    placeholder={t("confirmNewPasswordPlaceholder")}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#ff385c] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e00b41] transition disabled:opacity-50 text-sm"
                >
                  {submitting ? t("loading") : t("save")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════ */}
      {/* ── Tab 2: Addresses ────────────── */}
      {/* ════════════════════════════════════ */}
      {dashTab === "addresses" && (
        <div className="space-y-6">
          {addressMsg && (
            <div className="p-3 bg-[#f2f2f2] text-[#222222] text-sm rounded-lg border border-[#c1c1c1]">
              {addressMsg}
            </div>
          )}
          {addressError && (
            <div className="p-3 bg-[#fff0f3] text-[#c13515] text-sm rounded-lg border border-[#ff385c]/20">
              {addressError}
            </div>
          )}

          {/* Add address button */}
          {!showAddressForm && (
            <button
              onClick={startAddAddress}
              className="bg-[#ff385c] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e00b41] transition text-sm"
            >
              + {t("addAddress")}
            </button>
          )}

          {/* Address form (inline) */}
          {showAddressForm && (
            <div className="bg-white rounded-[20px] p-6" style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}>
              <h2 className="text-[20px] font-semibold mb-4 text-[#222222]">
                {editingAddressId ? t("editAddress") : t("addAddress")}
              </h2>
              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("firstName")}
                    </label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      value={addressForm.firstName}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("lastName")}
                    </label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      value={addressForm.lastName}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder={t("phonePlaceholder")}
                    value={addressForm.phone}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("address1")}
                  </label>
                  <input
                    type="text"
                    required
                    className={inputClass}
                    placeholder={t("address1Placeholder")}
                    value={addressForm.address1}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        address1: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {t("address2")}
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder={t("address2Placeholder")}
                    value={addressForm.address2}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        address2: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("city")}
                    </label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      placeholder={t("cityPlaceholder")}
                      value={addressForm.city}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("province")}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder={t("provincePlaceholder")}
                      value={addressForm.province}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          province: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("zip")}
                    </label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      placeholder={t("zipPlaceholder")}
                      value={addressForm.zip}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          zip: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t("country")}
                    </label>
                    <input
                      type="text"
                      required
                      className={inputClass}
                      placeholder={t("countryPlaceholder")}
                      value={addressForm.country}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          country: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#ff385c] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e00b41] transition disabled:opacity-50 text-sm"
                  >
                    {submitting ? t("loading") : t("save")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                      setEditingAddressId(null);
                    }}
                    className="text-[#222222] hover:bg-[#f2f2f2] px-6 py-2 rounded-lg border border-[#c1c1c1] transition text-sm"
                  >
                    {t("cancel")}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Address cards */}
          {addresses.length === 0 && !showAddressForm ? (
            <p className="text-[#6a6a6a]">{t("noAddress")}</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {addresses.map(({ node: addr }) => {
                const isDefault = addr.id === defaultAddrId;
                return (
                  <div
                    key={addr.id}
                    className="bg-white rounded-[20px] p-6 relative" style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
                  >
                    {isDefault && (
                      <span className="absolute top-4 right-4 inline-block px-2 py-0.5 text-xs rounded-[14px] bg-[#f2f2f2] text-[#222222] font-semibold">
                        {t("default")}
                      </span>
                    )}
                    <div className="space-y-1 text-[#6a6a6a] text-sm mb-4">
                      <p className="font-semibold text-[#222222]">
                        {addr.firstName} {addr.lastName}
                      </p>
                      {addr.phone && <p>{addr.phone}</p>}
                      {addr.address1 && <p>{addr.address1}</p>}
                      {addr.address2 && <p>{addr.address2}</p>}
                      <p>
                        {[addr.city, addr.province, addr.zip]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                      {addr.country && <p>{addr.country}</p>}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => startEditAddress(addr)}
                        className="text-sm text-[#ff385c] hover:underline font-medium"
                      >
                        {t("editAddress")}
                      </button>
                      {!isDefault && (
                        <>
                          <span className="text-[#c1c1c1]">|</span>
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            disabled={submitting}
                            className="text-sm text-[#c13515] hover:underline font-medium disabled:opacity-50"
                          >
                            {t("deleteAddress")}
                          </button>
                          <span className="text-[#c1c1c1]">|</span>
                          <button
                            onClick={() => handleSetDefault(addr.id)}
                            disabled={submitting}
                            className="text-sm text-[#ff385c] hover:underline font-medium disabled:opacity-50"
                          >
                            {t("setDefault")}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════ */}
      {/* ── Tab 3: Orders ───────────────── */}
      {/* ════════════════════════════════════ */}
      {dashTab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-[#6a6a6a]">{t("noOrders")}</p>
          ) : (
            orders.map(({ node: order }) => {
              const isExpanded = expandedOrder === order.id;
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: "rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px" }}
                >
                  {/* Collapsed header */}
                  <button
                    onClick={() =>
                      setExpandedOrder(isExpanded ? null : order.id)
                    }
                    className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
                  >
                    <span className="font-semibold text-[#222222]">
                      #{order.orderNumber}
                    </span>
                    <span className="text-sm text-[#6a6a6a]">
                      {new Date(order.processedAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 text-xs rounded-[14px] font-semibold ${financialBadge(order.financialStatus)}`}
                    >
                      {financialLabel(order.financialStatus)}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 text-xs rounded-[14px] font-semibold ${fulfillmentBadge(order.fulfillmentStatus)}`}
                    >
                      {fulfillmentLabel(order.fulfillmentStatus)}
                    </span>
                    <span className="font-semibold text-[#222222] sm:ml-auto">
                      {order.totalPriceV2.currencyCode}{" "}
                      {order.totalPriceV2.amount}
                    </span>
                    <span className="text-[#6a6a6a] text-lg">
                      {isExpanded ? "\u25B2" : "\u25BC"}
                    </span>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-[#c1c1c1] pt-4 space-y-4">
                      {/* Line items */}
                      <div>
                        <h3 className="text-sm font-semibold text-[#222222] mb-2">
                          {t("orderItems")}
                        </h3>
                        <ul className="space-y-1 text-sm text-[#6a6a6a]">
                          {order.lineItems.edges.map((e, i) => (
                            <li key={i}>
                              {e.node.title}{" "}
                              <span className="text-[#6a6a6a]">
                                &times; {e.node.quantity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tracking info */}
                      <div>
                        <h3 className="text-sm font-semibold text-[#222222] mb-2">
                          {t("trackingInfo")}
                        </h3>
                        {order.successfulFulfillments &&
                        order.successfulFulfillments.length > 0 ? (
                          <div className="space-y-2 text-sm text-[#6a6a6a]">
                            {order.successfulFulfillments.map(
                              (ff, fi) => (
                                <div key={fi}>
                                  {ff.trackingCompany && (
                                    <p className="font-medium">
                                      {ff.trackingCompany}
                                    </p>
                                  )}
                                  {ff.trackingInfo.map((ti, tii) => (
                                    <p key={tii}>
                                      {t("trackingNumber")}: {ti.number || "-"}
                                      {ti.url && (
                                        <>
                                          {" "}
                                          <a
                                            href={ti.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#ff385c] hover:underline"
                                          >
                                            Track &rarr;
                                          </a>
                                        </>
                                      )}
                                    </p>
                                  ))}
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-[#6a6a6a]">
                            {t("noTrackingInfo")}
                          </p>
                        )}
                      </div>

                      {/* View order status link */}
                      {order.statusUrl && (
                        <a
                          href={order.statusUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-sm text-[#ff385c] hover:underline font-medium"
                        >
                          {t("viewOrderStatus")} &rarr;
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
