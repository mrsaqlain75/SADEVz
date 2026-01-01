import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function CinematicHero() {
  const [phase, setPhase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const PHASE_DURATION = 2600;

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % 4); // Only 4 phases: Learn, Create, Evolve, Logo
    }, PHASE_DURATION);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
  ];

  const isLogo = phase === 3;

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

  /* Reduced circle sizes */
  const learnSize = isMobile ? "14vmin" : "18vmin";
  const createSize = isMobile ? "18vmin" : "24vmin";
  const evolveSize = isMobile ? "22vmin" : "30vmin";

  /* FIXED: Logo positioning - all on same baseline with gaps */
  const learnXLogo = isMobile ? -90 : -120;    // More left, bigger gap
  const createXLogo = 0;                       // Stay at center (horizontal)
  const createYLogo = 0;                       // Stay on baseline (not higher)
  const evolveXLogo = isMobile ? 110 : 155;     // More right, bigger gap

  return (
    <motion.section
      style={{
        opacity: fadeOut,
        y: slideDown,
        backgroundColor: COLORS.bg,
      }}
      className="relative w-full font-sans min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Subtle background pattern with very low opacity */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${COLORS.bright}22 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* LOGO SECTION - Left side on desktop, Top on mobile */}
      {/* FIXED: Reduced mobile height gap */}
      <div className="w-full md:w-1/2 h-[45-vh] md:h-full flex items-center justify-center relative">
        
        {/* Background glow */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          animate={{ opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            width: isMobile ? "50vmin" : "60vmin",
            height: isMobile ? "50vmin" : "60vmin",
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
              isLogo ? 0.9 : 1,

            x:
              phase === 1 ? (isMobile ? -100 : -150) :
              phase === 2 ? (isMobile ? -80 : -140) :
              isLogo ? learnXLogo : 0,

            y: phase === 2 ? (isMobile ? -15 : -20) : 0,
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
              isLogo ? 0.9 : 0.6,

            x:
              phase === 2 ? (isMobile ? 20 : 40) :
              isLogo ? createXLogo : 0,

            y: 
              phase === 2 ? (isMobile ? 20 : 35) :
              isLogo ? createYLogo : 0, // FIXED: Now stays on baseline
            
            opacity: phase >= 1 ? 1 : 0,
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
              isLogo ? 0.9 : 0.5,

            x:
              phase === 2 ? (isMobile ? 8 : 10) :
              isLogo ? evolveXLogo : 0,

            y: phase === 2 ? (isMobile ? 8 : 10) : 0,
            opacity: phase >= 2 ? 1 : 0,
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
      </div>

      {/* EXPLANATION SECTION - Right side on desktop, Bottom on mobile */}
      {/* FIXED: Reduced mobile height and gap */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-full flex items-center justify-center px-4 md:px-8 md:pt-0">
        <div className="max-w-md w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Phase indicator */}
              <div className="flex gap-2 mb-4">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: phase === index ? "24px" : "8px",
                      height: "8px",
                      backgroundColor: phase === index ? COLORS.bright : "#444",
                    }}
                  />
                ))}
              </div>

              {/* Title */}
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {TEXT[phase].title}
              </h1>

              {/* Subtitle */}
              <p className="text-gray-300 text-lg md:text-xl mb-4">
                {TEXT[phase].subtitle}
              </p>

              {/* Description based on phase */}
              <div className="text-gray-400 text-sm md:text-base max-w-sm">
                {phase === 0 && (
                  <p>The foundation of growth starts with acquiring knowledge and building understanding from the ground up.</p>
                )}
                {phase === 1 && (
                  <p>Transform your knowledge into tangible skills, creating value through practical application and innovation.</p>
                )}
                {phase === 2 && (
                  <p>Continuous adaptation and growth that pushes boundaries and redefines what's possible.</p>
                )}
                {phase === 3 && (
                  <p>A complete cycle of growth where learning enables creation, and creation drives evolution in a continuous loop.</p>
                )}
              </div>

              {/* CONNECT BUTTON - Only on logo phase */}
              {isLogo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <motion.a
                    href="#contact"
                    className="px-6 py-3 rounded-full font-semibold shadow-md inline-flex items-center gap-2"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      backgroundColor: COLORS.bright,
                      color: "#061018",
                      boxShadow: `0 0 18px ${COLORS.bright}55`,
                    }}
                  >
                    <span>Connect</span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Fixed instruction text - hidden on mobile to save space */}
          {!isMobile && (
            <div className="mt-8 pt-4 border-t border-gray-800">
              <p className="text-gray-500 text-xs">
                Watch the circles animate through each phase of our core philosophy
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}