import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Project API calls
export const projectAPI = {
  // Submit project
  submitProject: async (projectData) => {
    try {
      const response = await api.post('/projects/submit', projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Get all projects (for admin dashboard)
  getProjects: async (params = {}) => {
    try {
      const response = await api.get('/projects', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Get project by ID
  getProjectById: async (id) => {
    try {
      const response = await api.get(`/projects/track/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Update project status
  updateProjectStatus: async (id, updates) => {
    try {
      const response = await api.patch(`/projects/${id}/status`, updates);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },



  // Get project statistics
  getProjectStats: async () => {
    try {
      const response = await api.get('/projects/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },
};

// Meeting API
// In api.js - update meetingAPI.scheduleMeeting function
export const meetingAPI = {
  scheduleMeeting: async (meetingData) => {
    const projectData = {
      ...meetingData,
      projectType: 'consultation',
      title: `Meeting Request - ${meetingData.clientName}`,
      description: `Scheduled meeting for ${meetingData.meetingDate} at ${meetingData.meetingTime}\nAgenda: ${meetingData.agenda || 'Not specified'}`,
      status: 'meeting-scheduled',
      budgetRange: 'not-sure',  // ADD THIS
      timeline: 'asap',  // ADD THIS
      features: [],  // ADD THIS - empty array for features
      company: meetingData.company || 'Not specified'  // ADD THIS
    };
    
    try {
      const response = await api.post('/projects/submit', projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },
};
export default api;