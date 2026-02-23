import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';  // Import Helmet
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
        <meta name="description" content="Professional web development services tailored to your needs." />
      </Helmet>
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="text-center">

            
            <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
              We Are
              <br />
              <span className="font-semibold bg-gradient-to-r from-bright to-cyan-500 bg-clip-text text-transparent">
                SADEVZ
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              A dynamic IT company dedicated to transforming ideas into digital reality through 
              innovative development and comprehensive education.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-bright mb-2">20+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">5.0</div>
                <div className="text-sm text-gray-600">Client Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section with Tabs */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Tab Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('story')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'story' 
                      ? 'bg-bright text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Our Story
                </button>
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'mission' 
                      ? 'bg-bright text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Mission & Vision
                </button>
                <button
                  onClick={() => setActiveTab('approach')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'approach' 
                      ? 'bg-bright text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Our Approach
                </button>
                <button
                  onClick={() => setActiveTab('impact')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'impact' 
                      ? 'bg-bright text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Our Impact
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:w-3/4">
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              {activeTab === 'story' && (
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
                  <div className="space-y-6 text-gray-700 leading-relaxed">
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
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">Our Milestones</h4>
                    <div className="relative">
                      <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                          <div key={index} className="relative pl-12">
                            <div className="absolute left-0 w-11 h-11 rounded-full bg-bright flex items-center justify-center text-white font-bold">
                              {milestone.year}
                            </div>
                            <h5 className="text-lg font-semibold text-gray-900 px-2 mb-2">
                              {milestone.title}
                            </h5>
                            <p className="text-gray-600 px-2">{milestone.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mission' && (
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Mission & Vision</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <Target className="w-6 h-6 text-bright" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h4>
                      <p className="text-gray-600">
                        To empower individuals and businesses through innovative technology solutions 
                        and comprehensive IT education, bridging the gap between learning and practical 
                        application.
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                        <Globe className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h4>
                      <p className="text-gray-600">
                        To become a leading force in digital transformation, recognized for excellence 
                        in both IT education and development services across Pakistan and beyond.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'approach' && (
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Approach</h3>
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Client-Centric Development</h4>
                        <p className="text-gray-600">
                          Every project begins with understanding your unique needs. We work closely 
                          with clients to ensure the final product aligns perfectly with their vision 
                          and business objectives.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Code className="w-5 h-5 text-bright" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Practical Education</h4>
                        <p className="text-gray-600">
                          Our training programs focus on real-world applications. We combine theory 
                          with hands-on projects, ensuring students gain practical skills they can 
                          immediately apply in their careers.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Continuous Improvement</h4>
                        <p className="text-gray-600">
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
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Impact</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">For Students</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="text-gray-700">50+ successful IT career starts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="text-gray-700">Practical skill development</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="text-gray-700">Industry-relevant training</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">For Businesses</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-500" />
                          <span className="text-gray-700">10+ digital transformations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-500" />
                          <span className="text-gray-700">Increased online presence</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-500" />
                          <span className="text-gray-700">Improved operational efficiency</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do at SADEVZ
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-bright mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Founder</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The passionate individual behind SADEVZ's inception and growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="h-100 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-bright font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4 text-sm">{member.bio}</p>
                
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-gradient-to-r from-bright to-cyan-500 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
            Whether you need a digital solution or want to start your IT journey, 
            we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/start-project"
              className="px-8 py-3 bg-white text-bright rounded-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center gap-2"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutPage;