import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  Code,
  Link,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  Linkedin,
  X,
  Globe,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you'll integrate with your backend or email service
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Contact information
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: ['info@sadevz.com'],
      link: 'mailto:info@sadevz.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: ['+92 327 5857692'],
      link: 'tel:+923275857692'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      details: ['Kashghar College of IT', 'Chitral Building, Pakistan'],
      link: 'https://maps.app.goo.gl/CywZafLhgRU4kqML6',
      isExternal: true
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM', 'Sun: Closed']
    }
  ];

  // Services for dropdown
  const services = [
    'Website Development',
    'Mobile App Development',
    'Graphic Design',
    'IT Courses & Training',
    'IT Consultation',
    'Other'
  ];

  // Social media links
  const socialLinks = [
    { platform: 'Facebook', icon: <Facebook className="w-5 h-5" />, url: 'https://web.facebook.com/profile.php?id=61587268436347' },
    { platform: 'X', icon: <X className="w-5 h-5" />, url: '#' },
    { platform: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: '#' },
    { platform: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: '#' }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - SADEVZ</title>
        <meta name="description" content="Get in touch with SADEVZ for web development, mobile apps, design, IT courses, and consultation services. Start your project today." />
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
                Get in
                <br />
                <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Have a project in mind? Let's discuss how we can help bring your ideas to life.
                Our team is ready to assist you with innovative solutions.
              </p>
            </motion.div>
          </section>

          {/* Stats Bar - Blog Style */}
          <section className="max-w-7xl mx-auto px-4 py-8 border-y border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap justify-center gap-10">
              {[
                { n: '24h', label: 'Response Time' },
                { n: '100%', label: 'Client Satisfaction' },
                { n: 'Free', label: 'Consultation' },
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

          {/* Main Contact Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mb-0">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-100 dark:bg-bright/20 rounded-xl">
                      <MessageSquare className="w-6 h-6 text-bright" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Send us a Message</h2>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <p className="text-green-700 dark:text-green-400">Message sent successfully! We'll get back to you soon.</p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <p className="text-red-700 dark:text-red-400">Something went wrong. Please try again or contact us directly.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-bright focus:border-bright transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-bright focus:border-bright transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-bright focus:border-bright transition-all"
                          placeholder="+92 300 1234567"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Service Interested In
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-bright focus:border-bright transition-all bg-white dark:bg-gray-900"
                        >
                          <option value="">Select a service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-bright focus:border-bright transition-all resize-none"
                        placeholder="Tell us about your project, requirements, timeline, and budget..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 bg-gradient-to-r from-bright to-blue-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-bright transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              </div>

              {/* Contact Information Sidebar */}
              <div className="space-y-8">
                {/* Contact Cards */}
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:border-bright/50 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-bright/10 rounded-lg text-bright">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {info.title}
                          </h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              target={info.isExternal ? '_blank' : '_self'}
                              rel={info.isExternal ? 'noopener noreferrer' : ''}
                              className="group"
                            >
                              {info.details.map((detail, idx) => (
                                <p 
                                  key={idx} 
                                  className="text-gray-600 dark:text-gray-400 hover:text-bright transition-colors"
                                >
                                  {detail}
                                </p>
                              ))}
                            </a>
                          ) : (
                            info.details.map((detail, idx) => (
                              <p key={idx} className="text-gray-600 dark:text-gray-400">{detail}</p>
                            ))
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Media */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white"
                >
                  <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                  <p className="text-gray-300 mb-6">
                    Follow us on social media for updates, tips, and insights.
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
                        aria-label={social.platform}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* FAQ Quick Links */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Responses</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-blue-50 dark:hover:bg-bright/10 transition-colors">
                      <span className="text-gray-700 dark:text-gray-300">Response Time</span>
                      <span className="font-medium text-bright">Within 24 hours</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-blue-50 dark:hover:bg-bright/10 transition-colors">
                      <span className="text-gray-700 dark:text-gray-300">Support Available</span>
                      <span className="font-medium text-bright">Mon-Sat</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-blue-50 dark:hover:bg-bright/10 transition-colors">
                      <span className="text-gray-700 dark:text-gray-300">Project Discussion</span>
                      <span className="font-medium text-bright">Free Consultation</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mb-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Find Our Office</h2>
                <p className="text-gray-600 dark:text-gray-400">Visit us at our Chitral location</p>
              </div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 relative">
                {/* Map Placeholder - Replace with Google Maps embed */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-blue-400 dark:text-bright mx-auto mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Kashghar College of IT</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Chitral Building, Pakistan</p>
                    <a
                      href="https://maps.app.goo.gl/CywZafLhgRU4kqML6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-6 py-2 bg-bright text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
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

export default ContactPage;