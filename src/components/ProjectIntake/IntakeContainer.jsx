import React, { useState } from 'react';
import IntakeOptions from './IntakeOptions';
import ProjectForm from './ProjectForm/ProjectForm';
import MeetingScheduler from './MeetingScheduler/MeetingScheduler';

const IntakeContainer = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    // Scroll to top when changing view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  return (
    <div className="pt-16"> {/* Adjust based on your navbar height */}
      {!selectedOption && (
        <IntakeOptions onSelectOption={handleSelectOption} />
      )}
      
      {selectedOption === 'form' && (
        <ProjectForm onBack={handleBack} />
      )}
      
      {selectedOption === 'meeting' && (
        <MeetingScheduler onBack={handleBack} />
      )}
    </div>
  );
};

export default IntakeContainer;