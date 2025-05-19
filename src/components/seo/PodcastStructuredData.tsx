'use client';

import Script from 'next/script';

interface PodcastEpisodeProps {
  title: string;
  description: string;
  publishDate: string;
  duration: string;
  guest: string;
  guestTitle: string;
  episodeUrl: string;
  imageUrl?: string;
}

export default function PodcastStructuredData({
  title,
  description,
  publishDate,
  duration,
  guest,
  guestTitle,
  episodeUrl,
  imageUrl = 'https://southlamarstudios.com/images/podcast-cover.jpg'
}: PodcastEpisodeProps) {
  
  // Convert duration from "XX min" format to ISO format
  const isoDuration = `PT${parseInt(duration.split(' ')[0])}M`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": title,
    "datePublished": publishDate,
    "timeRequired": isoDuration,
    "description": description,
    "url": episodeUrl,
    "image": imageUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "South Lamar Studios Podcast",
      "url": "https://southlamarstudios.com/podcast"
    },
    "actor": {
      "@type": "Person",
      "name": guest,
      "jobTitle": guestTitle
    }
  };

  return (
    <Script
      id="podcast-episode-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 