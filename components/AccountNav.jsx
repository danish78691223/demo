"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authApi } from "../lib/api";

export default function AccountNav({ dark = false }) {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    let active = true;

    authApi.me()
      .then((data) => {
        if (active) setIsAdmin(data?.user?.role === "admin");
      })
      .catch(() => {
        if (active) setIsAdmin(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleLogout() {
    await authApi.logout().catch(() => {});
    setIsAdmin(false);
    close();
    window.location.href = "/home";
  }

  return (
    <nav className={`account-nav ${dark ? "account-nav-dark" : ""}`}>
      <Link href="/home" className="account-brand" onClick={close}>
        <img src="/webwhale_logo.png" alt="WEBWHALE" />
        <span>WEBXWHALE<span>.</span></span>
      </Link>
      <button className="account-menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>☰</button>
      <div className={`account-links ${open ? "show" : ""}`}>
        <Link href="/home" onClick={close}>Home</Link>
        <Link href="/products" onClick={close}>Products</Link>
        <Link href="/services" onClick={close}>Services</Link>
        <Link href="/aboutus" onClick={close}>About us</Link>

        {isAdmin ? (
          <>
            <Link href="/admin" className="account-profile-link" onClick={close}>Control Center</Link>
            <button type="button" className="account-profile-link account-logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link href="/login" className="account-profile-link" onClick={close}>Admin Login</Link>
        )}
      </div>
    </nav>
  );
}
