import React from 'react';
import { Calendar, FileText, ArrowRight } from 'lucide-react';

const IntakeOptions = ({ onSelectOption }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Start Your Project With Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose how you'd like to begin your journey with Sadevz. 
            Schedule a meeting for personalized consultation or fill out our detailed project form.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Option 1: Schedule Meeting */}
          <div 
            onClick={() => onSelectOption('meeting')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-500 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                <Calendar className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Schedule a Meeting
              </h3>
              
              <p className="text-gray-600 mb-6">
                Perfect if you prefer discussing your project face-to-face. 
                We'll understand your vision and provide immediate feedback.
              </p>
              
              <div className="space-y-4 text-left mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">30-minute free consultation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Immediate Q&A session</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Personalized recommendations</span>
                </div>
              </div>
              
              <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                Schedule Free Meeting
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Option 2: Fill Form */}
          <div 
            onClick={() => onSelectOption('form')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-purple-500 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors duration-300">
                <FileText className="w-10 h-10 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Fill Project Details
              </h3>
              
              <p className="text-gray-600 mb-6">
                Provide detailed requirements and get a comprehensive proposal. 
                Best for well-defined projects.
              </p>
              
              <div className="space-y-4 text-left mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Detailed project analysis</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Comprehensive proposal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Accurate timeline & budget estimate</span>
                </div>
              </div>
              
              <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300">
                Start Project Form
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Both options will be followed up within 24 hours. 
            Your information is secure and will only be used for project discussions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntakeOptions;