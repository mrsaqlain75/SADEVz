import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Sparkles, ChevronRight } from 'lucide-react';

const ClientLogos = () => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Demo client data - replace with actual logos later
  const clients = [
    {
      id: 1,
      name: 'TechNova',
      industry: 'SaaS',
      year: '2023',
      logo: (
        <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
          <span className="text-white text-xl font-bold">TN</span>
          <div className="absolute inset-0 rounded-lg border border-blue-400/30"></div>
        </div>
      )
    },
    {
      id: 2,
      name: 'UrbanEats',
      industry: 'Food',
      year: '2023',
      logo: (
        <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
          <span className="text-white text-xl font-bold">UE</span>
          <div className="absolute inset-0 rounded-lg border border-green-400/30"></div>
        </div>
      )
    },
    {
      id: 3,
      name: 'FinSecure',
      industry: 'FinTech',
      year: '2024',
      logo: (
        <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
          <span className="text-white text-xl font-bold">FS</span>
          <div className="absolute inset-0 rounded-lg border border-purple-400/30"></div>
        </div>
      )
    },
    {
      id: 4,
      name: 'EduVision',
      industry: 'EdTech',
      year: '2023',
      logo: (
        <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
          <span className="text-white text-xl font-bold">EV</span>
          <div className="absolute inset-0 rounded-lg border border-orange-400/30"></div>
        </div>
      )
    },
    {
      id: 5,
      name: 'MediCare+',
      industry: 'Health',
      year: '2024',
      logo: (
        <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
          <span className="text-white text-xl font-bold">MC</span>
          <div className="absolute inset-0 rounded-lg border border-red-400/30"></div>
        </div>
      )
    },
    {
      id: 6,
      name: 'EcoStyle',
      industry: 'Fashion',
      year: '2023',
      logo: (
        <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
          <span className="text-white text-xl font-bold">ES</span>
          <div className="absolute inset-0 rounded-lg border border-teal-400/30"></div>
        </div>
      )
    },
    {
      id: 7,
      name: 'SmartHome',
      industry: 'IoT',
      year: '2024',
      logo: (
        <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center">
          <span className="text-white text-xl font-bold">SH</span>
          <div className="absolute inset-0 rounded-lg border border-cyan-400/30"></div>
        </div>
      )
    },
    {
      id: 8,
      name: 'AutoDrive',
      industry: 'Auto',
      year: '2023',
      logo: (
        <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
          <span className="text-white text-xl font-bold">AD</span>
          <div className="absolute inset-0 rounded-lg border border-indigo-400/30"></div>
        </div>
      )
    }
  ];

  // For mobile: horizontal scrolling, for desktop: vertical marquee
  const duplicatedClients = [...clients, ...clients];

  // Client card component
  const ClientCard = ({ client, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex-shrink-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-bright/50 transition-all duration-300 hover:shadow-lg hover:shadow-bright/10 flex flex-col items-center text-center w-48 sm:w-56">
        
        {/* Client Logo */}
        <div className="mb-3 transform transition-transform duration-300 group-hover:scale-105">
          {client.logo}
        </div>
        
        {/* Client Name */}
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-bright transition-colors">
          {client.name}
        </h3>
        
        {/* Industry */}
        <p className="text-gray-400 text-xs mb-2">
          {client.industry}
        </p>
        
        {/* Year Badge */}
        <div className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-bright text-xs font-medium">
          Since {client.year}
        </div>
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-bright/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );

  // Desktop vertical marquee variants
  const desktopVariants = {
    animate: {
      y: [0, -400],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }
      }
    },
    paused: {
      y: 0,
      transition: {
        duration: 0
      }
    }
  };

  // Mobile horizontal marquee variants
  const mobileVariants = {
    animate: {
      x: [0, -800],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        }
      }
    },
    paused: {
      x: 0,
      transition: {
        duration: 0
      }
    }
  };

  return (
    <section className="relative py-12 md:py-20 font-sans overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >

          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Trusted by <span className="text-bright">Visionary</span> Brands
          </h2>
          
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We've partnered with innovative companies across industries to transform their digital presence.
          </p>
        </motion.div>

        {/* Desktop: Vertical Marquee (hidden on mobile) */}
        <div className="hidden lg:block relative h-[500px] overflow-hidden"
             onMouseEnter={() => setIsPaused(true)}
             onMouseLeave={() => setIsPaused(false)}>
          
          <div className="absolute inset-0 flex justify-center gap-8">
            
            {/* Column 1 */}
            <div className="relative h-full w-56">
              <motion.div
                variants={desktopVariants}
                animate={isPaused ? "paused" : "animate"}
                className="flex flex-col gap-6"
              >
                {clients.concat(clients.slice(0, 4)).map((client, index) => (
                  <ClientCard key={`desktop-col1-${index}`} client={client} index={index} />
                ))}
              </motion.div>
            </div>
            
            {/* Column 2 (Delayed Start) */}
            <div className="relative h-full w-56">
              <motion.div
                variants={{
                  animate: {
                    y: [80, -320],
                    transition: {
                      y: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 25,
                        ease: "linear",
                      }
                    }
                  },
                  paused: {
                    y: 0,
                    transition: { duration: 0 }
                  }
                }}
                animate={isPaused ? "paused" : "animate"}
                className="flex flex-col gap-6"
              >
                {clients.slice(4).concat(clients.slice(0, 6)).map((client, index) => (
                  <ClientCard key={`desktop-col2-${index}`} client={client} index={index} />
                ))}
              </motion.div>
            </div>
            
            {/* Column 3 (Different Speed) */}
            <div className="relative h-full w-56">
              <motion.div
                variants={{
                  animate: {
                    y: [-40, -440],
                    transition: {
                      y: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                      }
                    }
                  },
                  paused: {
                    y: 0,
                    transition: { duration: 0 }
                  }
                }}
                animate={isPaused ? "paused" : "animate"}
                className="flex flex-col gap-6"
              >
                {clients.slice(2).concat(clients.slice(0, 4)).map((client, index) => (
                  <ClientCard key={`desktop-col3-${index}`} client={client} index={index} />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Gradient Fade Overlays */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
        </div>

        {/* Tablet: 2x2 Grid (hidden on mobile and desktop) */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-6">
            {clients.slice(0, 8).map((client, index) => (
              <ClientCard key={`tablet-${index}`} client={client} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile: Horizontal Marquee */}
        <div className="md:hidden overflow-hidden"
             onMouseEnter={() => setIsPaused(true)}
             onMouseLeave={() => setIsPaused(false)}>
          <motion.div
            variants={mobileVariants}
            animate={isPaused ? "paused" : "animate"}
            className="flex gap-4 py-4"
          >
            {duplicatedClients.map((client, index) => (
              <ClientCard key={`mobile-${index}`} client={client} index={index} />
            ))}
          </motion.div>
          
          {/* Gradient Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-bright/50 transition-colors cursor-pointer group">
            <Sparkles className="w-4 h-4 text-bright" />
            <span className="text-sm text-white font-medium group-hover:text-bright transition-colors">
              View All Case Studies
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-bright transition-colors" />
          </div>
          
          <p className="text-xs text-gray-400 mt-4 max-w-md mx-auto">
            From startups to enterprises, we deliver exceptional results that drive growth and innovation.
          </p>
        </motion.div>

        {/* Interactive Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-6 pt-4 border-t border-gray-800"
        >

        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-5 w-2 h-2 rounded-full bg-bright/20 animate-pulse md:block hidden"></div>
      <div className="absolute bottom-10 right-5 w-3 h-3 rounded-full bg-bright/10 animate-pulse delay-1000 md:block hidden"></div>
    </section>
  );
};

export default ClientLogos;