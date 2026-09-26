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
        <section className="dashboard-welcome">
          <div className="dashboard-heading">
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>
              Welcome{user?.name ? ", " + user.name.split(" ")[0] : ""}.
              <br />
              <em>Your WEBXWHALE space.</em>
            </h1>
            <p className="dashboard-subtitle">
              Manage your account, membership, and access to WEBXWHALE products from one place.
            </p>
          </div>

          <div className="dashboard-actions">
            <Link className="account-primary" href="/products">
              Explore products ↗
            </Link>
            <button className="dashboard-signout" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </section>

        <section className="dashboard-overview">
          <div className="overview-item">
            <span>ACCOUNT</span>
            <strong>{user?.name || "Member"}</strong>
            <small>{user?.email}</small>
          </div>
          <div className="overview-item">
            <span>ACTIVE PLAN</span>
            <strong className="overview-plan">{user?.currentPlan || "Starter"}</strong>
            <small>Manage your membership anytime.</small>
          </div>
          <div className="overview-item">
            <span>STATUS</span>
            <strong>Active</strong>
            <small>Your account is ready to use.</small>
          </div>
        </section>

        <div className="dashboard-section-head">
          <div>
            <p className="eyebrow">QUICK ACCESS</p>
            <h2>Make a move.</h2>
          </div>
          <p>Jump directly to the areas you use most.</p>
        </div>

        <div className="dashboard-grid">
          <Link href="/profile" className="dashboard-card">
            <div className="dashboard-card-top"><span>01</span><b>↗</b></div>
            <h3>Profile</h3>
            <p>Update your name, phone, company, and bio.</p>
            <strong>Manage profile</strong>
          </Link>
          <Link href="/subscription" className="dashboard-card dashboard-card-dark">
            <div className="dashboard-card-top"><span>02</span><b>↗</b></div>
            <h3>Subscription</h3>
            <p>Review your {user?.currentPlan || "Starter"} plan and membership options.</p>
            <strong>Manage plan</strong>
          </Link>
          <Link href="/products" className="dashboard-card">
            <div className="dashboard-card-top"><span>03</span><b>↗</b></div>
            <h3>Products</h3>
            <p>Explore SQLwhale, Webchat, and other WEBXWHALE products.</p>
            <strong>Explore products</strong>
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin" className="dashboard-card dashboard-card-admin">
              <div className="dashboard-card-top"><span>04</span><b>↗</b></div>
              <h3>Admin</h3>
              <p>Manage leads, review enquiries, and access the WEBXWHALE admin workspace.</p>
              <strong>Open admin dashboard</strong>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
