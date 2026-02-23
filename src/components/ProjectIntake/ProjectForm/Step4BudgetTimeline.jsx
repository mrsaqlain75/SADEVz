import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';

const Step4BudgetTimeline = ({ data, onChange, onNext, onBack }) => {
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    
    if (data.budgetRange === 'custom' && (!data.customBudget || data.customBudget < 100)) {
      newErrors.customBudget = 'Custom budget must be at least $100';
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

  const budgetRanges = [
    { value: 'not-sure', label: 'Not sure yet' },
    { value: 'under-1k', label: 'Under $1,000' },
    { value: '1k-5k', label: '$1,000 - $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k+', label: '$25,000+' },
    { value: 'custom', label: 'Custom Budget' },
  ];

  const timelines = [
    { value: 'flexible', label: 'Flexible' },
    { value: '2-4weeks', label: '2-4 Weeks' },
    { value: '1-2months', label: '1-2 Months' },
    { value: '2-4months', label: '2-4 Months' },
    { value: 'urgent-1week', label: 'Urgent (1 Week)' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Budget & Timeline
        </h2>
        <p className="text-gray-600">
          Help us provide an accurate estimate for your project.
        </p>
      </div>

      <div className="space-y-8">
        {/* Budget */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
            <DollarSign className="w-4 h-4 mr-2" />
            Estimated Budget
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {budgetRanges.map(range => (
              <button
                key={range.value}
                type="button"
                onClick={() => onChange('budgetRange', range.value)}
                className={`p-4 rounded-lg border ${data.budgetRange === range.value ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'} transition-all`}
              >
                <div className="font-medium text-gray-900">{range.label}</div>
              </button>
            ))}
          </div>
          
          {data.budgetRange === 'custom' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Budget Amount ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={data.customBudget}
                  onChange={(e) => onChange('customBudget', e.target.value)}
                  className={`w-full pl-8 pr-4 py-3 rounded-lg border ${errors.customBudget ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="5000"
                />
              </div>
              {errors.customBudget && (
                <p className="mt-1 text-sm text-red-600">{errors.customBudget}</p>
              )}
            </div>
          )}
        </div>

        {/* Timeline */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Project Timeline
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {timelines.map(timeline => (
              <button
                key={timeline.value}
                type="button"
                onClick={() => onChange('timeline', timeline.value)}
                className={`p-4 rounded-lg border ${data.timeline === timeline.value ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-gray-400'} transition-all`}
              >
                <div className="font-medium text-gray-900">{timeline.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={data.additionalNotes || ''}
            onChange={(e) => onChange('additionalNotes', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any other requirements, constraints, or preferences..."
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
          Next: Review & Submit
        </button>
      </div>
    </div>
  );
};

export default Step4BudgetTimeline;