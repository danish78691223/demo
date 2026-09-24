"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountNav from "../../components/AccountNav";
import { authApi } from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("signup") === "success") {
        setSuccessMsg("Account created successfully! Please sign in with your email and password.");
      }
    }
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.login(form);
      const redirectTarget =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("redirect") || "/dashboard"
          : "/dashboard";
      router.push(redirectTarget);
    } catch (err) {
      setError(err.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <AccountNav dark />
      <div className="auth-shell">
        <section className="auth-art">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>
            Keep building.
            <br />
            <em>Keep moving.</em>
          </h1>
          <p>
            Sign in to access your WEBWHALE workspace, products and subscription.
          </p>
        </section>
        <section className="auth-card">
          <span className="auth-label">ACCOUNT LOGIN</span>
          <h2>Sign in</h2>
          <p className="auth-muted">Use your registered email and password.</p>
          {successMsg && <div className="form-success">{successMsg}</div>}
          {error && <div className="form-error">{error}</div>}
          <form onSubmit={submit}>
            <label>
              Email
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
              />
            </label>
            <button className="auth-submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="auth-switch">
            New to WEBWHALE? <Link href="/signup">Create an account</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
