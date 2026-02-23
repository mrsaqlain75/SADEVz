import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';  // Import Helmet
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  Linkedin,
  X,
  Globe,
  MessageCircle
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
        <title>Contact Page - SADEVZ</title>
        <meta name="description" content="Professional web development services tailored to your needs." />
      </Helmet>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="text-bright">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can help bring your ideas to life.
            Our team is ready to assist you with innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-bright" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-700">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-700">Something went wrong. Please try again or contact us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Tell us about your project, requirements, timeline, and budget..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-bright to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-bright transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-bright">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
                              className="text-gray-600 hover:text-bright transition-colors"
                            >
                              {detail}
                            </p>
                          ))}
                        </a>
                      ) : (
                        info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">{detail}</p>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
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
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Responses</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="text-gray-700">Response Time</span>
                  <span className="font-medium text-bright">Within 24 hours</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="text-gray-700">Support Available</span>
                  <span className="font-medium text-bright">Mon-Sat</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="text-gray-700">Project Discussion</span>
                  <span className="font-medium text-bright">Free Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Our Office</h2>
            <p className="text-gray-600">Visit us at our Chitral location</p>
          </div>
          <div className="h-96 bg-gray-200 relative">
            {/* Map Placeholder - Replace with Google Maps embed */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Kashghar College of IT</p>
                <p className="text-gray-600 text-sm">Chitral Building, Pakistan</p>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-bright to-blue-500 rounded-2xl p-12 text-center text-white">
          <MessageCircle className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Prefer a Direct Call?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Sometimes it's easier to talk through your project. We're just a call away.
          </p>
          <a
            href="tel:+923275857692"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-bright rounded-lg font-semibold hover:bg-gray-100 transition-all text-lg"
          >
            <Phone className="w-5 h-5" />
            Call Now: +92 327 5857692
          </a>
        </div>
      </section>
    </div>
    </>
  );
};

export default ContactPage;