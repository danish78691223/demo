"use client";

import Link from "next/link";
import { useState } from "react";

export default function AccountNav({ dark = false }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
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
        <Link href="/login" className="account-profile-link" onClick={close}>Admin Login</Link>
      </div>
    </nav>
  );
}