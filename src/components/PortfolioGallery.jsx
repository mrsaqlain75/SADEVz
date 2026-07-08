import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ChevronLeft, ChevronRight, Layers, ArrowUpRight, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';
import ReactDOM from 'react-dom';

/* ─────────────────────────────────────────────
   PortfolioGallery
   Drop-in replacement for CompactPortfolioShowcase
   Same data source · same color tokens · new soul
───────────────────────────────────────────── */

const PortfolioGallery = () => {
  const [selected, setSelected] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);

  // Reset image index whenever a new project opens
  useEffect(() => { setActiveImg(0); }, [selected]);

  const close = useCallback(() => setSelected(null), []);

  // Keyboard nav inside modal
  useEffect(() => {
    if (!selected) return;
    const handler = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setActiveImg(i => (i + 1) % selected.images.length);
      if (e.key === 'ArrowLeft') setActiveImg(i => (i - 1 + selected.images.length) % selected.images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, close]);

  const fmtShort = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  const fmtLong  = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // ── Card layout pattern: alternate sizes for editorial feel ──
  // cards get a "size" hint based on position
  const sizeOf = (idx) => {
    const pattern = ['tall', 'normal', 'normal', 'wide', 'normal', 'tall'];
    return pattern[idx % pattern.length];
  };

  // ── Grid Card ──────────────────────────────────────────────
  const GalleryCard = ({ project, index }) => {
    const size = sizeOf(index);

    return (
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setSelected(project)}
        className={[
          'group relative cursor-pointer font-sans rounded-2xl overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)] transition-shadow duration-400 border-2 border-black/10 hover:border-bright/60',
          size === 'tall'   ? 'row-span-2' : '',
          size === 'wide'   ? 'sm:col-span-2' : '',
        ].join(' ')}
        style={{ minHeight: size === 'tall' ? 420 : 220 }}
      >
        {/* Image */}
        <div className="relative w-full h-full" style={{ minHeight: 'inherit' }}>
          <img
            src={project.images[0]}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          {/* Gradient veil — always visible at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Index badge */}
          <span className="absolute top-3 left-3 text-[10px] font-bold text-white/60 tracking-widest select-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Category pill */}
          <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-semibold text-gray-800 tracking-wide shadow-sm">
            {project.category}
          </span>

          {/* Hover reveal overlay */}
          <div className="absolute inset-0 bg-bright/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-base leading-tight mb-1 drop-shadow-sm line-clamp-2">
              {project.title}
            </h3>
            <p className="text-white/70 text-xs line-clamp-2 mb-3 leading-relaxed">
              {project.shortDescription}
            </p>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies.slice(0, 3).map((t, i) => (
                <span key={i} className="text-[10px] px-1.5 py-0.5 bg-white/15 backdrop-blur-sm text-white/80 rounded-md border border-white/20">
                  {t}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 bg-white/15 text-white/60 rounded-md">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-white/50 text-[10px]">
                <Calendar className="w-3 h-3" />
                {fmtShort(project.completionDate)}
              </div>
              <motion.div
                initial={{ x: -4, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="flex items-center gap-1 text-bright text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Open <ArrowUpRight className="w-3 h-3" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  // ── Full-viewport Modal ────────────────────────────────────
  const Modal = () => {
    if (!selected || !mounted) return null;

    const prev = () => setActiveImg(i => (i - 1 + selected.images.length) % selected.images.length);
    const next = () => setActiveImg(i => (i + 1) % selected.images.length);

    return ReactDOM.createPortal(
      <AnimatePresence>
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          style={{ position: 'fixed', inset: 0, zIndex: 2147483647, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}
          className="flex items-center justify-center p-4"
        >
          <motion.div
            key="modal-panel"
            initial={{ scale: 0.93, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', zIndex: 2147483647 }}
            className="w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden"
          >

            {/* ── LEFT: Image viewer ── */}
            <div className="relative flex-1 bg-gray-950 flex flex-col" style={{ minHeight: 340 }}>

              {/* Main image */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden" style={{ minHeight: 280 }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={selected.images[activeImg]}
                    alt={`${selected.title} — image ${activeImg + 1}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="w-full h-full object-contain"
                    style={{ maxHeight: '62vh' }}
                  />
                </AnimatePresence>

                {/* Prev / Next buttons — only if multiple images */}
                {selected.images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {selected.images.length > 1 && (
                  <span className="absolute bottom-3 right-4 text-white/40 text-xs tabular-nums">
                    {activeImg + 1} / {selected.images.length}
                  </span>
                )}
              </div>

              {/* Filmstrip thumbnails */}
              {selected.images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-black/40 scrollbar-none">
                  {selected.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={[
                        'flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200',
                        idx === activeImg ? 'border-bright scale-105 shadow-lg shadow-bright/30' : 'border-transparent opacity-50 hover:opacity-80'
                      ].join(' ')}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT: Details panel ── */}
            <div className="w-full lg:w-80 xl:w-96 flex font-sans flex-col bg-white overflow-y-auto">

              {/* Close */}
              <div className="flex items-start justify-between p-5 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-semibold text-bright tracking-widest uppercase">
                    {selected.category}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 mt-0.5 leading-tight">
                    {selected.title}
                  </h2>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {fmtLong(selected.completionDate)}
                  </div>
                </div>
                <button
                  onClick={close}
                  className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors ml-2"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selected.description}
                </p>
              </div>

              {/* Tech stack */}
              <div className="px-5 py-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <Layers className="w-3.5 h-3.5 text-bright" />
                  <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.technologies.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs text-gray-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Keyboard hint */}
              <div className="mt-auto px-5 pb-5 pt-2">
                <p className="text-[10px] text-gray-300 text-center">
                  ← → arrow keys to browse images · ESC to close
                </p>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  // ── Main render ────────────────────────────────────────────
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-bright/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-bright" />
            <span className="text-xs font-medium text-bright">Our Work</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Featured Projects
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Exploring innovative solutions through design and technology
          </p>
        </div>

        {/* Editorial masonry-like grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[220px] gap-4">
          {portfolioData.map((project, idx) => (
            <GalleryCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-10"
        >
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-bright hover:text-bright/70 transition-colors group">
            <span>View all projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

      </div>

      {/* Portal modal */}
      <Modal />
    </section>
  );
};

export default PortfolioGallery;