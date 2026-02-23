export const PROJECT_TYPES = [
  { value: 'website', label: 'Website Development' },
  { value: 'web-app', label: 'Web Application' },
  { value: 'mobile-app', label: 'Mobile Application' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'course', label: 'IT Course/Training' },
  { value: 'consultation', label: 'IT Consultation' },
  { value: 'other', label: 'Other' },
];

export const BUDGET_RANGES = [
  { value: 'not-sure', label: 'Not sure yet' },
  { value: 'under-1k', label: 'Under $1,000' },
  { value: '1k-5k', label: '$1,000 - $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k+', label: '$25,000+' },
  { value: 'custom', label: 'Custom Budget' },
];

export const TIMELINES = [
  { value: 'flexible', label: 'Flexible' },
  { value: '2-4weeks', label: '2-4 Weeks' },
  { value: '1-2months', label: '1-2 Months' },
  { value: '2-4months', label: '2-4 Months' },
  { value: 'urgent-1week', label: 'Urgent (1 Week)' },
];

export const TECH_STACK_OPTIONS = {
  frontend: ['React', 'Vue.js', 'Angular', 'Next.js', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap'],
  backend: ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel', 'Java', 'Spring Boot'],
  mobile: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)'],
  database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
  other: ['WordPress', 'Shopify', 'AWS', 'Docker', 'CI/CD'],
};

export const STATUS_OPTIONS = {
  new: { label: 'New', color: 'bg-blue-500' },
  contacted: { label: 'Contacted', color: 'bg-yellow-500' },
  'meeting-scheduled': { label: 'Meeting Scheduled', color: 'bg-purple-500' },
  'quote-sent': { label: 'Quote Sent', color: 'bg-indigo-500' },
  negotiation: { label: 'Negotiation', color: 'bg-orange-500' },
  confirmed: { label: 'Confirmed', color: 'bg-green-500' },
  rejected: { label: 'Rejected', color: 'bg-red-500' },
  archived: { label: 'Archived', color: 'bg-gray-500' },
};