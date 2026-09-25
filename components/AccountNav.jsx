"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "../lib/api";

export default function AccountNav({ dark = false }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    authApi
      .me()
      .then((data) => {
        if (isMounted && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        if (isMounted) setUser(null);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogout() {
    try {
      await authApi.logout();
      setUser(null);
      router.push("/login");
    } catch {
      router.push("/login");
    }
  }

  return (
    <nav className={`account-nav ${dark ? "account-nav-dark" : ""}`}>
      <Link href="/home" className="account-brand">
        <img src="/webwhale_logo.png" alt="WEBWHALE" />
        <span>
          WEBXWHALE<span>.</span>
        </span>
      </Link>
      <button
        className="account-menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>
      <div className={`account-links ${open ? "show" : ""}`}>
        <Link href="/home">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/services">Services</Link>
        <Link href="/subscription">Subscription</Link>
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            {user.role === "admin" && <Link href="/admin">Control Center</Link>}
            <Link href="/profile" className="account-profile-link">
              Profile ({user.name?.split(" ")[0] || "User"})
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                font: "inherit",
                fontSize: "14px",
                fontWeight: 600,
                color: "inherit",
                opacity: 0.72,
                padding: 0,
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <Link href="/login" className="account-profile-link">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
