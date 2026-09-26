"use client";

import { useState, useEffect } from "react";
import { authApi } from "../../lib/api";

const ArrowUpRight = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      d="M7 17 17 7M8 7h9v9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Spark = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"
      strokeLinejoin="round"
    />
    <path
      d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"
      strokeLinejoin="round"
    />
  </svg>
);

const trackContentClick = (item, category) => {
  if (category !== "product") return;
  try {
    const visitorId = localStorage.getItem("webwhale_visitor_id");
    if (!visitorId) return;
    fetch("/api/analytics/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        page: window.location.pathname,
        eventType: "click",
        targetId: String(item.id || item.title),
        targetName: item.title,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
};

const defaultCardGroups = [
  {
    number: "01",
    title: "Learning platforms",
    eyebrow: "Learn with intent",
    items: [
      {
        title: "SQLwhale",
        copy: "Master data skills through hands-on SQL practice.",
        status: "Explore",
        accent: "blue",
        href: "https://sqlwhalefrontend.vercel.app/",
      },
      {
        title: "Programming",
        copy: "A practical learning path is being crafted.",
        status: "Coming soon",
        accent: "violet",
      },
      {
        title: "Data structures",
        copy: "Build stronger foundations, one pattern at a time.",
        status: "Coming soon",
        accent: "coral",
      },
    ],
  },
  {
    number: "02",
    title: "Products",
    eyebrow: "Tools that move work",
    items: [
      {
        title: "Resume Analyzer",
        copy: "Turn your resume into a clearer next opportunity.",
        status: "Try it",
        accent: "orange",
        href: "https://t.me/ScanMyResumeBot",
      },
      {
        title: "AI 8D Audio Converter",
        copy: "Bring more clarity and presence to every track.",
        status: "Try it",
        accent: "pink",
        href: "https://project911-flame.vercel.app/",
      },
      {
        title: "Webchat",
        copy: "A lightweight web chat experience for connecting and communicating online.",
        status: "Try it",
        accent: "mint",
        href: "https://webwhalechat.netlify.app/",
      },
      {
        title: "More",
        copy: "The next useful tool is already taking shape.",
        status: "Coming soon",
        accent: "lime",
      },
    ],
  },
  {
    number: "03",
    title: "Services",
    eyebrow: "Partners for progress",
    items: [
      {
        title: "Web Development",
        copy: "Thoughtful web experiences that grow with you.",
        status: "Explore",
        accent: "mint",
        href: "/services/web-development",
      },
      {
        title: "Marketing",
        copy: "Make the right people notice what you are building.",
        status: "Coming soon",
        accent: "yellow",
      },
      {
        title: "Consulting",
        copy: "Practical clarity for your most important decisions.",
        status: "Coming soon",
        accent: "violet",
      },
    ],
  },
];

const focusAreas = [
  {
    tag: "EASE OF DOING BUSINESS",
    title: "Digital-first government approvals",
    description:
      "Reduce physical touchpoints and repeated information when businesses apply for permissions, licences and registrations.",
    number: "01",
  },
  {
    tag: "LOGISTICS",
    title: "Smarter cargo-space matching",
    description:
      "Help small exporters discover and book nearby space in partially filled containers, with real-time availability and payments.",
    number: "02",
  },
  {
    tag: "PROPERTY DATA",
    title: "One view of property records",
    description:
      "Bring ownership information and encumbrance details together in one searchable, reliable portal.",
    number: "03",
  },
  {
    tag: "MSME COMPLIANCE",
    title: "Simpler return filing",
    description:
      "Support invoice workflows, inventory entries and real-time updates that make business return filing easier.",
    number: "04",
  },
  {
    tag: "INDUSTRIAL SAFETY",
    title: "Connected boiler monitoring",
    description:
      "Capture boiler readings in real time and share a secure log with businesses and inspecting departments.",
    number: "05",
  },
  {
    tag: "WORKFORCE",
    title: "Payroll software for MSMEs",
    description:
      "Create open, accessible tools that produce compliance registers and returns in the required formats.",
    number: "06",
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cardGroups, setCardGroups] = useState(defaultCardGroups);

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

  useEffect(() => {
    fetch("/api/products?home=true", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data.products)) return;
        const groups = [
          { number: "01", title: "Learning platforms", eyebrow: "Learn with intent", items: [] },
          { number: "02", title: "Products", eyebrow: "Tools that move work", items: [] },
          { number: "03", title: "Services", eyebrow: "Partners for progress", items: [] },
        ];
        const map = { learning: 0, product: 1, service: 2 };
        data.products.forEach((item) => {
          groups[map[item.category]].items.push({
            title: item.name, copy: item.description, status: item.status || "Explore",
            accent: item.accent || "cyan", href: item.name === "Web Development" ? "/services/web-development" : (item.href || "#contact"),
          });
        });
        setCardGroups(groups);
      })
      .catch(() => {});
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar" aria-label="Primary navigation">
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
          aria-label="WEBWHALE home"
        >
          <img
            className="brand-logo"
            src="/webwhale_logo.png"
            alt="WEBWHALE"
          />

          <span className="brand-name">
            WEBXWHALE<span className="brand-dot">.</span>
          </span>
        </a>

        <button
          className={`menu-toggle ${isMenuOpen ? "is-open" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? "show" : ""}`}>
          <a className="active" href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="/services" onClick={closeMenu}>
            Services
          </a>

          <a href="/products" onClick={closeMenu}>
            Products
          </a>

          <a href="/aboutus" onClick={closeMenu}>
            About us
          </a>

          <a href="/subscription" onClick={closeMenu}>
            Subscription
          </a>

          {user ? (
            <>
              <a href="/profile" onClick={closeMenu}>
                Profile
              </a>
              <a className="nav-cta" href="/dashboard" onClick={closeMenu}>
                Dashboard <ArrowUpRight />
              </a>
            </>
          ) : (
            <a className="nav-cta" href="/login" onClick={closeMenu}>
              Sign in <ArrowUpRight />
            </a>
          )}
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero" id="home">
        <div className="hero-orb orb-one"></div>
        <div className="hero-orb orb-two"></div>
        <div className="hero-grid" aria-hidden="true"></div>

        <div className="hero-content">
          <p className="kicker">
            {/* <span></span> */}
            Built for what&apos;s next
          </p>

          <h1>
            Start curious.
            <br />
            <em>Go further.</em>
          </h1>

          <p className="hero-copy">
            One focused ecosystem for ambitious learners, useful products and
            businesses ready to grow.
          </p>

          <div className="hero-actions">
            <a className="button button-light" href="#explore">
              Explore our world <ArrowUpRight />
            </a>

            <a className="text-link" href="#focus">
              See what we&apos;re solving <span>↓</span>
            </a>
          </div>
        </div>

        <div className="hero-stats" aria-label="WEBWHALE platform facts">
          <div>
            <strong>01</strong>
            <span>
              place to learn,
              <br />
              build &amp; grow
            </span>
          </div>

          <div>
            <strong>3</strong>
            <span>
              ways to move
              <br />
              your ideas ahead
            </span>
          </div>
        </div>

        <div className="hero-sticker">
          <span>IDEAS</span>
          <span>IN MOTION</span>

          <i>
            <ArrowUpRight />
          </i>
        </div>
      </section>

      {/* ================= ECOSYSTEM ================= */}
      <section className="ecosystem section" id="explore">
        <div className="section-intro">
          <p className="eyebrow">OUR ECOSYSTEM</p>

          <h2>
            Everything to make
            <br />
            <span>momentum happen.</span>
          </h2>

          <p className="section-copy">
            Choose the path that meets you where you are — then keep moving
            forward.
          </p>
        </div>

        <div className="pillar-grid">
          {cardGroups.map((group) => (
            <article
              className="pillar"
              id={
                group.title === "Products"
                  ? "products"
                  : group.title === "Services"
                    ? "services"
                    : undefined
              }
              key={group.title}
            >
              <div className="pillar-header">
                <span className="pillar-number">{group.number}</span>

                <div>
                  <p>{group.eyebrow}</p>
                  <h3>{group.title}</h3>
                </div>
              </div>

              <div className="mini-card-stack">
                {group.items.map((item) => (
                  <a
                    className={`mini-card ${item.accent}`}
                    href={item.href || "#contact"}
                    target={item.href ? "_blank" : undefined}
                    rel={item.href ? "noopener noreferrer" : undefined}
                    key={item.title}
                    onClick={() => trackContentClick(item, group.title === "Products" ? "product" : group.title)}
                  >
                    <span className="mini-icon">
                      <Spark />
                    </span>

                    <div className="mini-content">
                      <h4>{item.title}</h4>
                      <p>{item.copy}</p>
                    </div>

                    <div className="mini-footer">
                      <span>{item.status}</span>

                      <i>
                        <ArrowUpRight />
                      </i>
                    </div>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= FOCUS ================= */}
      <section className="focus section" id="focus">
        <div className="focus-heading">
          <div>
            <p className="eyebrow">WHERE WE&apos;LL FOCUS</p>

            <h2>
              Big problems are
              <br />
              <span>invitations to build.</span>
            </h2>
          </div>

          <div className="focus-note">
            <span className="note-icon">
              <Spark />
            </span>

            <p>
              Inspired by India&apos;s most meaningful entrepreneurial
              challenges.
            </p>
          </div>
        </div>

        <div className="focus-grid">
          {focusAreas.map((area) => (
            <article className="focus-card" key={area.number}>
              <div className="focus-card-top">
                <span>{area.tag}</span>
                <b>{area.number}</b>
              </div>

              <h3>{area.title}</h3>

              <p>{area.description}</p>

              <a
                href="https://www.startupindia.gov.in/content/sih/en/India_EODB_Grand_Challenge/problem-statement.html"
                target="_blank"
                rel="noreferrer"
                aria-label={`View source for ${area.title}`}
              >
                View challenge <ArrowUpRight />
              </a>
            </article>
          ))}
        </div>

        <a
          className="source-link"
          href="https://www.startupindia.gov.in/content/sih/en/India_EODB_Grand_Challenge/problem-statement.html"
          target="_blank"
          rel="noreferrer"
        >
          View the Startup India problem statements <ArrowUpRight />
        </a>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about section" id="about">
        <p className="eyebrow">ABOUT WEBWXHALE</p>

        <div className="about-layout">
          <h2>
            We believe good
            <br />
            work <em>compounds.</em>
          </h2>

          <div>
            <p>
              WEBXWHALE is a multipurpose platform for people who want to turn
              an early spark into meaningful progress. Learn the skills, use
              the tools and find the support to keep building.
            </p>

            <a className="text-link dark" href="#contact">
              Let&apos;s build together <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="contact section" id="contact">
        <div className="contact-inner">
          <p className="eyebrow">HAVE AN IDEA?</p>

          <h2>
            Let&apos;s give it
            <br />
            <em>momentum.</em>
          </h2>

          <a
            className="button button-dark"
            href="mailto:hello@webwhale.in"
          >
            Say hello <ArrowUpRight />
          </a>
        </div>

        <div className="contact-stamp">
          <Spark />

          <span>
            START
            <br />
            SOMETHING
            <br />
            GOOD
          </span>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="site-footer">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand-column">
            <a className="brand footer-brand" href="#home">
              <img
                className="brand-logo"
                src="/webwhale_logo.png"
                alt="WEBWHALE"
              />

              <span className="brand-name">
                WEBWHALE<span className="brand-dot">.</span>
              </span>
            </a>

            <p className="footer-description">
              Learning, tools and technology for people and businesses
              ready to move forward.
            </p>

            <a
              className="footer-email"
              href="mailto:hello@webwhale.in"
            >
              hello@webwhale.in
              <ArrowUpRight />
            </a>
          </div>

          {/* Products */}
          <div className="footer-column">
            <p className="footer-heading">PRODUCTS</p>

            <nav className="footer-links">
              <a href="/products">
                SQLwhale
              </a>

              <a href="/products">
                Resume Analyzer
              </a>

              <a href="/products">
                AI 8D Audio Converter
              </a>

              <a href="/products">
                More Products
              </a>
            </nav>
          </div>

          {/* Services */}
          <div className="footer-column">
            <p className="footer-heading">SERVICES</p>

            <nav className="footer-links">
              <a href="/services/web-development">
                Web Development
              </a>

              <a href="/services">
                Marketing
              </a>

              <a href="/services">
                Consulting
              </a>

              <a href="/contact">
                Work with us
              </a>
            </nav>
          </div>

          {/* Company / Legal */}
          <div className="footer-column">
            <p className="footer-heading">COMPANY</p>

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

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} WEBWHALE. All rights reserved.
          </div>

          <div className="footer-bottom-links">
            <a href="/terms">
              Terms
            </a>

            <a href="/privacy">
              Privacy
            </a>

            <a href="/home">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}