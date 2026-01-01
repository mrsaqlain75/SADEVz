import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Facebook, 
  Instagram, 
  Linkedin,
  Youtube,
  Github,
  Code,
  Palette,
  Smartphone,
  Monitor,
  Cloud,
  TrendingUp,
  BookOpen,
  Server,
  X
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activePolicy, setActivePolicy] = useState(null);
  
  // Services data
  const services = [
    { name: 'Full Stack Website', icon: <Code className="w-4 h-4" /> },
    { name: 'IT Courses', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Mobile App Development', icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Desktop Development', icon: <Monitor className="w-4 h-4" /> },
    { name: 'Graphic Designing', icon: <Palette className="w-4 h-4" /> },
    { name: 'Web Deployment & Hosting', icon: <Server className="w-4 h-4" /> },
    { name: 'Cloud Computing', icon: <Cloud className="w-4 h-4" /> },
    { name: 'Digital Marketing', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  // Social links with X instead of Twitter
  const socialLinks = [
    { platform: 'Facebook', icon: <Facebook className="w-5 h-5" />, url: '#' },
    { platform: 'X', icon: <X className="w-5 h-5" />, url: '#' },
    { platform: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: '#' },
    { platform: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: '#' },
    { platform: 'YouTube', icon: <Youtube className="w-5 h-5" />, url: '#' },
    { platform: 'GitHub', icon: <Github className="w-5 h-5" />, url: '#' }
  ];

  // Contact info
  const contactInfo = [
    { 
      icon: <Mail className="w-5 h-5" />, 
      text: 'info@yourcompany.com',
      href: 'mailto:info@yourcompany.com'
    },
    { 
      icon: <Phone className="w-5 h-5" />, 
      text: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    { 
      icon: <MapPin className="w-5 h-5" />, 
      text: '123 Tech Street, Innovation City, IC 10001',
      href: 'https://maps.google.com'
    },
    { 
      icon: <Globe className="w-5 h-5" />, 
      text: 'www.yourcompany.com',
      href: 'https://www.yourcompany.com'
    }
  ];

  // Policy content
  const policyContent = {
    privacy: {
      title: 'Privacy Policy',
      content: `Your privacy is important to us. This privacy policy explains what personal data we collect, how we use it, and your rights regarding your data.

1. Information We Collect:
   - Contact information (email, phone)
   - Usage data and analytics
   - Cookies and tracking data

2. How We Use Your Information:
   - To provide and improve our services
   - To communicate with you
   - For security and fraud prevention

3. Data Protection:
   - We implement security measures to protect your data
   - We do not sell your personal information
   - You can request data deletion at any time

This is a basic policy template. We will update this with detailed information during development.`
    },
    terms: {
      title: 'Terms of Service',
      content: `Welcome to our website. By accessing or using our services, you agree to these terms.

1. Service Usage:
   - Our services are provided "as is"
   - You must be at least 18 years old to use our services
   - You agree not to misuse our services

2. Intellectual Property:
   - All content on this site is our property
   - You may not reproduce our materials without permission
   - Service trademarks are protected

3. Limitation of Liability:
   - We are not liable for indirect damages
   - Service interruptions may occur
   - We reserve the right to modify these terms

This is a basic terms template. Detailed terms will be provided after legal review.`
    },
    cookie: {
      title: 'Cookie Policy',
      content: `We use cookies to enhance your browsing experience and analyze site traffic.

1. What Are Cookies:
   - Small text files stored on your device
   - Help remember your preferences
   - Enable certain website functions

2. Types of Cookies We Use:
   - Essential cookies (required for site functionality)
   - Analytics cookies (to understand site usage)
   - Preference cookies (to remember your settings)

3. Cookie Control:
   - You can manage cookies through browser settings
   - Disabling cookies may affect site functionality
   - Third-party cookies are used for analytics

This is a basic cookie policy. We will provide detailed information about specific cookies used.`
    }
  };

  // Policy Modal Component
  const PolicyModal = () => {
    if (!activePolicy) return null;

    const policy = policyContent[activePolicy];

    return (
<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#1a1a1a]">        <div className="relative w-full max-w-2xl max-h-[80vh] overflow-auto bg-gray-900 border border-gray-700 rounded-xl shadow-2xl">
          
          {/* Modal Header */}
          <div className="sticky top-0 z-10 p-6 border-b border-gray-800 bg-gray-900">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{policy.title}</h3>
              <button
                onClick={() => setActivePolicy(null)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                {policy.content}
              </pre>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-gray-800 bg-greybg">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">
                Last updated: {currentYear}
              </p>
              <button
                onClick={() => setActivePolicy(null)}
                className="px-6 py-2 bg-bright text-white font-medium rounded-lg hover:bg-bright/90 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
<footer className="bg-[#1a1a1a] text-gray-300 font-sans">      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Logo & Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-bright to-bright/70 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white"><span className="text-bright">SADEVZ</span></h2>
                <p className="text-sm text-gray-400">Learn. Create. Evolve.</p>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed">
              We transform ideas into digital realities. With cutting-edge technology and creative solutions, 
              we help businesses thrive in the digital landscape through innovative development and strategic 
              IT services.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">
              Our Services
            </h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="group flex items-center space-x-3 text-sm hover:text-white transition-colors"
                  >
                    <span className="text-bright group-hover:scale-110 transition-transform">
                      {service.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <a 
                href="#" 
                className="inline-flex items-center text-sm text-bright hover:text-white transition-colors"
              >
                <span>View All Services</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">
              Get In Touch
            </h3>
            <ul className="space-y-5">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="flex-shrink-0 mt-1 text-bright group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-sm group-hover:text-white transition-colors leading-tight">
                      {item.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h4 className="text-sm font-semibold text-white mb-3">Business Hours</h4>
              <div className="text-xs space-y-1">
                <p className="flex justify-between">
                  <span className="text-gray-400">Monday - Friday:</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Saturday:</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Sunday:</span>
                  <span className="text-white">Closed</span>
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Social Icons */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">
                Connect With Us
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-bright hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={social.platform}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <p className="text-sm mt-6 text-gray-400">
                Follow us for updates, tutorials, and industry insights.
              </p>
            </div>

            {/* Business Info Card */}
            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3">Why Choose Us</h4>
              <ul className="text-xs text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-bright mt-0.5">•</span>
                  <span>Expert team with 10+ years experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bright mt-0.5">•</span>
                  <span>Custom solutions for every business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bright mt-0.5">•</span>
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bright mt-0.5">•</span>
                  <span>Competitive pricing & packages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} SADEVZ. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button 
                onClick={() => setActivePolicy('privacy')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setActivePolicy('terms')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => setActivePolicy('cookie')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      <PolicyModal />
    </footer>
  );
};

export default Footer;