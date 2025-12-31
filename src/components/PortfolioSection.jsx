import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolioData.json';

const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

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
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-[#252728] border border-[#2a2c2d] transition-all duration-300 hover:border-bright/30 hover:shadow-[0_0_30px_rgba(0,188,212,0.1)]"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1d] to-transparent opacity-60" />
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-light font-medium">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-light group-hover:text-bright transition-colors">
            {project.title}
          </h3>
          <ChevronRight className="w-5 h-5 text-light/40 group-hover:text-bright transition-colors" />
        </div>
        
        <p className="text-sm text-learncolor mb-3 line-clamp-2">
          {project.shortDescription}
        </p>
        
        <div className="flex items-center text-xs text-learncolor/60">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{formatDate(project.completionDate)}</span>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-bright/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );

  const ProjectModal = () => {
    if (!selectedProject) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#1a1c1d] border border-[#2a2c2d] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#2a2c2d]">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-light mb-2">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-learncolor">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(selectedProject.completionDate)}
                  </div>
                  <span className="px-2 py-1 bg-[#252728] rounded text-xs text-light">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full hover:bg-[#252728] transition-colors"
              >
                <X className="w-6 h-6 text-light" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Main Image */}
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                  <img
                    src={selectedProject.images[activeImage]}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1d] via-transparent to-transparent" />
                  
                  {/* Image Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === activeImage 
                            ? 'bg-bright w-6' 
                            : 'bg-light/40 hover:bg-light/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-light mb-4">Project Overview</h3>
                  <p className="text-learncolor leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-light mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 bg-[#252728] border border-[#2a2c2d] rounded-lg text-sm text-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Gallery */}
                <div>
                  <h3 className="text-xl font-semibold text-light mb-4">Project Snapshots</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProject.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative h-32 rounded-lg overflow-hidden border transition-all ${
                          idx === activeImage 
                            ? 'border-bright' 
                            : 'border-[#2a2c2d] hover:border-light/30'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${selectedProject.title} - ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 transition-opacity ${
                          idx === activeImage ? 'bg-bright/10' : 'bg-black/20'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#2a2c2d]">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-learncolor/60">
                  Project ID: {selectedProject.id}
                </div>
                <button className="px-6 py-3 bg-bright text-bluebg font-semibold rounded-lg hover:bg-bright/90 transition-colors flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View Live Project
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section className="relative bg-greybg text-light py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-bright" />
            <span className="text-bright font-semibold tracking-wider text-xs uppercase">
              Our Portfolio
            </span>
            <Sparkles className="w-5 h-5 text-bright" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-light leading-tight">
            What Have We <span className="text-bright">Done?</span>
          </h1>
          
          <p className="text-base sm:text-lg text-learncolor max-w-2xl mx-auto leading-relaxed">
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
          className="mt-12 pt-8 border-t border-[#2a2c2d]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-bright mb-2">50+</div>
              <div className="text-sm text-learncolor">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright mb-2">100%</div>
              <div className="text-sm text-learncolor">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright mb-2">15+</div>
              <div className="text-sm text-learncolor">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-bright mb-2">4.9</div>
              <div className="text-sm text-learncolor">Average Rating</div>
            </div>
          </div>
        </motion.div>

        {/* Modal */}
        <ProjectModal />
      </div>
    </section>
  );
};

export default PortfolioSection;