import React, { useState } from 'react';
import { PenSquare, FileText, BarChart3, ChevronLeft } from 'lucide-react';
import ArticleList from './ArticleList';
import ArticleEditor from './ArticleEditor';
import articleAPI from '../../services/articleAPI';

console.log('🔥 BlogManagement component loaded'); // ADD THIS

const BlogManagement = () => {
  console.log('🔥 BlogManagement rendering'); // ADD THIS
  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [currentArticle, setCurrentArticle] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setCurrentArticle(null);
    setView('create');
  };

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setView('edit');
  };

  const handleSave = async (articleData) => {
    try {
      if (view === 'create') {
        await articleAPI.createArticle(articleData);
      } else {
        await articleAPI.updateArticle(currentArticle._id, articleData);
      }
      
      // Refresh the list
      setRefreshKey(prev => prev + 1);
      setView('list');
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = () => {
    setView('list');
    setCurrentArticle(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Blog Management</h1>
        {view === 'list' ? (
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-gradient-to-r from-[#00bcd4] to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-[#00bcd4] transition-all flex items-center"
          >
            <PenSquare className="w-4 h-4 mr-2" />
            Write New Article
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to List
          </button>
        )}
      </div>

      {/* Content */}
      {view === 'list' && (
        <ArticleList 
          key={refreshKey}
          onEdit={handleEdit}
          onRefresh={() => setRefreshKey(prev => prev + 1)}
        />
      )}

      {(view === 'create' || view === 'edit') && (
        <ArticleEditor
          article={currentArticle}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default BlogManagement;