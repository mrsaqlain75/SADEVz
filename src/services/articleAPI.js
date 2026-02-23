import api from './api';

const articleAPI = {
  // Get all articles with filters
  getArticles: async (params = {}) => {
    try {
      const response = await api.get('/articles', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Get single article
  getArticle: async (id) => {
    try {
      const response = await api.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Create article (protected)
  createArticle: async (articleData) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await api.post('/articles', articleData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Update article (protected)
  updateArticle: async (id, articleData) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await api.put(`/articles/${id}`, articleData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Delete article (protected)
  deleteArticle: async (id) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await api.delete(`/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  // Upload image (protected)
  uploadImage: async (file) => {
    try {
      const token = localStorage.getItem('admin_token');
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/articles/upload-image', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

// Add these to your articleAPI object
incrementViews: async (slug) => {
  try {
    const response = await api.post(`/articles/slug/${slug}/views`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
},

incrementClaps: async (slug) => {
  try {
    const response = await api.post(`/articles/slug/${slug}/claps`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
},


  // Get categories
  getCategories: async () => {
    try {
      const response = await api.get('/articles/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

    // Add this method to your existing articleAPI object
getArticleBySlug: async (slug) => {
  try {
    const response = await api.get(`/articles/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
},

  // Get stats
  getStats: async () => {
    try {
      const response = await api.get('/articles/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  }
};

export default articleAPI;