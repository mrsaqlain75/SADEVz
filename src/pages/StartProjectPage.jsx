import React, { useState } from 'react';
import IntakeOptions from '../components/ProjectIntake/IntakeOptions';
import ProjectForm from '../components/ProjectIntake/ProjectForm/ProjectForm';
import MeetingScheduler from '../components/ProjectIntake/MeetingScheduler/MeetingScheduler';

const StartProjectPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  return (
    <div>
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

export default StartProjectPage;