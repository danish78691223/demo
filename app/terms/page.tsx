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

const termsSections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          By accessing, browsing, registering on, or using any website,
          application, product, platform, or service provided by WEBWHALE
          ("WEBWHALE", "we", "us", or "our"), you acknowledge that you have
          read, understood, and agreed to be bound by these Terms &
          Conditions.
        </p>

        <p>
          If you do not agree with any part of these Terms, you should not
          access or use the relevant WEBWHALE service.
        </p>
      </>
    ),
  },

  {
    number: "02",
    title: "About WEBWHALE",
    content: (
      <>
        <p>
          WEBWHALE is a technology-focused brand intended to develop,
          provide, operate, and explore digital products and services across
          areas such as web development, software, mobile applications,
          artificial intelligence, machine learning, education, digital
          solutions, entertainment, e-commerce, games, and other
          technology-related experiences.
        </p>

        <p>
          Specific products or services may have additional terms,
          conditions, licenses, pricing rules, or usage requirements. Where
          applicable, those additional terms will apply alongside these
          Terms.
        </p>
      </>
    ),
  },

  {
    number: "03",
    title: "Eligibility",
    content: (
      <>
        <p>
          You must be legally capable of entering into an agreement under
          the laws applicable to you in order to use services that require
          contractual acceptance.
        </p>

        <p>
          If you use WEBWHALE services on behalf of an organization,
          business, institution, or another person, you represent that you
          have the authority to accept these Terms on their behalf.
        </p>
      </>
    ),
  },

  {
    number: "04",
    title: "Use of Our Services",
    content: (
      <>
        <p>
          You agree to use WEBWHALE services only for lawful purposes and
          in accordance with these Terms and any applicable laws,
          regulations, and third-party rules.
        </p>

        <p>You must not use our services to:</p>

        <ul>
          <li>Break or violate any applicable law or regulation.</li>

          <li>
            Attempt to gain unauthorized access to systems, accounts,
            networks, databases, or infrastructure.
          </li>

          <li>
            Introduce malware, viruses, malicious code, or harmful software.
          </li>

          <li>
            Interfere with, disrupt, overload, or damage our services or
            infrastructure.
          </li>

          <li>
            Attempt to reverse engineer, decompile, or circumvent security
            mechanisms where prohibited by applicable law.
          </li>

          <li>
            Impersonate WEBWHALE, its employees, partners, users, or other
            individuals or organizations.
          </li>

          <li>
            Use our services for fraudulent, abusive, deceptive, or unlawful
            activities.
          </li>

          <li>
            Scrape, copy, reproduce, or systematically collect content or
            data without appropriate authorization.
          </li>
        </ul>
      </>
    ),
  },

  {
    number: "05",
    title: "Accounts",
    content: (
      <>
        <p>
          Certain WEBWHALE services may require you to create an account.
          You are responsible for providing accurate information and
          maintaining the confidentiality of your account credentials.
        </p>

        <p>
          You are responsible for activities performed through your account
          unless the activity occurred due to circumstances for which you
          are not legally responsible.
        </p>

        <p>
          If you believe your account has been compromised or accessed
          without authorization, you should notify WEBWHALE as soon as
          reasonably possible.
        </p>
      </>
    ),
  },

  {
    number: "06",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          Unless otherwise stated, WEBWHALE and its licensors retain all
          rights, title, and interest in and to the WEBWHALE name, brand,
          logos, designs, interfaces, software, source code, graphics,
          content, documentation, trademarks, and other intellectual
          property.
        </p>

        <p>
          These Terms do not transfer ownership of WEBWHALE intellectual
          property to you. You receive only the rights expressly granted
          to you through the applicable service or license.
        </p>
      </>
    ),
  },

  {
    number: "07",
    title: "User Content",
    content: (
      <>
        <p>
          Some WEBWHALE services may allow users to submit, upload, post,
          store, or otherwise provide content such as text, images, files,
          code, feedback, or other materials ("User Content").
        </p>

        <p>
          You retain ownership of your User Content to the extent that you
          own the applicable rights. You are responsible for ensuring that
          you have the necessary rights and permissions to submit such
          content.
        </p>

        <p>
          By submitting User Content, you grant WEBWHALE the permissions
          reasonably necessary to host, process, display, transmit, or
          otherwise provide the relevant service.
        </p>
      </>
    ),
  },

  {
    number: "08",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          WEBWHALE may integrate with or link to third-party services,
          websites, APIs, payment providers, hosting providers, analytics
          services, social platforms, or other external technologies.
        </p>

        <p>
          Third-party services may have their own terms and privacy
          policies. WEBWHALE is not responsible for the policies, content,
          availability, security, or practices of third-party services that
          are outside our control.
        </p>
      </>
    ),
  },

  {
    number: "09",
    title: "Payments and Purchases",
    content: (
      <>
        <p>
          Certain WEBWHALE products or services may be offered for a fee.
          Prices, billing periods, taxes, payment methods, refunds, and
          cancellation rules may vary by product or service and will be
          communicated at the applicable point of purchase.
        </p>

        <p>
          You agree to provide accurate payment and billing information
          when required.
        </p>
      </>
    ),
  },

  {
    number: "10",
    title: "Availability and Changes",
    content: (
      <>
        <p>
          We may modify, update, suspend, discontinue, or restrict access
          to any WEBWHALE product or service from time to time.
        </p>

        <p>
          We may also update features, functionality, technical
          requirements, or service offerings as WEBWHALE develops.
        </p>
      </>
    ),
  },

  {
    number: "11",
    title: "Disclaimer",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, WEBWHALE
          services are provided on an "as is" and "as available" basis.
        </p>

        <p>
          We do not guarantee that every service will always be available,
          uninterrupted, secure, error-free, or suitable for every
          particular purpose.
        </p>

        <p>
          Information provided through WEBWHALE services may change over
          time and should not automatically be treated as professional,
          legal, financial, medical, educational, or other specialized
          advice unless expressly stated otherwise.
        </p>
      </>
    ),
  },

  {
    number: "12",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, WEBWHALE and
          its owners, directors, employees, affiliates, partners, and
          service providers will not be liable for indirect, incidental,
          special, consequential, or punitive damages arising from or
          relating to your use of, or inability to use, our services.
        </p>

        <p>
          Nothing in these Terms excludes or limits liability that cannot
          legally be excluded or limited under applicable law.
        </p>
      </>
    ),
  },

  {
    number: "13",
    title: "Indemnification",
    content: (
      <p>
        To the extent permitted by applicable law, you agree to indemnify
        and hold harmless WEBWHALE and its applicable representatives,
        affiliates, partners, and service providers from claims, losses,
        liabilities, damages, costs, and expenses arising from your
        unlawful use of the services, violation of these Terms, or
        infringement of third-party rights.
      </p>
    ),
  },

  {
    number: "14",
    title: "Suspension and Termination",
    content: (
      <>
        <p>
          WEBWHALE may suspend or terminate access to a service where
          reasonably necessary, including in cases involving violations of
          these Terms, security risks, unlawful activity, fraud, abuse, or
          operational requirements.
        </p>

        <p>
          Upon termination, provisions that by their nature should survive
          termination may continue to apply.
        </p>
      </>
    ),
  },

  {
    number: "15",
    title: "Privacy",
    content: (
      <>
        <p>
          Your use of WEBWHALE services may involve the collection and
          processing of information. Such processing is governed by our
          applicable Privacy Policy.
        </p>

        <p>
          By using a WEBWHALE service, you acknowledge that you should
          review the applicable privacy terms before providing personal
          information.
        </p>
      </>
    ),
  },

  {
    number: "16",
    title: "Governing Law",
    content: (
      <>
        <p>
          These Terms shall be governed by and interpreted in accordance
          with the applicable laws of India, unless a separate written
          agreement or applicable law requires otherwise.
        </p>

        <p>
          Any disputes shall be subject to the jurisdiction of the
          appropriate courts having jurisdiction over the matter, subject
          to applicable law.
        </p>
      </>
    ),
  },

  {
    number: "17",
    title: "Changes to These Terms",
    content: (
      <>
        <p>
          WEBWHALE may update these Terms from time to time to reflect
          changes in our services, technology, business operations, or
          applicable legal requirements.
        </p>

        <p>
          The updated version will become effective when published, unless
          a different effective date is specified.
        </p>
      </>
    ),
  },

  {
    number: "18",
    title: "Severability",
    content: (
      <p>
        If any provision of these Terms is determined to be invalid or
        unenforceable, the remaining provisions will continue to the
        extent permitted by applicable law.
      </p>
    ),
  },

  {
    number: "19",
    title: "Entire Agreement",
    content: (
      <p>
        These Terms, together with any applicable service-specific terms,
        policies, and agreements referenced herein, constitute the
        understanding governing your use of the relevant WEBWHALE
        services, unless a separate written agreement applies.
      </p>
    ),
  },

  {
    number: "20",
    title: "Contact",
    content: (
      <p>
        If you have questions, concerns, or requests regarding these Terms
        & Conditions, you may contact WEBWHALE through the official
        contact channels provided on our website.
      </p>
    ),
  },
];

