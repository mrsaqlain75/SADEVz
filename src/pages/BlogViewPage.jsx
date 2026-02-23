import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ChevronLeft, Clock, Eye, Heart, Share2, Check, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import articleAPI from '../services/articleAPI';
import SEO from '../components/SEO'; // Import the SEO component

const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const BlogViewPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claps, setClaps] = useState(0);
  const [hasClapped, setHasClapped] = useState(false);
  const [views, setViews] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  useEffect(() => {
    loadArticle();
    checkUserInteraction();
  }, [slug]);

  const loadArticle = async () => {
    try {
      const response = await articleAPI.getArticleBySlug(slug);
      setArticle(response.article);
      setClaps(response.article.claps || 0);
      setViews(response.article.views || 0);
      
      const viewedKey = `viewed_${slug}`;
      if (!localStorage.getItem(viewedKey)) {
        await articleAPI.incrementViews(slug);
        setViews(prev => prev + 1);
        localStorage.setItem(viewedKey, 'true');
      }
    } catch (err) {
      setError('Article not found');
    } finally {
      setLoading(false);
    }
  };

  const checkUserInteraction = () => {
    const clappedKey = `clapped_${slug}`;
    if (localStorage.getItem(clappedKey)) {
      setHasClapped(true);
    }
  };

  const handleClap = async () => {
    if (!hasClapped) {
      try {
        await articleAPI.incrementClaps(slug);
        setClaps(prev => prev + 1);
        setHasClapped(true);
        localStorage.setItem(`clapped_${slug}`, 'true');
      } catch (error) {
        console.error('Failed to clap:', error);
      }
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: `Check out this article: ${article.title}`,
          url: url,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-2xl"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <SEO 
          title="Article Not Found"
          description="The article you're looking for doesn't exist or has been removed."
          noindex={true}
        />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error || 'Article not found'}</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 bg-[#00bcd4] text-white rounded-lg hover:bg-[#00acc1] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(article.content);
  const formattedDate = format(new Date(article.createdAt), 'MMMM d, yyyy');

  // Comprehensive CSS for article content
  const articleStyles = `
    .article-content {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.8;
      color: #1a1a1a;
      font-size: 18px;
    }
    
    .dark .article-content {
      color: #e5e5e5;
    }
    
    /* Headings */
    .article-content h1 {
      font-size: 2.5em;
      font-weight: 700;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      line-height: 1.3;
      color: #000;
    }
    
    .article-content h2 {
      font-size: 2em;
      font-weight: 700;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      line-height: 1.3;
      color: #000;
    }
    
    .article-content h3 {
      font-size: 1.5em;
      font-weight: 600;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      line-height: 1.4;
      color: #000;
    }
    
    .dark .article-content h1,
    .dark .article-content h2,
    .dark .article-content h3,
    .dark .article-content h4,
    .dark .article-content h5,
    .dark .article-content h6 {
      color: #fff;
    }
    
    /* Paragraphs */
    .article-content p {
      margin-bottom: 1.5em;
      line-height: 1.8;
    }
    
    /* Bold and Italic */
    .article-content strong {
      font-weight: 700;
      color: #000;
    }
    
    .dark .article-content strong {
      color: #fff;
    }
    
    .article-content em {
      font-style: italic;
    }
    
    .article-content u {
      text-decoration: underline;
    }
    
    /* Lists */
    .article-content ul,
    .article-content ol {
      margin: 1.5em 0;
      padding-left: 2em;
    }
    
    .article-content ul {
      list-style-type: disc;
    }
    
    .article-content ol {
      list-style-type: decimal;
    }
    
    .article-content li {
      margin-bottom: 0.5em;
      line-height: 1.7;
    }
    
    .article-content li p {
      margin-bottom: 0.5em;
    }
    
    /* Task Lists */
    .article-content ul[data-type="taskList"] {
      list-style: none;
      padding-left: 0;
    }
    
    .article-content ul[data-type="taskList"] li {
      display: flex;
      align-items: flex-start;
      gap: 0.75em;
      margin-bottom: 0.75em;
    }
    
    .article-content ul[data-type="taskList"] li input[type="checkbox"] {
      width: 1.2em;
      height: 1.2em;
      margin-top: 0.25em;
      accent-color: #00bcd4;
    }
    
    /* Blockquotes */
    .article-content blockquote {
      border-left: 4px solid #00bcd4;
      padding: 1em 0 1em 1.5em;
      margin: 1.5em 0;
      background-color: #f8f9fa;
      border-radius: 0 8px 8px 0;
      font-style: italic;
      color: #4a4a4a;
    }
    
    .dark .article-content blockquote {
      background-color: #1f2937;
      color: #d1d5db;
    }
    
    .article-content blockquote p {
      margin-bottom: 0.5em;
    }
    
    .article-content blockquote p:last-child {
      margin-bottom: 0;
    }
    
    /* Code */
    .article-content code {
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
      font-size: 0.9em;
      background-color: #f1f3f5;
      padding: 0.2em 0.4em;
      border-radius: 4px;
      color: #e83e8c;
    }
    
    .dark .article-content code {
      background-color: #2d3748;
      color: #fbbf24;
    }
    
    /* Code Blocks */
    .article-content pre {
      background-color: #1a1e24;
      border-radius: 8px;
      padding: 1.5em;
      margin: 1.5em 0;
      overflow-x: auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .article-content pre code {
      background-color: transparent;
      padding: 0;
      color: #e5e7eb;
      font-size: 0.9em;
      line-height: 1.6;
    }
    
    .dark .article-content pre {
      background-color: #0f1319;
    }
    
    /* Links */
    .article-content a {
      color: #00bcd4;
      text-decoration: none;
      font-weight: 500;
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s;
    }
    
    .article-content a:hover {
      border-bottom-color: #00bcd4;
    }
    
    /* Images */
    .article-content img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 2em auto;
      display: block;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* Horizontal Rule */
    .article-content hr {
      border: none;
      border-top: 2px solid #eaeaea;
      margin: 3em 0;
    }
    
    .dark .article-content hr {
      border-top-color: #2d3748;
    }
    
    /* Text Alignment */
    .article-content [style*="text-align: left"] {
      text-align: left;
    }
    
    .article-content [style*="text-align: center"] {
      text-align: center;
    }
    
    .article-content [style*="text-align: right"] {
      text-align: right;
    }
    
    .article-content [style*="text-align: justify"] {
      text-align: justify;
    }
    
    /* Nested lists */
    .article-content ul ul,
    .article-content ol ol,
    .article-content ul ol,
    .article-content ol ul {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
  `;
return (
    <>
      {/* SEO Component - This will inject all meta tags */}
      <SEO 
        title={article.title}
        description={article.content}
        image={article.coverImage}
        article={article.content}
        publishedTime={article.createdAt}
        modifiedTime={article.updatedAt}
        author={article.author}
        slug={article.slug}
        category={article.category}
        contentType="article"
      />

      <div className="min-h-screen bg-white dark:bg-gray-900 py-12 pt-28 transition-colors duration-300">
        <style>{articleStyles}</style>
        
        <article className="max-w-3xl mx-auto px-4">
          {/* Back button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-[#00bcd4] mb-8 transition-colors text-sm group"
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            All Blogs
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                {/* Author Avatar */}

                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                    {article.author}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
                    <time dateTime={article.createdAt}>{formattedDate}</time>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <div className="flex items-center">
                      <BookOpen className="w-3.5 h-3.5 mr-1" />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Count */}
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{views} views</span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {article.coverImage && (
            <figure className="mb-12">
              <img 
                src={article.coverImage} 
                alt={article.title}
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </figure>
          )}

          {/* Article Content */}
          <div className="article-content mb-16">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Interactive Buttons */}
          <div className="flex items-center justify-between py-8 border-y border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-6">
              {/* Clap Button */}
              <button
                onClick={handleClap}
                disabled={hasClapped}
                className={`flex items-center space-x-2 transition-all group ${
                  hasClapped 
                    ? 'text-[#00bcd4]' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-[#00bcd4]'
                }`}
              >
                <Heart className={`w-7 h-7 transition-transform group-hover:scale-110 ${hasClapped ? 'fill-current' : ''}`} />
                <span className="text-lg font-medium">{claps}</span>
              </button>
            </div>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-[#00bcd4] transition-colors group"
              >
                <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-medium">Share</span>
              </button>
              
              {showShareTooltip && (
                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-lg animate-fade-in">
                  <Check className="w-4 h-4 inline mr-1" />
                  Link copied!
                </div>
              )}
            </div>
          </div>

          {/* Reading time footer */}
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{readingTime} minute read</span>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogViewPage;