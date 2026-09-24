"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   ICONS
========================================================= */

const ArrowUpRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <path
      d="M7 17 17 7M8 7h9v9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <path
      d="M5 12h13M13 6l6 6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <path
      d="m23 18-17 14 17 14M41 18l17 14-17 14M36 10 28 54"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <path
      d="M32 9c-7-6-17-1-17 8-9 1-12 13-5 19-5 8 2 18 11 17 3 10 15 11 21 4 6 7 18 6 21-4 9 1 16-9 11-17 7-6 4-18-5-19 0-9-10-14-17-8-6-5-14-5-20 0Z"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    <path
      d="M32 12v40M18 23l14 9 14-9M18 41l14-9 14 9"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity=".65"
    />
  </svg>
);

const MobileIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <rect
      x="18"
      y="6"
      width="28"
      height="52"
      rx="5"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="M27 12h10M28 50h8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloudIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <path
      d="M17 47h32c8 0 12-10 6-15-1-9-12-13-19-7-7-7-20-3-20 7-8 1-8 15 1 15Z"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="M32 29v17M25 38l7 7 7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DesignIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <circle
      cx="32"
      cy="32"
      r="22"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="m24 40 4-12 12-4-4 12-12 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="36" cy="28" r="2" fill="currentColor" />
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <ellipse
      cx="32"
      cy="15"
      rx="18"
      ry="8"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="M14 15v17c0 5 8 8 18 8s18-3 18-8V15M14 32v17c0 5 8 8 18 8s18-3 18-8V32"
      stroke="currentColor"
      strokeWidth="2.5"
    />
  </svg>
);

/* =========================================================
   DATA
========================================================= */

const services = [
  {
    id: "01",
    title: "Web Development",
    short: "Digital experiences engineered for the modern web.",
    description:
      "We build fast, responsive, scalable websites and web applications designed around real users, real business goals, and long-term growth.",
    tags: [
      "React",
      "Next.js",
      "Node.js",
      "MERN",
      "APIs",
    ],
    icon: CodeIcon,
    size: "large",
  },
  {
    id: "02",
    title: "AI & Machine Learning",
    short: "Intelligence that turns data into possibilities.",
    description:
      "From intelligent features to data-driven systems, we explore practical ways to integrate AI and machine learning into digital products.",
    tags: [
      "AI",
      "ML",
      "Automation",
      "Data",
    ],
    icon: BrainIcon,
    size: "normal",
  },
  {
    id: "03",
    title: "Mobile Development",
    short: "Products that move with your users.",
    description:
      "Mobile-first experiences designed to feel natural, reliable, and connected across modern devices.",
    tags: [
      "Mobile",
      "Apps",
      "UX",
      "APIs",
    ],
    icon: MobileIcon,
    size: "normal",
  },
  {
    id: "04",
    title: "Cloud & Backend",
    short: "The infrastructure behind reliable products.",
    description:
      "Backend systems, APIs, databases, deployment workflows, and cloud infrastructure designed to support growing digital products.",
    tags: [
      "Node.js",
      "Databases",
      "APIs",
      "Cloud",
    ],
    icon: CloudIcon,
    size: "normal",
  },
  {
    id: "05",
    title: "UI / UX Design",
    short: "Interfaces that make technology feel intuitive.",
    description:
      "We combine visual systems, interaction design, usability, and motion to create digital experiences people can understand quickly.",
    tags: [
      "UI",
      "UX",
      "Motion",
      "Design",
    ],
    icon: DesignIcon,
    size: "normal",
  },
  {
    id: "06",
    title: "Data Solutions",
    short: "Make your data useful, understandable, and actionable.",
    description:
      "Data-focused solutions that help transform raw information into dashboards, insights, workflows, and intelligent experiences.",
    tags: [
      "SQL",
      "Analytics",
      "Dashboards",
      "Data",
    ],
    icon: DatabaseIcon,
    size: "large",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ServicesPage() {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);

  /* -------------------------------------------------------
     SCROLL REVEAL
  ------------------------------------------------------- */

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".service-reveal"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("service-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  /* -------------------------------------------------------
     MOUSE FOLLOWING GLOW
  ------------------------------------------------------- */

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!cursorRef.current) return;

      cursorRef.current.style.transform = `
        translate3d(
          ${event.clientX - 200}px,
          ${event.clientY - 200}px,
          0
        )
      `;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  /* -------------------------------------------------------
     CARD 3D TILT
  ------------------------------------------------------- */

  const handleCardMove = (event, element) => {
    if (window.innerWidth < 800) return;

    const rect = element.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - 0.5) * -7;

    const rotateY =
      ((x / rect.width) - 0.5) * 7;

    element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-5px)
    `;
  };

  const resetCard = (element) => {
    element.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  };

  /* -------------------------------------------------------
     NAV
  ------------------------------------------------------- */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main
      ref={pageRef}
      className="services-page"
    >
      {/* ===================================================
          GLOBAL CURSOR GLOW
      =================================================== */}

      <div
        ref={cursorRef}
        className="services-cursor-glow"
        aria-hidden="true"
      />

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <nav
        className="navbar services-navbar"
        aria-label="Primary navigation"
      >
        <a
          className="brand"
          href="/"
          onClick={closeMenu}
          aria-label="WEBWHALE home"
        >
          <img
            className="brand-logo"
            src="/webwhale_logo.png"
            alt="WEBWHALE"
          />

          <span className="brand-name">
            WEBWHALE
            <span className="brand-dot">.</span>
          </span>
        </a>

        <button
          className={`menu-toggle ${
            menuOpen ? "is-open" : ""
          }`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>

        <div
          className={`nav-links ${
            menuOpen ? "show" : ""
          }`}
        >
          <a href="/home" onClick={closeMenu}>
            Home
          </a>

          <a
            className="active"
            href="/services"
            onClick={closeMenu}
          >
            Services
          </a>

          <a href="/products" onClick={closeMenu}>
            Products
          </a>

          <a href="/aboutus" onClick={closeMenu}>
            About us
          </a>

          <a
            className="nav-cta"
            href="/contact"
            onClick={closeMenu}
          >
            Contact
            <ArrowUpRight />
          </a>
        </div>
      </nav>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="services-hero">

        <div className="hero-grid" />
        <div className="hero-noise" />

        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />

        {/* Floating lines */}
        <div className="hero-line line-one" />
        <div className="hero-line line-two" />
        <div className="hero-line line-three" />

        <div className="services-hero-inner">

          <div className="hero-topline service-reveal">
            <span className="status-dot" />
            WEBWHALE / SERVICES
            <span className="hero-topline-right">
              SYSTEM ONLINE
            </span>
          </div>

          <h1 className="services-hero-title">

            <span className="hero-word word-one">
              We build
            </span>

            <span className="hero-word word-two">
              <em>what&apos;s</em>
            </span>

            <span className="hero-word word-three">
              next.
            </span>

          </h1>

          <div className="hero-bottom">

            <p className="hero-description service-reveal">
              Technology, design, intelligence, and engineering
              combined to turn ideas into useful digital products.
            </p>

            <a
              className="hero-scroll service-reveal"
              href="/services"
            >
              <span>EXPLORE SERVICES</span>
              <span className="scroll-arrow">
                ↓
              </span>
            </a>

          </div>

        </div>

        {/* Vertical index */}
        <div className="hero-index">
          <span>01</span>
          <span>/</span>
          <span>06</span>
        </div>

      </section>

      {/* ===================================================
          MARQUEE
      =================================================== */}

      <section className="services-marquee">

        <div className="marquee-track">

          {[1, 2].map((item) => (
            <div
              className="marquee-content"
              key={item}
            >
              <span>WEB DEVELOPMENT</span>
              <i>✦</i>
              <span>AI & MACHINE LEARNING</span>
              <i>✦</i>
              <span>MOBILE</span>
              <i>✦</i>
              <span>DATA</span>
              <i>✦</i>
              <span>DESIGN</span>
              <i>✦</i>
              <span>CLOUD</span>
              <i>✦</i>
              <span>LEARNING</span>
              <i>✦</i>
              <span>ENTERTAINMENT</span>
              <i>✦</i>
              <span>MANY MORE</span>
              <i>✦</i>
            </div>
          ))}

        </div>

      </section>

      {/* ===================================================
          INTRO
      =================================================== */}

      <section className="services-intro">

        <div className="intro-index">
          <span>01</span>
          <div />
          <span>INTRO</span>
        </div>

        <div className="intro-content service-reveal">

          <p className="section-kicker">
            WHAT WE DO
          </p>

          <h2>
            More than
            <br />
            <span>just code.</span>
          </h2>

          <p className="intro-copy">
            Great digital products are built where engineering,
            design, strategy, and curiosity meet.
          </p>

          <p className="intro-secondary">
            WEBWHALE brings these disciplines together to create
            experiences that are technically strong, visually
            considered, and designed around the people who use them.
          </p>

        </div>

        <div className="intro-side">

          <div className="intro-stat service-reveal">
            <strong>06</strong>
            <span>
              CORE
              <br />
              SERVICES
            </span>
          </div>

          <div className="intro-stat service-reveal">
            <strong>∞</strong>
            <span>
              ROOM TO
              <br />
              EXPLORE
            </span>
          </div>

        </div>

      </section>

      {/* ===================================================
          SERVICES GRID
      =================================================== */}

      <section
        id="services"
        className="services-grid-section"
      >

        <div className="services-section-header">

          <div>
            <p className="section-kicker">
              CAPABILITIES
            </p>

            <h2>
              Built for
              <br />
              <em>possibility.</em>
            </h2>
          </div>

          <p>
            From the first idea to a deployed product, our
            capabilities cover the technology and creative
            disciplines needed to bring digital ideas to life.
          </p>

        </div>

        <div className="services-grid">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.id}
                className={`
                  service-card
                  ${service.size === "large"
                    ? "service-card-large"
                    : ""}
                  service-reveal
                  ${
                    activeService === service.id
                      ? "service-card-active"
                      : ""
                  }
                `}
                style={{
                  "--delay": `${index * 80}ms`,
                }}
                onMouseMove={(event) =>
                  handleCardMove(
                    event,
                    event.currentTarget
                  )
                }
                onMouseLeave={(event) =>
                  resetCard(event.currentTarget)
                }
                onClick={() =>
                  setActiveService(
                    activeService === service.id
                      ? null
                      : service.id
                  )
                }
              >

                <div className="card-top">

                  <span className="card-number">
                    {service.id}
                  </span>

                  <div className="card-icon">
                    <Icon />
                  </div>

                </div>

                <div className="card-main">

                  <h3>
                    {service.title}
                  </h3>

                  <p className="card-short">
                    {service.short}
                  </p>

                  <p className="card-description">
                    {service.description}
                  </p>

                </div>

                <div className="card-footer">

                  <div className="card-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="card-arrow">
                    <ArrowRight />
                  </div>

                </div>

                <div className="card-corner" />

              </article>
            );
          })}

        </div>

      </section>

      {/* ===================================================
          PROCESS
      =================================================== */}

      <section className="process-section">

        <div className="process-background">
          <div className="process-grid" />
        </div>

        <div className="process-header service-reveal">

          <p className="section-kicker">
            THE PROCESS
          </p>

          <h2>
            From idea
            <br />
            to <em>impact.</em>
          </h2>

        </div>

        <div className="process-line">

          <div className="process-progress" />

          <div className="process-step service-reveal">

            <div className="step-dot">
              01
            </div>

            <div className="step-content">
              <span>DISCOVER</span>
              <h3>Understand the problem.</h3>
              <p>
                We start by understanding the idea, audience,
                goals, constraints, and opportunity.
              </p>
            </div>

          </div>

          <div className="process-step service-reveal">

            <div className="step-dot">
              02
            </div>

            <div className="step-content">
              <span>DESIGN</span>
              <h3>Shape the experience.</h3>
              <p>
                Ideas become flows, interfaces, architecture,
                prototypes, and a clear product direction.
              </p>
            </div>

          </div>

          <div className="process-step service-reveal">

            <div className="step-dot">
              03
            </div>

            <div className="step-content">
              <span>BUILD</span>
              <h3>Engineer the product.</h3>
              <p>
                We turn the design into reliable software using
                modern technologies and development practices.
              </p>
            </div>

          </div>

          <div className="process-step service-reveal">

            <div className="step-dot">
              04
            </div>

            <div className="step-content">
              <span>EVOLVE</span>
              <h3>Keep moving forward.</h3>
              <p>
                Products improve through feedback, iteration,
                optimization, and new possibilities.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          TECHNOLOGY STRIP
      =================================================== */}

      <section className="technology-section">

        <div className="tech-heading service-reveal">

          <p className="section-kicker">
            TECHNOLOGY
          </p>

          <h2>
            Tools change.
            <br />
            <span>Principles don&apos;t.</span>
          </h2>

        </div>

        <div className="tech-orbit">

          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="orbit-ring ring-three" />

          <div className="orbit-center">
            WEB
            <br />
            WHALE
          </div>

          <span className="tech-node node-1">
            React
          </span>

          <span className="tech-node node-2">
            Node
          </span>

          <span className="tech-node node-3">
            AI
          </span>

          <span className="tech-node node-4">
            Data
          </span>

          <span className="tech-node node-5">
            Cloud
          </span>

          <span className="tech-node node-6">
            UX
          </span>

        </div>

      </section>

      {/* ===================================================
          CTA
      =================================================== */}

      <section className="services-cta">

        <div className="cta-grid" />

        <div className="cta-orb" />

        <div className="cta-content service-reveal">

          <p className="section-kicker">
            HAVE SOMETHING IN MIND?
          </p>

          <h2>
            Let&apos;s build
            <br />
            <em>what&apos;s next.</em>
          </h2>

          <p>
            Tell us about your idea, challenge, or project.
            We&apos;ll figure out the next step together.
          </p>

          <a
            href="/contact"
            className="services-cta-button"
          >
            Start a conversation
            <ArrowUpRight />
          </a>

        </div>

      </section>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="site-footer">

        <div className="footer-top">

          <div className="footer-brand-column">

            <a
              className="brand footer-brand"
              href="/"
            >
              <img
                className="brand-logo"
                src="/webwhale_logo.png"
                alt="WEBWHALE"
              />

              <span className="brand-name">
                WEBWHALE
                <span className="brand-dot">.</span>
              </span>
            </a>

            <p className="footer-description">
              Learning, tools and technology for people and
              businesses ready to move forward.
            </p>

            <a
              className="footer-email"
              href="mailto:hello@webwhale.in"
            >
              hello@webwhale.in
              <ArrowUpRight />
            </a>

          </div>

          <div className="footer-column">

            <p className="footer-heading">
              PRODUCTS
            </p>

            <nav className="footer-links">
              <a href="/products">
                SQLwhale
              </a>

              <a href="/products">
                Resume Analyzer
              </a>

              <a href="/products">
                Music Enhancer
              </a>

              <a href="/products">
                More Products
              </a>
            </nav>

          </div>

          <div className="footer-column">

            <p className="footer-heading">
              SERVICES
            </p>

            <nav className="footer-links">
              <a href="/services">
                Web Development
              </a>

              <a href="/services">
                AI & Machine Learning
              </a>

              <a href="/services">
                UI / UX Design
              </a>

              <a href="/services">
                All Services
              </a>
            </nav>

          </div>

          <div className="footer-column">

            <p className="footer-heading">
              COMPANY
            </p>

            <nav className="footer-links">

              <a href="/aboutus">
                About us
              </a>

              <a href="/terms">
                Terms & Conditions
              </a>

              <a href="/privacy">
                Privacy Policy
              </a>

              <a href="/contact">
                Contact
              </a>

            </nav>

          </div>

        </div>

        <div className="footer-bottom">

          <div className="footer-copyright">
            © {new Date().getFullYear()} WEBWHALE.
            All rights reserved.
          </div>

          <div className="footer-bottom-links">

            <a href="/terms">
              Terms
            </a>

            <a href="/privacy">
              Privacy
            </a>

            <a href="/home">
              Back to home ↑
            </a>

          </div>

        </div>

      </footer>

      {/* ===================================================
          INTERNAL CSS
      =================================================== */}

      <style jsx>{`

        /* =====================================================
           BASE
        ===================================================== */

        .services-page {
          --service-bg: #05090c;
          --service-panel: #091218;
          --service-cyan: #12c8e8;
          --service-blue: #087c9a;
          --service-white: #f7f8f5;
          --service-muted: rgba(255,255,255,.55);

          position: relative;
          overflow: hidden;

          background: var(--cream);
          color: var(--ink);
        }

        .services-page svg {
          width: 100%;
          height: 100%;
        }

        .section-kicker {
          color: #7d8580;

          font-family: "DM Mono", monospace;
          font-size: 9px;

          letter-spacing: .13em;
          text-transform: uppercase;
        }


        /* =====================================================
           CURSOR GLOW
        ===================================================== */

        .services-cursor-glow {
          position: fixed;

          width: 400px;
          height: 400px;

          left: 0;
          top: 0;

          z-index: 0;

          border-radius: 50%;

          pointer-events: none;

          opacity: .12;

          background:
            radial-gradient(
              circle,
              var(--service-cyan),
              transparent 65%
            );

          filter: blur(35px);

          will-change: transform;

          transition:
            transform .18s cubic-bezier(.22,1,.36,1);

          mix-blend-mode: screen;
        }


        /* =====================================================
           NAVBAR
        ===================================================== */

        .services-navbar {
          position: absolute;

          top: 0;
          left: 0;
          right: 0;

          z-index: 50;

          background: transparent !important;

          color: white;
        }

        .services-navbar .brand-name {
          color: white;
        }

        .services-navbar .nav-links a {
          color: rgba(255,255,255,.72);
        }

        .services-navbar .nav-links a:hover,
        .services-navbar .nav-links a.active {
          color: white;
        }

        .services-navbar .nav-links a::after {
          background: var(--service-cyan);
        }


        /* =====================================================
           HERO
        ===================================================== */

        .services-hero {
          position: relative;

          min-height: 880px;

          display: flex;
          align-items: center;

          overflow: hidden;

          color: white;

          background:
            radial-gradient(
              circle at 80% 40%,
              rgba(18,200,232,.14),
              transparent 27%
            ),
            radial-gradient(
              circle at 15% 75%,
              rgba(0,120,180,.10),
              transparent 30%
            ),
            #03070a;
        }

        .hero-grid {
          position: absolute;
          inset: 0;

          opacity: .19;

          background-image:
            linear-gradient(
              rgba(18,200,232,.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(18,200,232,.18) 1px,
              transparent 1px
            );

          background-size:
            70px 70px;

          mask-image:
            radial-gradient(
              ellipse at center,
              black 10%,
              transparent 78%
            );

          animation:
            gridMove 20s linear infinite;
        }

        .hero-noise {
          position: absolute;
          inset: 0;

          opacity: .05;

          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");

          pointer-events: none;
        }

        .hero-orb {
          position: absolute;

          border-radius: 50%;

          filter: blur(1px);

          pointer-events: none;
        }

        .orb-one {
          width: 520px;
          height: 520px;

          right: -160px;
          top: 120px;

          background:
            radial-gradient(
              circle at 35% 30%,
              rgba(18,200,232,.5),
              rgba(8,124,154,.18) 35%,
              transparent 70%
            );

          animation:
            orbFloat 8s ease-in-out infinite;
        }

        .orb-two {
          width: 240px;
          height: 240px;

          left: -100px;
          bottom: 70px;

          background:
            radial-gradient(
              circle,
              rgba(24,119,232,.25),
              transparent 70%
            );

          animation:
            orbFloat 11s ease-in-out infinite reverse;
        }

        .hero-line {
          position: absolute;

          height: 1px;

          transform-origin: left center;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(18,200,232,.6),
              transparent
            );

          opacity: .4;
        }

        .line-one {
          width: 50%;
          right: 0;
          top: 34%;

          transform: rotate(-18deg);

          animation: linePulse 5s ease-in-out infinite;
        }

        .line-two {
          width: 40%;
          left: 0;
          bottom: 25%;

          transform: rotate(16deg);

          animation:
            linePulse 7s ease-in-out infinite reverse;
        }

        .line-three {
          width: 30%;
          right: 12%;
          bottom: 15%;

          transform: rotate(-7deg);

          animation: linePulse 6s ease-in-out infinite;
        }

        .services-hero-inner {
          width: min(1240px, 100%);

          margin: 0 auto;

          padding:
            150px
            clamp(24px,6vw,90px)
            80px;

          position: relative;
          z-index: 2;
        }

        .hero-topline {
          display: flex;
          align-items: center;

          gap: 10px;

          margin-bottom: 55px;

          color: rgba(255,255,255,.46);

          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;

          letter-spacing: .13em;
        }

        .hero-topline-right {
          margin-left: auto;

          display: flex;
          align-items: center;

          gap: 8px;

          color: rgba(255,255,255,.3);
        }

        .status-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: var(--service-cyan);

          box-shadow:
            0 0 12px
            rgba(18,200,232,.9);

          animation:
            statusPulse 2s ease-in-out infinite;
        }

        .services-hero-title {
          margin: 0;

          max-width: 1050px;

          font-size:
            clamp(
              72px,
              11vw,
              165px
            );

          line-height: .78;

          letter-spacing: -.09em;

          font-weight: 600;
        }

        .hero-word {
          display: block;

          opacity: 0;

          transform:
            translateY(80px)
            skewY(4deg);

          animation:
            heroWordIn
            1.1s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .word-one {
          animation-delay: .15s;
        }

        .word-two {
          margin-left: 8vw;

          animation-delay: .28s;
        }

        .word-three {
          margin-left: 16vw;

          animation-delay: .41s;

          color: var(--service-cyan);
        }

        .services-hero-title em {
          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;

          color: var(--service-cyan);
        }

        .hero-bottom {
          display: flex;

          align-items: flex-end;
          justify-content: space-between;

          gap: 50px;

          margin-top: 90px;

          padding-left: 16vw;
        }

        .hero-description {
          max-width: 480px;

          margin: 0;

          color:
            rgba(255,255,255,.56);

          font-size: 15px;

          line-height: 1.7;

          opacity: 0;

          transform: translateY(25px);

          animation:
            fadeUp
            .9s
            .8s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .hero-scroll {
          display: flex;

          align-items: center;

          gap: 18px;

          color: white;

          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;

          letter-spacing: .1em;

          opacity: 0;

          transform: translateY(20px);

          animation:
            fadeUp
            .9s
            1s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .scroll-arrow {
          width: 42px;
          height: 42px;

          display: grid;
          place-items: center;

          border:
            1px
            solid
            rgba(255,255,255,.3);

          border-radius: 50%;

          font-size: 16px;

          transition:
            background .25s ease,
            transform .25s ease;
        }

        .hero-scroll:hover .scroll-arrow {
          background: var(--service-cyan);

          color: #001116;

          transform: translateY(5px);
        }

        .hero-index {
          position: absolute;

          right: 28px;
          bottom: 35px;

          z-index: 3;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 7px;

          color: rgba(255,255,255,.3);

          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;
        }

        .hero-index span:nth-child(2) {
          color: var(--service-cyan);
        }


        /* =====================================================
           MARQUEE
        ===================================================== */

        .services-marquee {
          overflow: hidden;

          padding: 20px 0;

          background: var(--service-cyan);

          color: #001116;

          border-top:
            1px solid
            rgba(0,0,0,.1);

          border-bottom:
            1px solid
            rgba(0,0,0,.1);
        }

        .marquee-track {
          display: flex;

          width: max-content;

          animation:
            marquee 25s
            linear
            infinite;
        }

        .marquee-content {
          display: flex;

          align-items: center;

          gap: 30px;

          padding-right: 30px;

          white-space: nowrap;

          font-family:
            "DM Mono",
            monospace;

          font-size: 10px;

          letter-spacing: .08em;
        }

        .marquee-content i {
          font-style: normal;

          opacity: .45;
        }


        /* =====================================================
           INTRO
        ===================================================== */

        .services-intro {
          position: relative;

          display: grid;

          grid-template-columns:
            100px
            minmax(0,1fr)
            220px;

          gap: 50px;

          padding:
            150px
            clamp(24px,7vw,110px);

          background: var(--cream);
        }

        .intro-index {
          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 15px;

          color: #89918b;

          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;
        }

        .intro-index div {
          width: 1px;

          height: 100px;

          background: var(--line);
        }

        .intro-content {
          max-width: 760px;
        }

        .intro-content h2 {
          margin:
            20px
            0
            35px;

          font-size:
            clamp(
              52px,
              7vw,
              95px
            );

          line-height: .9;

          letter-spacing: -.07em;
        }

        .intro-content h2 span {
          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-style: italic;

          font-weight: 400;
        }

        .intro-copy {
          max-width: 650px;

          margin-bottom: 20px;

          font-size: 23px;

          line-height: 1.45;

          letter-spacing: -.025em;
        }

        .intro-secondary {
          max-width: 600px;

          color: var(--muted);

          font-size: 14px;

          line-height: 1.75;
        }

        .intro-side {
          display: flex;

          flex-direction: column;

          gap: 20px;
        }

        .intro-stat {
          min-height: 160px;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          padding: 25px;

          background: #fff;

          border:
            1px
            solid
            var(--line);
        }

        .intro-stat strong {
          font-size: 70px;

          line-height: .8;

          letter-spacing: -.08em;
        }

        .intro-stat span {
          color: #818983;

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          line-height: 1.4;

          letter-spacing: .1em;
        }


        /* =====================================================
           SERVICES GRID
        ===================================================== */

        .services-grid-section {
          padding:
            130px
            clamp(24px,7vw,110px)
            150px;

          background: #f1efe7;
        }

        .services-section-header {
          max-width: 1120px;

          margin:
            0
            auto
            75px;

          display: grid;

          grid-template-columns:
            1fr
            .75fr;

          gap: 100px;

          align-items: end;
        }

        .services-section-header h2 {
          margin-top: 18px;

          font-size:
            clamp(
              55px,
              7vw,
              95px
            );

          line-height: .88;

          letter-spacing: -.07em;
        }

        .services-section-header h2 em {
          color: #087c9a;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;
        }

        .services-section-header > p {
          max-width: 470px;

          margin-bottom: 4px;

          color: var(--muted);

          font-size: 14px;

          line-height: 1.75;
        }

        .services-grid {
          max-width: 1120px;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            repeat(2,1fr);

          gap: 18px;
        }

        .service-card {
          position: relative;

          min-height: 480px;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          padding: 32px;

          overflow: hidden;

          color: white;

          background:
            linear-gradient(
              145deg,
              #071116,
              #0a1c23
            );

          border:
            1px
            solid
            rgba(255,255,255,.07);

          box-shadow:
            0 25px 60px
            rgba(0,0,0,.08);

          transform:
            perspective(1000px)
            rotateX(0)
            rotateY(0);

          transition:
            transform .35s
            cubic-bezier(.16,1,.3,1),
            border-color .3s ease,
            background .3s ease;

          will-change: transform;
        }

        .service-card-large {
          grid-column: span 2;

          min-height: 390px;
        }

        .service-card::before {
          content: "";

          position: absolute;

          width: 280px;
          height: 280px;

          right: -100px;
          top: -100px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(18,200,232,.18),
              transparent 68%
            );

          transition:
            transform .6s ease;
        }

        .service-card:hover::before {
          transform: scale(1.5);
        }

        .service-card:hover {
          border-color:
            rgba(18,200,232,.38);
        }

        .service-card-active {
          border-color:
            var(--service-cyan);
        }

        .card-top {
          display: flex;

          align-items: flex-start;

          justify-content: space-between;
        }

        .card-number {
          color:
            rgba(255,255,255,.35);

          font-family:
            "DM Mono",
            monospace;

          font-size: 10px;
        }

        .card-icon {
          width: 64px;
          height: 64px;

          padding: 15px;

          color:
            var(--service-cyan);

          border:
            1px
            solid
            rgba(18,200,232,.25);

          background:
            rgba(18,200,232,.04);

          transition:
            transform .4s
            cubic-bezier(.16,1,.3,1),
            background .3s ease;
        }

        .service-card:hover .card-icon {
          transform:
            rotate(-8deg)
            scale(1.08);

          background:
            rgba(18,200,232,.1);
        }

        .card-main {
          position: relative;

          z-index: 2;

          max-width: 700px;
        }

        .card-main h3 {
          margin:
            0
            0
            16px;

          font-size:
            clamp(
              31px,
              4vw,
              52px
            );

          line-height: .95;

          letter-spacing: -.055em;
        }

        .card-short {
          max-width: 560px;

          margin:
            0
            0
            20px;

          color:
            rgba(255,255,255,.75);

          font-size: 17px;

          line-height: 1.45;
        }

        .card-description {
          max-width: 600px;

          margin: 0;

          color:
            rgba(255,255,255,.42);

          font-size: 13px;

          line-height: 1.7;
        }

        .card-footer {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 25px;

          margin-top: 35px;
        }

        .card-tags {
          display: flex;

          flex-wrap: wrap;

          gap: 7px;
        }

        .card-tags span {
          padding:
            6px
            9px;

          color:
            rgba(255,255,255,.48);

          border:
            1px
            solid
            rgba(255,255,255,.1);

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          transition:
            border-color .25s ease,
            color .25s ease;
        }

        .service-card:hover
        .card-tags span {
          color: white;

          border-color:
            rgba(18,200,232,.3);
        }

        .card-arrow {
          flex-shrink: 0;

          width: 45px;
          height: 45px;

          display: grid;

          place-items: center;

          color:
            var(--service-cyan);

          border:
            1px
            solid
            rgba(18,200,232,.25);

          transition:
            transform .3s ease,
            background .3s ease;
        }

        .card-arrow svg {
          width: 19px;
          height: 19px;
        }

        .service-card:hover
        .card-arrow {
          transform:
            rotate(-45deg);

          background:
            rgba(18,200,232,.1);
        }

        .card-corner {
          position: absolute;

          width: 8px;
          height: 8px;

          left: 0;
          bottom: 0;

          border-left:
            1px
            solid
            var(--service-cyan);

          border-bottom:
            1px
            solid
            var(--service-cyan);

          opacity: .4;
        }


        /* =====================================================
           PROCESS
        ===================================================== */

        .process-section {
          position: relative;

          overflow: hidden;

          padding:
            140px
            clamp(24px,7vw,110px);

          color: white;

          background: #03070a;
        }

        .process-background {
          position: absolute;
          inset: 0;

          opacity: .5;
        }

        .process-grid {
          width: 100%;
          height: 100%;

          background-image:
            linear-gradient(
              rgba(18,200,232,.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(18,200,232,.07) 1px,
              transparent 1px
            );

          background-size: 60px 60px;
        }

        .process-header {
          position: relative;

          max-width: 1120px;

          margin:
            0
            auto
            110px;
        }

        .process-header .section-kicker {
          color: rgba(255,255,255,.4);
        }

        .process-header h2 {
          margin-top: 20px;

          font-size:
            clamp(
              55px,
              7vw,
              100px
            );

          line-height: .86;

          letter-spacing: -.07em;
        }

        .process-header h2 em {
          color: var(--service-cyan);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;
        }

        .process-line {
          position: relative;

          max-width: 1120px;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            repeat(4,1fr);

          gap: 0;

          border-top:
            1px
            solid
            rgba(255,255,255,.15);
        }

        .process-progress {
          position: absolute;

          left: 0;
          top: -1px;

          width: 0%;
          height: 2px;

          background:
            linear-gradient(
              90deg,
              var(--service-cyan),
              #55eaff
            );

          animation:
            progressGrow
            2.5s
            1s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .process-step {
          position: relative;

          padding:
            40px
            22px
            20px;

          border-right:
            1px
            solid
            rgba(255,255,255,.12);
        }

        .process-step:first-of-type {
          border-left:
            1px
            solid
            rgba(255,255,255,.12);
        }

        .step-dot {
          width: 48px;
          height: 48px;

          display: grid;

          place-items: center;

          margin-bottom: 50px;

          color: var(--service-cyan);

          border:
            1px
            solid
            rgba(18,200,232,.35);

          border-radius: 50%;

          background: #03070a;

          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;

          position: relative;

          z-index: 2;
        }

        .step-content span {
          color:
            var(--service-cyan);

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          letter-spacing: .12em;
        }

        .step-content h3 {
          margin:
            14px
            0
            15px;

          font-size: 23px;

          line-height: 1.05;

          letter-spacing: -.04em;
        }

        .step-content p {
          color:
            rgba(255,255,255,.4);

          font-size: 12px;

          line-height: 1.7;
        }


        /* =====================================================
           TECHNOLOGY ORBIT
        ===================================================== */

        .technology-section {
          min-height: 760px;

          position: relative;

          display: grid;

          grid-template-columns:
            .8fr
            1.2fr;

          align-items: center;

          gap: 40px;

          padding:
            130px
            clamp(24px,7vw,110px);

          background:
            radial-gradient(
              circle at 70% 50%,
              rgba(18,200,232,.1),
              transparent 30%
            ),
            var(--cream);

          overflow: hidden;
        }

        .tech-heading {
          max-width: 500px;

          position: relative;

          z-index: 2;
        }

        .tech-heading h2 {
          margin-top: 20px;

          font-size:
            clamp(
              55px,
              7vw,
              100px
            );

          line-height: .86;

          letter-spacing: -.075em;
        }

        .tech-heading h2 span {
          color: #087c9a;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;
        }

        .tech-orbit {
          width: min(600px, 75vw);
          aspect-ratio: 1;

          position: relative;

          margin: auto;
        }

        .orbit-ring {
          position: absolute;

          left: 50%;
          top: 50%;

          border:
            1px
            solid
            rgba(8,124,154,.2);

          border-radius: 50%;

          transform:
            translate(-50%,-50%);
        }

        .ring-one {
          width: 35%;
          height: 35%;
        }

        .ring-two {
          width: 65%;
          height: 65%;

          animation:
            orbitRotate
            20s
            linear
            infinite;
        }

        .ring-three {
          width: 90%;
          height: 90%;

          border-style: dashed;

          animation:
            orbitRotate
            35s
            linear
            infinite
            reverse;
        }

        .orbit-center {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 150px;
          height: 150px;

          display: grid;

          place-items: center;

          transform:
            translate(-50%,-50%);

          border:
            1px
            solid
            rgba(8,124,154,.35);

          border-radius: 50%;

          color: #087c9a;

          background:
            rgba(255,255,255,.5);

          box-shadow:
            0 0 60px
            rgba(18,200,232,.12);

          font-family:
            "DM Mono",
            monospace;

          font-size: 12px;

          text-align: center;

          letter-spacing: .08em;

          animation:
            centerPulse
            3s
            ease-in-out
            infinite;
        }

        .tech-node {
          position: absolute;

          padding:
            10px
            15px;

          color: #087c9a;

          border:
            1px
            solid
            rgba(8,124,154,.25);

          background:
            rgba(255,255,255,.65);

          backdrop-filter: blur(8px);

          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;

          box-shadow:
            0 10px 30px
            rgba(0,0,0,.04);

          animation:
            nodeFloat
            4s
            ease-in-out
            infinite;
        }

        .node-1 {
          left: 46%;
          top: 0%;
        }

        .node-2 {
          right: 3%;
          top: 28%;

          animation-delay:
            -.8s;
        }

        .node-3 {
          right: 9%;
          bottom: 16%;

          animation-delay:
            -1.6s;
        }

        .node-4 {
          left: 40%;
          bottom: -2%;

          animation-delay:
            -2.2s;
        }

        .node-5 {
          left: 2%;
          bottom: 22%;

          animation-delay:
            -2.8s;
        }

        .node-6 {
          left: 5%;
          top: 27%;

          animation-delay:
            -3.4s;
        }


        /* =====================================================
           CTA
        ===================================================== */

        .services-cta {
          position: relative;

          min-height: 600px;

          display: flex;

          align-items: center;

          padding:
            100px
            clamp(24px,7vw,110px);

          overflow: hidden;

          color: white;

          background:
            linear-gradient(
              125deg,
              #02080b,
              #062b36,
              #087c9a
            );
        }

        .cta-grid {
          position: absolute;
          inset: 0;

          opacity: .15;

          background-image:
            linear-gradient(
              rgba(255,255,255,.15) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.15) 1px,
              transparent 1px
            );

          background-size: 80px 80px;

          mask-image:
            radial-gradient(
              circle at center,
              black,
              transparent 75%
            );
        }

        .cta-orb {
          position: absolute;

          width: 650px;
          height: 650px;

          right: -200px;
          top: -100px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 35%,
              rgba(18,200,232,.6),
              rgba(18,200,232,.1) 35%,
              transparent 70%
            );

          animation:
            orbFloat
            9s
            ease-in-out
            infinite;
        }

        .cta-content {
          position: relative;

          z-index: 2;

          max-width: 800px;
        }

        .cta-content .section-kicker {
          color: rgba(255,255,255,.45);
        }

        .cta-content h2 {
          margin:
            20px
            0
            30px;

          font-size:
            clamp(
              65px,
              9vw,
              120px
            );

          line-height: .82;

          letter-spacing: -.08em;
        }

        .cta-content h2 em {
          color: var(--service-cyan);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;
        }

        .cta-content > p:not(.section-kicker) {
          max-width: 500px;

          margin-bottom: 35px;

          color:
            rgba(255,255,255,.55);

          font-size: 15px;

          line-height: 1.7;
        }

        .services-cta-button {
          display: inline-flex;

          align-items: center;

          gap: 13px;

          padding:
            15px
            20px;

          color: #001116;

          background:
            var(--service-cyan);

          font-size: 12px;

          font-weight: 600;

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .services-cta-button svg {
          width: 17px;
          height: 17px;
        }

        .services-cta-button:hover {
          transform:
            translateY(-4px);

          box-shadow:
            0 15px 40px
            rgba(18,200,232,.25);
        }


        /* =====================================================
           SCROLL REVEAL
        ===================================================== */

        .service-reveal {
          opacity: 0;

          transform:
            translateY(45px);

          transition:
            opacity .8s
            cubic-bezier(.16,1,.3,1),
            transform .8s
            cubic-bezier(.16,1,.3,1);

          transition-delay:
            var(--delay, 0ms);
        }

        .service-visible {
          opacity: 1;

          transform:
            translateY(0);
        }


        /* =====================================================
           KEYFRAMES
        ===================================================== */

        @keyframes heroWordIn {
          0% {
            opacity: 0;

            transform:
              translateY(80px)
              skewY(4deg);
          }

          100% {
            opacity: 1;

            transform:
              translateY(0)
              skewY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;

            transform:
              translateY(25px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        @keyframes gridMove {
          from {
            background-position:
              0 0;
          }

          to {
            background-position:
              70px 70px;
          }
        }

        @keyframes orbFloat {
          0%,
          100% {
            transform:
              translate3d(0,0,0)
              scale(1);
          }

          50% {
            transform:
              translate3d(-25px,20px,0)
              scale(1.06);
          }
        }

        @keyframes linePulse {
          0%,
          100% {
            opacity: .15;
          }

          50% {
            opacity: .65;
          }
        }

        @keyframes statusPulse {
          0%,
          100% {
            opacity: .5;

            box-shadow:
              0 0 5px
              rgba(18,200,232,.4);
          }

          50% {
            opacity: 1;

            box-shadow:
              0 0 18px
              rgba(18,200,232,1);
          }
        }

        @keyframes marquee {
          from {
            transform:
              translateX(0);
          }

          to {
            transform:
              translateX(-50%);
          }
        }

        @keyframes progressGrow {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }

        @keyframes orbitRotate {
          from {
            transform:
              translate(-50%,-50%)
              rotate(0deg);
          }

          to {
            transform:
              translate(-50%,-50%)
              rotate(360deg);
          }
        }

        @keyframes centerPulse {
          0%,
          100% {
            box-shadow:
              0 0 35px
              rgba(18,200,232,.08);
          }

          50% {
            box-shadow:
              0 0 70px
              rgba(18,200,232,.2);
          }
        }

        @keyframes nodeFloat {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-9px);
          }
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {

          .services-hero {
            min-height: 780px;
          }

          .services-hero-inner {
            padding-top: 170px;
          }

          .services-hero-title {
            font-size:
              clamp(
                65px,
                12vw,
                110px
              );
          }

          .hero-bottom {
            padding-left: 8vw;
          }

          .services-intro {
            grid-template-columns:
              70px
              1fr;

            gap: 30px;
          }

          .intro-side {
            grid-column:
              2;
            display: grid;

            grid-template-columns:
              1fr
              1fr;
          }

          .services-section-header {
            grid-template-columns:
              1fr
              1fr;

            gap: 50px;
          }

          .process-line {
            grid-template-columns:
              repeat(2,1fr);
          }

          .process-step {
            border-bottom:
              1px
              solid
              rgba(255,255,255,.12);
          }

          .technology-section {
            grid-template-columns:
              1fr;

            padding-top: 100px;
          }

          .tech-heading {
            margin: 0 auto;
            text-align: center;
          }

          .tech-orbit {
            width:
              min(
                550px,
                90vw
              );
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 650px) {

          .services-cursor-glow {
            display: none;
          }

          .services-hero {
            min-height: 720px;
          }

          .services-hero-inner {
            padding:
              150px
              24px
              70px;
          }

          .hero-topline {
            margin-bottom: 45px;
          }

          .hero-topline-right {
            display: none;
          }

          .services-hero-title {
            font-size:
              clamp(
                58px,
                17vw,
                86px
              );

            line-height: .82;
          }

          .word-two {
            margin-left: 5vw;
          }

          .word-three {
            margin-left: 10vw;
          }

          .hero-bottom {
            display: flex;

            flex-direction: column;

            align-items: flex-start;

            padding-left: 0;

            margin-top: 60px;

            gap: 35px;
          }

          .hero-description {
            max-width: 340px;
          }

          .hero-index {
            right: 15px;
            bottom: 20px;
          }

          .services-marquee {
            padding: 16px 0;
          }

          .services-intro {
            display: block;

            padding:
              80px
              24px;
          }

          .intro-index {
            display: none;
          }

          .intro-content h2 {
            font-size: 55px;
          }

          .intro-copy {
            font-size: 20px;
          }

          .intro-side {
            margin-top: 45px;

            display: grid;

            grid-template-columns:
              1fr
              1fr;

            gap: 12px;
          }

          .intro-stat {
            min-height: 140px;
          }

          .intro-stat strong {
            font-size: 55px;
          }

          .services-grid-section {
            padding:
              80px
              18px
              90px;
          }

          .services-section-header {
            display: block;

            margin-bottom: 55px;
          }

          .services-section-header h2 {
            font-size: 58px;

            margin-bottom: 30px;
          }

          .services-grid {
            grid-template-columns: 1fr;

            gap: 12px;
          }

          .service-card,
          .service-card-large {
            grid-column: span 1;

            min-height: 440px;

            padding: 25px;
          }

          .card-main h3 {
            font-size: 35px;
          }

          .card-short {
            font-size: 15px;
          }

          .process-section {
            padding:
              85px
              24px;
          }

          .process-header {
            margin-bottom: 70px;
          }

          .process-header h2 {
            font-size: 58px;
          }

          .process-line {
            display: block;

            border-top: none;
            border-left:
              1px
              solid
              rgba(255,255,255,.14);
          }

          .process-progress {
            display: none;
          }

          .process-step,
          .process-step:first-of-type {
            padding:
              0
              0
              55px
              35px;

            border:
              none;
          }

          .step-dot {
            position: absolute;

            left: -24px;

            margin: 0;

            width: 46px;
            height: 46px;
          }

          .step-content h3 {
            font-size: 25px;
          }

          .technology-section {
            min-height: 700px;

            padding:
              80px
              24px;
          }

          .tech-heading h2 {
            font-size: 55px;
          }

          .tech-orbit {
            width:
              min(
                440px,
                100vw
              );
          }

          .orbit-center {
            width: 110px;
            height: 110px;

            font-size: 9px;
          }

          .tech-node {
            padding:
              7px
              10px;

            font-size: 7px;
          }

          .services-cta {
            min-height: 580px;

            padding:
              80px
              24px;
          }

          .cta-content h2 {
            font-size: 65px;
          }

        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 400px) {

          .services-hero-title {
            font-size: 53px;
          }

          .intro-content h2,
          .services-section-header h2,
          .process-header h2,
          .tech-heading h2 {
            font-size: 50px;
          }

          .cta-content h2 {
            font-size: 55px;
          }

          .intro-side {
            grid-template-columns: 1fr;
          }

          .card-footer {
            align-items: flex-start;

            flex-direction: column;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .services-page *,
          .services-page *::before,
          .services-page *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }

          .service-reveal {
            opacity: 1;

            transform: none;
          }

        }

      `}</style>
    </main>
  );
}