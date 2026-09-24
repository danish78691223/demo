"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountNav from "../../components/AccountNav";
import { authApi } from "../../lib/api";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await authApi.me();
        if (data.user) {
          setUser(data.user);
        } else {
          router.push("/login?redirect=/dashboard");
        }
      } catch {
        router.push("/login?redirect=/dashboard");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  async function handleLogout() {
    try {
      await authApi.logout();
    } finally {
      router.push("/login");
    }
  }

  if (loading) {
    return (
      <main className="account-page">
        <AccountNav dark />
        <div className="account-container">
          <p style={{ color: "var(--muted)", textAlign: "center", marginTop: "50px" }}>
            Loading your dashboard…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="account-page">
      <AccountNav dark />
      <div className="account-container">
        <div className="dashboard-hero">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>
              Welcome{user?.name ? `, ${user.name}` : ""}.
              <br />
              <em>WEBWHALE</em> dashboard.
            </h1>
            <p>
              Signed in as <strong>{user?.email}</strong>
              {user?.currentPlan && (
                <span>
                  {" "}
                  • Active Plan:{" "}
                  <strong style={{ color: "var(--cyan)" }}>
                    {user.currentPlan}
                  </strong>
                </span>
              )}
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link className="account-primary" href="/subscription">
              Manage plans ↗
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid var(--ink)",
                padding: "14px 19px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                color: "var(--ink)",
              }}
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          <Link href="/profile" className="dashboard-card">
            <span>01</span>
            <h3>Profile</h3>
            <p>
              {user?.company
                ? `${user.company} • Manage account details.`
                : "Update your personal and account information."}
            </p>
          </Link>
          <Link href="/subscription" className="dashboard-card">
            <span>02</span>
            <h3>Subscription</h3>
            <p>
              Current plan: <strong>{user?.currentPlan || "Starter"}</strong>.
              Compare plans and manage your membership.
            </p>
          </Link>
          <Link href="/products" className="dashboard-card">
            <span>03</span>
            <h3>Products</h3>
            <p>Explore tools built by the WEBWHALE ecosystem.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
