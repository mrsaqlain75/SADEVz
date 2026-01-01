import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  Brush, 
  GraduationCap,
  ChevronRight,
  Sparkles,
  Zap,
  Cpu,
  Palette,
  Check,
  ArrowRight,
  Layers,
  Target
} from "lucide-react";

const services = [
  { 
    id: 1, 
    title: "Web Development", 
    icon: <Code2 className="w-5 h-5" />,
    desc: "Scalable, responsive, and fast web solutions crafted with precision.",
    detailedDesc: "We build cutting-edge web applications using modern frameworks like React, Next.js, and Vue. Our solutions are optimized for performance, SEO, and user experience.",
    color: "#00bcd4",
    features: ["Full-stack Development", "Progressive Web Apps", "E-commerce Solutions", "API Integration"],
    accent: "#292b2c"
  },
  { 
    id: 2, 
    title: "Mobile Apps", 
    icon: <Smartphone className="w-5 h-5" />,
    desc: "Cross-platform mobile apps for smooth user experiences.",
    detailedDesc: "Native and cross-platform mobile applications that provide seamless experiences on iOS and Android with intuitive UX and optimal performance.",
    color: "#00bcd4",
    features: ["React Native Apps", "iOS & Android", "UI/UX Design", "App Store Deployment"],
    accent: "#2a2c2d"
  },
  { 
    id: 3, 
    title: "Graphic Design", 
    icon: <Brush className="w-5 h-5" />,
    desc: "Visually striking designs that define your brand identity.",
    detailedDesc: "From brand identity to digital assets, we create compelling visual designs that communicate your message effectively across all platforms.",
    color: "#00bcd4",
    features: ["Brand Identity", "UI/UX Design", "Marketing Materials", "Motion Graphics"],
    accent: "#2c2e2f"
  },
  { 
    id: 4, 
    title: "IT Courses", 
    icon: <GraduationCap className="w-5 h-5" />,
    desc: "Hands-on IT training for future-ready professionals.",
    detailedDesc: "Comprehensive training programs covering modern technologies and best practices. Our courses bridge the gap between education and real-world application.",
    color: "#00bcd4",
    features: ["Interactive Learning", "Real Projects", "Industry Mentors", "Career Support"],
    accent: "#2d2f30"
  },
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(services[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [leftHeight, setLeftHeight] = useState(0);
  const leftContainerRef = useRef(null);
  const containerRef = useRef(null);
  
  // Measure left container height
  useEffect(() => {
    if (leftContainerRef.current) {
      const height = leftContainerRef.current.getBoundingClientRect().height;
      setLeftHeight(height);
    }
  }, []);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const handleServiceChange = (service) => {
    setActiveService(service);
    setIsHovered(true);
    setTimeout(() => setIsHovered(false), 300);
  };

  const getServiceImage = (serviceId) => {
    const images = {
      1: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      2: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      3: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      4: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    };
    return images[serviceId];
  };

  return (
    <section 
      ref={containerRef}
      className="relative bg-greybg text-light py-12 md:py-16 lg:py-20 overflow-hidden font-sans"
    >
      
      <div className="absolute inset-0 opacity-5" style={{
    backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
    backgroundSize: '30px 30px'
  }} />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >

          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-light leading-tight">
            What We <span className="text-bright">Do?</span>
          </h1>
          
          <p className="text-base sm:text-lg text-learncolor max-w-2xl mx-auto leading-relaxed">
            At <span className="font-semibold text-bright">SADEVZ</span>, we craft digital solutions 
            that merge innovation, creativity, and technology.
          </p>
        </motion.div>

        {/* Desktop Layout - Two Column */}
        <div className="hidden lg:flex gap-8 min-h-[500px]">
          
          {/* Left Column - Services List */}
          <motion.div 
            ref={leftContainerRef}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-2/5"
          >
            <div className="relative h-full">
              {/* Decorative Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2a2c2d] to-transparent" />
              
              {/* Services List Container */}
              <div className="space-y-3 h-full">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 8 }}
                    onClick={() => handleServiceChange(service)}
                    className="relative cursor-pointer group"
                  >
                    {/* Active Indicator */}
                    {activeService.id === service.id && (
                      <motion.div
                        layoutId="activeService"
                        className="absolute -left-3 inset-y-0 w-1 bg-bright rounded-r-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Service Card */}
                    <div className={`relative p-5 rounded-xl transition-all duration-300 ${
                      activeService.id === service.id
                        ? 'bg-[#292b2c] shadow-[0_0_15px_rgba(0,188,212,0.1)]'
                        : 'bg-[#1f2122] hover:bg-[#252728]'
                    }`}>
                      
                      <div className="relative flex items-center gap-4">
                        {/* Icon Container */}
                        <div className={`p-2.5 rounded-lg transition-all duration-300 ${
                          activeService.id === service.id
                            ? 'bg-bright/10'
                            : 'bg-[#2a2c2d] group-hover:bg-[#303234]'
                        }`}>
                          <div className={`transition-colors duration-300 ${
                            activeService.id === service.id
                              ? 'text-bright'
                              : 'text-light/70 group-hover:text-bright'
                          }`}>
                            {service.icon}
                          </div>
                        </div>

                        {/* Service Info */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-semibold text-light">
                              {service.title}
                            </h3>
                            <motion.div
                              animate={{ 
                                x: activeService.id === service.id ? 3 : 0,
                                opacity: activeService.id === service.id ? 1 : 0
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronRight className="w-4 h-4 text-bright" />
                            </motion.div>
                          </div>
                          <p className="text-sm text-learncolor leading-relaxed">
                            {service.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Service Details */}
          <motion.div 
            className="w-3/5"
            style={{ height: leftHeight || 'auto' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative h-full"
              >
                {/* Main Details Container */}
                <div className="relative rounded-2xl overflow-hidden bg-[#1a1c1d] shadow-xl h-full flex flex-col">
                  
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <motion.img
                      initial={{ scale: 1.1 }}
                      animate={{ scale: isHovered ? 1.03 : 1 }}
                      transition={{ duration: 0.4 }}
                      src={getServiceImage(activeService.id)}
                      alt={activeService.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1d] via-[#1a1c1d]/80 to-transparent" />
                    
                    {/* Service Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1c1d]/90 backdrop-blur-sm rounded-full border border-[#2a2c2d]">
                        <Layers className="w-3 h-3 text-bright" />
                        <span className="text-xs font-medium text-light">Premium</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    {/* Title and Icon */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2.5 rounded-lg bg-bright/10">
                        <div className="text-bright">
                          {activeService.icon}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-light mb-1">
                          {activeService.title}
                        </h2>
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-0.5 bg-gradient-to-r from-bright to-transparent rounded-full" />
                          <span className="text-xs text-learncolor/60 tracking-wider">SPECIALTY SERVICE</span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Description */}
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-sm md:text-base text-learncolor leading-relaxed mb-6 flex-1"
                    >
                      {activeService.detailedDesc}
                    </motion.p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {activeService.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 * index }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-[#252728] hover:bg-[#2a2c2d] transition-colors duration-300"
                        >
                          <div className="p-1.5 rounded-md bg-bright/10">
                            <Check className="w-3 h-3 text-bright" />
                          </div>
                          <span className="text-sm text-light font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      href="/services"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#252728] border border-[#2a2c2d] text-light font-semibold rounded-full hover:bg-[#2a2c2d] transition-all duration-300 text-sm group"
                    >
                      <Palette className="w-4 h-4 text-bright group-hover:translate-x-1 transition-transform" />
                      <span>Start Project</span>
                      <ArrowRight className="w-4 h-4 text-bright opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Services Navigation - Horizontal Icons */}
          <div className="relative mb-6">
            <div className="flex justify-center space-x-1">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleServiceChange(service)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                    activeService.id === service.id
                      ? 'bg-[#292b2c] shadow-[0_0_15px_rgba(0,188,212,0.1)]'
                      : 'bg-[#1f2122] hover:bg-[#252728]'
                  }`}
                  style={{ width: 'calc(25% - 8px)' }}
                >
                  {/* Icon */}
                  <div className={`mb-2 p-2.5 rounded-lg transition-colors duration-300 ${
                    activeService.id === service.id
                      ? 'bg-bright/10 text-bright'
                      : 'bg-[#2a2c2d] text-light/60 hover:text-bright'
                  }`}>
                    {service.icon}
                  </div>
                  
                  {/* Title */}
                  <span className={`text-xs font-medium transition-colors duration-300 ${
                    activeService.id === service.id
                      ? 'text-bright'
                      : 'text-light/60 hover:text-light'
                  }`}>
                    {service.title.split(' ')[0]}
                  </span>
                  
                  {/* Active Indicator */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      width: activeService.id === service.id ? '100%' : '0%',
                      opacity: activeService.id === service.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-bright rounded-full mt-2"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile Details Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="bg-[#1a1c1d] rounded-2xl overflow-hidden shadow-lg border border-[#2a2c2d]">
                {/* Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getServiceImage(activeService.id)}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1d] to-transparent" />
                  
                  {/* Service Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#1a1c1d]/90 backdrop-blur-sm rounded-lg">
                        <div className="text-bright">
                          {activeService.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-light">{activeService.title}</h3>
                        <p className="text-xs text-learncolor mt-1">{activeService.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {activeService.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-[#252728]"
                        >
                          <div className="p-1.5 rounded-md bg-bright/10">
                            <Check className="w-3 h-3 text-bright" />
                          </div>
                          <span className="text-xs text-light font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-sm text-learncolor leading-relaxed">
                        {activeService.detailedDesc}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.a
                        whileTap={{ scale: 0.98 }}
                        href="/services"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#252728] border border-[#2a2c2d] text-light font-semibold rounded-full hover:bg-[#2a2c2d] transition-colors"
                      >
                        <Palette className="w-4 h-4 text-bright" />
                        <span>Explore Service</span>
                      </motion.a>
                      
                      <motion.a
                        whileTap={{ scale: 0.98 }}
                        href="/contact"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-bright text-bluebg font-semibold rounded-full hover:bg-bright/90 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                        <span>Get Quote</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA for All Views */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10 lg:mt-14"
        >
          <div className="inline-block p-1 bg-[#1f2122] rounded-full">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#252728] text-light rounded-full font-medium hover:bg-[#2a2c2d] transition-all duration-300 border border-[#2a2c2d]"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-bright" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;