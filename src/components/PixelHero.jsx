import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PixelHero({ headerOffset = 56 }) {
  const containerRef = useRef(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const COLORS = {
    bright: "#00bcd4",
    accent: "#efefef",
    bluebg: "#061018", // terminal blue background
    panelGlow: "#00bcd4",
    button: "#00bcd4",
    buttonHover: "#00acc1",
  };

  const codeLines = useMemo(
    () => [
      "import React, { useEffect, useState } from 'react';",
      "  return (",
      "      <h1>SADEVZ</h1>",
      ");",
      "export default ProjectsList;",
    ],
    []
  );

  // Typing effect for terminal
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText(codeLines.join("\n"));
      return;
    }
    let idx = 0;
    let line = 0;
    let cancelled = false;
    const typeNext = () => {
      if (cancelled) return;
      if (line >= codeLines.length) return;
      const text = codeLines[line];
      if (idx <= text.length) {
        setTypedText((prev) =>
          line === 0
            ? text.slice(0, idx)
            : prev.split("\n").slice(0, line).concat(text.slice(0, idx)).join("\n")
        );
        idx += 1;
        rafRef.current = setTimeout(typeNext, Math.floor(12 + Math.random() * 28));
      } else {
        idx = 0;
        line += 1;
        rafRef.current = setTimeout(typeNext, 360);
      }
    };
    typeNext();
    return () => {
      cancelled = true;
      clearTimeout(rafRef.current);
    };
  }, [codeLines, prefersReducedMotion]);

  // Canvas particles
  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth || window.innerWidth;
      h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      particles = [];
      const area = w * h;
      const base = Math.floor(area / 42000);
      const max = Math.min(80, Math.max(18, base));
      for (let i = 0; i < max; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 2.6 + 0.9,
          hue: 190 + Math.random() * 50,
        });
      }
    };

    const pointer = { x: w / 2, y: h / 2, active: false };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.active = true;
      pointerRef.current.x = pointer.x / Math.max(1, rect.width);
      pointerRef.current.y = pointer.y / Math.max(1, rect.height);
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = w / 2;
      pointer.y = h / 2;
      pointerRef.current.x = 0.5;
      pointerRef.current.y = 0.5;
    };

    let rafId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        if (pointer.active && dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.45;
          p.vy += (dy / dist) * force * 0.45;
        } else {
          const cx = w / 2,
            cy = h / 2;
          p.vx += (cx - p.x) * 0.00004;
          p.vy += (cy - p.y) * 0.00004;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) {
            const alpha = 0.16 * (1 - d2 / (110 * 110));
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(0,188,212,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,188,212,0.95)`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReducedMotion]);

  // Dynamic headings
  const services = ["Web & App Development", "Graphic Designing", "Online/Offline Courses"];
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const motionStyle = prefersReducedMotion ? { transition: "none" } : {};

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] md:min-h-screen overflow-hidden flex justify-center"
      style={{ paddingTop: '56px', background: COLORS.bluebg }} // mobile default

    >
      {/* Animated gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30 pointer-events-none"
        style={{
          background: "linear-gradient(270deg, #061018, #0a1f33, #003366, #061018)",
          backgroundSize: "800% 800%",
          animation: "gradientShift 20s ease infinite",
          mixBlendMode: "overlay",
          opacity: 0.85,
        }}
      />

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-20"
        aria-hidden
      />

      {/* subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "72px 72px, 72px 72px",
          opacity: 0.04,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-8">
        {/* Left panel */}
        <motion.div
          className="relative w-full lg:w-1/2 p-6 rounded-2xl"
          style={{
            background: COLORS.bluebg,
            border: `1px solid rgba(255,255,255,0.03)`,
            boxShadow: `0 0 20px ${COLORS.panelGlow}33, 0 10px 40px rgba(0,0,0,0.6)`,
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          <div className=" flex flex-col items-start">
            <AnimatePresence mode="wait">
              <motion.h2
                key={services[currentService]}
                className="text-3xl md:text-4xl font-extrabold"
                style={{ color: COLORS.accent }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
              >
                {services[currentService]}
              </motion.h2>
            </AnimatePresence>
            <p className="mt-3" style={{ color: "#cbd5d6", maxWidth: "44rem" }}>
              End-to-end engineering for web & mobile — fast iteration, secure infrastructure, delightful UX.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <motion.button
                className="relative inline-flex items-center gap-3 px-5 py-3 rounded-full font-semibold shadow-md"
                style={{
                  background: COLORS.button,
                  color: "#021018",
                  transition: "background 0.3s ease",
                }}
                whileHover={{ background: COLORS.buttonHover }}
                whileTap={{ scale: 0.97 }}
              >
                Start a project
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>

              <a
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border"
                href="#work"
                style={{ color: COLORS.accent, borderColor: "rgba(255,255,255,0.06)" }}
              >
                Our work
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right panels */}
        <div className="relative w-full lg:w-1/2 flex flex-col gap-6">
          <motion.div
            className="p-4 rounded-xl"
            style={{
              background: COLORS.bluebg,
              border: `1px solid rgba(255,255,255,0.03)`,
              boxShadow: `0 0 20px ${COLORS.panelGlow}33, inset 0 1px 0 rgba(255,255,255,0.02), 0 6px 20px rgba(0,0,0,0.5)`,
            }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.015 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Active Projects
                </div>
                <div className="text-2xl font-bold" style={{ color: COLORS.bright }}>5</div>
              </div>
              <div className="text-right">
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Latency</div>
                <div className="text-2xl font-bold" style={{ color: COLORS.accent }}>42ms</div>
              </div>
            </div>

            <div className="mt-4 h-12 w-full rounded-md overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden>
                <polyline
                  points="0,18 10,14 20,10 30,12 40,8 50,6 60,8 70,4 80,6 90,2 100,4"
                  fill="none"
                  stroke={COLORS.bright}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: `1px solid rgba(255,255,255,0.04)`,
              background: COLORS.bluebg,
              boxShadow: `0 0 20px ${COLORS.panelGlow}33, 0 10px 40px rgba(0,0,0,0.6)`,
            }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            aria-live="polite"
          >
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.28), rgba(0,0,0,0.12))" }}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full block" style={{ background: "#ff6b6b" }} />
                <span className="w-3 h-3 rounded-full block" style={{ background: "#ffd166" }} />
                <span className="w-3 h-3 rounded-full block" style={{ background: "#8be9fd" }} />
              </div>
              <div className="ml-4 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                deploy@studio:~/project
              </div>
            </div>

            <div className="px-4 py-5 md:py-6 text-sm text-[0.95rem] font-mono leading-6" style={{ color: COLORS.accent }}>
              <pre className="whitespace-pre-wrap" style={{ margin: 0 }}>
                {typedText || (prefersReducedMotion ? codeLines.join("\n") : "")}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
}
