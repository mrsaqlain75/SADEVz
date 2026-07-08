import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Clock, Eye, User, Code, ArrowRight } from 'lucide-react';
import articleAPI from '../services/articleAPI';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';  // Import Helmet

// Reading time calculator
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const BlogCard = ({ article }) => {
  const readingTime = calculateReadingTime(article.content);
  
  return (
    <Link to={`/blog/${article.slug}`} className="block group h-full">
      <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 h-full flex flex-col">
        {article.coverImage && (
          <div className="aspect-video overflow-hidden flex-shrink-0">
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          {/* Category */}
          {article.category && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-[#00bcd4]/10 text-[#00bcd4] rounded-full mb-3 self-start">
              {article.category}
            </span>
          )}
          
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#00bcd4] transition-colors line-clamp-2">
            {article.title}
          </h2>
          
          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
            {article.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm mt-auto">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <User className="w-4 h-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>{readingTime} min</span>
              </div>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Eye className="w-4 h-4 mr-1" />
              <span>{article.views || 0}</span>
            </div>
          </div>
          
          {/* Date */}
          <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            {format(new Date(article.createdAt), 'MMM d, yyyy')}
          </div>
        </div>
      </article>
    </Link>
  );
};

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadArticles();
    loadCategories();
  }, [selectedCategory]);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const params = {
        status: 'published',
        ...(selectedCategory !== 'all' && { category: selectedCategory })
      };
      const response = await articleAPI.getArticles(params);
      setArticles(response.articles);
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

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
          <Helmet>
        <title>Blogs - SADEVZ</title>
        <meta name="description" content="Professional web development services tailored to your needs." />
      </Helmet>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28">
      {/* Premium Blurry Header */}
      <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00bcd4]/20 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#00bcd4]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#00bcd4]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <h1 className="text-5xl md:text-6xl text-gray-900 dark:text-white mb-4">
            The <span className="text-[#00bcd4] font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">SADEVZ</span> Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Insights, tutorials, and stories from our team about web development, design, and technology.
          </p>
        </section>

        {/* Filters Section */}
        <section className="max-w-7xl mx-auto px-4 py-8 border-y border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#00bcd4] text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat._id
                      ? 'bg-[#00bcd4] text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat._id} ({cat.count})
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent dark:text-white"
              />
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse h-full">
                  <div className="bg-gray-200 dark:bg-gray-700 aspect-video rounded-t-xl"></div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-b-xl space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No articles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {filteredArticles.map(article => (
                <BlogCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </section>

          {/* CTA */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  viewport={{ once: true }}
  className="pb-12 text-center"
>
  <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-6 bg-black/90 backdrop-blur-sm rounded-2xl border border-bright/30 shadow-2xl relative overflow-hidden">
    {/* Animated background lines */}
    <div className="absolute inset-0 bg-gradient-to-r from-bright/5 via-transparent to-cyan-500/5 animate-pulse"></div>
    <div className="absolute -inset-1 bg-gradient-to-r from-bright via-cyan-500 to-bright opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
    
    <div className="flex items-center gap-3 relative z-10">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bright to-cyan-500 flex items-center justify-center relative">
        <Code className="w-6 h-6 text-white" />
        <div className="absolute inset-0 rounded-full bg-bright animate-ping opacity-75"></div>
      </div>
      <div className="text-left">
        <h4 className="font-bold text-white tracking-tight">Ready to work with us?</h4>
        <p className="text-sm text-gray-400">Let's build something amazing together</p>
      </div>
    </div>
    <Link to="/start-project" className="relative z-10">
      <button className="group relative px-8 py-3 bg-gradient-to-r from-bright to-cyan-500 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-bright/50 hover:scale-105">
        {/* Glitch layers */}
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute inset-0 bg-bright transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
        <span className="relative z-10 flex items-center gap-2">
          Start a Project
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300" />
        </span>
        {/* Glitch text effect on hover */}
        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse">
          START A PROJECT
        </span>
      </button>
    </Link>
  </div>
</motion.div>


      </div>
    </div>
    


    </>
  );
};

export default BlogPage;