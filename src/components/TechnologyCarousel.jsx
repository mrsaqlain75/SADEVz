import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Palette, 
  Database, 
  Server, 
  Smartphone, 
  Cloud, 
  Box, 
  Film,
  TrendingUp,
  Zap
} from 'lucide-react';

const TechnologyCarousel = () => {
  const carouselRef1 = useRef(null);
  const carouselRef2 = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Technology data with icons and categories
  const technologies = [
    // Frontend
    { name: 'JavaScript', icon: <Code className="w-8 h-8" />, category: 'Frontend', color: '#F7DF1E' },
    { name: 'TypeScript', icon: <Code className="w-8 h-8" />, category: 'Frontend', color: '#3178C6' },
    { name: 'React', icon: <Code className="w-8 h-8" />, category: 'Frontend', color: '#61DAFB' },
    { name: 'Tailwind CSS', icon: <Palette className="w-8 h-8" />, category: 'Frontend', color: '#06B6D4' },
    { name: 'Bootstrap', icon: <Palette className="w-8 h-8" />, category: 'Frontend', color: '#7952B3' },
    { name: 'Framer Motion', icon: <Zap className="w-8 h-8" />, category: 'Animation', color: '#0055FF' },
    
    // Mobile & Cross-platform
    { name: 'React Native', icon: <Smartphone className="w-8 h-8" />, category: 'Mobile', color: '#61DAFB' },
    { name: 'Kotlin', icon: <Smartphone className="w-8 h-8" />, category: 'Mobile', color: '#7F52FF' },
    { name: 'Android Studio', icon: <Smartphone className="w-8 h-8" />, category: 'Mobile', color: '#3DDC84' },
    
    // Backend
    { name: 'Node.js', icon: <Server className="w-8 h-8" />, category: 'Backend', color: '#339933' },
    { name: 'Express.js', icon: <Server className="w-8 h-8" />, category: 'Backend', color: '#000000' },
    { name: 'Python', icon: <Server className="w-8 h-8" />, category: 'Backend', color: '#3776AB' },
    { name: 'Java', icon: <Server className="w-8 h-8" />, category: 'Backend', color: '#007396' },
    { name: 'REST APIs', icon: <Server className="w-8 h-8" />, category: 'Backend', color: '#FF6B6B' },
    
    // Databases
    { name: 'MongoDB', icon: <Database className="w-8 h-8" />, category: 'Database', color: '#47A248' },
    { name: 'PostgreSQL', icon: <Database className="w-8 h-8" />, category: 'Database', color: '#336791' },
    { name: 'Firebase Firestore', icon: <Database className="w-8 h-8" />, category: 'Database', color: '#FFCA28' },
    
    // Cloud & DevOps
    { name: 'AWS', icon: <Cloud className="w-8 h-8" />, category: 'Cloud', color: '#FF9900' },
    { name: 'Google Cloud', icon: <Cloud className="w-8 h-8" />, category: 'Cloud', color: '#4285F4' },
    { name: 'Docker', icon: <Box className="w-8 h-8" />, category: 'DevOps', color: '#2496ED' },
    
    // Design & Creative
    { name: 'Figma', icon: <Palette className="w-8 h-8" />, category: 'Design', color: '#F24E1E' },
    { name: 'Adobe Photoshop', icon: <Palette className="w-8 h-8" />, category: 'Design', color: '#31A8FF' },
    { name: 'Adobe Illustrator', icon: <Palette className="w-8 h-8" />, category: 'Design', color: '#FF9A00' },
    { name: 'Adobe Premiere Pro', icon: <Film className="w-8 h-8" />, category: 'Video', color: '#9999FF' },
    { name: 'After Effects', icon: <Film className="w-8 h-8" />, category: 'Video', color: '#9999FF' },
    { name: 'Canva', icon: <Palette className="w-8 h-8" />, category: 'Design', color: '#00C4CC' },
    
    // Marketing & E-commerce
    { name: 'Google Ads', icon: <TrendingUp className="w-8 h-8" />, category: 'Marketing', color: '#4285F4' },
    { name: 'Facebook Ads', icon: <TrendingUp className="w-8 h-8" />, category: 'Marketing', color: '#1877F2' },
    { name: 'SEMrush', icon: <TrendingUp className="w-8 h-8" />, category: 'Marketing', color: '#FF6C37' },
    { name: 'Shopify', icon: <TrendingUp className="w-8 h-8" />, category: 'E-commerce', color: '#7AB55C' }
  ];

  // Duplicate items for seamless loop
  const duplicatedTechnologies = [...technologies, ...technologies];

  // Card component for each technology
  const TechCard = ({ tech, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02 }}
      className="relative group flex-shrink-0 w-40 h-44 mx-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-full bg-white rounded-xl border-2 border-gray-200 p-5 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-bright group-hover:shadow-xl group-hover:-translate-y-1">
        
        {/* Icon Container */}
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
          style={{ 
            backgroundColor: `${tech.color}15`, // 15 = 8% opacity in hex
            border: `2px solid ${tech.color}30` // 30 = 18% opacity
          }}
        >
          <div style={{ color: tech.color }}>
            {tech.icon}
          </div>
        </div>
        
        {/* Technology Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
          {tech.name}
        </h3>
        
        {/* Category Badge */}
        <span className="px-3 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded-full">
          {tech.category}
        </span>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-bright/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
      </div>
    </motion.div>
  );

  // Animation variants for carousel
  const carouselVariants = {
    animate: {
      x: [0, -160 * technologies.length], // Move by one full set width
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        }
      }
    },
    paused: {
      x: "0%",
      transition: {
        duration: 0
      }
    }
  };

  return (
    <section className="relative py-16 md:py-24 font-sans overflow-hidden" style={{ backgroundColor: '#efefef' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >

          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Our <span className="text-bright">Technology</span> Stack
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We leverage cutting-edge tools and technologies to deliver exceptional results across all project phases
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* First Carousel Row */}
          <div 
            className="mb-8 md:mb-12 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              variants={carouselVariants}
              animate={isPaused ? "paused" : "animate"}
              className="flex"
            >
              {duplicatedTechnologies.slice(0, 18).map((tech, index) => (
                <TechCard key={`row1-${index}`} tech={tech} index={index} />
              ))}
            </motion.div>
          </div>

          {/* Second Carousel Row (reverse direction) */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              variants={{
                animate: {
                  x: [-160 * technologies.length, 0],
                  transition: {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 40,
                      ease: "linear",
                    }
                  }
                },
                paused: {
                  x: "0%",
                  transition: {
                    duration: 0
                  }
                }
              }}
              animate={isPaused ? "paused" : "animate"}
              className="flex"
            >
              {duplicatedTechnologies.slice(18).map((tech, index) => (
                <TechCard key={`row2-${index}`} tech={tech} index={index} />
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays for Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#efefef] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#efefef] to-transparent z-10 pointer-events-none" />
        </div>

        {/* Stats & Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-300"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Full-Stack Excellence
              </h3>
              <p className="text-gray-600 max-w-xl">
                From frontend design to backend development, cloud infrastructure, and digital marketing — we cover the entire technology spectrum to deliver comprehensive solutions.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>30+ Technologies</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>6 Categories</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-bright mr-2"></div>
                <span>Continuously Updated</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >

        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyCarousel;