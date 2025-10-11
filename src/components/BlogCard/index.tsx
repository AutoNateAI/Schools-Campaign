import React from 'react';
import Link from '@docusaurus/Link';

interface BlogCardProps {
  item: any;
  featured?: boolean;
}

export default function BlogCard({ item, featured = false }: BlogCardProps): JSX.Element {
  const { metadata } = item.content;
  const {
    permalink,
    title,
    description,
    date,
    formattedDate,
    readingTime,
    tags,
    authors,
    frontMatter,
  } = metadata;

  // Get thumbnail from frontMatter or use placeholder
  const thumbnail = frontMatter.image;
  const isFeatured = frontMatter.featured || featured;

  // Get first letter of title for placeholder
  const firstLetter = title.charAt(0).toUpperCase();

  return (
    <article className={`blog-card ${isFeatured ? 'featured' : ''}`}>
      {/* Thumbnail */}
      <Link to={permalink} className="blog-card-thumbnail">
        {thumbnail ? (
          <img src={thumbnail} alt={title} />
        ) : (
          <div className="blog-card-thumbnail-placeholder">
            {firstLetter}
          </div>
        )}
        {isFeatured && (
          <span className="blog-card-featured-badge">⭐ Featured</span>
        )}
      </Link>

      {/* Content */}
      <div className="blog-card-content">
        {/* Title */}
        <h3 className="blog-card-title">
          <Link to={permalink}>{title}</Link>
        </h3>

        {/* Description */}
        {description && (
          <p className="blog-card-description">{description}</p>
        )}

        {/* Meta */}
        <div className="blog-card-meta">
          {authors && authors.length > 0 && (
            <div className="blog-card-author">
              {authors[0].imageURL && (
                <img
                  src={authors[0].imageURL}
                  alt={authors[0].name}
                  className="blog-card-author-avatar"
                />
              )}
              <span>{authors[0].name}</span>
            </div>
          )}
          <span>•</span>
          <div className="blog-card-date">
            <span>📅</span>
            <time dateTime={date}>{formattedDate}</time>
          </div>
          {readingTime && (
            <>
              <span>•</span>
              <div className="blog-card-read-time">
                <span>⏱️</span>
                <span>{Math.ceil(readingTime)} min read</span>
              </div>
            </>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="blog-card-tags">
            {tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.permalink}
                to={tag.permalink}
                className="blog-card-tag"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        )}

        {/* Read More */}
        <Link to={permalink} className="blog-card-read-more">
          Read more <span>→</span>
        </Link>
      </div>
    </article>
  );
}
