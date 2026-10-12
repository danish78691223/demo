"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const discoveries = [
  { id: "ai", label: "AI & Intelligence", detail: "Smarter tools. Bigger possibilities.", symbol: "✳" },
  { id: "learn", label: "Learn & Build", detail: "Turn curiosity into real skills.", symbol: "⌘" },
  { id: "create", label: "Digital Experiences", detail: "Ideas made interactive.", symbol: "↗" },
  { id: "web", label: "Web & Products", detail: "Explore what you can create.", symbol: "◈" },
];

export default function IntroPage() {
  const router = useRouter();
  const [active, setActive] = useState("ai");
  const [leaving, setLeaving] = useState(false);

  const enterWebsite = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => router.replace("/home"), 420);
  };

  useEffect(() => {
    const timer = window.setTimeout(enterWebsite, 6500);
    return () => window.clearTimeout(timer);
  }, []);

  const selected = discoveries.find((item) => item.id === active) || discoveries[0];

  return (
    <main className={`intro-experience ${leaving ? "intro-experience-leaving" : ""}`}>
      <div className="intro-noise" aria-hidden="true" />
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-aurora intro-aurora-one" aria-hidden="true" />
      <div className="intro-aurora intro-aurora-two" aria-hidden="true" />

      <header className="intro-topbar">
        <a href="/home" className="intro-wordmark" onClick={(event) => { event.preventDefault(); enterWebsite(); }}>
          <span className="intro-mark">W<span>×</span></span>
          <span>WEBXWHALE<small>IDEAS INTO EXPERIENCES</small></span>
        </a>
        <span className="intro-live"><i /> A WORLD OF POSSIBILITIES</span>
      </header>

      <section className="intro-main">
        <div className="intro-copy">
          <p className="intro-eyebrow"><span /> NOT JUST A WEBSITE. A STARTING POINT.</p>
          <h1>Curiosity is<br />your <em>superpower.</em></h1>
          <p className="intro-description">Explore tools, technology, learning and ideas built to help you discover what’s possible.</p>

          <div className="intro-discovery">
            <p className="intro-discovery-label">WHAT ARE YOU CURIOUS ABOUT?</p>
            <div className="intro-discovery-options">
              {discoveries.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`intro-discovery-chip ${active === item.id ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(item.id)}
                  onFocus={() => setActive(item.id)}
                  onClick={() => setActive(item.id)}
                  aria-pressed={active === item.id}
                >
                  <span>{item.symbol}</span>{item.label}<b>0{index + 1}</b>
                </button>
              ))}
            </div>
            <div className="intro-selected" aria-live="polite">
              <span className="intro-selected-icon">{selected.symbol}</span>
              <span><strong>{selected.label}</strong><small>{selected.detail}</small></span>
              <span className="intro-selected-arrow">↗</span>
            </div>
          </div>

          <button className="intro-enter" type="button" onClick={enterWebsite}>
            Explore WEBXWHALE <span>↗</span>
          </button>
          <p className="intro-auto-note"><span className="intro-progress"><i /></span> YOUR NEXT DISCOVERY IS JUST A MOMENT AWAY</p>
        </div>

        <div className="intro-universe" aria-label="Interactive WEBXWHALE discovery animation">
          <div className="intro-orbit intro-orbit-outer" />
          <div className="intro-orbit intro-orbit-middle" />
          <div className="intro-orbit intro-orbit-inner" />
          <div className="intro-orbit-dot intro-dot-one" />
          <div className="intro-orbit-dot intro-dot-two" />
          <div className="intro-orbit-dot intro-dot-three" />
          <div className="intro-core-glow" />
          <div className="intro-core">
            <span className="intro-core-symbol">W<span>×</span></span>
            <strong>Explore<br />the possible.</strong>
            <small>WEBXWHALE</small>
          </div>
          <div className="intro-float-card intro-card-ai"><span>✳</span><div><strong>AI & IDEAS</strong><small>Think beyond</small></div></div>
          <div className="intro-float-card intro-card-code"><span>⌘</span><div><strong>BUILD & LEARN</strong><small>Make it real</small></div></div>
          <div className="intro-float-card intro-card-create"><span>↗</span><div><strong>CREATE MORE</strong><small>Find your next</small></div></div>
          <div className="intro-universe-caption"><span>01 — 04</span><i /> MANY WAYS TO BEGIN</div>
        </div>
      </section>

      <footer className="intro-footer">
        <span>BUILD. LEARN. CREATE. EVOLVE.</span>
        <span>MADE FOR THE CURIOUS <b>✳</b></span>
      </footer>
    </main>
  );
}
