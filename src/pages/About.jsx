import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  Target, 
  Award, 
  Zap, 
  Heart, 
  Globe, 
  BookOpen, 
  Code,
  ChevronRight,
  Star,
  TrendingUp,
  Shield,
  Sparkles,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('story');

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Saqlain Amin',
      role: 'Founder & Lead Full Stack Developer',
      bio: '8+ years of experience in full-stack development and IT education',
      expertise: ["React", "Node.js", "Lecturer", "Python"],
      image: '/Images/team/saqlain.png'
    }
  ];

  // Values data
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for perfection in every project, ensuring quality outcomes that exceed expectations.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion',
      description: 'Our love for technology drives us to create innovative solutions that make a real difference.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Integrity',
      description: 'We maintain transparency and honesty in all our dealings, building trust with our clients.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Growth',
      description: 'Continuous learning and adaptation are at the core of our approach to technology.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'We believe in working together with clients as partners to achieve shared success.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Staying ahead of technology trends to provide cutting-edge solutions.'
    }
  ];

  // Milestones
  const milestones = [
    { year: '2023', title: 'Foundation', description: 'SADEVZ was established with a vision to transform IT education and services' },
    { year: '2024', title: 'Services Expansion', description: 'Launched professional development services alongside training programs' },
    { year: '2025', title: 'First 50 Students', description: 'Successfully trained over 20+ students from Drosh and Chitral in various IT disciplines' },
    { year: '2026', title: 'Team Growth', description: 'Expanded our team with expert developers and instructors' }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - SADEVZ</title>
        <meta name="description" content="Learn about SADEVZ - a dynamic IT company dedicated to transforming ideas into digital reality through innovative development and comprehensive education." />
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
                We Are
                <br />
                <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  SADEVZ
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                A dynamic IT company dedicated to transforming ideas into digital reality through 
                innovative development and comprehensive education.
              </p>
            </motion.div>
          </section>

          {/* Stats Bar - Blog Style */}
          <section className="max-w-7xl mx-auto px-4 py-8 border-y border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap justify-center gap-10">
              {[
                { n: '20+', label: 'Projects Delivered' },
                { n: '50+', label: 'Students Trained' },
                { n: '15+', label: 'Technologies' },
                { n: '5.0', label: 'Client Rating' },
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

          {/* Story Section with Tabs - Redesigned */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mb-0">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Tab Navigation */}
              <div className="lg:w-1/4">
                <div className="sticky top-28">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Journey</h2>
                  <div className="space-y-2">
                    {['story', 'mission', 'approach', 'impact'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeTab === tab 
                            ? 'bg-bright text-white shadow-lg shadow-bright/20' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {tab === 'story' && 'Our Story'}
                        {tab === 'mission' && 'Mission & Vision'}
                        {tab === 'approach' && 'Our Approach'}
                        {tab === 'impact' && 'Our Impact'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="lg:w-3/4">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 lg:p-12 border border-gray-200 dark:border-gray-700"
                >
                  {activeTab === 'story' && (
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h3>
                      <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p>
                          Founded in 2023, SADEVZ began as a passionate endeavor to bridge the gap between 
                          theoretical IT education and practical industry requirements. What started as a 
                          small training initiative has grown into a comprehensive IT solutions provider.
                        </p>
                        <p>
                          Our journey is rooted in the belief that technology should be accessible, 
                          understandable, and applicable. We noticed a disconnect between what was being 
                          taught in classrooms and what was needed in the real world, and we set out to 
                          change that.
                        </p>
                        <p>
                          Today, SADEVZ stands as a testament to our commitment to excellence in both 
                          education and development. We've successfully trained numerous students while 
                          simultaneously delivering high-quality digital solutions to businesses of all sizes.
                        </p>
                      </div>

                      {/* Milestones */}
                      <div className="mt-12">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Our Milestones</h4>
                        <div className="relative">
                          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-bright/50 via-bright/20 to-transparent" />
                          <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                              <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative pl-12"
                              >
                                <div className="absolute left-0 w-10 h-10 rounded-full bg-bright flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-bright/20">
                                  {milestone.year}
                                </div>
                                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                  {milestone.title}
                                </h5>
                                <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'mission' && (
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Mission & Vision</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                            <Target className="w-6 h-6 text-bright" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            To empower individuals and businesses through innovative technology solutions 
                            and comprehensive IT education, bridging the gap between learning and practical 
                            application.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                            <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            To become a leading force in digital transformation, recognized for excellence 
                            in both IT education and development services across Pakistan and beyond.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'approach' && (
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Approach</h3>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Client-Centric Development</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              Every project begins with understanding your unique needs. We work closely 
                              with clients to ensure the final product aligns perfectly with their vision 
                              and business objectives.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Code className="w-5 h-5 text-bright" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Practical Education</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              Our training programs focus on real-world applications. We combine theory 
                              with hands-on projects, ensuring students gain practical skills they can 
                              immediately apply in their careers.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Continuous Improvement</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              We constantly update our methodologies and technologies to stay at the 
                              forefront of industry trends, ensuring we deliver modern, efficient solutions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'impact' && (
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Impact</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10 p-6 rounded-xl border border-blue-200 dark:border-blue-500/20">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">For Students</h4>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-amber-500" />
                              <span className="text-gray-700 dark:text-gray-300">50+ successful IT career starts</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-amber-500" />
                              <span className="text-gray-700 dark:text-gray-300">Practical skill development</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-amber-500" />
                              <span className="text-gray-700 dark:text-gray-300">Industry-relevant training</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 p-6 rounded-xl border border-purple-200 dark:border-purple-500/20">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">For Businesses</h4>
                          <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-purple-500" />
                              <span className="text-gray-700 dark:text-gray-300">10+ digital transformations</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-purple-500" />
                              <span className="text-gray-700 dark:text-gray-300">Increased online presence</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-purple-500" />
                              <span className="text-gray-700 dark:text-gray-300">Improved operational efficiency</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values Section - Dark theme compatible */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The principles that guide everything we do at SADEVZ
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-bright/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-bright/10 flex items-center justify-center text-bright mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
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
        {/* Glitch layers */}
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute inset-0 bg-bright transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
        <span className="relative z-10 flex items-center gap-2">
          Start a Project
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300" />
        </span>
        {/* Glitch text effect on hover */}
        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse">
          START A PROJECT
        </span>
      </button>
    </Link>
  </div>
</motion.div>

        </div>
      </div>
    </>
  );
};

export default AboutPage;