import React, { useState } from 'react';
import { Code, FileText, Type } from 'lucide-react';

const Step2ProjectDetails = ({ data, onChange, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [currentFeature, setCurrentFeature] = useState('');

  const validate = () => {
    const newErrors = {};
    
    if (!data.projectType) {
      newErrors.projectType = 'Please select a project type';
    }
    
    if (!data.title?.trim()) {
      newErrors.title = 'Project title is required';
    } else if (data.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!data.description?.trim()) {
      newErrors.description = 'Project description is required';
    } else if (data.description.length < 20) {
      newErrors.description = 'Please provide more details (at least 20 characters)';
    }
    
    return newErrors;
  };

  const handleAddFeature = () => {
    if (currentFeature.trim() && !data.features.includes(currentFeature.trim())) {
      onChange('features', [...data.features, currentFeature.trim()]);
      setCurrentFeature('');
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    onChange('features', data.features.filter(f => f !== featureToRemove));
  };

  const handleNext = () => {
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      onNext();
    } else {
      setErrors(validationErrors);
    }
  };

  const projectTypes = [
    { value: 'website', label: 'Website Development' },
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'course', label: 'IT Course/Training' },
    { value: 'consultation', label: 'IT Consultation' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Project Details
        </h2>
        <p className="text-gray-600">
          Tell us about your project vision and requirements.
        </p>
      </div>

      <div className="space-y-6">
        {/* Project Type */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Type className="w-4 h-4 mr-2" />
            Project Type *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {projectTypes.map(type => (
              <button
                key={type.value}
                type="button"
                onClick={() => onChange('projectType', type.value)}
                className={`p-4 rounded-lg border ${data.projectType === type.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'} transition-all text-left`}
              >
                <div className="font-medium text-gray-900">{type.label}</div>
              </button>
            ))}
          </div>
          {errors.projectType && (
            <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>
          )}
        </div>

        {/* Project Title */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 mr-2" />
            Project Title *
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="E-commerce Website Development"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Code className="w-4 h-4 mr-2" />
            Project Description *
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onChange('description', e.target.value)}
            rows={6}
            className={`w-full px-4 py-3 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Describe your project in detail. What problem are you solving? Who are your target users? What features do you need?"
          />
          <div className="flex justify-between mt-1">
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {data.description.length}/5000 characters
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Features (Optional)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={currentFeature}
              onChange={(e) => setCurrentFeature(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a feature (e.g., User authentication, Payment gateway)"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Add
            </button>
          </div>
          
          {data.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.features.map((feature, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(feature)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          Next: Requirements
        </button>
      </div>
    </div>
  );
};

export default Step2ProjectDetails;