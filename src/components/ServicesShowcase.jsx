import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Smartphone, Brush, GraduationCap } from "lucide-react";

const items = [
  {
    title: "Web Development",
    icon: <Code2 className="text-bright" size={32} />,
    desc: "Scalable, responsive, and fast web solutions crafted with precision.",
  },
  {
    title: "Mobile Applications",
    icon: <Smartphone className="text-bright" size={32} />,
    desc: "Cross-platform mobile apps with fluid, reliable experiences.",
  },
  {
    title: "Graphic Design",
    icon: <Brush className="text-bright" size={32} />,
    desc: "Visually striking designs shaping your brand identity.",
  },
  {
    title: "IT Courses",
    icon: <GraduationCap className="text-bright" size={32} />,
    desc: "Hands-on IT training for future-ready professionals.",
  },
];

export default function ServicesShowcase() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "start start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-120px"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[180vh] bg-greybg text-light flex items-start justify-center font-sans"
    >
      
      {/* Floating Hero Title */}
      <motion.h2
        style={{ scale: titleScale, x: titleX, y: titleY }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-4xl md:text-6xl font-bold text-light pointer-events-none"
      >
        What we do
      </motion.h2>

      {/* Sidebar List */}
      <div className="absolute top-[120vh] right-0 w-full md:w-1/2 px-6 md:px-12">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.18 }}
            className="mb-10 flex gap-5"
          >
            <div className="mt-1">{item.icon}</div>

            <div>
              <h3 className="text-xl font-semibold text-light">{item.title}</h3>
              <p className="text-[#d0d0d0] text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
