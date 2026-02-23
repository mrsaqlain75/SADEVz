// Utility functions for SEO

// Generate meta description from content (first 160 characters)
export const generateDescription = (content, fallback = 'Read our latest article on SADEVZ blog') => {
  if (!content) return fallback;
  
  // Strip HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  // Remove extra whitespace and truncate to 160 chars
  const trimmed = plainText.replace(/\s+/g, ' ').trim();
  return trimmed.substring(0, 157) + (trimmed.length > 157 ? '...' : '');
};

// Generate keywords from title and content
export const generateKeywords = (title, category, content) => {
  const words = new Set();
  
  // Add title words
  title.toLowerCase().split(' ').forEach(word => {
    if (word.length > 3) words.add(word);
  });
  
  // Add category
  if (category) words.add(category.toLowerCase());
  
  // Add common tech keywords (you can customize these)
  const commonKeywords = ['web development', 'programming', 'coding', 'tutorial', 'guide'];
  commonKeywords.forEach(word => words.add(word));
  
  return Array.from(words).join(', ');
};

// Generate canonical URL
// Update this function
export const generateCanonicalUrl = (slug, siteUrl) => {
  return `${siteUrl}/blog/${slug}`;
};

// Generate Article Schema (JSON-LD for rich snippets)
export const generateArticleSchema = (article, siteUrl) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: generateDescription(article.content),
    image: article.coverImage ? [article.coverImage] : [],
    datePublished: article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: [{
      '@type': 'Person',
      name: article.author,
      url: siteUrl
    }]
  };

  // Add publisher info
  if (article.author) {
    schema.author = {
      '@type': 'Person',
      name: article.author
    };
  }

  return schema;
};

// Generate Breadcrumb Schema
export const generateBreadcrumbSchema = (article, siteUrl) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Blog',
        item: `${siteUrl}/blog`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.category || 'Articles',
        item: `${siteUrl}/blog?category=${article.category || 'all'}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${siteUrl}/blog/${article.slug}`
      }
    ]
  };
};