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

const privacySections = [
  {
    number: "01",
    title: "Introduction",
    content: (
      <>
        <p>
          WEBWHALE ("WEBWHALE", "we", "us", or "our") respects your privacy
          and is committed to handling information responsibly.
        </p>

        <p>
          This Privacy Policy explains how information may be collected,
          used, stored, processed, and protected when you access or use
          WEBWHALE websites, applications, products, platforms, and related
          digital services.
        </p>

        <p>
          By using a WEBWHALE service, you acknowledge that you have read
          and understood this Privacy Policy.
        </p>
      </>
    ),
  },

  {
    number: "02",
    title: "Information We May Collect",
    content: (
      <>
        <p>
          Depending on the WEBWHALE service you use, we may collect
          different categories of information.
        </p>

        <p>This may include:</p>

        <ul>
          <li>
            Information you provide directly, such as your name, email
            address, contact details, or account information.
          </li>

          <li>
            Account and authentication information required to provide
            certain services.
          </li>

          <li>
            Information about how you interact with our websites,
            applications, products, and services.
          </li>

          <li>
            Device, browser, operating system, IP address, and technical
            information where applicable.
          </li>

          <li>
            Communications, feedback, support requests, or other information
            you voluntarily provide to us.
          </li>
        </ul>
      </>
    ),
  },

  {
    number: "03",
    title: "Information You Provide",
    content: (
      <>
        <p>
          Some WEBWHALE services may allow you to create accounts, submit
          forms, contact us, purchase products, request services, or
          otherwise provide information.
        </p>

        <p>
          You are responsible for ensuring that information you provide is
          accurate and that you have the necessary rights or permissions to
          provide it.
        </p>
      </>
    ),
  },

  {
    number: "04",
    title: "How We Use Information",
    content: (
      <>
        <p>
          Information may be used for purposes reasonably necessary to
          operate and improve WEBWHALE services.
        </p>

        <p>This may include:</p>

        <ul>
          <li>Providing, maintaining, and improving our services.</li>

          <li>Creating and managing user accounts.</li>

          <li>Responding to questions, requests, and support inquiries.</li>

          <li>
            Processing transactions, subscriptions, or service requests
            where applicable.
          </li>

          <li>
            Detecting, preventing, and addressing security issues, fraud,
            abuse, or technical problems.
          </li>

          <li>
            Understanding how our products and services are used so that we
            can improve their functionality and experience.
          </li>

          <li>
            Complying with applicable legal obligations and enforcing our
            applicable terms and policies.
          </li>
        </ul>
      </>
    ),
  },

  {
    number: "05",
    title: "Cookies and Similar Technologies",
    content: (
      <>
        <p>
          WEBWHALE or its service providers may use cookies, local storage,
          pixels, analytics tools, or similar technologies to operate
          websites and services, remember preferences, understand usage,
          and improve performance.
        </p>

        <p>
          Depending on your browser or device, you may have controls that
          allow you to manage or restrict certain cookies and similar
          technologies.
        </p>
      </>
    ),
  },

  {
    number: "06",
    title: "Analytics and Technical Data",
    content: (
      <>
        <p>
          We may use technical and usage information to understand service
          performance, identify errors, analyze traffic, and improve our
          products and digital experiences.
        </p>

        <p>
          Such information may be processed directly by WEBWHALE or by
          third-party analytics and infrastructure providers acting on our
          behalf.
        </p>
      </>
    ),
  },

  {
    number: "07",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          WEBWHALE may use third-party providers for services such as
          hosting, analytics, authentication, payment processing,
          communications, infrastructure, or other functionality.
        </p>

        <p>
          These providers may process information according to their own
          privacy policies and contractual obligations.
        </p>

        <p>
          WEBWHALE may also contain links or integrations to third-party
          websites and services. We are not responsible for the privacy
          practices of third parties that operate independently from us.
        </p>
      </>
    ),
  },

  {
    number: "08",
    title: "Data Security",
    content: (
      <>
        <p>
          We take reasonable measures designed to protect information
          against unauthorized access, alteration, disclosure, misuse, or
          destruction.
        </p>

        <p>
          However, no internet transmission, electronic storage system, or
          digital service can be guaranteed to be completely secure.
        </p>
      </>
    ),
  },

  {
    number: "09",
    title: "Data Retention",
    content: (
      <>
        <p>
          We may retain information for as long as reasonably necessary to
          provide the relevant service, maintain business and technical
          records, comply with legal obligations, resolve disputes, enforce
          agreements, and protect our legitimate interests.
        </p>

        <p>
          Retention periods may vary depending on the type and purpose of
          the information.
        </p>
      </>
    ),
  },

  {
    number: "10",
    title: "Your Choices and Rights",
    content: (
      <>
        <p>
          Depending on your location and applicable law, you may have
          certain rights regarding your personal information.
        </p>

        <p>
          These may include rights to request access, correction, deletion,
          restriction, or other appropriate handling of your information.
        </p>

        <p>
          Requests may be subject to applicable legal requirements,
          verification procedures, and legitimate limitations.
        </p>
      </>
    ),
  },

  {
    number: "11",
    title: "Children's Privacy",
    content: (
      <>
        <p>
          WEBWHALE services are not intended to knowingly collect personal
          information from children where such collection is prohibited by
          applicable law.
        </p>

        <p>
          If you believe that a child has provided personal information to
          us in circumstances where it should not have been collected,
          please contact us so that we can review the situation.
        </p>
      </>
    ),
  },

  {
    number: "12",
    title: "International Data Processing",
    content: (
      <>
        <p>
          Depending on the services and infrastructure used, information may
          be processed or stored in countries other than the country in
          which you live.
        </p>

        <p>
          Where required by applicable law, appropriate safeguards will be
          considered for relevant international transfers.
        </p>
      </>
    ),
  },

  {
    number: "13",
    title: "Business Transfers",
    content: (
      <p>
        If WEBWHALE or any relevant part of its business is involved in a
        merger, acquisition, restructuring, financing, sale of assets, or
        similar transaction, information may be transferred as part of that
        transaction, subject to applicable law and relevant privacy
        requirements.
      </p>
    ),
  },

  {
    number: "14",
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <p>
          WEBWHALE may update this Privacy Policy from time to time to
          reflect changes in our services, technology, business practices,
          or applicable legal requirements.
        </p>

        <p>
          The updated version will be published on this page with a revised
          effective or updated date where appropriate.
        </p>
      </>
    ),
  },

  {
    number: "15",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have questions, concerns, or requests regarding this
          Privacy Policy or the handling of your information, you can
          contact WEBWHALE through our official contact channels.
        </p>

        <p>
          Email:{" "}
          <a
            href="mailto:hello@webwhale.in"
            style={{
              color: "var(--ink)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            hello@webwhale.in
          </a>
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="privacy-page">
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

          <a href="/about" onClick={closeMenu}>
            About us
          </a>

          <a href="/terms" onClick={closeMenu}>
            Terms & Conditions
          </a>

          <a
            className="active"
            href="/privacy"
            onClick={closeMenu}
            aria-current="page"
          >
            Privacy Policy
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

      {/* ================= PRIVACY HERO ================= */}
      <header
        style={{
          position: "relative",
          minHeight: "470px",
          padding:
            "165px clamp(24px, 9vw, 142px) 80px",
          background:
            "radial-gradient(circle at 75% 35%, rgba(18, 200, 232, 0.35), transparent 25%), linear-gradient(125deg, #02080b 0%, #071a22 34%, #0a3949 70%, #087c9a 120%)",
          color: "#fff",
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            opacity: 0.16,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(90deg, #000, transparent 86%)",
            WebkitMaskImage:
              "linear-gradient(90deg, #000, transparent 86%)",
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "440px",
            height: "440px",
            right: "-80px",
            top: "80px",
            borderRadius: "50%",
            zIndex: -1,
            background:
              "radial-gradient(circle at 33% 32%, rgba(18,200,232,.72), rgba(24,119,232,.28) 30%, rgba(0,50,70,.04) 70%)",
          }}
        />

        <div
          style={{
            maxWidth: "1050px",
            position: "relative",
          }}
        >
          <p
            className="kicker"
            style={{
              marginBottom: "24px",
            }}
          >
            <span></span>
            YOUR PRIVACY MATTERS
          </p>

          <h1
            style={{
              maxWidth: "950px",
              marginBottom: "28px",
              fontSize: "clamp(52px, 7vw, 104px)",
              lineHeight: "0.9",
            }}
          >
            Privacy{" "}
            <em
              style={{
                color: "#12c8e8",
              }}
            >
              Policy.
            </em>
          </h1>

          <p
            style={{
              maxWidth: "680px",
              color: "rgba(255,255,255,.74)",
              fontSize: "17px",
              lineHeight: "1.6",
            }}
          >
            How WEBWHALE handles information across its websites,
            applications, products, platforms, and digital services.
          </p>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "rgba(255,255,255,.55)",
              fontFamily: '"DM Mono", monospace',
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#12c8e8",
                display: "inline-block",
              }}
            />

            Last updated · September 21, 2026
          </div>
        </div>
      </header>

      {/* ================= PRIVACY CONTENT ================= */}
      <section
        style={{
          background: "var(--cream)",
          padding:
            "105px clamp(24px, 7.5vw, 112px) 120px",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
          }}
        >
          {/* Intro */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.75fr 2fr",
              gap: "clamp(30px, 6vw, 90px)",
              alignItems: "start",
              paddingBottom: "75px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div>
              <p className="eyebrow">
                WEBWHALE / PRIVACY
              </p>

              <div
                style={{
                  marginTop: "24px",
                  width: "46px",
                  height: "46px",
                  border: "1px solid var(--ink)",
                  borderRadius: "50%",
                  padding: "11px",
                }}
              >
                <Spark />
              </div>
            </div>

            <div>
              <h2 style={{ marginBottom: "24px" }}>
                Your data deserves{" "}
                <span>
                  clarity.
                </span>
              </h2>

              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "16px",
                  lineHeight: "1.65",
                  maxWidth: "680px",
                }}
              >
                We aim to be transparent about the information that may be
                collected when you interact with WEBWHALE and how that
                information may be used to operate, secure, and improve our
                services.
              </p>
            </div>
          </div>

          {/* Privacy Sections */}
          <div
            style={{
              maxWidth: "920px",
              margin: "0 auto",
              paddingTop: "15px",
            }}
          >
            {privacySections.map((section) => (
              <article
                key={section.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "72px 1fr",
                  gap: "28px",
                  padding: "48px 0",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: "11px",
                    color: "#7b847e",
                    paddingTop: "7px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {section.number}
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: "clamp(28px, 3vw, 43px)",
                      lineHeight: "1",
                      letterSpacing: "-0.055em",
                      marginBottom: "24px",
                    }}
                  >
                    {section.title}
                  </h2>

                  <div
                    className="privacy-section-content"
                    style={{
                      color: "var(--muted)",
                      fontSize: "15px",
                      lineHeight: "1.72",
                      maxWidth: "760px",
                    }}
                  >
                    {section.content}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ================= CONTACT CTA ================= */}
          <div
            style={{
              marginTop: "85px",
              padding: "clamp(35px, 5vw, 60px)",
              background: "#a9eaf3",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                right: "-80px",
                top: "-150px",
                background: "#12c8e8",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: "650px",
              }}
            >
              <p
                className="eyebrow"
                style={{
                  color: "#305a61",
                  marginBottom: "20px",
                }}
              >
                QUESTIONS ABOUT PRIVACY?
              </p>

              <h2
                style={{
                  fontSize: "clamp(38px, 5vw, 65px)",
                  marginBottom: "25px",
                }}
              >
                We&apos;re here to{" "}
                <em
                  style={{
                    color: "#087c9a",
                  }}
                >
                  help.
                </em>
              </h2>

              <p
                style={{
                  color: "#305a61",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  maxWidth: "530px",
                  marginBottom: "28px",
                }}
              >
                If you have questions about this Privacy Policy or how
                WEBWHALE handles information, contact us through our
                official channel.
              </p>

              <a
                className="button button-dark"
                href="mailto:hello@webwhale.in"
              >
                Contact us <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <div className="footer-top">
          {/* Brand */}
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
              <a href="/#products">SQLwhale</a>
              <a href="/#products">Resume Analyzer</a>
              <a href="/#products">Music Enhancer</a>
              <a href="/#products">More Products</a>
            </nav>
          </div>

          {/* Services */}
          <div className="footer-column">
            <p className="footer-heading">SERVICES</p>

            <nav className="footer-links">
              <a href="/#services">Web Development</a>
              <a href="/#services">Marketing</a>
              <a href="/#services">Consulting</a>
              <a href="/#contact">Work with us</a>
            </nav>
          </div>

          {/* Company */}
          <div className="footer-column">
            <p className="footer-heading">COMPANY</p>

            <nav className="footer-links">
              <a href="/#about">About us</a>
              <a href="/terms">Terms & Conditions</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/#contact">Contact</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} WEBWHALE. All rights reserved.
          </div>

          <div className="footer-bottom-links">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/home">Back to home ↑</a>
          </div>
        </div>
      </footer>

      {/* Privacy page specific list styling */}
      <style jsx>{`
        .privacy-section-content p {
          margin: 0 0 16px;
        }

        .privacy-section-content p:last-child {
          margin-bottom: 0;
        }

        .privacy-section-content ul {
          margin: 8px 0 0;
          padding-left: 22px;
        }

        .privacy-section-content li {
          margin-bottom: 10px;
          padding-left: 5px;
        }

        .privacy-section-content li:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 800px) {
          .privacy-page header {
            min-height: 420px !important;
            padding-top: 140px !important;
          }

          .privacy-page section > div > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            padding-bottom: 55px !important;
          }

          .privacy-page article {
            grid-template-columns: 48px 1fr !important;
            gap: 18px !important;
            padding: 38px 0 !important;
          }
        }

        @media (max-width: 560px) {
          .privacy-page header {
            min-height: 390px !important;
            padding:
              125px 24px 60px !important;
          }

          .privacy-page header h1 {
            font-size: clamp(48px, 15vw, 72px) !important;
          }

          .privacy-page article {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .privacy-page article > div:first-child {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}