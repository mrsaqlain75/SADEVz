import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function CinematicHero() {
  const [phase, setPhase] = useState(0);

  const PHASE_DURATION = 2600;

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 5);
    }, PHASE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const COLORS = {
    learn: "#c8c8c8",
    create: "#6c6c6c",
    evolve: "#1a1a1a",
    bright: "#00bcd4",
    bg: "#1a1a1a",
  };

  const TEXT = [
    { title: "Learn", subtitle: "Everything begins here." },
    { title: "Create", subtitle: "Turn understanding into skill." },
    { title: "Evolve", subtitle: "Become limitless." },
    { title: "SADEVZ", subtitle: "Learn • Create • Evolve" },
    { title: "", subtitle: "" },
  ];

  const isLogo = phase === 3;
  const isCollapse = phase === 4;

  /* Scroll-triggered fade-out */
  const { scrollYProgress } = useScroll();
  const fadeOut = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);
  const slideDown = useTransform(scrollYProgress, [0.1, 0.45], [0, 80]);

  /* Slower, softer bounce */
  const bounceTransition = {
    type: "spring",
    stiffness: 110,
    damping: 30,
    mass: 0.6,
  };

  /* Mobile sizes */
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const learnSize = isMobile ? "16vmin" : "20vmin";
  const createSize = isMobile ? "22vmin" : "28vmin";
  const evolveSize = isMobile ? "26vmin" : "34vmin";

  /* Mobile spacing */
  const learnXLogo = isMobile ? -90 : -150;
  const evolveXLogo = isMobile ? 110 : 192;

  return (
    <motion.section
      style={{
        opacity: fadeOut,
        y: slideDown,
        backgroundColor: COLORS.bg,
      }}
      className="relative w-full font-sans min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,188,212,0.08), transparent 70%)",
        }}
      />

      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          width: "60vmin",
          height: "60vmin",
          border: `2px solid ${COLORS.bright}`,
          filter: "blur(14px)",
        }}
      />

      {/* ============================ */}
      {/*       LEARN CIRCLE           */}
      {/* ============================ */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          scale:
            phase === 0 ? 1.35 :
            phase === 1 ? 0.9 :
            phase === 2 ? 0.8 :
            isLogo ? 1 :
            isCollapse ? 1 : 1,   // ← FIXED: no tiny shrink

          x:
            phase === 1 ? -150 :
            phase === 2 ? -140 :
            isLogo ? learnXLogo :
            isCollapse ? 0 : 0,

          y: phase === 2 ? -20 : 0,
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          ...(isLogo && bounceTransition),
        }}
        style={{
          width: learnSize,
          height: learnSize,
          backgroundColor: COLORS.learn,
          boxShadow: `0 0 30px ${COLORS.bright}33`,
        }}
      />

      {/* ============================ */}
      {/*       CREATE CIRCLE          */}
      {/* ============================ */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          scale:
            phase === 0 ? 0.6 :
            phase === 1 ? 1.4 :
            phase === 2 ? 1 :
            isLogo ? 1 :
            isCollapse ? 0 : 0.6,

          x:
            phase === 2 ? 40 :
            isLogo ? 0 :
            isCollapse ? 0 : 0,

          y: phase === 2 ? 35 : 0,
          opacity: isCollapse ? 0 : phase >= 1 ? 1 : 0,
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          ...(isLogo && bounceTransition),
        }}
        style={{
          width: createSize,
          height: createSize,
          backgroundColor: COLORS.create,
          boxShadow: `0 0 40px ${COLORS.bright}33`,
        }}
      />

      {/* ============================ */}
      {/*       EVOLVE CIRCLE          */}
      {/* ============================ */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          scale:
            phase === 2 ? 1.7 :
            isLogo ? 1 :
            isCollapse ? 0 : 0.5,

          x:
            phase === 2 ? 10 :
            isLogo ? evolveXLogo :
            isCollapse ? 0 : 0,

          y: phase === 2 ? 10 : 0,
          opacity: isCollapse ? 0 : phase >= 2 ? 1 : 0,
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          ...(isLogo && bounceTransition),
        }}
        style={{
          width: evolveSize,
          height: evolveSize,
          backgroundColor: COLORS.evolve,
          boxShadow: `0 0 60px ${COLORS.bright}22`,
        }}
      />

      {/* ============================ */}
      {/*            TEXT              */}
      {/* ============================ */}
      <div className="absolute bottom-[18vh] flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isCollapse && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-light text-4xl md:text-6xl font-extrabold">
                {TEXT[phase].title}
              </h1>

              <p className="text-learncolor mt-2 text-lg md:text-xl">
                {TEXT[phase].subtitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
