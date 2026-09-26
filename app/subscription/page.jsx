"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountNav from "../../components/AccountNav";
import { authApi, subscriptionApi, apiRequest } from "../../lib/api";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "forever",
    desc: "For exploring the WEBXWHALE ecosystem.",
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

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existing = document.querySelector('script[data-razorpay="checkout"]');

    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => reject(new Error("Unable to load Razorpay checkout.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.dataset.razorpay = "checkout";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Unable to load Razorpay checkout."));
    document.body.appendChild(script);
  });
}

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
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function activateStarter() {
    if (!user) {
      router.push("/login?redirect=/subscription");
      return;
    }

    if (currentPlan === "Starter") {
      setMessage({ text: "You are already on the Starter plan.", type: "info" });
      return;
    }

    setActionLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await subscriptionApi.choosePlan({ plan: "Starter" });
      setCurrentPlan("Starter");
      setMessage({ text: res.message || "Starter plan activated.", type: "success" });
    } catch (err) {
      setMessage({ text: err.message || "Failed to activate Starter.", type: "error" });
    } finally {
      setActionLoading(false);
    }
  }

  async function startGrowthPayment() {
    if (!user) {
      router.push("/login?redirect=/subscription");
      return;
    }

    if (currentPlan === "Growth") {
      setMessage({ text: "You are already subscribed to the Growth plan.", type: "info" });
      return;
    }

    setActionLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await loadRazorpayScript();

      const orderData = await apiRequest("/subscription/create-order", {
        method: "POST",
        body: JSON.stringify({ plan: "Growth" }),
      });

      if (orderData.alreadyActive) {
        setCurrentPlan("Growth");
        setMessage({ text: "Growth plan is already active.", type: "success" });
        return;
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout is unavailable.");
      }

      const options = {
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "WEBXWHALE",
        description: "Growth Plan — ₹499/month",
        order_id: orderData.order.id,
        prefill: {
          name: orderData.customer?.name || user.name || "",
          email: orderData.customer?.email || user.email || "",
          contact: orderData.customer?.phone || user.phone || "",
        },
        notes: {
          plan: "Growth",
          subscriptionId: String(orderData.subscriptionId),
        },
        theme: {
          color: "#111111",
        },
        handler: async function (response) {
          try {
            setMessage({ text: "Payment received. Verifying transaction…", type: "info" });

            const verification = await apiRequest("/subscription/verify-payment", {
              method: "POST",
              body: JSON.stringify({
                ...response,
                subscriptionId: String(orderData.subscriptionId),
              }),
            });

            if (!verification.success) {
              throw new Error(verification.message || "Payment verification failed.");
            }

            setCurrentPlan("Growth");
            setMessage({
              text: verification.message || "Growth plan activated successfully.",
              type: "success",
            });
          } catch (err) {
            setMessage({
              text:
                err.message ||
                "Payment was received, but verification could not be completed. Please contact support.",
              type: "error",
            });
          } finally {
            setActionLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setActionLoading(false);
            setMessage({ text: "Payment window closed.", type: "info" });
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        setActionLoading(false);
        setMessage({
          text: response?.error?.description || "Payment failed. Please try again.",
          type: "error",
        });
      });

      razorpay.open();
    } catch (err) {
      setActionLoading(false);
      setMessage({
        text: err.message || "Unable to start payment.",
        type: "error",
      });
    }
  }

  function handleSelectPlan(planName) {
    if (planName === "Business") {
      router.push("/contact");
      return;
    }

    if (planName === "Growth") {
      startGrowthPayment();
      return;
    }

    activateStarter();
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
          <p>Start free and upgrade when you need more from WEBXWHALE.</p>
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
              <article key={p.name} className={`price-card ${p.featured ? "featured" : ""}`}>
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
                    : actionLoading && p.name === "Growth"
                    ? "Processing…"
                    : "Choose plan"}
                </button>
              </article>
            );
          })}
        </div>

        <p className="billing-note">
          Growth payments are processed through Razorpay. Your paid plan is activated
          only after server-side payment and signature verification.
        </p>

        <Link className="text-link dark" href="/contact">
          Talk to WEBXWHALE ↗
        </Link>
      </div>
    </main>
  );
}
