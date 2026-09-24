"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountNav from "../../components/AccountNav";
import { authApi } from "../../lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await authApi.signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      // Redirect to login page after successful signup
      router.push("/login?signup=success");
    } catch (err) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <AccountNav dark />
      <div className="auth-shell">
        <section className="auth-art">
          <p className="eyebrow">JOIN THE ECOSYSTEM</p>
          <h1>
            Learn.
            <br />
            <em>Build. Scale.</em>
          </h1>
          <p>
            Create one account for your WEBWHALE experience and keep your progress
            in one place.
          </p>
        </section>
        <section className="auth-card">
          <span className="auth-label">CREATE ACCOUNT</span>
          <h2>Sign up</h2>
          <p className="auth-muted">Start with your basic details.</p>
          {error && <div className="form-error">{error}</div>}
          <form onSubmit={submit}>
            <label>
              Full name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Danish Khan"
              />
            </label>
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
                placeholder="At least 6 characters"
              />
            </label>
            <label>
              Confirm password
              <input
                type="password"
                required
                minLength={6}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                placeholder="Repeat password"
              />
            </label>
            <button className="auth-submit" disabled={loading}>
              {loading ? "Creating…" : "Create account"}
            </button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
