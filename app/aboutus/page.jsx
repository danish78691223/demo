"use client";

import { useState } from "react";

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

export default function AboutUsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="about-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar" aria-label="Primary navigation">
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
            WEBWHALE<span className="brand-dot">.</span>
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
          <a href="/home" onClick={closeMenu}>
            Home
          </a>

          <a href="/services" onClick={closeMenu}>
            Services
          </a>

          <a href="/products" onClick={closeMenu}>
            Products
          </a>

          <a
            className="active"
            href="/aboutus"
            onClick={closeMenu}
            aria-current="page"
          >
            About us
          </a>

          <a
            className="nav-cta"
            href="/contact"
            onClick={closeMenu}
          >
            Contact <ArrowUpRight />
          </a>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <header className="about-hero">

        <div className="about-grid-pattern" />

        <div className="about-glow" />

        <div className="about-hero-content">

          <p className="kicker">
            <span></span>
            ABOUT WEBWHALE
          </p>

          <h1>
            We build the
            <br />
            <em>digital future.</em>
          </h1>

          <p className="about-hero-text">
            WEBWHALE is a technology-focused brand exploring the
            intersection of software, creativity, learning, and
            digital experiences.
          </p>

          <div className="about-meta">
            <span className="about-meta-dot"></span>
            BUILD · LEARN · CREATE · EVOLVE
          </div>

        </div>

      </header>

      {/* ================= INTRO ================= */}

      <section className="about-intro-section">

        <div className="about-intro-grid">

          <div>
            <p className="eyebrow">
              WHO WE ARE
            </p>

            <div className="about-icon">
              <Spark />
            </div>
          </div>

          <div>

            <h2>
              Technology should feel
              <br />
              <span>human.</span>
            </h2>

            <p className="about-large-text">
              WEBWHALE is being built around a simple idea:
              technology should not only be powerful, it should
              also be understandable, useful, and accessible.
            </p>

            <p className="about-body-text">
              We explore and develop digital products, software,
              services, and experiences across multiple areas of
              technology. From web development and software to
              artificial intelligence, machine learning, education,
              e-commerce, entertainment, and digital tools, WEBWHALE
              is designed to grow with the possibilities of technology.
            </p>

          </div>

        </div>

      </section>

      {/* ================= WHAT WE DO ================= */}

      <section className="about-what-section">

        <div className="about-section-heading">

          <div>
            <p className="eyebrow">
              WHAT WE DO
            </p>

            <h2>
              One brand.
              <br />
              <span>Many possibilities.</span>
            </h2>
          </div>

          <p>
            WEBWHALE can operate across different areas of the
            digital ecosystem, allowing individual products and
            services to evolve independently while remaining part
            of one technology-focused brand.
          </p>

        </div>

        <div className="about-capabilities">

          <article className="about-capability">
            <span>01</span>
            <h3>Software</h3>
            <p>
              Digital products and software experiences designed
              around practical problems and real users.
            </p>
          </article>

          <article className="about-capability">
            <span>02</span>
            <h3>Web & Mobile</h3>
            <p>
              Modern websites, web applications, platforms, and
              mobile experiences.
            </p>
          </article>

          <article className="about-capability">
            <span>03</span>
            <h3>AI & ML</h3>
            <p>
              Exploring artificial intelligence and machine learning
              to create smarter digital experiences.
            </p>
          </article>

          <article className="about-capability">
            <span>04</span>
            <h3>Learning</h3>
            <p>
              Educational experiences and technology that help
              people learn, build, and grow.
            </p>
          </article>

          <article className="about-capability">
            <span>05</span>
            <h3>Digital Services</h3>
            <p>
              Technology services that help individuals, creators,
              and businesses bring ideas to the digital world.
            </p>
          </article>

          <article className="about-capability">
            <span>06</span>
            <h3>Experiences</h3>
            <p>
              Digital entertainment, tools, platforms, and new
              technology-driven experiences.
            </p>
          </article>

        </div>

      </section>

      {/* ================= PRINCIPLES ================= */}

      <section className="about-principles-section">

        <div className="about-principles-header">

          <p className="eyebrow">
            OUR APPROACH
          </p>

          <h2>
            Built with
            <br />
            <em>intention.</em>
          </h2>

        </div>

        <div className="about-principles">

          <article>
            <div className="principle-number">01</div>
            <h3>Curiosity</h3>
            <p>
              We stay curious about technology, people, ideas,
              and what can be built next.
            </p>
          </article>

          <article>
            <div className="principle-number">02</div>
            <h3>Simplicity</h3>
            <p>
              Complexity should exist behind the scenes, not
              unnecessarily in the user experience.
            </p>
          </article>

          <article>
            <div className="principle-number">03</div>
            <h3>Useful by design</h3>
            <p>
              Technology becomes valuable when it solves a real
              problem or creates a meaningful experience.
            </p>
          </article>

          <article>
            <div className="principle-number">04</div>
            <h3>Continuous evolution</h3>
            <p>
              WEBWHALE is designed to learn, adapt, experiment,
              and evolve as technology changes.
            </p>
          </article>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="about-cta-section">

        <div className="about-cta-glow" />

        <div className="about-cta-content">

          <p className="eyebrow">
            HAVE AN IDEA?
          </p>

          <h2>
            Let&apos;s build
            <br />
            something <em>interesting.</em>
          </h2>

          <p>
            Whether you have a project, collaboration idea,
            product concept, or simply want to talk technology,
            we&apos;d love to hear from you.
          </p>

          <a
            className="button button-dark"
            href="/contact"
          >
            Start a conversation <ArrowUpRight />
          </a>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="site-footer">

        <div className="footer-top">

          <div className="footer-brand-column">

            <a className="brand footer-brand" href="/">
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
            <p className="footer-heading">PRODUCTS</p>

            <nav className="footer-links">
              <a href="/#products">SQLwhale</a>
              <a href="/#products">Resume Analyzer</a>
              <a href="/#products">Music Enhancer</a>
              <a href="/#products">More Products</a>
            </nav>
          </div>

          <div className="footer-column">
            <p className="footer-heading">SERVICES</p>

            <nav className="footer-links">
              <a href="/#services">Web Development</a>
              <a href="/#services">Marketing</a>
              <a href="/#services">Consulting</a>
              <a href="/contact">Work with us</a>
            </nav>
          </div>

          <div className="footer-column">
            <p className="footer-heading">COMPANY</p>

            <nav className="footer-links">
              <a href="/aboutus">About us</a>
              <a href="/terms">Terms & Conditions</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>

        </div>

        <div className="footer-bottom">

          <div className="footer-copyright">
            © {new Date().getFullYear()} WEBWHALE.
            All rights reserved.
          </div>

          <div className="footer-bottom-links">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/home">Back to home ↑</a>
          </div>

        </div>

      </footer>

    </main>
  );
}