export default function Terms() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="terms-page">
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

          <a
            className="active"
            href="/terms"
            onClick={closeMenu}
            aria-current="page"
          >
            Terms & Conditions
          </a>

          <a className="nav-cta" href="/contact" onClick={closeMenu}>
            Contact <ArrowUpRight />
          </a>
        </div>
      </nav>

      {/* ================= TERMS HERO ================= */}
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
            THE SMALL PRINT
          </p>

          <h1
            style={{
              maxWidth: "950px",
              marginBottom: "28px",
              fontSize: "clamp(52px, 7vw, 104px)",
              lineHeight: "0.9",
            }}
          >
            Terms &{" "}
            <em
              style={{
                color: "#12c8e8",
              }}
            >
              Conditions.
            </em>
          </h1>

          <p
            style={{
              maxWidth: "650px",
              color: "rgba(255,255,255,.74)",
              fontSize: "17px",
              lineHeight: "1.6",
            }}
          >
            The rules and guidelines that govern your use of WEBWHALE
            websites, platforms, products, services, and digital
            experiences.
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

      {/* ================= TERMS CONTENT ================= */}
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
              <p className="eyebrow">WEBWHALE / TERMS</p>

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
              <h2
                style={{
                  marginBottom: "24px",
                }}
              >
                Clear rules for a{" "}
                <span>
                  better experience.
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
                These Terms & Conditions explain the basic rules,
                responsibilities, and expectations that apply when you use
                WEBWHALE. Different products or services may have
                additional terms that apply specifically to them.
              </p>
            </div>
          </div>

          {/* Terms Sections */}
          <div
            style={{
              maxWidth: "920px",
              margin: "0 auto",
              paddingTop: "15px",
            }}
          >
            {termsSections.map((section) => (
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
                    style={{
                      color: "var(--muted)",
                      fontSize: "15px",
                      lineHeight: "1.72",
                      maxWidth: "760px",
                    }}
                  >
                    {section.content}

                    <style jsx>{`
                      p {
                        margin: 0 0 16px;
                      }

                      p:last-child {
                        margin-bottom: 0;
                      }

                      ul {
                        margin: 8px 0 0;
                        padding-left: 22px;
                      }

                      li {
                        margin-bottom: 10px;
                        padding-left: 5px;
                      }

                      li:last-child {
                        margin-bottom: 0;
                      }
                    `}</style>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ================= FINAL CTA ================= */}
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
                STILL HAVE A QUESTION?
              </p>

              <h2
                style={{
                  fontSize: "clamp(38px, 5vw, 65px)",
                  marginBottom: "25px",
                }}
              >
                Let&apos;s keep things{" "}
                <em
                  style={{
                    color: "#087c9a",
                  }}
                >
                  clear.
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
                If you have questions about these Terms & Conditions or
                any WEBWHALE service, reach out to us through our official
                contact channel.
              </p>

              <a
                className="button button-dark"
                href="mailto:hello@webwhale.in"
              >
                Say hello <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
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

        <p>
          Learning, tools and support for forward thinkers.
        </p>

        <span>
          © {new Date().getFullYear()} WEBWHALE
        </span>
      </footer>
    </main>
  );
}