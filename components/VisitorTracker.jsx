"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    try {
      let visitorId = localStorage.getItem("webwhale_visitor_id");
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("webwhale_visitor_id", visitorId);
      }
      fetch("/api/analytics/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, page: window.location.pathname }),
        keepalive: true,
      }).catch(() => {});
    } catch {}
  }, []);

  return null;
}
