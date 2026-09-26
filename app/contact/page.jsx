"use client";

import { useRef, useState } from "react";

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

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const formRef = useRef(null);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="contact-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar" aria-label="Primary navigation">

        <a
          className="brand"
          href="/"
          onClick={closeMenu}
          aria-label="WEBXWHALE home"
        >
          <img
            className="brand-logo"
            src="/webwhale_logo.png"
            alt="WEBXWHALE"
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

          <a href="/home" onClick={closeMenu}>
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


          <a
            className="nav-cta active"
            href="/contact"
            onClick={closeMenu}
            aria-current="page"
          >
            Contact <ArrowUpRight />
          </a>

        </div>
      </nav>

      {/* ================= HERO ================= */}

      <header className="contact-hero">

        <div className="contact-grid-pattern" />

        <div className="contact-glow" />

        <div className="contact-hero-content">

          <p className="kicker">
            <span></span>
            LET&apos;S TALK
          </p>

          <h1>
            Have an idea?
            <br />
            <em>Let&apos;s talk.</em>
          </h1>

          <p>
            Tell us what you&apos;re building, what you need,
            or simply what&apos;s on your mind.
          </p>

        </div>

      </header>

      {/* ================= CONTACT CONTENT ================= */}

      <section className="contact-section">

        <div className="contact-layout">

          {/* LEFT */}

          <div className="contact-info">

            <p className="eyebrow">
              GET IN TOUCH
            </p>

            <h2>
              Start a
              <br />
              <span>conversation.</span>
            </h2>

            <p className="contact-info-text">
              Whether you&apos;re interested in a service, have a
              product idea, want to collaborate, or just want to
              say hello, you can reach out to WEBXWHALE.
            </p>

            <div className="contact-details">

              <div className="contact-detail">

                <span className="contact-detail-label">
                  EMAIL
                </span>

                <a href="mailto:hello@webwhale.in">
                  hello@webwhale.in
                  <ArrowUpRight />
                </a>

              </div>

              <div className="contact-detail">

                <span className="contact-detail-label">
                  RESPONSE
                </span>

                <p>
                  We&apos;ll get back to you as soon as
                  reasonably possible.
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT / FORM */}

          <div className="contact-form-wrapper">

            <form
              ref={formRef}
              className="contact-form"
              onSubmit={async (event) => {
                event.preventDefault();
                if (sending) return;

                setSending(true);
                setFormMessage("");

                const form = event.currentTarget;
                const formData = new FormData(form);
                const payload = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  service: formData.get("subject"),
                  message: formData.get("message"),
                };

                try {
                  const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                  const result = await response.json();

                  if (!response.ok) {
                    throw new Error(result.message || "Unable to send your enquiry.");
                  }

                  formRef.current?.reset();
                  setFormMessage("Thanks — your enquiry has been received. We’ll get back to you soon.");
                } catch (error) {
                  setFormMessage(error.message || "Unable to send your enquiry. Please try again.");
                } finally {
                  setSending(false);
                }
              }}
            >

              <div className="form-row">

                <label>
                  <span>Name</span>

                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </label>

                <label>
                  <span>Email</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>

              </div>

              <label>
                <span>What can we help with?</span>

                <select
                  name="subject"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="web-development">
                    Web Development
                  </option>

                  <option value="software">
                    Software / Product Development
                  </option>

                  <option value="ai-ml">
                    AI / Machine Learning
                  </option>

                  <option value="consulting">
                    Consulting
                  </option>

                  <option value="collaboration">
                    Collaboration
                  </option>

                  <option value="other">
                    Something else
                  </option>
                </select>

              </label>

              <label>
                <span>Message</span>

                <textarea
                  name="message"
                  rows="7"
                  placeholder="Tell us a little about your idea..."
                  required
                />
              </label>

              <div className="contact-form-bottom">

                <p>
                  By submitting this form, you agree that
                  WEBXWHALE may use the information provided
                  to respond to your request.
                </p>

                <div className="contact-submit-area">
                  {formMessage && (
                    <p className="contact-form-message" role="status">
                      {formMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="button button-dark contact-submit"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Send message"}
                    <ArrowUpRight />
                  </button>
                </div>

              </div>

            </form>

          </div>

        </div>

      </section>

      {/* ================= QUICK CONTACT ================= */}

      <section className="contact-quick-section">

        <div className="contact-quick">

          <div>
            <p className="eyebrow">
              ELSEWHERE
            </p>

            <h2>
              Keep in touch
              <br />
              with <span>WEBXWHALE.</span>
            </h2>
          </div>

          <div className="contact-quick-links">

            <a href="/#products">
              Explore products
              <ArrowUpRight />
            </a>

            <a href="/#services">
              Explore services
              <ArrowUpRight />
            </a>

            <a href="/aboutus">
              About WEBXWHALE
              <ArrowUpRight />
            </a>

          </div>

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
                alt="WEBXWHALE"
              />

              <span className="brand-name">
                WEBXWHALE<span className="brand-dot">.</span>
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
            © {new Date().getFullYear()} WEBXWHALE.
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