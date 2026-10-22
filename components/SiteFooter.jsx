"use client";

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function SiteFooter() {
  return (
          <footer className="site-footer">
            <div className="footer-top">
              {/* Brand */}
              <div className="footer-brand-column">
                <a className="brand footer-brand" href="/home#home">
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
                  Learning, tools and technology for people and businesses
                  ready to move forward.
                </p>
    
                <a
                  className="footer-email"
                  href="mailto:hello@webxwhale.com"
                >
                  hello@webxwhale.in
                  <ArrowUpRight />
                </a>

                <div className="footer-social-block">
                  <p className="footer-heading">FOLLOW WEBXWHALE</p>
                  <a className="footer-social-link" href="https://www.instagram.com/webxwhale/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="WEBXWHALE on Instagram">
                    <svg className="footer-instagram-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    <span>Instagram</span>
                    <ArrowUpRight />
                  </a>
                </div>

                <div className="footer-featured-block">
                  <p className="footer-heading">FEATURED ON</p>
                  <a
                    className="footer-producthunt-badge"
                    href="https://www.producthunt.com/products/webxwhale?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-webxwhale"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WEBXWHALE on Product Hunt"
                  >
                    <img
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1288754&amp;theme=dark&amp;t=1792649648947"
                      alt="WEBXWHALE - Learn, Build &amp; Explore the Future of Technology | Product Hunt"
                      width="250"
                      height="54"
                      loading="lazy"
                    />
                  </a>
                </div>
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
    
                  <a href="/login" className="footer-admin-login">
                    Admin Login
                  </a>
                </nav>
              </div>
            </div>
    
            {/* Footer bottom */}
            <div className="footer-bottom">
              <div className="footer-copyright">
                © {new Date().getFullYear()} WEBXWHALE. All rights reserved.
              </div>
    
              <div className="footer-bottom-links">
                <a href="/terms">
                  Terms
                </a>
    
                <a href="/privacy">
                  Privacy
                </a>
    
                <a href="/home#home">
                  Back to top ↑
                </a>
              </div>
            </div>
          </footer>
  );
}
