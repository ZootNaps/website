import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faApple } from '@fortawesome/free-brands-svg-icons';
import { getPodcastEpisodes } from '@/lib/contentful/client';
import Script from 'next/script';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Podcast Production | South Lamar Studios",
  description: "Expert B2B podcast production services that help businesses generate leads and drive revenue. Listen to our showcase podcast featuring founders and business leaders sharing insights on growth, strategy, and success.",
  keywords: [
    "b2b podcast production", 
    "business podcast", 
    "founder interviews", 
    "executive podcast", 
    "thought leadership content",
    "lead generation podcast",
    "business growth stories"
  ],
  openGraph: {
    title: "B2B Podcast Production | South Lamar Studios",
    description: "Expert B2B podcast production services that help businesses generate leads and drive revenue. Listen to our showcase podcast featuring founders and business leaders.",
    url: "https://southlamarstudios.com/podcast",
    type: "website",
    images: [
      {
        url: "https://southlamarstudios.com/images/sls-Founder Facing_cover art.png",
        width: 500,
        height: 500,
        alt: "Founder Facing Podcast Cover Art"
      }
    ]
  }
};

// Construct PodcastSeries schema
const podcastSeriesSchema = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": "Founder Facing Podcast",
  "description": "Conversations with founders about their challenges, successes, and lessons learned building businesses that matter.",
  "url": metadata.openGraph?.url,
  "image": (metadata.openGraph?.images && Array.isArray(metadata.openGraph.images) && metadata.openGraph.images[0] && typeof metadata.openGraph.images[0] === 'object' && 'url' in metadata.openGraph.images[0]) ? (metadata.openGraph.images[0] as { url: string }).url : "https://southlamarstudios.com/images/sls-Founder Facing_cover art.png",
  "publisher": {
      "@type": "Organization",
      "name": "South Lamar Studios",
      "logo": {
          "@type": "ImageObject",
          "url": "https://southlamarstudios.com/images/sls-logos/sls-logo-default.png"
      }
  }
};

// This is the default export which Next.js uses
export default async function PodcastPage() {
  // Fetch podcast episodes from Contentful
  const episodes = await getPodcastEpisodes();
  
  // Fallback to dummy data if no episodes are returned from Contentful
  const podcastEpisodes = episodes.length > 0 ? episodes : [
    {
      title: "Building a SaaS Business from Scratch",
      slug: "building-saas-business",
      guest: "Sarah Johnson",
      guestTitle: "CEO of CloudTech",
      description: "Sarah shares her journey of building a successful SaaS company, discussing challenges, fundraising, and scaling strategies.",
      publishDate: "2023-06-10",
      duration: "45 min",
      coverArt: {
        url: "/images/sls-Founder Facing_cover art.png",
        title: "Default podcast cover",
        width: 500,
        height: 500
      }
    },
    {
      title: "Pivoting During Uncertain Times",
      slug: "pivoting-uncertain-times",
      guest: "Michael Chen",
      guestTitle: "Founder of FlexiWork",
      description: "Michael discusses how his company successfully pivoted during economic downturns and emerged stronger than before.",
      publishDate: "2023-05-18",
      duration: "38 min",
      coverArt: {
        url: "/images/sls-Founder Facing_cover art.png",
        title: "Default podcast cover",
        width: 500,
        height: 500
      }
    },
    {
      title: "The Art of Bootstrapping",
      slug: "art-of-bootstrapping",
      guest: "Amanda Rodriguez",
      guestTitle: "Founder of GrowFast",
      description: "Amanda shares insights on growing a business without external funding and achieving profitability from day one.",
      publishDate: "2023-04-22",
      duration: "52 min",
      coverArt: {
        url: "/images/sls-Founder Facing_cover art.png",
        title: "Default podcast cover",
        width: 500,
        height: 500
      }
    },
    {
      title: "Building a Strong Company Culture",
      slug: "building-company-culture",
      guest: "David Park",
      guestTitle: "Co-founder of TeamFirst",
      description: "David explains how creating an engaging company culture led to better retention, productivity, and overall success.",
      publishDate: "2023-03-15",
      duration: "41 min",
      coverArt: {
        url: "/images/sls-Founder Facing_cover art.png",
        title: "Default podcast cover",
        width: 500,
        height: 500
      }
    },
    {
      title: "From Corporate to Entrepreneur",
      slug: "corporate-to-entrepreneur",
      guest: "Lisa Williams",
      guestTitle: "Founder of NewLeaf Ventures",
      description: "Lisa shares her journey transitioning from a corporate executive to a successful entrepreneur and the lessons learned.",
      publishDate: "2023-02-28",
      duration: "47 min",
      coverArt: {
        url: "/images/sls-Founder Facing_cover art.png",
        title: "Default podcast cover",
        width: 500,
        height: 500
      }
    },
  ];

  return (
    <MainLayout>
      <Script 
        id="podcast-series-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesSchema) }}
      />
      <section className="pt-28 pb-20 bg-bg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 max-w-5xl mx-auto">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 md:w-full md:h-auto aspect-square shadow-lg rounded-lg overflow-hidden">
                <Image
                  src="/images/sls-Founder Facing_cover art.png"
                  alt="Founder Facing Podcast Cover"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Founder Facing Podcast</h1>
              <p className="text-lg text-gray-600 mb-6">
                Conversations with founders about their challenges, successes, and lessons learned building businesses that matter.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                <a 
                  href="https://open.spotify.com/show/3SX391bJvOrBhqP9DC8FLa" 
                  className="flex items-center bg-black text-white py-2 px-4 rounded-full transition-transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faSpotify} className="mr-2" /> Spotify
                </a>
                <a 
                  href="https://podcasts.apple.com/us/podcast/founder-facing/id1778559614" 
                  className="flex items-center bg-purple-600 text-white py-2 px-4 rounded-full transition-transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faApple} className="mr-2" /> Apple Podcasts
                </a>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Latest Episodes</h2>
            
            <div className="space-y-6">
              {podcastEpisodes.map((episode, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex w-full sm:w-auto">
                        <div className="hidden sm:block relative w-20 h-20 rounded-md overflow-hidden shrink-0 mr-4">
                          <Image
                            src={episode.coverArt?.url?.startsWith('http') ? episode.coverArt.url : 
                                 episode.coverArt?.url?.startsWith('//') ? `https:${episode.coverArt.url}` : 
                                 episode.coverArt?.url || '/images/sls-Founder Facing_cover art.png'}
                            alt={episode.coverArt?.title || `${episode.title} cover art`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition">
                            <Link href={`/podcast/${episode.slug}`}>
                              {episode.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-blue-600 mb-3">
                            With {episode.guest}, {episode.guestTitle}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <span className="text-sm text-gray-500 block">
                          {new Date(episode.publishDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-sm text-gray-500 block mt-1">
                          {episode.duration}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {episode.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex-grow"></div>
                      <Link 
                        href={`/podcast/${episode.slug}`}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Show Notes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 