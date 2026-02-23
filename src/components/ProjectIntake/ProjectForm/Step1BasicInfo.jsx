import React from 'react';
import { User, Mail, Phone, Building } from 'lucide-react';

const Step1BasicInfo = ({ data, onChange, onNext, onBack }) => {
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!data.clientName?.trim()) {
      newErrors.clientName = 'Name is required';
    } else if (data.clientName.length < 2) {
      newErrors.clientName = 'Name must be at least 2 characters';
    }
    
    if (!data.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (data.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    return newErrors;
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

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Tell Us About Yourself
        </h2>
        <p className="text-gray-600">
          We'll use this information to contact you regarding your project.
        </p>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            value={data.clientName}
            onChange={(e) => onChange('clientName', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${errors.clientName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="John Doe"
          />
          {errors.clientName && (
            <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 mr-2" />
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Building className="w-4 h-4 mr-2" />
            Company/Organization (Optional)
          </label>
          <input
            type="text"
            value={data.company}
            onChange={(e) => onChange('company', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Acme Inc."
          />
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
          Next: Project Details
        </button>
      </div>
    </div>
  );
};

export default Step1BasicInfo;