import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  Calendar, 
  X, 
  Layers, 
  ArrowUpRight, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Code
} from 'lucide-react';
import portfolioData from '../data/portfolioData.json';
import ReactDOM from 'react-dom';

const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true); 
    return () => setMounted(false); 
  }, []);

  // Reset image index when project changes
  useEffect(() => { setActiveImage(0); }, [selectedProject]);

  const close = useCallback(() => setSelectedProject(null), []);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedProject) return;
    const handler = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setActiveImage(i => (i + 1) % selectedProject.images.length);
      if (e.key === 'ArrowLeft') setActiveImage(i => (i - 1 + selectedProject.images.length) % selectedProject.images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedProject, close]);

  const formatShortDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  const formatLongDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Card size pattern for editorial feel
  const getCardSize = (idx) => {
    const pattern = ['tall', 'normal', 'normal', 'wide', 'normal', 'tall'];
    return pattern[idx % pattern.length];
  };

  // Gallery Card Component
  const GalleryCard = ({ project, index }) => {
    const size = getCardSize(index);

    return (
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setSelectedProject(project)}
        className={[
          'group relative cursor-pointer font-sans rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-shadow duration-400 border border-gray-200 dark:border-gray-700 hover:border-bright/60 dark:hover:border-bright/60',
          size === 'tall' ? 'row-span-2' : '',
          size === 'wide' ? 'sm:col-span-2' : '',
        ].join(' ')}
        style={{ minHeight: size === 'tall' ? 420 : 220 }}
      >
        <div className="relative w-full h-full" style={{ minHeight: 'inherit' }}>
          <img
            src={project.images[0]}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          {/* Gradient veil */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Index badge */}
          <span className="absolute top-3 left-3 text-[10px] font-bold text-white/60 tracking-widest select-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Category pill */}
          <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-[10px] font-semibold text-gray-800 dark:text-gray-200 tracking-wide shadow-sm">
            {project.category}
          </span>

          {/* Hover overlay */}
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
                {formatShortDate(project.completionDate)}
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

  // Modal Component
  const ProjectModal = () => {
    if (!selectedProject || !mounted) return null;

    const prevImage = () => setActiveImage(i => (i - 1 + selectedProject.images.length) % selectedProject.images.length);
    const nextImage = () => setActiveImage(i => (i + 1) % selectedProject.images.length);

    const modalContent = (
      <AnimatePresence>
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            key="modal-panel"
            initial={{ scale: 0.93, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl max-h-[92vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden"
          >
            {/* LEFT: Image viewer */}
            <div className="relative flex-1 bg-gray-950 flex flex-col" style={{ minHeight: 340 }}>
              {/* Main image */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden" style={{ minHeight: 280 }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={selectedProject.images[activeImage]}
                    alt={`${selectedProject.title} — image ${activeImage + 1}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="w-full h-full object-contain"
                    style={{ maxHeight: '62vh' }}
                  />
                </AnimatePresence>

                {/* Prev / Next buttons */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {selectedProject.images.length > 1 && (
                  <span className="absolute bottom-3 right-4 text-white/40 text-xs tabular-nums">
                    {activeImage + 1} / {selectedProject.images.length}
                  </span>
                )}
              </div>

              {/* Filmstrip thumbnails */}
              {selectedProject.images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-black/40 scrollbar-none">
                  {selectedProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={[
                        'flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200',
                        idx === activeImage ? 'border-bright scale-105 shadow-lg shadow-bright/30' : 'border-transparent opacity-50 hover:opacity-80'
                      ].join(' ')}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Details panel */}
            <div className="w-full lg:w-80 xl:w-96 flex font-sans flex-col bg-white dark:bg-gray-900 overflow-y-auto">
              {/* Close */}
              <div className="flex items-start justify-between p-5 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <span className="text-[10px] font-semibold text-bright tracking-widest uppercase">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5 leading-tight">
                    {selectedProject.title}
                  </h2>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 dark:text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {formatLongDate(selectedProject.completionDate)}
                  </div>
                </div>
                <button
                  onClick={close}
                  className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors ml-2"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Tech stack */}
              <div className="px-5 py-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <Layers className="w-3.5 h-3.5 text-bright" />
                  <span className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-gray-700 dark:text-gray-300 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Keyboard hint */}
              <div className="mt-auto px-5 pb-5 pt-2">
                <p className="text-[10px] text-gray-300 dark:text-gray-600 text-center">
                  ← → arrow keys to browse images · ESC to close
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );

    return ReactDOM.createPortal(modalContent, document.body);
  };

  return (
    <>
      <Helmet>
        <title>Portfolio - SADEVZ</title>
        <meta name="description" content="Explore our portfolio of innovative web development projects and digital solutions." />
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28">
        {/* Premium Blurry Header */}
        <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent blur-3xl"></div>
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
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
                Projects That
                <br />
                <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Define Excellence
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Explore our portfolio of innovative solutions that have transformed ideas 
                into successful digital products.
              </p>
            </motion.div>
          </section>

          {/* Stats Bar - Blog Style */}
          <section className="max-w-7xl mx-auto px-4 py-8 border-y border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap justify-center gap-10">
              {[
                { n: '20+', label: 'Projects Completed' },
                { n: '50+', label: 'Students Trained' },
                { n: '15+', label: 'Technologies' },
                { n: '5.0', label: 'Average Rating' },
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

          {/* Portfolio Gallery Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[220px] gap-4">
              {portfolioData.map((project, idx) => (
                <GalleryCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          </section>

          {/* CTA Section */}
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
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute inset-0 bg-bright transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    Start a Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse">
                    START A PROJECT
                  </span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Modal */}
        <ProjectModal />
      </div>
    </>
  );
};

export default PortfolioPage;