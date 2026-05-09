import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export function SEO({
  title = 'Adibuz - Strategic AI & Digital Marketing Agency',
  description = 'Transform your business with Adibuz. We combine artificial intelligence with premium design and data-driven marketing to scale brands globally.',
  canonical,
  ogImage = 'https://adibuz.com/og-image.jpg', // Placeholder for actual OG image
}: SEOProps) {
  const siteTitle = title.includes('Adibuz') ? title : `${title} | Adibuz`;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Adibuz" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
