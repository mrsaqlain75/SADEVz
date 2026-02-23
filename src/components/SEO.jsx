import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { 
  generateDescription, 
  generateKeywords, 
  generateCanonicalUrl,
  generateArticleSchema,
  generateBreadcrumbSchema 
} from '../utils/seo';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  article, 
  publishedTime, 
  modifiedTime, 
  author, 
  slug, 
  category,
  contentType = 'article',
  noindex = false 
}) => {
  // For Vite, use import.meta.env instead of process.env
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://sadevz.com';
  const canonicalUrl = slug ? generateCanonicalUrl(slug, siteUrl) : siteUrl;
  
  // Generate description if not provided
  const metaDescription = description || (article ? generateDescription(article) : 'SADEVZ - Web Development & Digital Solutions');
  
  // Generate keywords if not provided
  const metaKeywords = keywords || (title && category ? generateKeywords(title, category, article) : 'web development, programming, react, nodejs, javascript');
  
  // Format title with site name
  const pageTitle = title ? `${title} | SADEVZ Blog` : 'SADEVZ Blog - Web Development Insights';

  // Generate schema only for articles
  const articleSchema = article && slug ? generateArticleSchema(
    { title, content: article, coverImage: image, author, createdAt: publishedTime, updatedAt: modifiedTime, slug },
    siteUrl
  ) : null;

  const breadcrumbSchema = slug && title ? generateBreadcrumbSchema(
    { title, category, slug },
    siteUrl
  ) : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots Meta */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={contentType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title || 'SADEVZ Blog'} />
      <meta property="og:description" content={metaDescription} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="SADEVZ" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || 'SADEVZ Blog'} />
      <meta name="twitter:description" content={metaDescription} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="twitter:site" content="@sadevz" />
      <meta name="twitter:creator" content="@sadevz" />

      {/* Article Specific Meta */}
      {contentType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {contentType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {contentType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {category && <meta property="article:section" content={category} />}

      {/* JSON-LD Structured Data */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Additional SEO Tags */}
      <meta name="author" content={author || 'SADEVZ Team'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.string,
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
  author: PropTypes.string,
  slug: PropTypes.string,
  category: PropTypes.string,
  contentType: PropTypes.string,
  noindex: PropTypes.bool
};

export default SEO;