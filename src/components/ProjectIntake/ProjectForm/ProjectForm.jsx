import React, { useState } from 'react';
import Step1BasicInfo from './Step1BasicInfo';
import Step2ProjectDetails from './Step2ProjectDetails';
import Step3Requirements from './Step3Requirements';
import Step4BudgetTimeline from './Step4BudgetTimeline';
import Step5ReviewSubmit from './Step5ReviewSubmit';
import FormProgress from '../../UI/FormProgress';
import { projectAPI } from '../../../services/api';

const ProjectForm = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    title: '',
    description: '',
    features: [],
    targetAudience: '',
    competitors: '',
    referenceLinks: [],
    preferredTech: {
      frontend: [],
      backend: [],
      mobile: [],
      database: [],
      other: []
    },
    budgetRange: 'not-sure',
    customBudget: '',
    timeline: 'flexible',
    additionalNotes: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Project Details' },
    { number: 3, title: 'Requirements' },
    { number: 4, title: 'Budget & Timeline' },
    { number: 5, title: 'Review & Submit' },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTechChange = (category, tech) => {
    setFormData(prev => {
      const currentTech = prev.preferredTech[category] || [];
      const updatedTech = currentTech.includes(tech)
        ? currentTech.filter(t => t !== tech)
        : [...currentTech, tech];
      
      return {
        ...prev,
        preferredTech: {
          ...prev.preferredTech,
          [category]: updatedTech
        }
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        referenceLinks: formData.referenceLinks.filter(l => l.trim() !== ''),
        customBudget: formData.budgetRange === 'custom' && formData.customBudget 
          ? parseFloat(formData.customBudget) 
          : undefined,
        preferredTech: Object.keys(formData.preferredTech).reduce((acc, key) => {
          if (formData.preferredTech[key] && formData.preferredTech[key].length > 0) {
            acc[key] = formData.preferredTech[key];
          }
          return acc;
        }, {}),
        createdAt: new Date().toISOString(),
        status: 'new'
      };

      console.log('Submitting data:', submitData);
      const result = await projectAPI.submitProject(submitData);
      setSubmitResult({ success: true, data: result });
      setCurrentStep(5);
    } catch (error) {
      console.error('Submission error:', error);
      let errorMessage = 'Failed to submit project';
      
      if (error.errors) {
        errorMessage = 'Validation errors:\\n' + 
          error.errors.map(err => `${err.field}: ${err.message}`).join('\\n');
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitResult({ 
        success: false, 
        message: errorMessage 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-28 pb-16 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar - Made responsive */}
        <div className="hidden md:block">
          <FormProgress steps={steps} currentStep={currentStep} />
        </div>
        
        {/* Mobile Progress Indicator - Simple version */}
        <div className="md:hidden mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of 5
              </span>
              <span className="text-sm font-semibold text-[#00bcd4]">
                {steps[currentStep - 1]?.title}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`h-1 flex-1 rounded-full ${
                    step.number === currentStep
                      ? 'bg-[#00bcd4]'
                      : step.number < currentStep
                      ? 'bg-cyan-400'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mt-4 md:mt-8 border border-gray-200">
          {currentStep === 1 && (
            <Step1BasicInfo
              data={formData}
              onChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 2 && (
            <Step2ProjectDetails
              data={formData}
              onChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 3 && (
            <Step3Requirements
              data={formData}
              onChange={handleChange}
              onTechChange={handleTechChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 4 && (
            <Step4BudgetTimeline
              data={formData}
              onChange={handleChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 5 && (
            <Step5ReviewSubmit
              data={formData}
              onSubmit={handleSubmit}
              loading={loading}
              result={submitResult}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;