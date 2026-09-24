"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountNav from "../../components/AccountNav";
import { authApi, subscriptionApi } from "../../lib/api";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "forever",
    desc: "For exploring the WEBWHALE ecosystem.",
    features: [
      "Account & profile",
      "Access to free resources",
      "Product updates",
    ],
  },
  {
    name: "Growth",
    price: "₹499",
    period: "/ month",
    desc: "For active learners, builders and creators.",
    features: [
      "Everything in Starter",
      "Premium learning access",
      "Member benefits",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Business",
    price: "Custom",
    period: "",
    desc: "For shops, professionals and growing teams.",
    features: [
      "Business services",
      "Web development support",
      "Marketing support",
      "Dedicated assistance",
    ],
  },
];

export default function Subscription() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentPlan, setCurrentPlan] = useState("Starter");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    async function loadData() {
      try {
        const data = await authApi.me();
        if (data.user) {
          setUser(data.user);
          setCurrentPlan(data.user.currentPlan || "Starter");
        }
      } catch {
        // User not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleSelectPlan(planName) {
    if (planName === "Business") {
      router.push("/contact");
      return;
    }

    if (!user) {
      router.push("/login?redirect=/subscription");
      return;
    }

    if (currentPlan === planName) {
      setMessage({
        text: `You are already subscribed to the ${planName} plan.`,
        type: "info",
      });
      return;
    }

    setActionLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await subscriptionApi.choosePlan({ plan: planName });
      setCurrentPlan(planName);
      setMessage({
        text: res.message || `Successfully switched to ${planName} plan!`,
        type: "success",
      });
    } catch (err) {
      setMessage({
        text: err.message || "Failed to update subscription.",
        type: "error",
      });
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <main className="account-page">
      <AccountNav dark />
      <div className="account-container">
        <div className="page-heading centered">
          <p className="eyebrow">MEMBERSHIP</p>
          <h1>
            Choose your <em>path.</em>
          </h1>
          <p>Start free and upgrade when you need more from WEBWHALE.</p>
          {user && (
            <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--cyan)" }}>
              Logged in as <strong>{user.email}</strong> • Active Plan:{" "}
              <strong>{currentPlan}</strong>
            </p>
          )}
        </div>

        {message.text && (
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto 24px auto",
              padding: "14px 18px",
              borderRadius: "4px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 500,
              backgroundColor:
                message.type === "error"
                  ? "#fff0ed"
                  : message.type === "success"
                  ? "#eafaf1"
                  : "#eef7fa",
              color:
                message.type === "error"
                  ? "#8e3022"
                  : message.type === "success"
                  ? "#186e38"
                  : "#0a5670",
              border: `1px solid ${
                message.type === "error"
                  ? "#d98272"
                  : message.type === "success"
                  ? "#82d9a3"
                  : "#82c3d9"
              }`,
            }}
          >
            {message.text}
          </div>
        )}

        <div className="pricing-grid">
          {plans.map((p) => {
            const isCurrent = currentPlan === p.name;
            return (
              <article
                key={p.name}
                className={`price-card ${p.featured ? "featured" : ""}`}
              >
                {p.featured && <span className="price-badge">MOST POPULAR</span>}
                {isCurrent && (
                  <span
                    style={{
                      position: "absolute",
                      left: "18px",
                      top: "18px",
                      background: "#22c55e",
                      color: "#fff",
                      padding: "4px 8px",
                      fontSize: "9px",
                      fontFamily: "DM Mono, monospace",
                      fontWeight: 700,
                    }}
                  >
                    CURRENT PLAN
                  </span>
                )}
                <span className="auth-label" style={{ marginTop: isCurrent ? "18px" : "0" }}>
                  {p.name.toUpperCase()}
                </span>
                <h2>
                  {p.price}
                  <small>{p.period}</small>
                </h2>
                <p>{p.desc}</p>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <button
                  className={`plan-button ${isCurrent ? "selected" : ""}`}
                  disabled={actionLoading || loading}
                  onClick={() => handleSelectPlan(p.name)}
                >
                  {p.name === "Business"
                    ? "Contact us"
                    : isCurrent
                    ? "Active Plan ✓"
                    : actionLoading
                    ? "Updating…"
                    : "Choose plan"}
                </button>
              </article>
            );
          })}
        </div>

        <p className="billing-note">
          Subscriptions are stored and managed through your MongoDB backend. For live
          payments, payment gateway webhooks (such as Razorpay or Stripe) can be
          attached to verify transactions.
        </p>

        <Link className="text-link dark" href="/contact">
          Talk to WEBWHALE ↗
        </Link>
      </div>
    </main>
  );
}
