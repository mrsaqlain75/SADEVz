import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Award, 
  Sparkles, 
  Linkedin, 
  Github, 
  Twitter, 
  Globe,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  TrendingUp,
  X,
  Mail,
  Dribbble,
  PenTool
} from 'lucide-react';
import teamData from '../data/teamData.json';

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // Filter team members by role category
  const filteredMembers = teamData.filter(member => {
    if (activeTab === 'all') return true;
    if (activeTab === 'tech') return ['Lead Developer & CTO', 'Mobile Development Lead'].includes(member.role);
    if (activeTab === 'creative') return ['UI/UX Designer & Creative Director'].includes(member.role);
    if (activeTab === 'growth') return ['Digital Marketing & Growth Strategist'].includes(member.role);
    return true;
  });

  // Social icon mapping
  const getSocialIcon = (platform) => {
    const icons = {
      linkedin: <Linkedin className="w-4 h-4" />,
      github: <Github className="w-4 h-4" />,
      twitter: <Twitter className="w-4 h-4" />,
      website: <Globe className="w-4 h-4" />,
      dribbble: <Dribbble className="w-4 h-4" />,
      behance: <Behance className="w-4 h-4" />,
      mail: <Mail className="w-4 h-4" />
    };
    return icons[platform] || <ExternalLink className="w-4 h-4" />;
  };

  // Role icon mapping
  const getRoleIcon = (role) => {
    if (role.includes('Developer') || role.includes('CTO')) return <Code className="w-5 h-5" />;
    if (role.includes('Designer') || role.includes('Creative')) return <Palette className="w-5 h-5" />;
    if (role.includes('Mobile')) return <Smartphone className="w-5 h-5" />;
    if (role.includes('Marketing') || role.includes('Growth')) return <TrendingUp className="w-5 h-5" />;
    return <Users className="w-5 h-5" />;
  };

  // Team member card component
  const TeamCard = ({ member, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onClick={() => setSelectedMember(member)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all duration-300 hover:border-bright hover:shadow-xl"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Placeholder for image - you'll replace with actual images */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-bright/20 to-bright/40 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-800">
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
        
        {/* Experience Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 shadow-sm">
            <Award className="w-3 h-3" />
            <span>{member.yearsOfExperience}+ years</span>
          </div>
        </div>
        
        {/* Skills Overlay */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="flex flex-wrap gap-1 justify-center">
            {member.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-800">
                {skill}
              </span>
            ))}
            {member.skills.length > 3 && (
              <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-gray-800">
                +{member.skills.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-bright/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            {getRoleIcon(member.role)}
            <span className="text-xs font-medium text-gray-500">
              {member.role}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-bright transition-colors">
            {member.name}
          </h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {member.bio}
        </p>
        
        {/* Fun Fact */}
        <div className="flex items-center text-xs text-gray-500">
          <Sparkles className="w-3 h-3 mr-2 text-yellow-500" />
          <span className="italic">{member.funFact}</span>
        </div>
      </div>

      {/* View Profile Button */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-bright group-hover:text-white transition-colors">
          <span>View Profile</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );

  // Modal for detailed view
  const MemberModal = () => {
    if (!selectedMember) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedMember(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl bg-white"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 p-6 border-b border-gray-200 bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  {/* Avatar */}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-bright/20 to-bright/40 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedMember.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(selectedMember.role)}
                      <span className="text-lg text-gray-600">
                        {selectedMember.role}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-bright mb-1">
                    {selectedMember.yearsOfExperience}+
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-bright mb-1">
                    {selectedMember.skills.length}
                  </div>
                  <div className="text-sm text-gray-600">Expert Skills</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-bright mb-1">
                    50+
                  </div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-bright mb-1">
                    4.9
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Core Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-800 hover:border-bright/50 hover:bg-bright/5 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="mb-8 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-semibold text-gray-900">Fun Fact</h4>
                </div>
                <p className="text-gray-700">
                  {selectedMember.funFact}
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Connect</h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(selectedMember.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-bright hover:text-white rounded-full text-sm font-medium text-gray-800 transition-all duration-300"
                    >
                      {getSocialIcon(platform)}
                      <span className="capitalize">{platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-center text-sm text-gray-500">
                Available for collaborations and consultations
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section 
      className="relative py-16 md:py-24 font-sans"
      style={{ 
        backgroundColor: '#efefef',
        zIndex: 1
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >

          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
            Meet Our <span className="text-bright">Team</span> 
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A diverse team of passionate experts working together to turn your vision into reality
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12"
        >
          {[
            { id: 'all', label: 'All Team', count: teamData.length },
            { id: 'tech', label: 'Tech & Dev', count: teamData.filter(m => ['Lead Developer & CTO', 'Mobile Development Lead'].includes(m.role)).length },
            { id: 'creative', label: 'Creative', count: teamData.filter(m => ['UI/UX Designer & Creative Director'].includes(m.role)).length },
            { id: 'growth', label: 'Growth', count: teamData.filter(m => ['Digital Marketing & Growth Strategist'].includes(m.role)).length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-bright text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-bright hover:text-bright'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-white/20'
                  : 'bg-gray-100'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-300"
        >
          
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-bright/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-bright" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900">Ready to work with us?</h4>
                <p className="text-sm text-gray-600">Let's build something amazing together</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-bright text-white font-medium rounded-full hover:bg-bright/90 transition-colors shadow-md hover:shadow-lg">
              Start a Project
            </button>
          </div>
        </motion.div>

        {/* Modal */}
        <MemberModal />
      </div>
    </section>
  );
};

export default TeamSection;