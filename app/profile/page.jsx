"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AccountNav from "../../components/AccountNav";
import { authApi, userApi } from "../../lib/api";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    bio: "",
    currentPlan: "Starter",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await authApi.me();
        if (res.user) {
          setForm({
            name: res.user.name || "",
            email: res.user.email || "",
            phone: res.user.phone || "",
            company: res.user.company || "",
            bio: res.user.bio || "",
            currentPlan: res.user.currentPlan || "Starter",
          });
        }
      } catch (err) {
        // Not logged in -> redirect to login
        router.push("/login?redirect=/profile");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [router]);

  const update = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  async function handleSave(e) {
    if (e) e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await userApi.updateProfile({
        name: form.name,
        phone: form.phone,
        company: form.company,
        bio: form.bio,
      });

      setMessage({
        text: res.message || "Profile updated successfully.",
        type: "success",
      });
    } catch (err) {
      setMessage({
        text: err.message || "Failed to update profile.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="account-page">
        <AccountNav dark />
        <div className="account-container narrow">
          <p style={{ color: "var(--muted)", textAlign: "center", marginTop: "40px" }}>
            Loading profile…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="account-page">
      <AccountNav dark />
      <div className="account-container narrow">
        <div className="page-heading">
          <p className="eyebrow">ACCOUNT</p>
          <h1>
            Your <em>profile.</em>
          </h1>
        </div>

        {message.text && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px 16px",
              borderRadius: "4px",
              fontSize: "13px",
              backgroundColor: message.type === "error" ? "#fff0ed" : "#eafaf1",
              color: message.type === "error" ? "#8e3022" : "#186e38",
              border: `1px solid ${message.type === "error" ? "#d98272" : "#82d9a3"}`,
            }}
          >
            {message.text}
          </div>
        )}

        <section className="profile-card">
          <div className="profile-card-head">
            <div className="avatar">
              {form.name?.[0]?.toUpperCase() || "W"}
            </div>
            <div>
              <span className="profile-card-label">ACCOUNT PROFILE</span>
              <h2>{form.name || "Your profile"}</h2>
              <p>{form.email}</p>
            </div>
            <span className="profile-plan">{form.currentPlan}</span>
          </div>

          <form className="profile-form" onSubmit={handleSave}>
            <label>
              Full name
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
              />
            </label>

            <label>
              Email (read-only)
              <input
                type="email"
                disabled
                value={form.email}
                placeholder="you@example.com"
                style={{ opacity: 0.7, cursor: "not-allowed" }}
              />
            </label>

            <label>
              Phone
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 …"
              />
            </label>

            <label>
              Company / organization
              <input
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Your company"
              />
            </label>

            <label>
              Bio
              <textarea
                rows="4"
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                placeholder="Tell us a little about yourself…"
              />
            </label>

            <div className="profile-form-note">
              <span>ACCOUNT DETAILS</span>
              <p>Update your details below. Changes are saved to your account.</p>
            </div>

            <button
              type="submit"
              className="auth-submit profile-save"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save profile"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
