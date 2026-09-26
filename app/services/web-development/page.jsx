"use client";

import { useEffect, useState } from "react";

const ArrowUpRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const X = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" strokeLinecap="round"/></svg>;
const Check = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const services = [
  {
    id:"01", type:"Portfolio Website", level:"STARTER", price:"₹15,000+", time:"1–2 weeks",
    desc:"A focused personal or professional presence for freelancers, creators, developers, designers and consultants.",
    features:["Custom responsive UI","Projects / work showcase","About + skills sections","Contact / enquiry form","Basic SEO & analytics","Mobile-first experience"],
    stack:["HTML/CSS","JavaScript","React / Next.js"],
    best:"Developers, designers, freelancers, professionals",
  },
  {
    id:"02", type:"Static Single Page", level:"SIMPLE", price:"₹10,000+", time:"3–7 days",
    desc:"A fast, conversion-focused one-page website for a product, service, event, campaign or local business.",
    features:["Single-page responsive design","Hero + service sections","CTA / WhatsApp / contact","Basic SEO","Performance optimisation","Deployment setup"],
    stack:["HTML","CSS","JavaScript","Next.js"],
    best:"Landing pages, campaigns, local businesses",
  },
  {
    id:"03", type:"Static Multiple Page", level:"BUSINESS", price:"₹20,000+", time:"1–3 weeks",
    desc:"A traditional multi-page website with separate pages for business information, services, about, portfolio and contact.",
    features:["4–10 custom pages","Reusable components","Responsive navigation","Forms / enquiry flow","SEO-ready page structure","Analytics integration"],
    stack:["React","Next.js","CSS","Static APIs"],
    best:"Small businesses, agencies, institutes",
  },
  {
    id:"04", type:"Dynamic Single Page", level:"DYNAMIC", price:"₹25,000+", time:"2–4 weeks",
    desc:"A single-page experience backed by APIs or a database so content and user interactions can change dynamically.",
    features:["Database-backed content","Login / user interaction","Admin-managed sections","API integrations","Dynamic forms","Analytics & events"],
    stack:["Next.js","Node.js","MongoDB","REST API"],
    best:"Interactive business portals and focused apps",
  },
  {
    id:"05", type:"Dynamic Multiple Page", level:"ADVANCED", price:"₹45,000+", time:"3–6 weeks",
    desc:"A complete dynamic web platform with multiple workflows, database content, authentication and admin control.",
    features:["Multiple dynamic pages","Authentication & roles","CMS / admin controls","Database integration","API + third-party integrations","Production deployment"],
    stack:["Next.js","Node.js","MongoDB","REST APIs"],
    best:"Growing companies, portals, service platforms",
  },
  {
    id:"06", type:"Modern Website", level:"MODERN", price:"₹35,000+", time:"2–4 weeks",
    desc:"A premium visual website with modern layouts, motion, interactions, micro-animations and a strong brand experience.",
    features:["Custom visual direction","Scroll-based animations","Micro-interactions","Modern typography & layout","Responsive design","Performance-conscious motion"],
    stack:["Next.js","React","CSS","Motion"],
    best:"Brands, startups, creators and premium services",
  },
  {
    id:"07", type:"Advanced Website", level:"PREMIUM", price:"₹60,000+", time:"4–8 weeks",
    desc:"A more sophisticated website combining advanced frontend interactions, integrations, backend workflows and analytics.",
    features:["Advanced UI / UX","Complex animations","Custom API integrations","Authentication / dashboards","SEO + analytics","Scalable architecture"],
    stack:["Next.js","Node.js","MongoDB","REST / third-party APIs"],
    best:"Established brands and complex digital projects",
  },
  {
    id:"08", type:"Business / Corporate", level:"PRO", price:"₹40,000+", time:"2–5 weeks",
    desc:"A polished corporate presence designed around credibility, services, lead generation and scalable content.",
    features:["Corporate information architecture","Service / solution pages","Case studies / portfolio","Lead capture","SEO-ready structure","CMS option"],
    stack:["Next.js","React","CMS / DB"],
    best:"Companies, agencies, consulting firms",
  },
  {
    id:"09", type:"eCommerce Website", level:"STORE", price:"₹60,000+", time:"4–8 weeks",
    desc:"An online store with product catalog, shopping cart, checkout flow and order management.",
    features:["Product catalog","Cart & checkout","Payment gateway integration","Order management","Customer accounts","Admin product controls"],
    stack:["Next.js","Node.js","MongoDB","Payment API"],
    best:"Retailers, brands and online sellers",
  },
  {
    id:"10", type:"LMS / Learning Platform", level:"SYSTEM", price:"₹1,25,000+", time:"6–12 weeks",
    desc:"A learning system for courses, students, instructors, assessments, progress tracking and administration.",
    features:["Student & instructor accounts","Course / lesson management","Progress tracking","Quizzes / assessments","Admin dashboard","Payments / subscriptions"],
    stack:["Next.js","Node.js","MongoDB","Cloud storage"],
    best:"Schools, tutors, academies and edtech startups",
  },
  {
    id:"11", type:"Custom Management System", level:"SYSTEM", price:"₹1,00,000+", time:"6–12 weeks",
    desc:"A custom internal or customer-facing management platform built around your business workflow.",
    features:["Role-based access","Custom dashboards","CRUD workflows","Reports & analytics","Notifications / integrations","Admin controls"],
    stack:["Next.js","Node.js","MongoDB","REST API"],
    best:"Businesses with specialised operational workflows",
  },
  {
    id:"12", type:"Store Management System", level:"SYSTEM", price:"₹1,25,000+", time:"6–14 weeks",
    desc:"A tailored system for inventory, products, sales, customers, staff, reporting and daily store operations.",
    features:["Inventory management","Sales / order records","Customer management","Staff roles","Reports & dashboards","Optional billing integrations"],
    stack:["Next.js","Node.js","MongoDB","REST API"],
    best:"Retail stores, supermarkets and multi-user operations",
  },
];

