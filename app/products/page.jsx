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
  >
    <path
      d="M5 12h13M13 6l6 6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ExternalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      d="M14 5h5v5M19 5l-8 8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
      strokeLinecap="round"
    />
  </svg>
);

const trackProductClick = (product) => {
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
        targetId: String(product._id || product.id || product.name),
        targetName: product.name,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
};

const SparkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
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

const DatabaseIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <ellipse
      cx="32"
      cy="14"
      rx="19"
      ry="8"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="M13 14v18c0 5 9 8 19 8s19-3 19-8V14"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="M13 32v18c0 5 9 8 19 8s19-3 19-8V32"
      stroke="currentColor"
      strokeWidth="2.5"
    />
  </svg>
);

const ResumeIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <rect
      x="15"
      y="7"
      width="34"
      height="50"
      rx="3"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <circle
      cx="32"
      cy="22"
      r="6"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M22 39c2-6 18-6 20 0M22 48h20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MusicIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <path
      d="M40 13v29"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M40 13 54 10v27"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <ellipse
      cx="31"
      cy="46"
      rx="9"
      ry="6"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <ellipse
      cx="45"
      cy="40"
      rx="9"
      ry="6"
      stroke="currentColor"
      strokeWidth="2.5"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <path
      d="M32 6 51 14v15c0 13-8 23-19 29C21 52 13 42 13 29V14L32 6Z"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="m23 32 6 6 12-14"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GameIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <path
      d="M17 24h30c8 0 12 8 10 16l-3 11c-1 4-6 5-9 2l-7-8H26l-7 8c-3 3-8 2-9-2L7 40c-2-8 2-16 10-16Z"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      d="M20 31v12M14 37h12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="44" cy="34" r="2" fill="currentColor" />
    <circle cx="49" cy="39" r="2" fill="currentColor" />
  </svg>
);

/* =========================================================
   PRODUCT DATA
========================================================= */

const defaultCurrentProducts = [
  {
    id: "01",
    name: "SQLwhale",
    category: "Developer Tool",
    status: "LIVE",
    icon: DatabaseIcon,
    description:
      "An interactive SQL learning and visualization experience designed to make database concepts easier to understand.",
    tags: [
      "SQL",
      "Database",
      "Learning",
      "Developer",
    ],
    accent: "cyan",
    featured: true,
    href: "https://sqlwhalefrontend.vercel.app/",
  },
  {
    id: "02",
    name: "Resume Analyzer",
    category: "Career Tool",
    status: "LIVE",
    icon: ResumeIcon,
    description:
      "A smart resume-focused tool designed to help users understand and improve their resumes for modern recruitment workflows.",
    tags: [
      "Career",
      "Resume",
      "AI",
      "Productivity",
    ],
    accent: "violet",
    featured: false,
    href: "https://t.me/ScanMyResumeBot",
  },
  {
    id: "03",
    name: "AI 8D Audio Converter",
    category: "Creative Tool",
    status: "LIVE",
    icon: MusicIcon,
    description:
      "A digital experience focused on improving the way users interact with and experience their music.",
    tags: [
      "Audio",
      "Music",
      "Creative",
      "Experience",
    ],
    accent: "blue",
    featured: false,
    href: "https://project911-flame.vercel.app/",
  },
  {
    id: "04",
    name: "Webchat",
    category: "Communication Tool",
    status: "LIVE",
    icon: SparkIcon,
    description:
      "A lightweight web chat experience for connecting and communicating online.",
    tags: [
      "Chat",
      "Communication",
      "Web",
      "Community",
    ],
    accent: "cyan",
    featured: false,
    href: "https://webwhalechat.netlify.app/",
  },
];

const comingProducts = [
  {
    id: "05",
    name: "WebWhale AI",
    category: "Artificial Intelligence",
    icon: SparkIcon,
    description:
      "An upcoming AI-powered experience exploring smarter ways to work, learn, create, and interact with technology.",
    eta: "IN DEVELOPMENT",
  },
  {
    id: "06",
    name: "WhaleShield",
    category: "Security",
    icon: ShieldIcon,
    description:
      "A future-focused security concept designed around safer and more reliable digital experiences.",
    eta: "COMING SOON",
  },
  {
    id: "07",
    name: "WhalePlay",
    category: "Entertainment",
    icon: GameIcon,
    description:
      "A planned entertainment and gaming-oriented experience exploring a new side of the WEBWHALE ecosystem.",
    eta: "EXPLORING",
  },
];

/* =========================================================
   PRODUCT PAGE
========================================================= */

