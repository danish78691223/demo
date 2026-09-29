"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountNav from "../../components/AccountNav";
import { authApi } from "../../lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Do not auto-redirect an existing admin session from the login page.
    // Visiting this page is an explicit request to authenticate again.
    // Clear any previous admin session so an old/stale cookie cannot bypass
    // the credential form.
    authApi.logout().catch(() => {});
  }, []);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authApi.login(form);

      if (result?.user?.role !== "admin") {
        await authApi.logout().catch(() => {});
        throw new Error("Admin access only. Please use an administrator account.");
      }

      router.replace("/admin");
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <AccountNav dark />
      <div className="auth-shell">
        <section className="auth-art">
          <p className="eyebrow">WEBXWHALE ADMIN</p>
          <h1>Control.<br /><em>Operate.</em></h1>
          <p>Sign in to access the WEBXWHALE Control Center.</p>
        </section>
        <section className="auth-card">
          <span className="auth-label">ADMIN LOGIN</span>
          <h2>Sign in</h2>
          <p className="auth-muted">Administrator credentials only.</p>
          {error && <div className="form-error">{error}</div>}
          <form onSubmit={submit}>
            <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@example.com" /></label>
            <label>Password<input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" /></label>
            <button className="auth-submit" disabled={loading}>{loading ? "Signing in…" : "Admin sign in"}</button>
          </form>
        </section>
      </div>
    </main>
  );
}
