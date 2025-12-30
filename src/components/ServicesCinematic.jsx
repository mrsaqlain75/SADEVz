import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Smartphone, Brush, GraduationCap } from "lucide-react";

const SERVICES = [
  {
    title: "Web Development",
    icon: Code2,
    desc: "Scalable, responsive, and fast web solutions crafted with precision and performance.",
  },
  {
    title: "Mobile Applications",
    icon: Smartphone,
    desc: "Cross-platform mobile apps designed to deliver smooth and reliable user experiences.",
  },
  {
    title: "Graphic Design",
    icon: Brush,
    desc: "Visually striking designs that define your brand identity and enhance communication.",
  },
  {
    title: "IT Courses",
    icon: GraduationCap,
    desc: "Hands-on IT training that empowers learners to become future-ready professionals.",
  },
];

export default function ServicesCinematic() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Center to left movement for heading
  const headingX = useTransform(scrollYProgress, [0, 0.25], ["-50%", "0%"]);
  const headingTranslateX = useTransform(scrollYProgress, [0, 0.25], ["-50%", "0%"]);
  const headingScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.6]);
  const headingAlign = useTransform(scrollYProgress, [0, 0.25], ["center", "left"]);

  return (
    <section
      ref={ref}
      className="relative bg-greybg text-light py-40 md:py-52 overflow-hidden font-sans"
    >
      <div className="w-[92%] max-w-7xl mx-auto relative min-h-[150vh] grid grid-cols-1 lg:grid-cols-[1fr_1fr]">

        {/* HEADING: starts centered, transforms to left + pinned */}
        <motion.div
          className="sticky top-28 h-fit"
          style={{
            scale: headingScale,
            left: headingX,
            transform: headingTranslateX,
            textAlign: headingAlign,
            position: "sticky",
          }}
        >
          <h2 className="font-bold text-4xl md:text-6xl text-light">
            What We Do?
          </h2>
        </motion.div>

        {/* SERVICES LIST ON RIGHT */}
        <div className="relative mt-20 lg:mt-0 lg:pl-20 space-y-10">

          {SERVICES.map((s, i) => {
            const Icon = s.icon;

            const appearStart = 0.2 + i * 0.12;

            const cardOpacity = useTransform(
              scrollYProgress,
              [appearStart, appearStart + 0.15],
              [0, 1]
            );

            const cardY = useTransform(
              scrollYProgress,
              [appearStart, appearStart + 0.15],
              [40, 0]
            );

            return (
              <motion.div
                key={s.title}
                style={{ opacity: cardOpacity, y: cardY }}
                className="bg-[#292b2c] p-6 md:p-8 rounded-2xl shadow-[0_0_20px_#00bcd4]/20 
                           border border-bright/10 flex gap-4 
                           hover:-translate-y-1 hover:shadow-[0_0_25px_#00bcd4]/40 
                           transition-transform"
              >
                <Icon size={36} className="text-bright shrink-0" />

                <div>
                  <h3 className="text-xl font-semibold mb-1">{s.title}</h3>
                  <p className="text-[#d0d0d0] text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