export default function ProductsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProduct, setSelectedProduct] =
    useState(null);
  const [currentProducts, setCurrentProducts] = useState(defaultCurrentProducts);

  const cursorGlow = useRef(null);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data.products)) return;
        const icons = { database: DatabaseIcon, resume: ResumeIcon, music: MusicIcon, shield: ShieldIcon, game: GameIcon, spark: SparkIcon };
        const mapped = data.products.map((item, index) => ({
          ...item,
          id: String(index + 1).padStart(2, "0"),
          icon: icons[item.icon] || SparkIcon,
          tags: Array.isArray(item.tags) ? item.tags : [],
          featured: index === 0,
        }));
        setCurrentProducts(mapped);
      })
      .catch(() => {});
  }, []);



  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  useEffect(() => {
    const elements =
      document.querySelectorAll(
        ".product-reveal"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "product-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () =>
      observer.disconnect();
  }, []);

  /* =======================================================
     MOUSE GLOW
  ======================================================= */

  useEffect(() => {
    const moveGlow = (event) => {
      if (!cursorGlow.current) return;

      cursorGlow.current.style.transform =
        `translate3d(
          ${event.clientX - 220}px,
          ${event.clientY - 220}px,
          0
        )`;
    };

    window.addEventListener(
      "mousemove",
      moveGlow
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        moveGlow
      );
  }, []);

  /* =======================================================
     CARD TILT
  ======================================================= */

  const handleTilt = (
    event,
    element
  ) => {
    if (window.innerWidth < 800)
      return;

    const rect =
      element.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - 0.5) * -5;

    const rotateY =
      ((x / rect.width) - 0.5) * 5;

    element.style.transform =
      `perspective(1100px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-7px)`;
  };

  const resetTilt = (element) => {
    element.style.transform =
      "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredProducts =
    activeFilter === "ALL"
      ? currentProducts
      : currentProducts.filter(
          (product) =>
            product.category
              .toUpperCase()
              .includes(
                activeFilter
              )
        );

  const closeMenu = () =>
    setMenuOpen(false);

  return (
    <main className="products-page">

      {/* ===================================================
          CURSOR GLOW
      =================================================== */}

      <div
        ref={cursorGlow}
        className="products-cursor-glow"
      />

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <nav
        className="navbar products-navbar"
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
            <span className="brand-dot">
              .
            </span>
          </span>
        </a>

        <button
          className={`menu-toggle ${
            menuOpen
              ? "is-open"
              : ""
          }`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          <span />
          <span />
        </button>

        <div
          className={`nav-links ${
            menuOpen
              ? "show"
              : ""
          }`}
        >

          <a
            href="/home"
            onClick={closeMenu}
          >
            Home
          </a>

          <a
            href="/services"
            onClick={closeMenu}
          >
            Services
          </a>

          <a
            className="active"
            href="/products"
            onClick={closeMenu}
          >
            Products
          </a>

          <a
            href="/aboutus"
            onClick={closeMenu}
          >
            About us
          </a>

          <a
            href="/terms"
            onClick={closeMenu}
          >
            Terms & Conditions
          </a>

          <a
            href="/privacy"
            onClick={closeMenu}
          >
            Privacy Policy
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

      <section className="products-hero">

        <div className="products-grid-bg" />

        <div className="products-glow glow-one" />
        <div className="products-glow glow-two" />

        <div className="hero-orbit orbit-a" />
        <div className="hero-orbit orbit-b" />

        <div className="products-hero-inner">

          <div className="products-status product-reveal">

            <span className="live-dot" />

            WEBWHALE / PRODUCTS

            <span>
              DIGITAL ECOSYSTEM
            </span>

          </div>

          <h1>

            <span className="hero-line-1">
              Ideas
            </span>

            <span className="hero-line-2">
              become
            </span>

            <span className="hero-line-3">
              <em>products.</em>
            </span>

          </h1>

          <div className="products-hero-bottom">

            <p className="product-reveal">
              Digital tools, experiments, and products
              created to make technology more useful,
              accessible, and interesting.
            </p>

            <div className="hero-counter product-reveal">
              <strong>
                {currentProducts.length
                  .toString()
                  .padStart(2, "0")}
              </strong>

              <span>
                CURRENT
                <br />
                PRODUCTS
              </span>
            </div>

          </div>

        </div>

        <div className="hero-side-text">
          SCROLL TO EXPLORE
          <span>↓</span>
        </div>

      </section>

      {/* ===================================================
          MOVING STRIP
      =================================================== */}

      <section className="product-marquee">

        <div className="product-marquee-track">

          {[1, 2].map((item) => (
            <div
              className="product-marquee-content"
              key={item}
            >

              <span>
                CURRENT PRODUCTS
              </span>

              <i>✦</i>

              <span>
                DIGITAL TOOLS
              </span>

              <i>✦</i>

              <span>
                FUTURE PRODUCTS
              </span>

              <i>✦</i>

              <span>
                EXPERIMENTS
              </span>

              <i>✦</i>

              <span>
                WEBWHALE LABS
              </span>

              <i>✦</i>

            </div>
          ))}

        </div>

      </section>

      {/* ===================================================
          PRODUCT INTRO
      =================================================== */}

      <section className="products-intro">

        <div className="products-intro-index">
          <span>01</span>

          <div />

          <span>PRODUCTS</span>
        </div>

        <div className="products-intro-main product-reveal">

          <p className="product-kicker">
            THE ECOSYSTEM
          </p>

          <h2>
            Small ideas.
            <br />
            <span>
              Big possibilities.
            </span>
          </h2>

          <p className="products-intro-copy">
            WEBWHALE products are built around a simple
            principle: technology should solve problems,
            create experiences, or make something easier.
          </p>

        </div>

        <div className="products-intro-side">

          <div className="ecosystem-number product-reveal">
            <strong>
              {currentProducts.length +
                comingProducts.length}
            </strong>

            <span>
              PRODUCTS
              <br />
              IN ECOSYSTEM
            </span>
          </div>

          <div className="ecosystem-number product-reveal">
            <strong>
              ∞
            </strong>

            <span>
              IDEAS
              <br />
              TO EXPLORE
            </span>
          </div>

        </div>

      </section>

      {/* ===================================================
          CURRENT PRODUCTS
      =================================================== */}

      <section
        className="current-products-section"
        id="current-products"
      >

        <div className="products-heading product-reveal">

          <div>

            <p className="product-kicker">
              02 / CURRENT
            </p>

            <h2>
              Products
              <br />
              <em>you can explore.</em>
            </h2>

          </div>

          <p>
            Explore the products currently being developed,
            tested, or made available within the WEBWHALE
            ecosystem.
          </p>

        </div>

        {/* FILTER */}

        <div className="product-filters product-reveal">

          {["ALL", ...Array.from(new Set(currentProducts.map((product) => product.category.toUpperCase())))].map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "filter-active"
                  : ""
              }
              onClick={() =>
                setActiveFilter(
                  filter
                )
              }
            >
              {filter}
            </button>
          ))}

        </div>

        {/* PRODUCTS */}

        <div className="current-products-grid">

          {filteredProducts.map(
            (product, index) => {

              const Icon =
                product.icon;

              return (
                <article
                  key={product.id}
                  className={`
                    product-card
                    ${
                      product.featured
                        ? "product-card-featured"
                        : ""
                    }
                    product-reveal
                  `}
                  style={{
                    "--product-delay":
                      `${index * 120}ms`,
                  }}
                  onMouseMove={(event) =>
                    handleTilt(
                      event,
                      event.currentTarget
                    )
                  }
                  onMouseLeave={(event) =>
                    resetTilt(
                      event.currentTarget
                    )
                  }
                >

                  <div className="product-card-glow" />

                  <div className="product-card-top">

                    <span className="product-id">
                      {product.id}
                    </span>

                    <span className="product-status">
                      <i />
                      {product.status}
                    </span>

                  </div>

                  <div className="product-icon">

                    <Icon />

                  </div>

                  <div className="product-card-content">

                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>

                  </div>

                  <div className="product-card-bottom">

                    <div className="product-tags">

                      {product.tags.map(
                        (tag) => (
                          <span key={tag}>
                            {tag}
                          </span>
                        )
                      )}

                    </div>

                    <button
                      className="product-open"
                      onClick={() => {
                        trackProductClick(product);
                        setSelectedProduct(product);
                      }
                      aria-label={`Explore ${product.name}`}
                    >
                      <ArrowUpRight />
                    </button>

                  </div>

                  <div className="product-card-scan" />

                </article>
              );
            }
          )}

        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-products">
            No products in this category yet.
          </div>
        )}

      </section>

      {/* ===================================================
          FEATURED PRODUCT
      =================================================== */}

      <section className="featured-product-section">

        <div className="featured-product-grid" />

        <div className="featured-product-inner">

          <div className="featured-copy product-reveal">

            <p className="product-kicker">
              FEATURED / 01
            </p>

            <h2>
              Meet
              <br />
              <span>
                SQLwhale.
              </span>
            </h2>

            <p>
              A visual and interactive approach to learning
              SQL and understanding how databases work.
            </p>

            <div className="featured-actions">

              <button
                className="featured-button"
                onClick={() =>
                  setSelectedProduct(
                    currentProducts[0]
                  )
                }
              >
                Explore product
                <ArrowUpRight />
              </button>

              <span>
                DEVELOPER
                <br />
                EDUCATION
              </span>

            </div>

          </div>

          <div className="featured-visual product-reveal">

            <div className="database-window">

              <div className="window-top">

                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>

                <span>
                  SQLWHALE / QUERY
                </span>

              </div>

              <div className="database-body">

                <div className="query-line">
                  <span>01</span>
                  <code>
                    SELECT *
                  </code>
                </div>

                <div className="query-line">
                  <span>02</span>
                  <code>
                    FROM users
                  </code>
                </div>

                <div className="query-line">
                  <span>03</span>
                  <code>
                    WHERE active = true;
                  </code>
                </div>

                <div className="query-result">
                  <span>
                    RESULT
                  </span>

                  <strong>
                    1,248 rows
                  </strong>
                </div>

              </div>

              <div className="database-floating-card">

                <span>
                  TABLE
                </span>

                <strong>
                  USERS
                </strong>

                <small>
                  01 — 248
                </small>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          COMING SOON
      =================================================== */}

      <section
        className="coming-section"
        id="coming-soon"
      >

        <div className="coming-header product-reveal">

          <div>

            <p className="product-kicker">
              03 / NEXT
            </p>

            <h2>
              Coming
              <br />
              <em>soon.</em>
            </h2>

          </div>

          <p>
            Some ideas need time. These products are part
            of what WEBWHALE is exploring next.
          </p>

        </div>

        <div className="coming-grid">

          {comingProducts.map(
            (product, index) => {

              const Icon =
                product.icon;

              return (
                <article
                  key={product.id}
                  className="coming-card product-reveal"
                  style={{
                    "--coming-delay":
                      `${index * 150}ms`,
                  }}
                >

                  <div className="coming-scan" />

                  <div className="coming-card-top">

                    <span>
                      {product.id}
                    </span>

                    <span className="coming-status">
                      {product.eta}
                    </span>

                  </div>

                  <div className="coming-icon">
                    <Icon />
                  </div>

                  <div className="coming-content">

                    <span>
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>

                  </div>

                  <div className="coming-bottom">

                    <div className="coming-bars">

                      <i />
                      <i />
                      <i />
                      <i />
                      <i />

                    </div>

                    <span>
                      0{index + 1}
                    </span>

                  </div>

                </article>
              );
            }
          )}

        </div>

      </section>

      {/* ===================================================
          ROADMAP
      =================================================== */}

      <section className="roadmap-section">

        <div className="roadmap-header product-reveal">

          <p className="product-kicker">
            THE ROAD AHEAD
          </p>

          <h2>
            Always
            <br />
            <span>
              building.
            </span>
          </h2>

        </div>

        <div className="roadmap">

          <div className="roadmap-line" />

          <div className="roadmap-item product-reveal">

            <span className="roadmap-number">
              01
            </span>

            <div>
              <span className="roadmap-label">
                NOW
              </span>

              <h3>
                Build useful products.
              </h3>

              <p>
                Focus on practical tools that solve clear
                problems and create meaningful experiences.
              </p>
            </div>

          </div>

          <div className="roadmap-item product-reveal">

            <span className="roadmap-number">
              02
            </span>

            <div>
              <span className="roadmap-label">
                NEXT
              </span>

              <h3>
                Explore new technology.
              </h3>

              <p>
                Experiment with AI, data, entertainment,
                education, and emerging digital experiences.
              </p>
            </div>

          </div>

          <div className="roadmap-item product-reveal">

            <span className="roadmap-number">
              03
            </span>

            <div>
              <span className="roadmap-label">
                FUTURE
              </span>

              <h3>
                Build an ecosystem.
              </h3>

              <p>
                Connect products and experiences into a
                broader technology ecosystem.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          CTA
      =================================================== */}

      <section className="products-cta">

        <div className="products-cta-grid" />

        <div className="products-cta-glow" />

        <div className="products-cta-content product-reveal">

          <p className="product-kicker">
            HAVE AN IDEA?
          </p>

          <h2>
            Maybe the next
            <br />
            product is <em>yours.</em>
          </h2>

          <p>
            Have an idea for a product, collaboration, or
            technology experiment? Let&apos;s talk about it.
          </p>

          <a
            href="/contact"
            className="products-cta-button"
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
                <span className="brand-dot">
                  .
                </span>
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
                All Products
              </a>

              <a href="/products#current-products">
                Current Products
              </a>

              <a href="/products#coming-soon">
                Coming Soon
              </a>

              <a href="/contact">
                Suggest a Product
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
          PRODUCT MODAL
      =================================================== */}

      {selectedProduct && (
        <div
          className="product-modal-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <div
            className="product-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedProduct(null)
              }
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-icon">

              {(() => {
                const Icon =
                  selectedProduct.icon;

                return <Icon />;
              })()}

            </div>

            <span className="product-category">
              {selectedProduct.category}
            </span>

            <h2>
              {selectedProduct.name}
            </h2>

            <p>
              {selectedProduct.description}
            </p>

            <div className="modal-tags">

              {selectedProduct.tags?.map(
                (tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                )
              )}

            </div>

            <a
              href={
                selectedProduct.href ||
                "/contact"
              }
              target={selectedProduct.href ? "_blank" : undefined}
              rel={
                selectedProduct.href
                  ? "noopener noreferrer"
                  : undefined
              }
              className="modal-button"
            >
              Explore product
              <ArrowUpRight />
            </a>

          </div>

        </div>
      )}

      {/* ===================================================
          INTERNAL CSS
      =================================================== */}

      <style jsx>{`

        /* =====================================================
           BASE
        ===================================================== */

        .products-page {
          --p-dark: #03070a;
          --p-panel: #081219;
          --p-cyan: #12c8e8;
          --p-blue: #087c9a;
          --p-cream: #f2f0e8;

          position: relative;

          overflow: hidden;

          background: var(--p-cream);

          color: var(--ink);
        }

        .products-page svg {
          width: 100%;
          height: 100%;
        }

        .product-kicker {
          color: #7d8580;

          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;

          letter-spacing: .13em;

          text-transform: uppercase;
        }


        /* =====================================================
           CURSOR GLOW
        ===================================================== */

        .products-cursor-glow {
          position: fixed;

          left: 0;
          top: 0;

          width: 440px;
          height: 440px;

          z-index: 0;

          pointer-events: none;

          border-radius: 50%;

          opacity: .11;

          background:
            radial-gradient(
              circle,
              var(--p-cyan),
              transparent 68%
            );

          filter: blur(35px);

          mix-blend-mode: screen;

          transition:
            transform
            .2s
            cubic-bezier(.16,1,.3,1);
        }


        /* =====================================================
           NAVBAR
        ===================================================== */

        .products-navbar {
          position: absolute;

          top: 0;
          left: 0;
          right: 0;

          z-index: 50;

          background:
            transparent !important;

          color: white;
        }

        .products-navbar .brand-name {
          color: white;
        }

        .products-navbar .nav-links a {
          color:
            rgba(255,255,255,.7);
        }

        .products-navbar .nav-links a:hover,
        .products-navbar .nav-links a.active {
          color: white;
        }


        /* =====================================================
           HERO
        ===================================================== */

        .products-hero {
          position: relative;

          min-height: 850px;

          display: flex;

          align-items: center;

          overflow: hidden;

          color: white;

          background:
            radial-gradient(
              circle at 75% 35%,
              rgba(18,200,232,.16),
              transparent 27%
            ),
            radial-gradient(
              circle at 20% 75%,
              rgba(0,100,180,.1),
              transparent 32%
            ),
            var(--p-dark);
        }

        .products-grid-bg {
          position: absolute;

          inset: 0;

          opacity: .17;

          background-image:
            linear-gradient(
              rgba(18,200,232,.2) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(18,200,232,.2) 1px,
              transparent 1px
            );

          background-size:
            75px
            75px;

          mask-image:
            radial-gradient(
              ellipse at center,
              black,
              transparent 78%
            );

          animation:
            productGridMove
            22s
            linear
            infinite;
        }

        .products-glow {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;

          filter: blur(2px);
        }

        .glow-one {
          width: 650px;
          height: 650px;

          right: -180px;
          top: 60px;

          background:
            radial-gradient(
              circle at 35% 30%,
              rgba(18,200,232,.45),
              rgba(8,124,154,.15) 38%,
              transparent 70%
            );

          animation:
            productOrb
            9s
            ease-in-out
            infinite;
        }

        .glow-two {
          width: 320px;
          height: 320px;

          left: -170px;
          bottom: 30px;

          background:
            radial-gradient(
              circle,
              rgba(20,110,220,.22),
              transparent 70%
            );

          animation:
            productOrb
            12s
            ease-in-out
            infinite
            reverse;
        }

        .hero-orbit {
          position: absolute;

          left: 68%;
          top: 50%;

          border:
            1px
            solid
            rgba(18,200,232,.18);

          border-radius: 50%;

          transform:
            translate(-50%,-50%);
        }

        .orbit-a {
          width: 500px;
          height: 500px;

          animation:
            orbitSpin
            28s
            linear
            infinite;
        }

        .orbit-b {
          width: 720px;
          height: 300px;

          transform:
            translate(-50%,-50%)
            rotate(35deg);

          animation:
            orbitSpin
            36s
            linear
            infinite
            reverse;
        }

        .products-hero-inner {
          position: relative;

          z-index: 2;

          width:
            min(
              1240px,
              100%
            );

          margin: 0 auto;

          padding:
            150px
            clamp(24px,7vw,100px)
            80px;
        }

        .products-status {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-bottom: 55px;

          color:
            rgba(255,255,255,.43);

          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;

          letter-spacing: .12em;
        }

        .products-status > span:last-child {
          margin-left: auto;

          color:
            rgba(255,255,255,.25);
        }

        .live-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background:
            var(--p-cyan);

          box-shadow:
            0 0 15px
            rgba(18,200,232,.9);

          animation:
            livePulse
            2s
            ease-in-out
            infinite;
        }

        .products-hero h1 {
          margin: 0;

          max-width: 1000px;

          font-size:
            clamp(
              75px,
              12vw,
              165px
            );

          line-height: .76;

          letter-spacing: -.09em;
        }

        .products-hero h1 > span {
          display: block;

          opacity: 0;

          transform:
            translateY(70px);

          animation:
            productHeroIn
            1s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .hero-line-1 {
          animation-delay: .1s !important;
        }

        .hero-line-2 {
          margin-left: 10vw;

          animation-delay: .25s !important;
        }

        .hero-line-3 {
          margin-left: 20vw;

          animation-delay: .4s !important;
        }

        .products-hero h1 em {
          color:
            var(--p-cyan);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;
        }

        .products-hero-bottom {
          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 50px;

          margin-top: 95px;

          padding-left: 20vw;
        }

        .products-hero-bottom > p {
          max-width: 470px;

          margin: 0;

          color:
            rgba(255,255,255,.52);

          font-size: 15px;

          line-height: 1.7;
        }

        .hero-counter {
          display: flex;

          align-items: center;

          gap: 13px;

          padding:
            14px
            18px;

          border:
            1px
            solid
            rgba(255,255,255,.12);

          background:
            rgba(255,255,255,.025);

          backdrop-filter: blur(8px);
        }

        .hero-counter strong {
          color:
            var(--p-cyan);

          font-size: 38px;

          line-height: .8;
        }

        .hero-counter span {
          color:
            rgba(255,255,255,.4);

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          line-height: 1.5;

          letter-spacing: .1em;
        }

        .hero-side-text {
          position: absolute;

          right: 27px;
          bottom: 35px;

          z-index: 3;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 10px;

          color:
            rgba(255,255,255,.3);

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          letter-spacing: .08em;
        }

        .hero-side-text span {
          color:
            var(--p-cyan);

          font-size: 18px;

          animation:
            scrollBounce
            1.8s
            ease-in-out
            infinite;
        }


        /* =====================================================
           MARQUEE
        ===================================================== */

        .product-marquee {
          overflow: hidden;

          padding:
            20px
            0;

          background:
            var(--p-cyan);

          color:
            #001116;
        }

        .product-marquee-track {
          display: flex;

          width: max-content;

          animation:
            productMarquee
            25s
            linear
            infinite;
        }

        .product-marquee-content {
          display: flex;

          align-items: center;

          gap: 28px;

          padding-right: 28px;

          white-space: nowrap;

          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;

          letter-spacing: .08em;
        }

        .product-marquee-content i {
          opacity: .45;

          font-style: normal;
        }


        /* =====================================================
           INTRO
        ===================================================== */

        .products-intro {
          display: grid;

          grid-template-columns:
            100px
            minmax(0,1fr)
            220px;

          gap: 50px;

          padding:
            145px
            clamp(24px,7vw,110px);

          background:
            var(--p-cream);
        }

        .products-intro-index {
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

        .products-intro-index div {
          width: 1px;
          height: 110px;

          background:
            var(--line);
        }

        .products-intro-main {
          max-width: 760px;
        }

        .products-intro-main h2 {
          margin:
            20px
            0
            35px;

          font-size:
            clamp(
              55px,
              7vw,
              95px
            );

          line-height: .87;

          letter-spacing: -.07em;
        }

        .products-intro-main h2 span {
          color:
            var(--p-blue);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-style: italic;

          font-weight: 400;
        }

        .products-intro-copy {
          max-width: 650px;

          color:
            var(--muted);

          font-size: 17px;

          line-height: 1.7;
        }

        .products-intro-side {
          display: flex;

          flex-direction: column;

          gap: 15px;
        }

        .ecosystem-number {
          min-height: 155px;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          padding: 24px;

          background: white;

          border:
            1px
            solid
            var(--line);
        }

        .ecosystem-number strong {
          font-size: 65px;

          line-height: .8;

          letter-spacing: -.08em;
        }

        .ecosystem-number span {
          color: #858d87;

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          line-height: 1.5;

          letter-spacing: .1em;
        }


        /* =====================================================
           CURRENT PRODUCTS
        ===================================================== */

        .current-products-section {
          padding:
            135px
            clamp(20px,7vw,110px)
            145px;

          background:
            #ebe9e0;
        }

        .products-heading {
          max-width: 1120px;

          margin:
            0
            auto
            45px;

          display: grid;

          grid-template-columns:
            1fr
            .7fr;

          gap: 80px;

          align-items: end;
        }

        .products-heading h2 {
          margin-top: 20px;

          font-size:
            clamp(
              55px,
              7vw,
              95px
            );

          line-height: .85;

          letter-spacing: -.075em;
        }

        .products-heading h2 em {
          color:
            var(--p-blue);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;
        }

        .products-heading > p {
          max-width: 450px;

          margin-bottom: 5px;

          color:
            var(--muted);

          font-size: 14px;

          line-height: 1.7;
        }


        /* =====================================================
           FILTERS
        ===================================================== */

        .product-filters {
          max-width: 1120px;

          margin:
            0
            auto
            35px;

          display: flex;

          gap: 7px;

          flex-wrap: wrap;
        }

        .product-filters button {
          padding:
            9px
            13px;

          border:
            1px
            solid
            #d0d4ce;

          background:
            transparent;

          color:
            #777f79;

          cursor: pointer;

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          letter-spacing: .06em;

          transition:
            background .25s ease,
            border-color .25s ease,
            color .25s ease,
            transform .25s ease;
        }

        .product-filters button:hover {
          transform:
            translateY(-2px);

          border-color:
            var(--p-blue);

          color:
            var(--p-blue);
        }

        .product-filters button.filter-active {
          color: white;

          border-color:
            var(--p-dark);

          background:
            var(--p-dark);
        }


        /* =====================================================
           CURRENT PRODUCT CARDS
        ===================================================== */

        .current-products-grid {
          max-width: 1120px;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            repeat(2,1fr);

          gap: 16px;
        }

        .product-card {
          position: relative;

          min-height: 510px;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          padding: 30px;

          overflow: hidden;

          color: white;

          background:
            linear-gradient(
              145deg,
              #071116,
              #0a1d24
            );

          border:
            1px
            solid
            rgba(255,255,255,.07);

          box-shadow:
            0 25px 60px
            rgba(0,0,0,.07);

          transform:
            perspective(1100px)
            rotateX(0)
            rotateY(0);

          transition:
            transform .35s
            cubic-bezier(.16,1,.3,1),
            border-color .3s ease;

          will-change: transform;

          transition-delay:
            var(--product-delay);
        }

        .product-card-featured {
          grid-column:
            span 2;

          min-height: 430px;
        }

        .product-card:hover {
          border-color:
            rgba(18,200,232,.38);
        }

        .product-card-glow {
          position: absolute;

          width: 350px;
          height: 350px;

          right: -140px;
          top: -150px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(18,200,232,.2),
              transparent 68%
            );

          transition:
            transform .6s ease;
        }

        .product-card:hover
        .product-card-glow {
          transform:
            scale(1.35);
        }

        .product-card-top {
          display: flex;

          align-items: center;

          justify-content: space-between;
        }

        .product-id {
          color:
            rgba(255,255,255,.35);

          font-family:
            "DM Mono",
            monospace;

          font-size: 9px;
        }

        .product-status {
          display: flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(255,255,255,.45);

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          letter-spacing: .07em;
        }

        .product-status i {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            var(--p-cyan);

          box-shadow:
            0 0 10px
            rgba(18,200,232,.8);

          animation:
            livePulse
            2s
            ease-in-out
            infinite;
        }

        .product-icon {
          position: relative;

          z-index: 2;

          width: 65px;
          height: 65px;

          padding: 15px;

          margin-top: 30px;

          color:
            var(--p-cyan);

          border:
            1px
            solid
            rgba(18,200,232,.25);

          background:
            rgba(18,200,232,.04);

          transition:
            transform .35s ease;
        }

        .product-card:hover
        .product-icon {
          transform:
            rotate(-7deg)
            scale(1.08);
        }

        .product-card-content {
          position: relative;

          z-index: 2;

          margin-top: 30px;
        }

        .product-category {
          display: block;

          margin-bottom: 12px;

          color:
            rgba(255,255,255,.38);

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          letter-spacing: .1em;

          text-transform: uppercase;
        }

        .product-card-content h3 {
          margin:
            0
            0
            16px;

          font-size:
            clamp(
              38px,
              5vw,
              65px
            );

          line-height: .9;

          letter-spacing: -.065em;
        }

        .product-card-content p {
          max-width: 600px;

          margin: 0;

          color:
            rgba(255,255,255,.5);

          font-size: 14px;

          line-height: 1.7;
        }

        .product-card-bottom {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 20px;

          margin-top: 30px;
        }

        .product-tags {
          display: flex;

          flex-wrap: wrap;

          gap: 6px;
        }

        .product-tags span {
          padding:
            6px
            9px;

          color:
            rgba(255,255,255,.42);

          border:
            1px
            solid
            rgba(255,255,255,.1);

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;
        }

        .product-open {
          flex-shrink: 0;

          width: 47px;
          height: 47px;

          display: grid;

          place-items: center;

          color:
            var(--p-cyan);

          border:
            1px
            solid
            rgba(18,200,232,.25);

          background:
            transparent;

          cursor: pointer;

          transition:
            transform .3s ease,
            background .3s ease;
        }

        .product-open svg {
          width: 18px;
          height: 18px;
        }

        .product-card:hover
        .product-open {
          transform:
            rotate(-45deg);

          background:
            rgba(18,200,232,.1);
        }

        .product-card-scan {
          position: absolute;

          left: 0;
          right: 0;

          top: -20%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--p-cyan),
              transparent
            );

          opacity: 0;

          transition:
            top .7s
            cubic-bezier(.16,1,.3,1),
            opacity .3s ease;
        }

        .product-card:hover
        .product-card-scan {
          top: 120%;

          opacity: .6;
        }

        .empty-products {
          max-width: 1120px;

          margin:
            20px
            auto
            0;

          padding: 40px;

          text-align: center;

          color:
            var(--muted);

          border:
            1px
            dashed
            #c8ccc6;
        }


        /* =====================================================
           FEATURED
        ===================================================== */

        .featured-product-section {
          position: relative;

          min-height: 750px;

          overflow: hidden;

          color: white;

          background:
            linear-gradient(
              125deg,
              #02070a,
              #06242d,
              #087c9a
            );
        }

        .featured-product-grid {
          position: absolute;

          inset: 0;

          opacity: .14;

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

          background-size:
            75px
            75px;

          mask-image:
            radial-gradient(
              circle at center,
              black,
              transparent 78%
            );
        }

        .featured-product-inner {
          position: relative;

          z-index: 2;

          max-width: 1200px;

          min-height: 750px;

          margin: 0 auto;

          padding:
            110px
            clamp(24px,6vw,90px);

          display: grid;

          grid-template-columns:
            .8fr
            1.2fr;

          gap: 70px;

          align-items: center;
        }

        .featured-copy h2 {
          margin:
            20px
            0
            30px;

          font-size:
            clamp(
              60px,
              8vw,
              110px
            );

          line-height: .83;

          letter-spacing: -.08em;
        }

        .featured-copy h2 span {
          color:
            var(--p-cyan);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;
        }

        .featured-copy > p:not(.product-kicker) {
          max-width: 430px;

          color:
            rgba(255,255,255,.52);

          font-size: 15px;

          line-height: 1.7;
        }

        .featured-actions {
          display: flex;

          align-items: center;

          gap: 25px;

          margin-top: 35px;
        }

        .featured-button {
          display: inline-flex;

          align-items: center;

          gap: 10px;

          padding:
            14px
            18px;

          border: none;

          background:
            var(--p-cyan);

          color:
            #001116;

          cursor: pointer;

          font-size: 11px;

          font-weight: 600;

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .featured-button svg {
          width: 16px;
          height: 16px;
        }

        .featured-button:hover {
          transform:
            translateY(-3px);

          box-shadow:
            0 15px 35px
            rgba(18,200,232,.25);
        }

        .featured-actions > span {
          color:
            rgba(255,255,255,.3);

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          line-height: 1.5;

          letter-spacing: .1em;
        }


        /* =====================================================
           DATABASE VISUAL
        ===================================================== */

        .featured-visual {
          position: relative;

          min-height: 480px;

          display: grid;

          place-items: center;
        }

        .database-window {
          position: relative;

          width: min(
            560px,
            100%
          );

          min-height: 360px;

          overflow: hidden;

          background:
            #061015;

          border:
            1px
            solid
            rgba(18,200,232,.25);

          box-shadow:
            0 40px 100px
            rgba(0,0,0,.3);

          transform:
            perspective(1000px)
            rotateY(-7deg)
            rotateX(3deg);

          animation:
            databaseFloat
            5s
            ease-in-out
            infinite;
        }

        .window-top {
          height: 45px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding:
            0
            16px;

          border-bottom:
            1px
            solid
            rgba(255,255,255,.08);

          color:
            rgba(255,255,255,.35);

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          letter-spacing: .08em;
        }

        .window-dots {
          display: flex;

          gap: 5px;
        }

        .window-dots i {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.2);
        }

        .database-body {
          padding: 30px;
        }

        .query-line {
          display: grid;

          grid-template-columns:
            30px
            1fr;

          margin-bottom: 15px;

          font-family:
            "DM Mono",
            monospace;

          font-size: 11px;
        }

        .query-line > span {
          color:
            rgba(255,255,255,.2);
        }

        .query-line code {
          color:
            var(--p-cyan);
        }

        .query-result {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-top: 40px;

          padding:
            15px;

          border:
            1px
            solid
            rgba(18,200,232,.12);

          background:
            rgba(18,200,232,.035);
        }

        .query-result span {
          color:
            rgba(255,255,255,.3);

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;
        }

        .query-result strong {
          color:
            #65eaff;

          font-family:
            "DM Mono",
            monospace;

          font-size: 10px;
        }

        .database-floating-card {
          position: absolute;

          right: -45px;
          bottom: -25px;

          width: 155px;

          padding:
            18px;

          color: white;

          background:
            rgba(5,18,23,.88);

          border:
            1px
            solid
            rgba(18,200,232,.3);

          backdrop-filter:
            blur(12px);

          box-shadow:
            0 20px 50px
            rgba(0,0,0,.3);
        }

        .database-floating-card span {
          display: block;

          margin-bottom: 9px;

          color:
            rgba(255,255,255,.3);

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;
        }

        .database-floating-card strong {
          display: block;

          margin-bottom: 12px;

          color:
            var(--p-cyan);

          font-size: 20px;
        }

        .database-floating-card small {
          color:
            rgba(255,255,255,.3);

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;
        }


        /* =====================================================
           COMING SOON
        ===================================================== */

        .coming-section {
          padding:
            140px
            clamp(20px,7vw,110px);

          background:
            var(--p-cream);
        }

        .coming-header {
          max-width: 1120px;

          margin:
            0
            auto
            75px;

          display: grid;

          grid-template-columns:
            1fr
            .7fr;

          gap: 80px;

          align-items: end;
        }

        .coming-header h2 {
          margin-top: 20px;

          font-size:
            clamp(
              60px,
              8vw,
              105px
            );

          line-height: .82;

          letter-spacing: -.08em;
        }

        .coming-header h2 em {
          color:
            var(--p-blue);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;
        }

        .coming-header > p {
          max-width: 450px;

          margin-bottom: 5px;

          color:
            var(--muted);

          font-size: 14px;

          line-height: 1.7;
        }

        .coming-grid {
          max-width: 1120px;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            repeat(3,1fr);

          gap: 14px;
        }

        .coming-card {
          position: relative;

          min-height: 430px;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          padding: 27px;

          overflow: hidden;

          color: white;

          background:
            #081117;

          border:
            1px
            solid
            #17252b;

          transition:
            transform .35s ease,
            border-color .3s ease;

          transition-delay:
            var(--coming-delay);
        }

        .coming-card:hover {
          transform:
            translateY(-8px);

          border-color:
            rgba(18,200,232,.4);
        }

        .coming-card::before {
          content: "";

          position: absolute;

          width: 200px;
          height: 200px;

          right: -90px;
          top: -90px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(18,200,232,.13),
              transparent 70%
            );
        }

        .coming-scan {
          position: absolute;

          left: 0;
          right: 0;

          top: -30%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--p-cyan),
              transparent
            );

          opacity: .2;

          animation:
            comingScan
            4s
            ease-in-out
            infinite;
        }

        .coming-card-top {
          display: flex;

          justify-content: space-between;

          align-items: center;

          color:
            rgba(255,255,255,.28);

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;
        }

        .coming-status {
          padding:
            5px
            8px;

          border:
            1px
            solid
            rgba(18,200,232,.18);

          color:
            rgba(18,200,232,.65);
        }

        .coming-icon {
          width: 60px;
          height: 60px;

          padding: 14px;

          margin-top: 25px;

          color:
            rgba(18,200,232,.7);

          border:
            1px
            solid
            rgba(18,200,232,.2);
        }

        .coming-content {
          margin-top: 30px;
        }

        .coming-content > span {
          color:
            rgba(255,255,255,.3);

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;

          letter-spacing: .1em;
        }

        .coming-content h3 {
          margin:
            12px
            0
            15px;

          font-size: 35px;

          line-height: .95;

          letter-spacing: -.055em;
        }

        .coming-content p {
          margin: 0;

          color:
            rgba(255,255,255,.4);

          font-size: 12px;

          line-height: 1.7;
        }

        .coming-bottom {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-top: 30px;
        }

        .coming-bars {
          display: flex;

          gap: 3px;
        }

        .coming-bars i {
          display: block;

          width: 18px;
          height: 3px;

          background:
            rgba(18,200,232,.16);
        }

        .coming-bars i:nth-child(1) {
          background:
            var(--p-cyan);
        }

        .coming-bars i:nth-child(2) {
          background:
            rgba(18,200,232,.7);
        }

        .coming-bottom > span {
          color:
            rgba(255,255,255,.2);

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;
        }


        /* =====================================================
           ROADMAP
        ===================================================== */

        .roadmap-section {
          padding:
            140px
            clamp(24px,7vw,110px);

          background:
            #e5e3da;
        }

        .roadmap-header {
          max-width: 1120px;

          margin:
            0
            auto
            90px;
        }

        .roadmap-header h2 {
          margin-top: 20px;

          font-size:
            clamp(
              60px,
              8vw,
              105px
            );

          line-height: .83;

          letter-spacing: -.08em;
        }

        .roadmap-header h2 span {
          color:
            var(--p-blue);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;
        }

        .roadmap {
          position: relative;

          max-width: 1120px;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            repeat(3,1fr);

          gap: 0;

          border-top:
            1px
            solid
            #c7cbc5;
        }

        .roadmap-line {
          position: absolute;

          left: 0;
          right: 0;
          top: -1px;

          height: 2px;

          background:
            linear-gradient(
              90deg,
              var(--p-blue),
              transparent
            );

          animation:
            roadmapLine
            2s
            ease
            forwards;
        }

        .roadmap-item {
          padding:
            35px
            25px;

          border-right:
            1px
            solid
            #c7cbc5;
        }

        .roadmap-item:first-of-type {
          border-left:
            1px
            solid
            #c7cbc5;
        }

        .roadmap-number {
          display: block;

          margin-bottom: 60px;

          color:
            var(--p-blue);

          font-family:
            "DM Mono",
            monospace;

          font-size: 10px;
        }

        .roadmap-label {
          color:
            #8b928c;

          font-family:
            "DM Mono",
            monospace;

          font-size: 8px;

          letter-spacing: .1em;
        }

        .roadmap-item h3 {
          margin:
            13px
            0
            15px;

          font-size: 24px;

          line-height: 1.05;

          letter-spacing: -.04em;
        }

        .roadmap-item p {
          max-width: 280px;

          margin: 0;

          color:
            var(--muted);

          font-size: 12px;

          line-height: 1.7;
        }


        /* =====================================================
           CTA
        ===================================================== */

        .products-cta {
          position: relative;

          min-height: 600px;

          display: flex;

          align-items: center;

          overflow: hidden;

          padding:
            100px
            clamp(24px,7vw,110px);

          color: white;

          background:
            linear-gradient(
              125deg,
              #02080b,
              #062c37,
              #087c9a
            );
        }

        .products-cta-grid {
          position: absolute;

          inset: 0;

          opacity: .13;

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

          background-size:
            80px
            80px;
        }

        .products-cta-glow {
          position: absolute;

          width: 700px;
          height: 700px;

          right: -250px;
          top: -150px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 35%,
              rgba(18,200,232,.5),
              rgba(18,200,232,.08) 40%,
              transparent 70%
            );

          animation:
            productOrb
            9s
            ease-in-out
            infinite;
        }

        .products-cta-content {
          position: relative;

          z-index: 2;

          max-width: 850px;
        }

        .products-cta-content h2 {
          margin:
            20px
            0
            30px;

          font-size:
            clamp(
              65px,
              9vw,
              125px
            );

          line-height: .8;

          letter-spacing: -.085em;
        }

        .products-cta-content h2 em {
          color:
            var(--p-cyan);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-weight: 400;
        }

        .products-cta-content > p:not(.product-kicker) {
          max-width: 510px;

          margin-bottom: 35px;

          color:
            rgba(255,255,255,.5);

          font-size: 15px;

          line-height: 1.7;
        }

        .products-cta-button {
          display: inline-flex;

          align-items: center;

          gap: 12px;

          padding:
            15px
            20px;

          color:
            #001116;

          background:
            var(--p-cyan);

          font-size: 11px;

          font-weight: 600;

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .products-cta-button svg {
          width: 17px;
          height: 17px;
        }

        .products-cta-button:hover {
          transform:
            translateY(-4px);

          box-shadow:
            0 15px 45px
            rgba(18,200,232,.25);
        }


        /* =====================================================
           MODAL
        ===================================================== */

        .product-modal-overlay {
          position: fixed;

          inset: 0;

          z-index: 100;

          display: grid;

          place-items: center;

          padding: 20px;

          background:
            rgba(0,8,11,.78);

          backdrop-filter:
            blur(12px);

          animation:
            modalFade
            .25s
            ease
            forwards;
        }

        .product-modal {
          position: relative;

          width:
            min(
              520px,
              100%
            );

          padding: 45px;

          color: white;

          background:
            linear-gradient(
              145deg,
              #08151b,
              #061015
            );

          border:
            1px
            solid
            rgba(18,200,232,.3);

          box-shadow:
            0 40px 100px
            rgba(0,0,0,.4);

          animation:
            modalIn
            .5s
            cubic-bezier(.16,1,.3,1);
        }

        .modal-close {
          position: absolute;

          top: 15px;
          right: 15px;

          width: 36px;
          height: 36px;

          border:
            1px
            solid
            rgba(255,255,255,.1);

          background:
            transparent;

          color:
            rgba(255,255,255,.6);

          cursor: pointer;

          font-size: 24px;

          line-height: 1;

          transition:
            background .2s ease,
            color .2s ease;
        }

        .modal-close:hover {
          color: white;

          background:
            rgba(255,255,255,.08);
        }

        .modal-icon {
          width: 65px;
          height: 65px;

          padding: 15px;

          margin-bottom: 25px;

          color:
            var(--p-cyan);

          border:
            1px
            solid
            rgba(18,200,232,.25);
        }

        .product-modal h2 {
          margin:
            10px
            0
            18px;

          font-size: 48px;

          line-height: .9;

          letter-spacing: -.06em;
        }

        .product-modal > p {
          margin-bottom: 25px;

          color:
            rgba(255,255,255,.52);

          font-size: 14px;

          line-height: 1.7;
        }

        .modal-tags {
          display: flex;

          flex-wrap: wrap;

          gap: 6px;

          margin-bottom: 30px;
        }

        .modal-tags span {
          padding:
            6px
            9px;

          color:
            rgba(255,255,255,.45);

          border:
            1px
            solid
            rgba(255,255,255,.1);

          font-family:
            "DM Mono",
            monospace;

          font-size: 7px;
        }

        .modal-button {
          display: inline-flex;

          align-items: center;

          gap: 10px;

          padding:
            13px
            17px;

          color:
            #001116;

          background:
            var(--p-cyan);

          font-size: 11px;

          font-weight: 600;
        }

        .modal-button svg {
          width: 16px;
          height: 16px;
        }


        /* =====================================================
           REVEAL
        ===================================================== */

        .product-reveal {
          opacity: 0;

          transform:
            translateY(45px);

          transition:
            opacity
            .85s
            cubic-bezier(.16,1,.3,1),
            transform
            .85s
            cubic-bezier(.16,1,.3,1);

          transition-delay:
            var(--product-delay, 0ms);
        }

        .product-visible {
          opacity: 1;

          transform:
            translateY(0);
        }


        /* =====================================================
           KEYFRAMES
        ===================================================== */

        @keyframes productHeroIn {
          from {
            opacity: 0;

            transform:
              translateY(70px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        @keyframes productGridMove {
          from {
            background-position:
              0 0;
          }

          to {
            background-position:
              75px 75px;
          }
        }

        @keyframes productOrb {
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

        @keyframes orbitSpin {
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

        @keyframes livePulse {
          0%,
          100% {
            opacity: .5;

            box-shadow:
              0 0 5px
              rgba(18,200,232,.3);
          }

          50% {
            opacity: 1;

            box-shadow:
              0 0 16px
              rgba(18,200,232,1);
          }
        }

        @keyframes scrollBounce {
          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(6px);
          }
        }

        @keyframes productMarquee {
          from {
            transform:
              translateX(0);
          }

          to {
            transform:
              translateX(-50%);
          }
        }

        @keyframes databaseFloat {
          0%,
          100% {
            transform:
              perspective(1000px)
              rotateY(-7deg)
              rotateX(3deg)
              translateY(0);
          }

          50% {
            transform:
              perspective(1000px)
              rotateY(-7deg)
              rotateX(3deg)
              translateY(-10px);
          }
        }

        @keyframes comingScan {
          0% {
            top: -30%;

            opacity: 0;
          }

          25% {
            opacity: .4;
          }

          75% {
            opacity: .4;
          }

          100% {
            top: 120%;

            opacity: 0;
          }
        }

        @keyframes roadmapLine {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }

        @keyframes modalFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;

            transform:
              translateY(30px)
              scale(.96);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {

          .products-intro {
            grid-template-columns:
              70px
              1fr;

            gap: 30px;
          }

          .products-intro-side {
            grid-column: 2;

            display: grid;

            grid-template-columns:
              1fr
              1fr;
          }

          .products-heading,
          .coming-header {
            grid-template-columns:
              1fr
              1fr;

            gap: 45px;
          }

          .coming-grid {
            grid-template-columns:
              1fr
              1fr;
          }

          .coming-card:last-child {
            grid-column:
              span 2;
          }

          .featured-product-inner {
            grid-template-columns:
              1fr;

            gap: 60px;
          }

          .featured-visual {
            min-height: 420px;
          }

          .roadmap {
            grid-template-columns:
              1fr;
          }

          .roadmap-item {
            border-bottom:
              1px
              solid
              #c7cbc5;
          }

          .roadmap-item:first-of-type {
            border-left: none;
          }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 650px) {

          .products-cursor-glow {
            display: none;
          }

          .products-hero {
            min-height: 720px;
          }

          .products-hero-inner {
            padding:
              145px
              24px
              70px;
          }

          .products-status {
            margin-bottom: 45px;
          }

          .products-status > span:last-child {
            display: none;
          }

          .products-hero h1 {
            font-size:
              clamp(
                58px,
                17vw,
                85px
              );
          }

          .hero-line-2 {
            margin-left: 5vw;
          }

          .hero-line-3 {
            margin-left: 10vw;
          }

          .products-hero-bottom {
            display: flex;

            flex-direction: column;

            align-items: flex-start;

            padding-left: 0;

            margin-top: 65px;

            gap: 30px;
          }

          .hero-side-text {
            display: none;
          }

          .products-intro {
            display: block;

            padding:
              80px
              24px;
          }

          .products-intro-index {
            display: none;
          }

          .products-intro-main h2 {
            font-size: 55px;
          }

          .products-intro-copy {
            font-size: 16px;
          }

          .products-intro-side {
            margin-top: 45px;

            grid-template-columns:
              1fr
              1fr;
          }

          .ecosystem-number {
            min-height: 130px;
          }

          .ecosystem-number strong {
            font-size: 50px;
          }

          .current-products-section,
          .coming-section,
          .roadmap-section {
            padding:
              80px
              18px
              90px;
          }

          .products-heading,
          .coming-header {
            display: block;
          }

          .products-heading h2,
          .coming-header h2,
          .roadmap-header h2 {
            font-size: 55px;
          }

          .products-heading > p,
          .coming-header > p {
            margin-top: 30px;
          }

          .product-filters {
            margin-bottom: 25px;
          }

          .current-products-grid {
            grid-template-columns:
              1fr;
          }

          .product-card-featured {
            grid-column:
              span 1;
          }

          .product-card {
            min-height: 455px;

            padding: 25px;
          }

          .product-card-content h3 {
            font-size: 42px;
          }

          .product-card-bottom {
            align-items: flex-start;

            flex-direction: column;
          }

          .featured-product-inner {
            min-height: auto;

            padding:
              85px
              24px
              100px;
          }

          .featured-copy h2 {
            font-size: 65px;
          }

          .featured-actions {
            align-items: flex-start;

            flex-direction: column;

            gap: 18px;
          }

          .featured-visual {
            min-height: 350px;
          }

          .database-window {
            min-height: 310px;

            transform:
              perspective(1000px)
              rotateY(-3deg)
              rotateX(2deg);
          }

          .database-floating-card {
            right: -10px;

            width: 135px;
          }

          .coming-grid {
            grid-template-columns:
              1fr;
          }

          .coming-card,
          .coming-card:last-child {
            grid-column:
              span 1;
          }

          .coming-card {
            min-height: 400px;
          }

          .roadmap {
            display: block;
          }

          .roadmap-item {
            padding:
              30px
              10px
              40px
              25px;
          }

          .roadmap-number {
            margin-bottom: 35px;
          }

          .products-cta {
            min-height: 570px;

            padding:
              80px
              24px;
          }

          .products-cta-content h2 {
            font-size: 63px;
          }

          .product-modal {
            padding: 35px 25px;
          }

          .product-modal h2 {
            font-size: 42px;
          }

        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 400px) {

          .products-hero h1 {
            font-size: 53px;
          }

          .products-intro-main h2,
          .products-heading h2,
          .coming-header h2,
          .roadmap-header h2 {
            font-size: 49px;
          }

          .products-intro-side {
            grid-template-columns:
              1fr;
          }

          .featured-copy h2,
          .products-cta-content h2 {
            font-size: 54px;
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .products-page *,
          .products-page *::before,
          .products-page *::after {
            animation-duration:
              .01ms !important;

            animation-iteration-count:
              1 !important;

            transition-duration:
              .01ms !important;

            scroll-behavior:
              auto !important;
          }

          .product-reveal {
            opacity: 1;

            transform: none;
          }

        }

      `}</style>

    </main>
  );
}