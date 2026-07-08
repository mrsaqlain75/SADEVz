import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, X, Menu, ArrowUpRight, Globe, Smartphone, GraduationCap, Zap, Sparkles } from "lucide-react";
import logo from "../assets/horizontal-logo.png";
import { Link } from "react-router-dom";

/* ─── Inject Manrope + keyframe styles ───────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');

    .header-root * { font-family: 'Manrope', sans-serif; }

    /* ── CTA shimmer ── */
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1);   opacity: 0.6; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @keyframes float-arrow {
      0%, 100% { transform: translateX(0); }
      50%       { transform: translateX(4px); }
    }

    /* ── dropdown ── */
    @keyframes dropIn {
      from { opacity: 0; transform: translateY(-8px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0)   scale(1); }
    }
    .services-dropdown { animation: dropIn 0.25s cubic-bezier(0.16,1,0.3,1) both; }

    /* ── mobile overlay ── */
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(100%); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutRight {
      from { opacity: 1; transform: translateX(0); }
      to   { opacity: 0; transform: translateX(100%); }
    }
    .mobile-menu-enter { animation: slideInRight  0.45s cubic-bezier(0.16,1,0.3,1) both; }
    .mobile-menu-exit  { animation: slideOutRight 0.35s cubic-bezier(0.7,0,0.84,0) both; }

    /* ── mobile nav stagger ── */
    @keyframes navItemIn {
      from { opacity: 0; transform: translateX(24px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .nav-item-stagger { animation: navItemIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }

    /* ── mobile accordion ── */
    @keyframes accordionOpen {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .accordion-open { animation: accordionOpen 0.25s ease-out both; }

    /* ── CTA button shimmer background ── */
    .cta-btn {
      background: linear-gradient(
        90deg,
        #0ea5e9 0%, #3b82f6 40%, #7dd3fc 50%, #3b82f6 60%, #0ea5e9 100%
      );
      background-size: 200% auto;
      transition: background-position 0.6s ease, box-shadow 0.3s ease, transform 0.2s ease;
    }
    .cta-btn:hover {
      background-position: right center;
      box-shadow: 0 8px 32px rgba(14,165,233,0.45);
      transform: translateY(-1px) scale(1.03);
    }
    .cta-btn:active { transform: scale(0.97); }

    .cta-arrow { transition: transform 0.3s ease; }
    .cta-btn:hover .cta-arrow { animation: float-arrow 0.6s ease infinite; }

    /* ── service card hover line ── */
    .service-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 14px;
      background: linear-gradient(135deg, rgba(14,165,233,0.08), rgba(59,130,246,0.08));
      opacity: 0;
      transition: opacity 0.3s;
    }
    .service-card:hover::before { opacity: 1; }

    /* ── nav underline ── */
    .nav-link-line {
      position: absolute;
      bottom: 4px; left: 50%;
      height: 2px; width: 0;
      transform: translateX(-50%);
      background: linear-gradient(90deg, #0ea5e9, #3b82f6);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
    .nav-link:hover .nav-link-line,
    .nav-link.active .nav-link-line { width: 60%; }

    /* ── mobile toggle pill ── */
    @keyframes spinIn {
      from { transform: rotate(-90deg) scale(0.7); opacity: 0; }
      to   { transform: rotate(0)     scale(1);   opacity: 1; }
    }
    .icon-spin { animation: spinIn 0.25s ease both; }

    /* ── logo glow on hover ── */
    .logo-wrap:hover img { filter: drop-shadow(0 0 8px rgba(14,165,233,0.5)); }
  `}</style>
);

/* ─── Data ───────────────────────────────────────────────────────────────── */
const servicesItems = [
  {
    category: "Web Development",
    description: "Custom websites & web applications built to scale",
    icon: Globe,
    accent: "from-sky-400 to-blue-500",
  },
  {
    category: "Mobile App Development",
    description: "Native iOS & Android apps users love",
    icon: Smartphone,
    accent: "from-violet-400 to-purple-500",
  },
  {
    category: "IT Education",
    description: "Personal & corporate training programs",
    icon: GraduationCap,
    accent: "from-emerald-400 to-teal-500",
  },
  {
    category: "Digital Solutions",
    description: "End-to-end digital transformation journeys",
    icon: Zap,
    accent: "from-amber-400 to-orange-500",
  },
];

const navItems = [
  { label: "Home",      href: "/" },
  { label: "Services",  href: "/services", hasDropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blogs",     href: "/blog" },
  { label: "About",     href: "/about" },
  { label: "Contact",   href: "/contact" },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
function Header() {
  const [isOpen,             setIsOpen]             = useState(false);
  const [servicesOpen,       setServicesOpen]       = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [menuExiting,        setMenuExiting]        = useState(false);
  const [scrolled,           setScrolled]           = useState(false);

  const dropdownRef = useRef(null);
  const leaveTimer  = useRef(null);

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close on resize */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* click outside dropdown */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setServicesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* body scroll lock when mobile open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* helpers */
  const openMenu  = ()  => { setMenuExiting(false); setIsOpen(true); };
  const closeMenu = ()  => {
    setMenuExiting(true);
    setTimeout(() => { setIsOpen(false); setMenuExiting(false); setMobileServicesOpen(false); }, 350);
  };
  const toggleMenu = () => isOpen ? closeMenu() : openMenu();

  const hoverServices = () => {
    if (window.innerWidth >= 768) {
      clearTimeout(leaveTimer.current);
      setServicesOpen(true);
    }
  };
  const leaveServices = () => {
    if (window.innerWidth >= 768)
      leaveTimer.current = setTimeout(() => setServicesOpen(false), 220);
  };

  return (
    <>
      <GlobalStyles />

      {/* ══════════════ DESKTOP HEADER ══════════════ */}
      <header
        className={`
          header-root
          fixed left-1/2 top-4 -translate-x-1/2
          w-[95%] lg:w-[94%] xl:w-[92%] max-w-7xl
          rounded-2xl z-[1000]
          flex justify-between items-center
          px-5 py-2.5
          transition-all duration-500
          ${scrolled
            ? "bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/60"
            : "bg-white/80  shadow-[0_8px_32px_rgba(0,0,0,0.08)]  border border-white/40"}
          backdrop-blur-2xl
        `}
      >

        {/* Logo */}
        <Link to="/" className="logo-wrap relative flex items-center transition-all duration-300">
          <img src={logo} alt="SADEVZ Logo" className="h-10 md:h-12 transition-all duration-300" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) =>
            item.hasDropdown ? (
              /* Services with mega-dropdown */
              <div
                key={item.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={hoverServices}
                onMouseLeave={leaveServices}
              >
                <button
                  onClick={() => setServicesOpen((v) => !v)}
                  className="nav-link relative flex items-center gap-1 px-4 py-2.5 text-sm font-600 text-gray-700 hover:text-sky-500 transition-colors duration-200 rounded-xl hover:bg-sky-50/60"
                  style={{ fontWeight: 600 }}
                >
                  {item.label}
                  <ChevronDown
                    className="w-3.5 h-3.5 transition-transform duration-300"
                    style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0)" }}
                  />
                  <span className="nav-link-line" />
                </button>

                {/* ── Mega Dropdown ── */}
                {servicesOpen && (
                  <div
                    className="services-dropdown absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] z-50"
                    onMouseEnter={hoverServices}
                    onMouseLeave={leaveServices}
                  >
                    {/* Connector bridge (so mouse doesn't lose hover) */}
                    <div className="absolute -top-3 left-0 right-0 h-3" />

                    <div
                      className="w-[520px] rounded-2xl overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.98)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(14,165,233,0.15)",
                        boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.8) inset",
                      }}
                    >
                      {/* Top gradient bar */}
                      <div className="h-[3px] bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500" />

                      <div className="p-5">
                        {/* Header row */}
                        <div className="flex items-center justify-between mb-4 px-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-700 uppercase tracking-widest text-sky-500" style={{ fontWeight: 700 }}>
                              Our Services
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 font-500" style={{ fontWeight: 500 }}>
                            Premium solutions
                          </span>
                        </div>

                        {/* Service cards grid */}
                        <div className="grid grid-cols-2 gap-2.5 mb-4">
                          {servicesItems.map((svc, i) => {
                            const Icon = svc.icon;
                            return (
                              <Link
                                key={i}
                                to="/services"
                                onClick={() => setServicesOpen(false)}
                                className="service-card relative group flex items-start gap-3 p-4 rounded-[14px] border border-gray-100 hover:border-sky-200/80 transition-all duration-300 hover:shadow-sm"
                              >
                                {/* Icon pill */}
                                <div className={`flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${svc.accent} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                  <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-700 text-gray-900 group-hover:text-sky-600 transition-colors leading-tight mb-0.5" style={{ fontWeight: 700 }}>
                                    {svc.category}
                                  </p>
                                  <p className="text-xs text-gray-500 leading-snug" style={{ fontWeight: 400 }}>
                                    {svc.description}
                                  </p>
                                </div>
                                <ArrowUpRight className="absolute top-3 right-3 w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:text-sky-500 transition-all duration-300" />
                              </Link>
                            );
                          })}
                        </div>

                        {/* View all row */}
                        <div className="pt-3 border-t border-gray-100/80">
                          <Link
                            to="/services"
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100/80 hover:border-sky-300/60 hover:from-sky-100 hover:to-blue-100 transition-all duration-300 group"
                          >
                            <span className="text-sm font-700 text-sky-600 group-hover:text-sky-700" style={{ fontWeight: 700 }}>
                              View all services
                            </span>
                            <div className="flex items-center gap-1.5 text-sky-500 group-hover:text-sky-700">
                              <span className="text-xs font-500" style={{ fontWeight: 500 }}>Explore more</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Regular nav item */
              <Link
                key={item.label}
                to={item.href}
                className="nav-link relative px-4 py-2.5 text-sm text-gray-700 hover:text-sky-500 transition-colors duration-200 rounded-xl hover:bg-sky-50/60 block"
                style={{ fontWeight: 600 }}
              >
                {item.label}
                <span className="nav-link-line" />
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            to="/start-project"
            className="cta-btn relative flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm overflow-hidden"
            style={{ fontWeight: 700 }}
          >
            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-full bg-sky-400 opacity-0 hover:opacity-100"
              style={{
                animation: "pulse-ring 1.5s cubic-bezier(0.215,0.61,0.355,1) infinite",
              }}
            />
            <span className="relative z-10">Start a Project</span>
            <ChevronRight className="cta-arrow relative z-10 w-4 h-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="block md:hidden p-2.5 rounded-xl bg-white/60 border border-gray-200/80 text-gray-700 hover:text-sky-500 hover:border-sky-200 transition-all duration-300 hover:shadow-md focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen
            ? <X   key="x"    className="icon-spin w-5 h-5" />
            : <Menu key="menu" className="icon-spin w-5 h-5" />
          }
        </button>
      </header>

      {/* ══════════════ MOBILE OVERLAY ══════════════ */}
      {(isOpen || menuExiting) && (
        <div className={`header-root fixed inset-0 z-[999] ${menuExiting ? "mobile-menu-exit" : "mobile-menu-enter"}`}>

          {/* BG layers */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1a2e 100%)",
          }} />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }} />
          {/* Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{
            background: "radial-gradient(circle, #0ea5e9, transparent 70%)",
            filter: "blur(40px)",
          }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{
            background: "radial-gradient(circle, #3b82f6, transparent 70%)",
            filter: "blur(60px)",
          }} />

          {/* Scrollable content */}
          <div className="relative z-10 h-full flex flex-col overflow-y-auto">

            {/* Top bar: logo + close */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <Link to="/" onClick={closeMenu}>
                <img src={logo} alt="SADEVZ" className="h-9 brightness-0 invert opacity-90" />
              </Link>
              <button
                onClick={closeMenu}
                className="p-2.5 rounded-xl border text-white hover:text-sky-400 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thin divider */}
            <div className="h-px mx-6 mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

            {/* Nav items */}
            <nav className="flex-1 px-4 space-y-1">
              {navItems.map((item, idx) => (
                <div
                  key={item.label}
                  className="nav-item-stagger"
                  style={{ animationDelay: `${idx * 60 + 80}ms` }}
                >
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-white transition-all duration-300"
                        style={{
                          background: mobileServicesOpen ? "rgba(14,165,233,0.12)" : "transparent",
                          border: mobileServicesOpen ? "1px solid rgba(14,165,233,0.25)" : "1px solid transparent",
                          fontWeight: 700,
                          fontSize: "1.125rem",
                        }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className="w-5 h-5 transition-transform duration-300"
                          style={{
                            transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                            color: mobileServicesOpen ? "#38bdf8" : "rgba(255,255,255,0.4)",
                          }}
                        />
                      </button>

                      {/* Mobile accordion */}
                      {mobileServicesOpen && (
                        <div className="accordion-open mt-1 mb-2 space-y-2 px-2">
                          {servicesItems.map((svc, i) => {
                            const Icon = svc.icon;
                            return (
                              <Link
                                key={i}
                                to="/services"
                                onClick={() => { setMobileServicesOpen(false); closeMenu(); }}
                                className="flex items-center gap-4 px-4 py-3.5 rounded-2xl group transition-all duration-300"
                                style={{
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }}
                              >
                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${svc.accent} flex items-center justify-center shadow-md`}>
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-white truncate" style={{ fontWeight: 700 }}>{svc.category}</p>
                                  <p className="text-xs text-gray-400 truncate mt-0.5" style={{ fontWeight: 400 }}>{svc.description}</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-sky-400 transition-colors flex-shrink-0" />
                              </Link>
                            );
                          })}

                          {/* View all inside accordion */}
                          <Link
                            to="/services"
                            onClick={closeMenu}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl transition-all duration-300"
                            style={{
                              background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(59,130,246,0.15))",
                              border: "1px solid rgba(14,165,233,0.25)",
                              fontWeight: 700,
                              color: "#38bdf8",
                              fontSize: "0.875rem",
                            }}
                          >
                            View all services
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      className="block px-5 py-4 rounded-2xl text-white hover:text-sky-400 transition-all duration-300"
                      style={{
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        border: "1px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Divider */}
            <div className="h-px mx-6 my-5" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

            {/* Mobile CTA */}
            <div
              className="px-6 pb-10 nav-item-stagger"
              style={{ animationDelay: `${navItems.length * 60 + 100}ms` }}
            >
              <Link
                to="/start-project"
                onClick={closeMenu}
                className="cta-btn flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl text-white"
                style={{ fontWeight: 800, fontSize: "1rem" }}
              >
                Start a Project
                <ChevronRight className="cta-arrow w-5 h-5" />
              </Link>

              {/* small tagline below CTA */}
              <p className="text-center text-xs text-gray-500 mt-3" style={{ fontWeight: 500 }}>
                Free consultation · No commitment
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;