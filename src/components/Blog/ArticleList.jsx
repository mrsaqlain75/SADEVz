import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, Calendar, User, Tag, Search, Filter } from 'lucide-react';
import articleAPI from '../../services/articleAPI';
import { format } from 'date-fns';

const ArticleList = ({ onEdit, onRefresh }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
  const [filters, setFilters] = useState({ status: '', category: '', search: '' });
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });

  useEffect(() => {
    loadArticles();
    loadCategories();
    loadStats();
  }, [filters.status, filters.category, filters.page]);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const params = {
        page: filters.page,
        status: filters.status || undefined,
        category: filters.category || undefined
      };
      
      const response = await articleAPI.getArticles(params);
      setArticles(response.articles);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await articleAPI.getCategories();
      setCategories(response.categories);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await articleAPI.getStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    
    try {
      await articleAPI.deleteArticle(id);
      loadArticles();
      loadStats();
      if (onRefresh) onRefresh();
    } catch (error) {
      alert('Failed to delete article');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h3 className="text-sm text-gray-400 mb-2">Total Articles</h3>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h3 className="text-sm text-gray-400 mb-2">Published</h3>
          <p className="text-3xl font-bold text-emerald-400">{stats.published}</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h3 className="text-sm text-gray-400 mb-2">Drafts</h3>
          <p className="text-3xl font-bold text-amber-400">{stats.drafts}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
              />
            </div>
          </div>
          <div className="w-48">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="w-48">
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
              className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat._id} ({cat.count})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-400 font-medium">Title</th>
                <th className="text-left p-4 text-gray-400 font-medium">Category</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Author</th>
                <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    Loading articles...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No articles found
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        {article.coverImage && (
                          <img 
                            src={article.coverImage} 
                            alt={article.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
                        <span className="text-white font-medium">{article.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                        {article.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        article.status === 'published' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{article.author}</td>
                    <td className="p-4 text-gray-300">{formatDate(article.createdAt)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onEdit(article)}
                          className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-[#00bcd4]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article._id)}
                          className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="p-4 border-t border-gray-700 flex justify-between items-center">
            <span className="text-gray-400">
              Page {pagination.page} of {pagination.pages}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={filters.page === 1}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={filters.page === pagination.pages}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;