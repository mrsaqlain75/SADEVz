import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ChevronRight, Sparkles, Target } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';
import ReactDOM from 'react-dom';

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (for SSR compatibility)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const ProjectCard = ({ project }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onClick={() => setSelectedProject(project)}
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 transition-all duration-300 hover:border-bright/50 hover:shadow-xl"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs text-gray-800 font-medium shadow-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-bright transition-colors">
            {project.title}
          </h3>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-bright transition-colors" />
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {project.shortDescription}
        </p>
        
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{formatDate(project.completionDate)}</span>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-bright/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );

  // Modal Component - This will be rendered in a portal
  const ProjectModal = () => {
    if (!selectedProject || !mounted) return null;

    // Create modal content
    const modalContent = (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl font-sans max-h-[90vh] overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-2xl flex flex-col"
            style={{ 
              position: 'relative',
              zIndex: 10001
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(selectedProject.completionDate)}
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-800">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Main Image */}
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6 border border-gray-200">
                  <img
                    src={selectedProject.images[activeImage]}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent" />
                  
                  {/* Image Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === activeImage 
                            ? 'bg-bright w-6' 
                            : 'bg-gray-400 hover:bg-gray-600'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-bright" />
                    Project Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-800 hover:border-bright/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Gallery */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Snapshots</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProject.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative h-32 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === activeImage 
                            ? 'border-bright' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        aria-label={`View snapshot ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${selectedProject.title} - ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 transition-opacity ${
                          idx === activeImage ? 'bg-bright/10' : 'bg-black/5'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Simplified without button */}
            <div className="p-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                Click outside or press ESC to close • Project ID: {selectedProject.id}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );

    // Render modal in a portal to ensure it's above everything
    return ReactDOM.createPortal(
      modalContent,
      document.body
    );
  };

  return (
    <section 
      className="relative py-16 md:py-24 font-sans"
      style={{ 
        backgroundColor: '#efefef',
        zIndex: 1
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >

          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            What Have We <span className="text-bright">Done?</span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A curated selection of projects showcasing our expertise and commitment to excellence
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-300"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-bright mb-2">50+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-bright mb-2">100%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-bright mb-2">15+</div>
              <div className="text-sm text-gray-600">Technologies</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-bright mb-2">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Modal - Now rendered via portal directly to body */}
        <ProjectModal />
      </div>
    </section>
  );
};

export default PortfolioSection;