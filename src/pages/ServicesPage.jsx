import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock } from 'lucide-react';
import servicesData from '../data/servicesData';

const ServicesPage = () => {
  const getCategoryColor = (category) => {
    const colors = {
      web: 'bg-blue-50 text-blue-700 border-blue-200',
      mobile: 'bg-purple-50 text-purple-700 border-purple-200',
      design: 'bg-amber-50 text-amber-700 border-amber-200',
      education: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      consulting: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* Hero Section - Clean */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="text-center">
          <h1 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
            Where Innovation Meets
            <br />
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Precision Execution
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We craft digital experiences that don't just work—they perform, engage, 
            and drive measurable results for your business.
          </p>
        </div>
      </section>

      {/* Services Grid - Compact Height */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 gap-12">
          {servicesData.map((service, index) => (
            <div 
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image Section - Reduced Height */}
                <div className="lg:w-2/5 relative overflow-hidden min-h-[280px] lg:min-h-[320px]">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getCategoryColor(service.category)}`}>
                      <span className="text-sm font-medium">{service.category}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section - Compact */}
                <div className="lg:w-3/5 p-10">
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-medium text-gray-900 group-hover:text-bright transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-2xl opacity-80 group-hover:opacity-100 transition-opacity">
                        {service.icon}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{service.timeline}</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <span className="font-medium text-gray-700">{service.pricing}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features - Compact */}
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-4">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        to={`/start-project?service=${service.slug}`}
                        className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#1a1a1a] text-white rounded-lg font-medium hover:bg-bright transition-all"
                      >
                        <span>Begin Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Clean */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-[#1a1a1a] rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-light text-white mb-6 leading-tight">
            Your Next Breakthrough
            <br />
            <span className="font-semibold text-cyan-400">
              Starts Here
            </span>
          </h2>
          
          <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">
            Don't just compete—dominate. Let's create something extraordinary that sets 
            you apart in today's digital landscape.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/start-project"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Launch Your Vision
            </Link>
            
            <a
              href="mailto:team@sadevz.com"
              className="px-8 py-3 border border-white/30 text-white rounded-lg font-semibold hover:border-white/50 hover:bg-white/5 transition-all"
            >
              Book a Strategy Session
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;