import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lightbulb, 
  PencilRuler, 
  Code2, 
  Rocket,
  Target,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Layers
} from "lucide-react";

const WorkflowSection = () => {
  const [expandedStep, setExpandedStep] = useState(null);

  const steps = [
    {
      id: 1,
      icon: Lightbulb,
      title: "Discovery & Strategy",
      description: "We begin by understanding your vision, goals, and requirements through comprehensive discovery sessions to build a solid strategic foundation for your project.",
      detailedContent: "Our discovery phase involves in-depth stakeholder interviews, market research, and competitive analysis. We define project scope, establish KPIs, and create a detailed roadmap that aligns with your business objectives.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      color: "#1f2122"
    },
    {
      id: 2,
      icon: PencilRuler,
      title: "Design & Prototyping",
      description: "We transform concepts into beautiful, functional designs through wireframing, prototyping, and user experience design.",
      detailedContent: "Our design process combines aesthetics with functionality. We create wireframes, interactive prototypes, and pixel-perfect designs that prioritize user experience while reflecting your brand identity.",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      color: "#252728"
    },
    {
      id: 3,
      icon: Code2,
      title: "Development & Testing",
      description: "Our developers build robust, scalable solutions using modern technologies while maintaining code quality through rigorous testing.",
      detailedContent: "We follow agile development methodologies to build your solution iteratively. Our development process includes code reviews, automated testing, and continuous integration to ensure quality and reliability.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      color: "#2a2c2d"
    },
    {
      id: 4,
      icon: Rocket,
      title: "Launch & Optimization",
      description: "We ensure a smooth launch with comprehensive deployment, monitoring, and ongoing optimization for continuous improvement.",
      detailedContent: "Our launch process includes deployment, performance monitoring, and user training. We provide post-launch support and optimization to ensure your solution continues to deliver value.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      color: "#303234"
    }
  ];

  const toggleStep = (id) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  return (
    <section className="relative bg-greybg text-light py-12 md:py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-light leading-tight">
            How we <span className="text-bright">Do?</span>
          </h1>
          
          <p className="text-sm sm:text-base text-learncolor max-w-xl mx-auto">
            A systematic approach to transform your vision into reality through four key phases
          </p>
        </div>

        {/* Vertical Steps List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            const isExpanded = expandedStep === step.id;
            
            return (
              <div 
                key={step.id}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? 'bg-[#1a1c1d] border-[#2a2c2d] shadow-lg' 
                    : 'bg-[#252728] border-[#2a2c2d] hover:border-[#2a2c2d]/80'
                }`}
              >
                {/* Step Header - Always Visible */}
                <div 
                  className="p-4 md:p-6 cursor-pointer flex items-center justify-between"
                  onClick={() => toggleStep(step.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Step Number */}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isExpanded 
                          ? 'border-bright bg-bright/10' 
                          : 'border-[#2a2c2d] bg-[#1a1c1d]'
                      }`}>
                        <span className={`text-sm font-semibold ${isExpanded ? 'text-bright' : 'text-light'}`}>
                          0{step.id}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1a1c1d] border border-[#2a2c2d] flex items-center justify-center">
                        <Icon className="w-3 h-3 text-bright" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-light mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-learncolor hidden md:block">
                        {step.description}
                      </p>
                      <p className="text-sm text-learncolor md:hidden">
                        {step.description.substring(0, 60)}...
                      </p>
                    </div>
                  </div>

                  {/* Dropdown Button */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ml-4 ${
                      isExpanded 
                        ? 'bg-bright/10 border border-bright/20' 
                        : 'bg-[#1a1c1d] border border-[#2a2c2d]'
                    }`}
                  >
                    <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-bright' : 'text-light/70'}`} />
                  </motion.div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-6">
                        <div className="pt-4 border-t border-[#2a2c2d]">
                          {/* Content Grid */}
                          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                            {/* Left Column - Text Content */}
                            <div className="lg:w-1/2">
                              <div className="mb-4">
                                <h4 className="text-base md:text-lg font-semibold text-light mb-2">
                                  Detailed Overview
                                </h4>
                                <p className="text-sm md:text-base text-learncolor leading-relaxed">
                                  {step.detailedContent}
                                </p>
                              </div>

                              {/* Key Points */}
                              <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-bright mt-2 flex-shrink-0" />
                                  <span className="text-sm text-light">Comprehensive planning and analysis</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-bright mt-2 flex-shrink-0" />
                                  <span className="text-sm text-light">Iterative development approach</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 rounded-full bg-bright mt-2 flex-shrink-0" />
                                  <span className="text-sm text-light">Quality assurance and testing</span>
                                </div>
                              </div>
                            </div>

                            {/* Right Column - Image with Gradient Fade */}
                            <div className="lg:w-1/2">
                              <div className="relative rounded-lg overflow-hidden h-64 md:h-72 lg:h-80">
                                {/* Image */}
                                <img 
                                  src={step.image} 
                                  alt={step.title}
                                  className="w-full h-full object-cover"
                                />
                                
                                {/* Gradient Overlay (Bottom Fade) */}
                                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1a1c1d] via-[#1a1c1d]/80 to-transparent" />
                                
                                {/* Overlay Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Layers className="w-4 h-4 text-bright" />
                                    <span className="text-sm font-medium text-light">Phase {step.id}</span>
                                  </div>
                                  <p className="text-xs md:text-sm text-learncolor">
                                    {step.title} phase focuses on delivering precise outcomes through systematic execution.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mobile Simplified View Hint */}
        <div className="lg:hidden mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-learncolor/60">
            <ArrowRight className="w-3 h-3 text-bright/60 rotate-90" />
            <span>Tap on any step to expand and view details</span>
            <ArrowRight className="w-3 h-3 text-bright/60 rotate-90" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkflowSection;