import React from 'react';
import { Check } from 'lucide-react';

const FormProgress = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
        <div 
          className="absolute top-4 left-0 h-0.5 bg-blue-500 -z-10 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          
          return (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${isCompleted ? 'bg-blue-500' : isCurrent ? 'bg-blue-500 border-4 border-blue-100' : 'bg-gray-200'}
                transition-all duration-300
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className={`font-medium ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
                    {step.number}
                  </span>
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;