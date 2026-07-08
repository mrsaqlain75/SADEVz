import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check, Clock, ArrowUpRight, Code } from 'lucide-react';
import servicesData from '../data/servicesData';
import { Helmet } from 'react-helmet-async';

/* ─────────────────────────────────────────────────────────────
   ServicesPage  —  Editorial dark-spine layout with blog-style hero
───────────────────────────────────────────────────────────── */

const CATEGORY_ACCENTS = {
  web:        { light: '#3b82f6', text: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30' },
  mobile:     { light: '#a855f7', text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  design:     { light: '#f59e0b', text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30' },
  education:  { light: '#10b981', text: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/30' },
  consulting: { light: '#6366f1', text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
};
const accent = (cat) => CATEGORY_ACCENTS[cat] || { light: '#e5e7eb', text: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/30' };

/* ── single service row ─────────────────────────────────────── */
const ServiceRow = ({ service, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const a = accent(service.category);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 group"
    >
      {/* ── Connector dot on the spine ── */}
      <div
        className="hidden lg:flex absolute left-[calc(50%-1px)] top-0 bottom-0 flex-col items-center pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
          className="w-4 h-4 rounded-full border-2 mt-10 flex-shrink-0"
          style={{ borderColor: a.light, background: '#0f0f0f', boxShadow: `0 0 12px ${a.light}88` }}
        />
        <div className="flex-1 w-px" style={{ background: `linear-gradient(to bottom, ${a.light}44, transparent)` }} />
      </div>

      {/* ── Image column ── */}
      <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-3'} relative overflow-hidden`}
        style={{ minHeight: 360 }}
      >
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Category-colored gradient mask */}
        <div
          className="absolute inset-0"
          style={{
            background: isEven
              ? `linear-gradient(to right, transparent 40%, #0f0f0f 100%), linear-gradient(to top, ${a.light}55 0%, transparent 60%)`
              : `linear-gradient(to left, transparent 40%, #0f0f0f 100%), linear-gradient(to top, ${a.light}55 0%, transparent 60%)`,
          }}
        />
        {/* Big index number watermark */}
        <span
          className="absolute bottom-4 font-black select-none pointer-events-none"
          style={{
            fontSize: 'clamp(80px, 14vw, 140px)',
            lineHeight: 1,
            color: `${a.light}18`,
            right: isEven ? 'auto' : '8px',
            left: isEven ? '8px' : 'auto',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Category badge */}
        <div className="absolute top-5 left-5">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${a.bg} ${a.text} ${a.border} backdrop-blur-sm`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: a.light }} />
            {service.category}
          </span>
        </div>
      </div>

      {/* ── Spine spacer ── */}
      <div className="hidden lg:block lg:col-span-2 lg:order-2" />

      {/* ── Content column ── */}
      <div
        className={`lg:col-span-5 ${isEven ? 'lg:order-3' : 'lg:order-1'} bg-[#0f0f0f] flex flex-col justify-center px-8 py-12 lg:px-12`}
      >
        {/* Service number + title */}
        <div className="mb-6">
          <span className={`text-xs font-bold tracking-[0.25em] uppercase ${a.text} mb-3 block`}>
            Service {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-white font-bold leading-tight mb-1" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            {service.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {service.timeline}
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span className="font-semibold text-gray-300">{service.pricing}</span>
          </div>
        </div>

        {/* Divider line colored */}
        <div className="h-px mb-6" style={{ background: `linear-gradient(to right, ${a.light}66, transparent)` }} />

        <p className="text-gray-400 text-sm leading-relaxed mb-7">
          {service.description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
          {service.features.slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${a.text}`} />
              <span className="text-xs text-gray-300 leading-relaxed">{f}</span>
            </div>
          ))}
        </div>

        {/* Tech pills + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {service.technologies.slice(0, 3).map((t, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md text-[10px] font-medium text-gray-400 border border-white/10 bg-white/5">
                {t}
              </span>
            ))}
          </div>
          <Link
            to={`/start-project?service=${service.slug}`}
            className={`group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 text-white`}
            style={{ background: a.light, boxShadow: `0 0 20px ${a.light}44` }}
          >
            Begin Project
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Page ───────────────────────────────────────────────────── */
const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Services - SADEVZ</title>
        <meta name="description" content="Professional web development, mobile app, design, education, and consulting services tailored to your needs." />
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28">
        {/* Premium Blurry Header - Same as Blog Page */}
        <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-bright/20 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-bright/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-bright/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section - Blog Style */}
          <section className="max-w-7xl mx-auto px-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl md:text-6xl text-gray-900 dark:text-white mb-4">
                Where <span className="text-bright font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Innovation</span>
                <br />
                Meets Execution
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                We craft digital experiences that don't just work — they perform, engage,
                and drive measurable results for your business.
              </p>
            </motion.div>
          </section>

          {/* Stats Bar - Blog Style */}
          <section className="max-w-7xl mx-auto px-4 py-8 border-y border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap justify-center gap-10">
              {[
                { n: servicesData.length, label: 'Services' },
                { n: '100%', label: 'Client Satisfaction' },
                { n: '48h', label: 'Response Time' },
              ].map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + (i * 0.1), duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{s.n}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 tracking-wider uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Services — timeline spine */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 mb-0 relative">

            {/* Vertical spine rail */}
            <div
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.06) 15%, rgba(0,0,0,0.06) 85%, transparent)' }}
            />

            <div className="flex flex-col gap-0 divide-y divide-gray-200 dark:divide-white/5">
              {servicesData.map((service, index) => (
                <ServiceRow key={service.id} service={service} index={index} />
              ))}
            </div>
          </section>

          {/* CTA */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  viewport={{ once: true }}
  className="pb-12 text-center"
>
  <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-6 bg-black/90 backdrop-blur-sm rounded-2xl border border-bright/30 shadow-2xl relative overflow-hidden">
    {/* Animated background lines */}
    <div className="absolute inset-0 bg-gradient-to-r from-bright/5 via-transparent to-cyan-500/5 animate-pulse"></div>
    <div className="absolute -inset-1 bg-gradient-to-r from-bright via-cyan-500 to-bright opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
    
    <div className="flex items-center gap-3 relative z-10">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bright to-cyan-500 flex items-center justify-center relative">
        <Code className="w-6 h-6 text-white" />
        <div className="absolute inset-0 rounded-full bg-bright animate-ping opacity-75"></div>
      </div>
      <div className="text-left">
        <h4 className="font-bold text-white tracking-tight">Ready to work with us?</h4>
        <p className="text-sm text-gray-400">Let's build something amazing together</p>
      </div>
    </div>
    <Link to="/start-project" className="relative z-10">
      <button className="group relative px-8 py-3 bg-gradient-to-r from-bright to-cyan-500 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-bright/50 hover:scale-105">
        {/* Glitch layers */}
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute inset-0 bg-bright transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
        <span className="relative z-10 flex items-center gap-2">
          Start a Project
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300" />
        </span>
        {/* Glitch text effect on hover */}
        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse">
          START A PROJECT
        </span>
      </button>
    </Link>
  </div>
</motion.div>

        </div>
      </div>
    </>
  );
};

export default ServicesPage;