import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cpu,
  GraduationCap,
  Compass,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import servicesData from "../data/servicesData";

// Category metadata — order here defines display order (Build → Automate → Train → Support)
const CATEGORY_META = {
  build: { label: "Build", icon: Code2 },
  automate: { label: "Automate", icon: Cpu },
  train: { label: "Train", icon: GraduationCap },
  consulting: { label: "Support", icon: Compass },
};
const CATEGORY_ORDER = ["build", "automate", "train", "consulting"];

const pad = (n) => String(n).padStart(2, "0");

const ServicesSection = () => {
  const [openId, setOpenId] = useState(servicesData[0]?.id ?? null);
  const [filter, setFilter] = useState("all");

  const grouped = useMemo(() => {
    return CATEGORY_ORDER.map((cat) => ({
      key: cat,
      meta: CATEGORY_META[cat],
      items: servicesData.filter((s) => s.category === cat),
    })).filter((group) => group.items.length > 0);
  }, []);

  const visibleGroups = useMemo(() => {
    if (filter === "all") return grouped;
    return grouped.filter((g) => g.key === filter);
  }, [grouped, filter]);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="relative bg-greybg text-light py-16 sm:py-20 lg:py-28 font-sans overflow-hidden">
      {/* Ambient dot grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
        {/* ---------- Header ---------- */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 max-w-2xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] mb-5">
            Four ways we move
            <br className="hidden sm:block" /> your business forward.
          </h1>
          <p className="text-base sm:text-lg text-learncolor leading-relaxed">
            <span className="text-light font-semibold">SADEVZ</span> builds the software,
            automates the busywork, and trains your team to actually use it —
            all under one roof.
          </p>
        </motion.div>

        {/* ---------- Category filter ---------- */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 sm:mb-14 border-b border-createcolor/20 pb-6">
          <button
            onClick={() => setFilter("all")}
            className={`text-sm sm:text-base font-medium transition-colors duration-200 relative pb-1 ${
              filter === "all" ? "text-bright" : "text-learncolor hover:text-light"
            }`}
          >
            All services
            {filter === "all" && (
              <motion.span
                layoutId="filterUnderline"
                className="absolute left-0 right-0 -bottom-[25px] h-px bg-bright"
              />
            )}
          </button>
          {CATEGORY_ORDER.map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex items-center gap-1.5 text-sm sm:text-base font-medium transition-colors duration-200 relative pb-1 ${
                  active ? "text-bright" : "text-learncolor hover:text-light"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {meta.label}
                {active && (
                  <motion.span
                    layoutId="filterUnderline"
                    className="absolute left-0 right-0 -bottom-[25px] h-px bg-bright"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ---------- Grouped service index ---------- */}
        <div className="space-y-12 sm:space-y-16">
          {visibleGroups.map((group) => {
            const GroupIcon = group.meta.icon;
            return (
              <div key={group.key}>
                {/* Category divider */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-2"
                >
                  <GroupIcon className="w-4 h-4 text-bright shrink-0" />
                  <h2 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-light">
                    {group.meta.label}
                  </h2>
                  <div className="flex-1 h-px bg-createcolor/20" />
                </motion.div>

                {/* Rows */}
                <div className="divide-y divide-createcolor/10">
                  {group.items.map((service) => {
                    const isOpen = openId === service.id;
                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {/* Row header — click to expand */}
                        <button
                          onClick={() => toggle(service.id)}
                          className="w-full flex items-start sm:items-center gap-4 sm:gap-6 py-5 sm:py-6 text-left group"
                        >
                          {/* Outlined index numeral — signature element */}
                          <span
                            className="hidden sm:block text-3xl md:text-4xl font-bold leading-none shrink-0 select-none transition-colors duration-300"
                            style={{
                              WebkitTextStroke: isOpen ? "1px #00bcd4" : "1px #6c6c6c",
                              color: "transparent",
                            }}
                          >
                            {pad(service.id)}
                          </span>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-base sm:text-xl md:text-2xl font-semibold text-light group-hover:text-bright transition-colors duration-200">
                                {service.title}
                              </span>
                              <span className="text-base sm:text-lg" aria-hidden="true">
                                {service.icon}
                              </span>
                            </div>
                            {!isOpen && (
                              <p className="text-sm sm:text-base text-learncolor mt-1 leading-relaxed line-clamp-2 sm:line-clamp-1">
                                {service.description}
                              </p>
                            )}
                          </div>

                          <motion.span
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.25 }}
                            className={`shrink-0 mt-1 sm:mt-0 p-1.5 rounded-full border transition-colors duration-200 ${
                              isOpen
                                ? "border-bright text-bright"
                                : "border-createcolor/40 text-learncolor group-hover:border-bright group-hover:text-bright"
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.span>
                        </button>

                        {/* Expanded detail */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pb-8 sm:pb-10 sm:pl-[calc(2.25rem+1.5rem)] grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
                                {/* Image */}
                                <div className="md:col-span-2 rounded-xl overflow-hidden aspect-[4/3] sm:aspect-video md:aspect-[4/3]">
                                  <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </div>

                                {/* Text content */}
                                <div className="md:col-span-3 flex flex-col">
                                  <p className="text-sm sm:text-base text-learncolor leading-relaxed mb-5">
                                    {service.detailedDescription}
                                  </p>

                                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                                    {service.features.map((feature, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2 text-sm text-light/90"
                                      >
                                        <span className="text-bright mt-1.5 w-1 h-1 rounded-full bg-bright shrink-0" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>

                                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-createcolor mb-6">
                                    {service.technologies.map((tech, i) => (
                                      <React.Fragment key={tech}>
                                        <span>{tech}</span>
                                        {i < service.technologies.length - 1 && (
                                          <span className="text-createcolor/50">·</span>
                                        )}
                                      </React.Fragment>
                                    ))}
                                  </div>

                                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-createcolor/15">
                                    <div className="flex flex-wrap gap-x-8 gap-y-1 text-xs sm:text-sm">
                                      <div>
                                        <span className="block text-createcolor uppercase tracking-wide text-[10px] mb-0.5">
                                          Pricing
                                        </span>
                                        <span className="text-light font-medium">
                                          {service.pricing}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="block text-createcolor uppercase tracking-wide text-[10px] mb-0.5">
                                          Timeline
                                        </span>
                                        <span className="text-light font-medium">
                                          {service.timeline}
                                        </span>
                                      </div>
                                    </div>

                                    <a
                                      href={`/start-project?service=${service.slug}`}
                                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-bright hover:gap-2.5 transition-all duration-200"
                                    >
                                      Start this project
                                      <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ---------- Closing CTA ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 pt-10 border-t border-createcolor/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-base sm:text-lg text-learncolor max-w-md">
            Not sure which one fits?{" "}
            <span className="text-light font-medium">
              Tell us where it hurts — we'll point you to the right pillar.
            </span>
          </p>
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-base font-semibold text-bright hover:gap-3 transition-all duration-200 shrink-0"
          >
            View full service catalog
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;