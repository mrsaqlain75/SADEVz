// IntakeOptions.js
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, ArrowRight, Clock, Users, MessageSquare } from 'lucide-react';

const IntakeOptions = ({ onSelectOption }) => {
  const options = [
    {
      id: 'form',
      title: 'Project Form',
      description: 'Fill out our detailed project intake form',
      features: [
        'Share project requirements',
        'Upload reference files',
        'Get detailed quote',
        '24h response time'
      ],
      icon: <FileText className="w-8 h-8" />,
      color: 'from-blue-600 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-500/10',
      borderColor: 'border-blue-200 dark:border-blue-500/20'
    },
    {
      id: 'meeting',
      title: 'Schedule Meeting',
      description: 'Book a 30-min discovery call',
      features: [
        'Discuss project vision',
        'Get expert advice',
        'Receive ballpark estimate',
        'Free consultation'
      ],
      icon: <Calendar className="w-8 h-8" />,
      color: 'from-purple-600 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-500/10',
      borderColor: 'border-purple-200 dark:border-purple-500/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How would you like to
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            get started?
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose the option that works best for you. Both paths lead to the same goal — 
          bringing your vision to life.
        </p>
      </div>

      {/* Options Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-8"
      >
        {options.map((option) => (
          <motion.div
            key={option.id}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            onClick={() => onSelectOption(option.id)}
            className={`group cursor-pointer rounded-2xl overflow-hidden border-2 ${option.borderColor} bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300`}
          >
            {/* Card Header */}
            <div className={`p-6 bg-gradient-to-r ${option.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-white/80 text-sm">{option.description}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {option.icon}
                </div>
              </div>
              {/* Animated shine */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {option.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 font-semibold group-hover:from-bright group-hover:to-cyan-500 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <span>Choose {option.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-bright" />
            <span className="text-sm text-gray-600 dark:text-gray-400">30-min discovery call</span>
          </div>
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-bright" />
            <span className="text-sm text-gray-600 dark:text-gray-400">No obligation</span>
          </div>
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-bright" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Expert consultation</span>
          </div>
        </div>
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
      </motion.div>
    </div>
  );
};

export default IntakeOptions;