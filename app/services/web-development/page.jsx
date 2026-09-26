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

<style jsx global>{`
.web-development-page{--wd-cyan:#12c8e8;--wd-blue:#1877e8;--wd-ink:#14231f;--wd-cream:#f4f0e9;--wd-dark:#03070a;background:var(--wd-cream);color:var(--wd-ink);min-height:100vh;overflow:hidden}
.wd-navbar{position:absolute;background:rgba(3,7,10,.22);backdrop-filter:blur(10px)}
.wd-hero{min-height:760px;position:relative;display:flex;align-items:center;overflow:hidden;background:radial-gradient(circle at 76% 38%,rgba(18,200,232,.26),transparent 28%),linear-gradient(130deg,#02080b,#071c25 48%,#075a70 100%);color:#fff}
.wd-hero-grid{position:absolute;inset:0;opacity:.2;background-image:linear-gradient(rgba(18,200,232,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(18,200,232,.15) 1px,transparent 1px);background-size:72px 72px;mask-image:radial-gradient(ellipse at center,#000 20%,transparent 82%);animation:wdGrid 20s linear infinite}
.wd-hero-glow{position:absolute;border-radius:50%;filter:blur(2px);pointer-events:none}.wd-glow-a{width:520px;height:520px;right:-160px;top:120px;background:radial-gradient(circle,rgba(18,200,232,.38),transparent 68%);animation:wdFloat 8s ease-in-out infinite}.wd-glow-b{width:300px;height:300px;left:-120px;bottom:-130px;background:radial-gradient(circle,rgba(24,119,232,.22),transparent 70%);animation:wdFloat 11s ease-in-out infinite reverse}
.wd-hero-inner{width:min(1240px,100%);margin:auto;padding:155px clamp(24px,8vw,120px) 90px;position:relative;z-index:2}.wd-kicker,.wd-label{font:500 10px/1.2 "DM Mono",monospace;letter-spacing:.13em}.wd-kicker{display:flex;gap:10px;align-items:center;color:rgba(255,255,255,.52);margin-bottom:52px}.wd-kicker span{width:7px;height:7px;border-radius:50%;background:var(--wd-cyan);box-shadow:0 0 16px var(--wd-cyan);animation:wdPulse 2s infinite}.wd-kicker b{margin-left:auto;font-weight:400;color:rgba(255,255,255,.28)}
.wd-hero h1{margin:0;max-width:1050px;font-size:clamp(64px,9.5vw,150px);line-height:.78;letter-spacing:-.09em}.wd-hero h1 span,.wd-hero h1 em,.wd-hero h1 strong{display:block}.wd-hero h1 span{animation:wdUp .9s .1s both}.wd-hero h1 em{font:400 clamp(68px,10vw,155px)/.78 "Playfair Display",serif;color:var(--wd-cyan);margin-left:8vw;animation:wdUp .9s .25s both}.wd-hero h1 strong{font:600 clamp(52px,7.2vw,112px)/.9 "DM Sans",sans-serif;margin-left:16vw;color:#fff;animation:wdUp .9s .4s both}.wd-hero-inner>p{max-width:560px;color:rgba(255,255,255,.62);line-height:1.7;font-size:15px;margin:65px 0 30px 16vw;animation:wdUp .9s .6s both}.wd-hero-actions{margin-left:16vw;display:flex;align-items:center;gap:20px;animation:wdUp .9s .72s both}
.wd-primary,.wd-secondary{display:inline-flex;align-items:center;justify-content:center;gap:10px;border-radius:999px;padding:14px 19px;font-weight:600;font-size:13px;transition:.3s}.wd-primary{background:#fff;color:#06151a}.wd-primary:hover{transform:translateY(-3px);background:var(--wd-cyan)}.wd-secondary{color:#fff;border:1px solid rgba(255,255,255,.25)}.wd-secondary:hover{border-color:var(--wd-cyan);color:var(--wd-cyan)}.wd-primary svg,.wd-secondary svg,.wd-card-bottom svg,.wd-system-list svg,.wd-close svg{width:17px;height:17px}.wd-hero-index{position:absolute;right:28px;bottom:32px;font:400 9px "DM Mono",monospace;color:rgba(255,255,255,.32)}
.wd-intro{padding:135px clamp(24px,8vw,120px);display:grid;grid-template-columns:1.25fr .75fr;gap:90px;align-items:end;background:var(--wd-cream)}.wd-label{color:#75817b}.wd-intro h2,.wd-catalog-head h2,.wd-system-copy h2,.wd-pricing-note h2,.wd-cta h2{font-size:clamp(48px,6vw,84px);line-height:.9;letter-spacing:-.07em;margin:18px 0 0}.wd-intro h2 em,.wd-catalog-head h2 em,.wd-system-copy h2 em,.wd-pricing-note h2 em,.wd-cta h2 em{font:400 1em/1 "Playfair Display",serif;color:#087c9a}.wd-intro>p{max-width:460px;color:#68726d;line-height:1.75;font-size:15px;margin:0}
.wd-catalog{padding:125px clamp(24px,7vw,110px) 150px;background:#ece9e1}.wd-catalog-head{max-width:1120px;margin:0 auto 60px;display:grid;grid-template-columns:1fr .65fr;gap:90px;align-items:end}.wd-catalog-head>p{color:#68726d;font-size:14px;line-height:1.7;margin:0}.wd-cards{max-width:1120px;margin:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.wd-card{appearance:none;text-align:left;position:relative;overflow:hidden;min-height:355px;padding:25px;display:flex;flex-direction:column;background:linear-gradient(145deg,#071116,#0b2028);color:#fff;border:1px solid rgba(255,255,255,.08);cursor:pointer;transition:transform .5s cubic-bezier(.16,1,.3,1),border-color .3s,box-shadow .4s;animation-delay:calc(var(--i)*45ms)}.wd-card:hover{transform:translateY(-8px) rotateX(1deg);border-color:rgba(18,200,232,.5);box-shadow:0 24px 60px rgba(0,0,0,.16)}.wd-card:focus-visible{outline:2px solid var(--wd-cyan);outline-offset:3px}.wd-card-sheen{position:absolute;width:220px;height:220px;right:-110px;top:-100px;border-radius:50%;background:radial-gradient(circle,rgba(18,200,232,.2),transparent 68%);transition:.6s}.wd-card:hover .wd-card-sheen{transform:scale(1.7)}.wd-card-top{display:flex;justify-content:space-between;font:400 9px "DM Mono",monospace;color:rgba(255,255,255,.4);position:relative;z-index:1}.wd-card-top small{color:var(--wd-cyan)}.wd-card-number{font:400 42px/.9 "DM Mono",monospace;color:rgba(18,200,232,.18);margin:38px 0 18px}.wd-card h3{font-size:27px;line-height:1;letter-spacing:-.055em;margin:0 0 13px;position:relative;z-index:1}.wd-card p{font-size:12px;line-height:1.6;color:rgba(255,255,255,.48);margin:0;position:relative;z-index:1}.wd-card-bottom{margin-top:auto;padding-top:25px;display:flex;justify-content:space-between;align-items:center;position:relative;z-index:1;font:500 10px "DM Mono",monospace;color:var(--wd-cyan)}.wd-card-bottom svg{transition:.3s}.wd-card:hover .wd-card-bottom svg{transform:translateX(5px)}
.wd-systems{padding:125px clamp(24px,8vw,120px);background:#03070a;color:#fff;display:grid;grid-template-columns:1fr 1fr;gap:100px;align-items:center}.wd-system-copy{max-width:650px}.wd-system-copy h2{font-size:clamp(50px,6vw,86px)}.wd-system-copy p{max-width:560px;color:#aab7ba;line-height:1.7;margin:28px 0 0;font-size:14px}.wd-system-list{border-top:1px solid rgba(255,255,255,.15)}.wd-system-list>div{display:flex;align-items:center;gap:20px;padding:23px 0;border-bottom:1px solid rgba(255,255,255,.15);font-size:16px}.wd-system-list b{font:400 9px "DM Mono",monospace;color:var(--wd-cyan)}.wd-system-list span{flex:1}.wd-system-list svg{color:var(--wd-cyan);transition:.3s}.wd-system-list>div:hover svg{transform:translateX(5px)}
.wd-pricing-note{padding:125px clamp(24px,8vw,120px);background:#a9eaf3}.wd-pricing-note h2{max-width:850px}.wd-pricing-note p{max-width:650px;margin:28px 0 0;color:#315b62;line-height:1.7;font-size:14px}.wd-cta{padding:130px clamp(24px,8vw,120px);background:var(--wd-cream);text-align:center}.wd-cta h2{max-width:900px;margin:18px auto 35px}.wd-cta .wd-primary{background:#071116;color:#fff}.wd-cta .wd-primary:hover{background:var(--wd-cyan);color:#06151a}
.wd-reveal{opacity:0;transform:translateY(42px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}.wd-reveal.wd-visible{opacity:1;transform:none}
.wd-modal-backdrop{position:fixed;inset:0;z-index:500;background:rgba(0,7,10,.74);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:25px;animation:wdFade .25s ease}.wd-detail-modal{width:min(1080px,100%);max-height:min(850px,92vh);overflow:auto;display:grid;grid-template-columns:.78fr 1.22fr;background:#f4f0e9;color:#14231f;box-shadow:0 35px 100px rgba(0,0,0,.35);animation:wdModal .55s cubic-bezier(.16,1,.3,1)}.wd-close{position:absolute;z-index:3;margin:18px 0 0 18px;width:42px;height:42px;border:1px solid rgba(255,255,255,.25);border-radius:50%;background:#071116;color:#fff;display:grid;place-items:center;cursor:pointer}.wd-detail-visual{min-height:580px;background:linear-gradient(145deg,#03070a,#0b3542);display:flex;align-items:center;justify-content:center;padding:55px;overflow:hidden}.wd-detail-content{padding:60px 55px}.wd-detail-content h2{font-size:clamp(45px,5vw,72px);line-height:.9;letter-spacing:-.065em;margin:16px 0}.wd-detail-lead{color:#68726d;line-height:1.7;font-size:14px;max-width:600px}.wd-detail-meta{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:30px 0}.wd-detail-meta>div{border:1px solid rgba(20,35,31,.14);padding:18px}.wd-detail-meta small,.wd-detail-columns h4{display:block;font:500 9px "DM Mono",monospace;color:#75817b;letter-spacing:.1em;margin-bottom:8px}.wd-detail-meta strong{font-size:20px;letter-spacing:-.04em}.wd-detail-columns{display:grid;grid-template-columns:1fr 1fr;gap:35px;border-top:1px solid rgba(20,35,31,.13);padding-top:25px}.wd-detail-columns h4{margin:0 0 13px}.wd-detail-columns p{display:flex;gap:8px;color:#53615b;font-size:12px;line-height:1.5;margin:8px 0}.wd-detail-columns p svg{width:15px;height:15px;flex:none;color:#087c9a}.wd-stack-title{margin-top:25px!important}.wd-stack{display:flex;flex-wrap:wrap;gap:7px}.wd-stack span{border:1px solid rgba(20,35,31,.15);padding:7px 9px;font:400 8px "DM Mono",monospace}.wd-modal-cta{margin-top:30px;background:#071116;color:#fff}.wd-modal-cta:hover{background:#087c9a}
.wd-visual{width:100%;position:relative;transform:rotate(-3deg)}.wd-window{border:1px solid rgba(255,255,255,.18);background:#071116;box-shadow:0 25px 70px rgba(0,0,0,.3);animation:wdWindow 5s ease-in-out infinite}.wd-window-bar{height:38px;border-bottom:1px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:6px;padding:0 12px}.wd-window-bar i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.3)}.wd-window-bar span{margin-left:auto;font:400 7px "DM Mono",monospace;color:rgba(255,255,255,.28)}.wd-window-body{display:grid;grid-template-columns:55px 1fr;min-height:320px}.wd-side{border-right:1px solid rgba(255,255,255,.1);padding:18px 13px}.wd-side b{display:block;height:8px;margin-bottom:17px;background:rgba(18,200,232,.2)}.wd-main{padding:35px 28px}.wd-line{height:9px;width:58%;background:rgba(255,255,255,.12);margin-bottom:12px}.wd-line-big{width:82%;height:22px;background:rgba(18,200,232,.3)}.wd-line.short{width:40%}.wd-blocks{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:45px}.wd-blocks span{height:100px;background:linear-gradient(145deg,rgba(18,200,232,.2),rgba(24,119,232,.04));border:1px solid rgba(18,200,232,.16)}.wd-float{position:absolute;padding:10px 13px;background:#12c8e8;color:#031116;font:500 9px "DM Mono",monospace;box-shadow:8px 8px 0 rgba(0,0,0,.18)}.wd-float-one{left:-18px;top:20%}.wd-float-two{right:-18px;bottom:17%;background:#fff}
@keyframes wdGrid{to{background-position:72px 72px}}@keyframes wdFloat{50%{transform:translate3d(0,-22px,0)}}@keyframes wdPulse{50%{opacity:.35;box-shadow:0 0 4px var(--wd-cyan)}}@keyframes wdUp{from{opacity:0;transform:translateY(45px)}to{opacity:1;transform:none}}@keyframes wdFade{from{opacity:0}to{opacity:1}}@keyframes wdModal{from{opacity:0;transform:translateY(35px) scale(.97)}to{opacity:1;transform:none}}@keyframes wdWindow{50%{transform:translateY(-8px)}}
@media(max-width:900px){.wd-hero{min-height:700px}.wd-hero-inner{padding:140px 24px 80px}.wd-hero h1 em{margin-left:5vw}.wd-hero h1 strong{margin-left:10vw}.wd-hero-inner>p,.wd-hero-actions{margin-left:10vw}.wd-intro,.wd-systems{grid-template-columns:1fr;gap:45px}.wd-catalog-head{grid-template-columns:1fr;gap:25px}.wd-cards{grid-template-columns:repeat(2,1fr)}.wd-detail-modal{grid-template-columns:1fr}.wd-detail-visual{min-height:360px}.wd-detail-content{padding:45px 28px}}
@media(max-width:620px){.wd-kicker b{display:none}.wd-hero{min-height:690px}.wd-hero-inner{padding:120px 20px 60px}.wd-hero h1{font-size:clamp(53px,15vw,82px)}.wd-hero h1 em{font-size:1.08em;margin-left:0}.wd-hero h1 strong{font-size:.82em;margin-left:8vw}.wd-hero-inner>p,.wd-hero-actions{margin-left:0}.wd-hero-inner>p{margin-top:45px}.wd-hero-actions{flex-wrap:wrap}.wd-intro,.wd-catalog,.wd-systems,.wd-pricing-note,.wd-cta{padding:85px 20px}.wd-intro h2,.wd-catalog-head h2,.wd-system-copy h2,.wd-pricing-note h2,.wd-cta h2{font-size:clamp(43px,13vw,65px)}.wd-cards{grid-template-columns:1fr}.wd-card{min-height:320px}.wd-detail-visual{padding:35px 20px;min-height:300px}.wd-detail-content{padding:38px 22px}.wd-detail-meta,.wd-detail-columns{grid-template-columns:1fr}.wd-window-body{min-height:240px}.wd-main{padding:24px 18px}.wd-blocks{margin-top:30px}.wd-close{position:fixed}.wd-system-list>div{font-size:14px}}
`}</style>