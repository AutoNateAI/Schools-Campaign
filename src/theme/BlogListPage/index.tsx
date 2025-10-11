import React, {type ReactNode, useState, useMemo} from 'react';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import BlogCard from '@site/src/components/BlogCard';
import '@site/src/css/blog.css';

function BlogListPageMetadata(props: Props): ReactNode {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): ReactNode {
  const {metadata, items} = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach(item => {
      item.content.metadata.tags?.forEach(tag => {
        tagSet.add(tag.label);
      });
    });
    return Array.from(tagSet).sort();
  }, [items]);

  // Filter items based on search and tag
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const {title, description, tags} = item.content.metadata;
      
      // Search filter
      const matchesSearch = searchQuery === '' || 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Tag filter
      const matchesTag = selectedTag === 'all' || 
        tags?.some(tag => tag.label === selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [items, searchQuery, selectedTag]);

  // Separate featured and regular posts
  const featuredPosts = filteredItems.filter(
    item => item.content.frontMatter.featured === true
  ).slice(0, 3);
  
  const regularPosts = filteredItems.filter(
    item => !item.content.frontMatter.featured
  );

  return (
    <BlogLayout>
      {/* Hero Section */}
      <div className="blog-hero">
        <h1>📚 AutoNateAI Blog</h1>
        <p>Insights on Critical Thinking, AI, and Education</p>
      </div>

      {/* Search Bar */}
      <div className="blog-search-container">
        <div className="blog-search-wrapper">
          <input
            type="text"
            placeholder="Search posts..."
            className="blog-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="blog-tag-filter"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="all">All Topics</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && searchQuery === '' && selectedTag === 'all' && (
        <div className="blog-featured-section">
          <h2>⭐ Featured Posts</h2>
          <div className="blog-featured-grid">
            {featuredPosts.map((item, index) => (
              <BlogCard key={index} item={item} featured={true} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts */}
      <div className="blog-posts-section">
        {regularPosts.length > 0 ? (
          <>
            <div className="blog-posts-grid">
              {regularPosts.map((item, index) => (
                <BlogCard key={index} item={item} />
              ))}
            </div>
            <div className="blog-pagination">
              <BlogListPaginator metadata={metadata} />
            </div>
          </>
        ) : (
          <div className="blog-no-results">
            <h3>No posts found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
