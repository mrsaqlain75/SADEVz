import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, Clock, MessageSquare, Users, Video, CheckCircle } from 'lucide-react';
import IntakeOptions from '../components/ProjectIntake/IntakeOptions';
import ProjectForm from '../components/ProjectIntake/ProjectForm/ProjectForm';
import MeetingScheduler from '../components/ProjectIntake/MeetingScheduler/MeetingScheduler';

const StartProjectPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  return (
    <>
      <Helmet>
        <title>Start Your Project - SADEVZ</title>
        <meta name="description" content="Start your next web development project with SADEVZ. Fill out our project intake form or schedule a free consultation meeting." />
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28">
        {/* Premium Blurry Header - Same as Blog Page */}
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
                Start Your
                <br />
                <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Project Journey
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Tell us about your vision and let's create something extraordinary together. 
                Choose how you'd like to get started.
              </p>
            </motion.div>
          </section>

          {/* Stats Bar - Blog Style */}
          <section className="max-w-7xl mx-auto px-4 py-8 border-y border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap justify-center gap-10">
              {[
                { n: '24h', label: 'Response Time', icon: <Clock className="w-4 h-4" /> },
                { n: '100%', label: 'Client Satisfaction', icon: <CheckCircle className="w-4 h-4" /> },
                { n: 'Free', label: 'Consultation', icon: <MessageSquare className="w-4 h-4" /> },
              ].map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + (i * 0.1), duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-1 text-3xl font-black text-gray-900 dark:text-white mb-1">
                    {s.icon}
                    <span>{s.n}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 tracking-wider uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Main Content */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {!selectedOption && (
                <IntakeOptions onSelectOption={handleSelectOption} />
              )}
              
              {selectedOption === 'form' && (
                <ProjectForm onBack={handleBack} />
              )}
              
              {selectedOption === 'meeting' && (
                <MeetingScheduler onBack={handleBack} />
              )}
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};

export default StartProjectPage;