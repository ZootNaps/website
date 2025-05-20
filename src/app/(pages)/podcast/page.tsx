import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { FaSpotify, FaApple, FaGoogle, FaYoutube } from 'react-icons/fa';
import { getPodcastEpisodes } from '@/lib/contentful/client';

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
    },
    {
      title: "Pivoting During Uncertain Times",
      slug: "pivoting-uncertain-times",
      guest: "Michael Chen",
      guestTitle: "Founder of FlexiWork",
      description: "Michael discusses how his company successfully pivoted during economic downturns and emerged stronger than before.",
      publishDate: "2023-05-18",
      duration: "38 min",
    },
    {
      title: "The Art of Bootstrapping",
      slug: "art-of-bootstrapping",
      guest: "Amanda Rodriguez",
      guestTitle: "Founder of GrowFast",
      description: "Amanda shares insights on growing a business without external funding and achieving profitability from day one.",
      publishDate: "2023-04-22",
      duration: "52 min",
    },
    {
      title: "Building a Strong Company Culture",
      slug: "building-company-culture",
      guest: "David Park",
      guestTitle: "Co-founder of TeamFirst",
      description: "David explains how creating an engaging company culture led to better retention, productivity, and overall success.",
      publishDate: "2023-03-15",
      duration: "41 min",
    },
    {
      title: "From Corporate to Entrepreneur",
      slug: "corporate-to-entrepreneur",
      guest: "Lisa Williams",
      guestTitle: "Founder of NewLeaf Ventures",
      description: "Lisa shares her journey transitioning from a corporate executive to a successful entrepreneur and the lessons learned.",
      publishDate: "2023-02-28",
      duration: "47 min",
    },
  ];

  return (
    <MainLayout>
      <section className="pt-28 pb-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Founder Facing Podcast</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conversations with founders about their challenges, successes, and lessons learned building businesses that matter.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <a 
                href="https://open.spotify.com/show/3SX391bJvOrBhqP9DC8FLa" 
                className="flex items-center bg-black text-white py-2 px-4 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSpotify className="mr-2" /> Spotify
              </a>
              <a 
                href="https://podcasts.apple.com/us/podcast/founder-facing/id1778559614" 
                className="flex items-center bg-purple-600 text-white py-2 px-4 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaApple className="mr-2" /> Apple Podcasts
              </a>
              <a 
                href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy9mZDJiYTBmNC9wb2RjYXN0L3Jzcw" 
                className="flex items-center bg-green-600 text-white py-2 px-4 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGoogle className="mr-2" /> Google Podcasts
              </a>
              <a 
                href="https://www.youtube.com/@founderfacing" 
                className="flex items-center bg-red-600 text-white py-2 px-4 rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="mr-2" /> YouTube
              </a>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Latest Episodes</h2>
            
            <div className="space-y-6">
              {podcastEpisodes.map((episode, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
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
                      <div className="text-right">
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
                    
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-3">
                        <Link 
                          href={`/podcast/${episode.slug}`}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Play Episode
                        </Link>
                      </div>
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