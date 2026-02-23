export const validateStep1 = (data) => {
  const errors = {};
  
  if (!data.clientName?.trim()) {
    errors.clientName = 'Name is required';
  } else if (data.clientName.length < 2) {
    errors.clientName = 'Name must be at least 2 characters';
  }
  
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }
  
  if (data.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/\D/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return errors;
};

export const validateStep2 = (data) => {
  const errors = {};
  
  if (!data.projectType) {
    errors.projectType = 'Please select a project type';
  }
  
  if (!data.title?.trim()) {
    errors.title = 'Project title is required';
  } else if (data.title.length < 5) {
    errors.title = 'Title must be at least 5 characters';
  }
  
  if (!data.description?.trim()) {
    errors.description = 'Project description is required';
  } else if (data.description.length < 20) {
    errors.description = 'Please provide more details (at least 20 characters)';
  }
  
  return errors;
};

export const validateStep4 = (data) => {
  const errors = {};
  
  if (data.budgetRange === 'custom' && (!data.customBudget || data.customBudget < 100)) {
    errors.customBudget = 'Custom budget must be at least $100';
  }
  
  return errors;
};