function ServiceVisual({ service }) {
  return <div className="wd-visual">
    <div className="wd-window">
      <div className="wd-window-bar"><i/><i/><i/><span>{service.type.toLowerCase().replaceAll(" ","-")}.web</span></div>
      <div className="wd-window-body">
        <div className="wd-side"><b/><b/><b/><b/></div>
        <div className="wd-main">
          <div className="wd-line wd-line-big"/>
          <div className="wd-line"/>
          <div className="wd-line short"/>
          <div className="wd-blocks"><span/><span/><span/></div>
        </div>
      </div>
    </div>
    <div className="wd-float wd-float-one">{service.id}</div>
    <div className="wd-float wd-float-two">{service.level}</div>
  </div>;
}

export default function WebDevelopmentPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.body.classList.add("web-dev-route");
    const nodes = document.querySelectorAll(".wd-reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("wd-visible");
        observer.unobserve(e.target);
      }
    }), { threshold:.12 });
    nodes.forEach(n => observer.observe(n));
    return () => {
      observer.disconnect();
      document.body.classList.remove("web-dev-route");
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return <main className="web-development-page">
    <nav className="navbar wd-navbar">
      <a className="brand" href="/home" onClick={() => setMenuOpen(false)}>
        <img className="brand-logo" src="/webwhale_logo.png" alt="WEBWHALE"/>
        <span className="brand-name">WEBWHALE<span className="brand-dot">.</span></span>
      </a>
      <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(v=>!v)} aria-label="Toggle navigation">
        <span/><span/>
      </button>
      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <a href="/home">Home</a>
        <a className="active" href="/services">Services</a>
        <a href="/products">Products</a>
        <a href="/aboutus">About us</a>
        <a className="nav-cta" href="/contact">Contact <ArrowUpRight/></a>
      </div>
    </nav>

    <section className="wd-hero">
      <div className="wd-hero-grid"/>
      <div className="wd-hero-glow wd-glow-a"/>
      <div className="wd-hero-glow wd-glow-b"/>
      <div className="wd-hero-inner">
        <div className="wd-kicker"><span/> WEBWHALE / WEB DEVELOPMENT <b>SYSTEM ONLINE</b></div>
        <h1><span>Websites</span><em>that work.</em><strong>Web apps that grow.</strong></h1>
        <p>From a single landing page to a complete LMS, eCommerce platform or custom management system — choose the experience, features and complexity your business actually needs.</p>
        <div className="wd-hero-actions">
          <a href="#website-types" className="wd-primary">Explore website types <ArrowRight/></a>
          <a href="/contact" className="wd-secondary">Discuss your project</a>
        </div>
      </div>
      <div className="wd-hero-index">01 / 12</div>
    </section>

    <section className="wd-intro wd-reveal">
      <div><span className="wd-label">WEB DEVELOPMENT</span><h2>One page or an entire <em>digital system.</em></h2></div>
      <p>We organise web development by what the website has to do: present, convert, manage content, connect users, process transactions or run an entire workflow.</p>
    </section>

    <section id="website-types" className="wd-catalog">
      <div className="wd-catalog-head wd-reveal">
        <div><span className="wd-label">01 — CATALOG</span><h2>Choose your <em>build.</em></h2></div>
        <p>Tap any card. The card moves left and the detail panel expands with features, technology and an indicative starting range.</p>
      </div>

      <div className="wd-cards">
        {services.map((service, index) => <button
          key={service.id}
          className="wd-card wd-reveal"
          style={{"--i":index}}
          onClick={() => setSelected(service)}
          aria-label={`View details for ${service.type}`}
        >
          <div className="wd-card-top"><span>{service.id}</span><small>{service.level}</small></div>
          <div className="wd-card-number">0{index+1}</div>
          <h3>{service.type}</h3>
          <p>{service.desc}</p>
          <div className="wd-card-bottom"><span>{service.price}</span><ArrowRight/></div>
          <i className="wd-card-sheen"/>
        </button>)}
      </div>
    </section>

    <section className="wd-systems wd-reveal">
      <div className="wd-system-copy">
        <span className="wd-label">02 — SYSTEMS</span>
        <h2>Beyond websites: <em>business systems.</em></h2>
        <p>Need logins, dashboards, inventory, courses, orders, roles or custom workflows? WEBWHALE can treat the website as a product — not just a collection of pages.</p>
      </div>
      <div className="wd-system-list">
        {["LMS / Learning Platform","Custom Management System","Store Management System","eCommerce & Customer Portals"].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span><ArrowRight/></div>)}
      </div>
    </section>

    <section className="wd-pricing-note wd-reveal">
      <span className="wd-label">03 — PRICING</span>
      <h2>Indicative ranges, <em>not rigid packages.</em></h2>
      <p>Displayed prices are starting estimates for WEBWHALE projects. Final pricing depends on page count, design depth, content, integrations, authentication, database workflows, hosting and third-party services.</p>
    </section>

    <section className="wd-cta wd-reveal">
      <span className="wd-label">04 — START A PROJECT</span>
      <h2>Tell us what you want to <em>build.</em></h2>
      <a href="/contact" className="wd-primary">Get a project discussion <ArrowUpRight/></a>
    </section>

    {selected && <div className="wd-modal-backdrop" onClick={() => setSelected(null)}>
      <section className="wd-detail-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={selected.type}>
        <button className="wd-close" onClick={() => setSelected(null)} aria-label="Close"><X/></button>
        <div className="wd-detail-visual"><ServiceVisual service={selected}/></div>
        <div className="wd-detail-content">
          <span className="wd-label">{selected.id} — {selected.level}</span>
          <h2>{selected.type}</h2>
          <p className="wd-detail-lead">{selected.desc}</p>
          <div className="wd-detail-meta"><div><small>STARTING FROM</small><strong>{selected.price}</strong></div><div><small>EST. DELIVERY</small><strong>{selected.time}</strong></div></div>
          <div className="wd-detail-columns">
            <div><h4>FEATURES</h4>{selected.features.map(f => <p key={f}><Check/>{f}</p>)}</div>
            <div><h4>BEST FOR</h4><p>{selected.best}</p><h4 className="wd-stack-title">STACK</h4><div className="wd-stack">{selected.stack.map(s=><span key={s}>{s}</span>)}</div></div>
          </div>
          <a className="wd-primary wd-modal-cta" href={`/contact?service=${encodeURIComponent(selected.type)}`}>Discuss this build <ArrowUpRight/></a>
        </div>
      </section>
    </div>}
  </main>;
}
