import { motion } from "framer-motion";
import { Lightbulb, PencilRuler, Code2, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Understand",
    icon: <Lightbulb className="text-bright w-6 h-6" />,
    desc: "We dive deep into your goals, needs, and challenges to define a crystal-clear direction.",
  },
  {
    id: 2,
    title: "Design",
    icon: <PencilRuler className="text-bright w-6 h-6" />,
    desc: "We shape intuitive, elegant, and functional digital experiences tailored to your vision.",
  },
  {
    id: 3,
    title: "Build",
    icon: <Code2 className="text-bright w-6 h-6" />,
    desc: "We develop with precision, writing clean, scalable, high-performing code.",
  },
  {
    id: 4,
    title: "Deliver",
    icon: <Rocket className="text-bright w-6 h-6" />,
    desc: "We launch your product smoothly and support you as it grows.",
  },
];

export default function WorkflowSection() {
  return (
    <section className="w-full bg-greybg text-light py-20 md:py-28 font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-light mb-4 leading-tight">
            How We Work?
          </h2>
          <p className="text-learncolor text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A refined, transparent, and collaborative workflow built to deliver the best results.
          </p>
        </div>

        {/* DESKTOP — Horizontal Timeline */}
        <div className="hidden md:flex justify-between items-start relative mt-10">
          <div className="absolute top-6 left-0 w-full h-[2px] bg-bright/30"></div>

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center max-w-[220px] relative z-10"
            >
              <div className="w-12 h-12 rounded-full bg-greybg border-2 border-bright flex items-center justify-center shadow-[0_0_20px_#00bcd4] mb-6">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-light mb-2">{step.title}</h3>
              <p className="text-createcolor leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* MOBILE — Vertical Timeline */}
        <div className="md:hidden mt-10 flex flex-col gap-10 relative pl-8">

          {/* Vertical line */}
          <div className="absolute top-0 left-3 w-[2px] h-full bg-bright/40"></div>

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative flex gap-5"
            >
              {/* Node */}
              <div className="w-8 h-8 rounded-full bg-greybg border-2 border-bright flex items-center justify-center shadow-[0_0_12px_#00bcd4] absolute -left-[1.05rem] top-0">
                {step.icon}
              </div>

              {/* Text */}
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-light mb-1">{step.title}</h3>
                <p className="text-createcolor text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
