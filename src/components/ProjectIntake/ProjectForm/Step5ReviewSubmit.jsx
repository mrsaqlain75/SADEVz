import React from 'react';
import { CheckCircle, XCircle, Loader, Send } from 'lucide-react';

const Step5ReviewSubmit = ({ data, onSubmit, loading, result, onBack }) => {
  const getProjectTypeLabel = (value) => {
    const types = {
      'website': 'Website Development',
      'web-app': 'Web Application',
      'mobile-app': 'Mobile Application',
      'graphic-design': 'Graphic Design',
      'course': 'IT Course/Training',
      'consultation': 'IT Consultation',
      'other': 'Other'
    };
    return types[value] || value;
  };

  const getBudgetLabel = (value) => {
    const budgets = {
      'not-sure': 'Not sure yet',
      'under-1k': 'Under $1,000',
      '1k-5k': '$1,000 - $5,000',
      '5k-10k': '$5,000 - $10,000',
      '10k-25k': '$10,000 - $25,000',
      '25k+': '$25,000+',
      'custom': 'Custom Budget'
    };
    return budgets[value] || value;
  };

  const getTimelineLabel = (value) => {
    const timelines = {
      'flexible': 'Flexible',
      '2-4weeks': '2-4 Weeks',
      '1-2months': '1-2 Months',
      '2-4months': '2-4 Months',
      'urgent-1week': 'Urgent (1 Week)'
    };
    return timelines[value] || value;
  };

  if (result?.success) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Project Submitted Successfully!
        </h2>
        
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto mb-8">
          <p className="text-green-800 font-medium mb-2">
            Your Project ID: {result.data?.data?.projectId || 'N/A'}
          </p>
          <p className="text-green-700">
            We'll review your requirements and contact you within 24 hours.
          </p>
        </div>
        
        <div className="space-y-4 max-w-md mx-auto text-left mb-8">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">Check your email for confirmation</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">Our team is reviewing your requirements</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-700">You'll receive a detailed proposal soon</span>
          </div>
        </div>
        
        <button
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Review & Submit
        </h2>
        <p className="text-gray-600">
          Please review your information before submitting.
        </p>
      </div>

      {/* Review Sections */}
      <div className="space-y-8">
        {/* Basic Info */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{data.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{data.email}</p>
            </div>
            {data.phone && (
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{data.phone}</p>
              </div>
            )}
            {data.company && (
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium">{data.company}</p>
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Project Details
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Project Type</p>
              <p className="font-medium">{getProjectTypeLabel(data.projectType)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Project Title</p>
              <p className="font-medium">{data.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium whitespace-pre-wrap">{data.description}</p>
            </div>
            {data.features.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Key Features</p>
                <div className="flex flex-wrap gap-2">
                  {data.features.map((feature, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Budget & Timeline */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Budget & Timeline
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Budget Range</p>
              <p className="font-medium">{getBudgetLabel(data.budgetRange)}</p>
              {data.budgetRange === 'custom' && data.customBudget && (
                <p className="text-sm text-gray-700 mt-1">
                  Custom: ${data.customBudget}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Timeline</p>
              <p className="font-medium">{getTimelineLabel(data.timeline)}</p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {result && !result.success && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <XCircle className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-700">Submission Failed</h3>
            </div>
            <p className="text-red-600">{result.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          disabled={loading}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 flex items-center"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Project
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step5ReviewSubmit;