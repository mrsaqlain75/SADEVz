import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';  // Import Helmet
import { 
  ArrowRight, 
  Calendar, 
  Check, 
  Clock, 
  Target,
  Sparkles,
  X,
  Users,
  Code,
  TrendingUp
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Web Development': 'bg-blue-50 text-blue-700 border-blue-200',
      'Mobile App': 'bg-purple-50 text-purple-700 border-purple-200',
      'Design': 'bg-amber-50 text-amber-700 border-amber-200',
      'E-commerce': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Full Stack': 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // Modal Component
  const ProjectModal = () => {
    if (!selectedProject || !mounted) return null;

    const modalContent = (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl font-sans max-h-[90vh] overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-200">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(selectedProject.completionDate)}
                  </div>
                  <span className={`px-3 py-1.5 rounded-full border text-sm font-medium ${getCategoryColor(selectedProject.category)}`}>
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
              <div className="p-8">
                {/* Main Image */}
                <div className="relative h-80 rounded-xl overflow-hidden mb-8 border border-gray-200">
                  <img
                    src={selectedProject.images[activeImage]}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === activeImage 
                            ? 'bg-blue-600 w-6' 
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
                    <Target className="w-5 h-5 text-blue-600" />
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
                        className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-800 hover:border-blue-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Gallery */}
                {selectedProject.images.length > 1 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Snapshots</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          className={`relative h-32 rounded-lg overflow-hidden border-2 transition-all ${
                            idx === activeImage 
                              ? 'border-blue-600' 
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
                            idx === activeImage ? 'bg-blue-600/10' : 'bg-black/5'
                          }`} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                Click outside or press ESC to close • Project ID: {selectedProject.id}
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
        <meta name="description" content="Professional web development services tailored to your needs." />
      </Helmet>
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="text-center">

          
          <h1 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
            Projects That
            <br />
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Define Excellence
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of innovative solutions that have transformed ideas 
            into successful digital products.
          </p>
        </div>
      </section>

      {/* Portfolio Grid - Same layout as Services Page */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 gap-12">
          {portfolioData.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-2/5 relative overflow-hidden min-h-[280px] lg:min-h-[320px]">
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getCategoryColor(project.category)}`}>
                      <span className="text-sm font-medium">{project.category}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-10">
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-medium text-gray-900 group-hover:text-bright transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-2xl opacity-80 group-hover:opacity-100 transition-opacity">
                        {project.category === 'Web Development' ? '🌐' : 
                         project.category === 'Mobile App' ? '📱' : 
                         project.category === 'Design' ? '🎨' : 
                         project.category === 'E-commerce' ? '🛒' : '💻'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(project.completionDate)}</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <span className="font-medium text-gray-700">{project.status}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Technologies - Compact */}
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-4">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-xs border border-gray-200">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <button className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#1a1a1a] text-white rounded-lg font-medium hover:bg-bright transition-all group">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">Students Trained</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="text-3xl font-bold text-emerald-600 mb-2">15+</div>
            <div className="text-sm text-gray-600">Technologies</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="text-3xl font-bold text-amber-600 mb-2">5.0</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-light text-white mb-6 leading-tight">
            Ready to Start Your Next
            <br />
            <span className="font-semibold text-cyan-400">
              Project With Us?
            </span>
          </h2>
          
          <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">
            Let's create something amazing together. Our team is ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/start-project"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Start a Project
            </Link>
            
            <a
              href="mailto:team@sadevz.com"
              className="px-8 py-3 border border-white/30 text-white rounded-lg font-semibold hover:border-white/50 hover:bg-white/5 transition-all"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal />
    </div>
    </>
  );
};

export default PortfolioPage;