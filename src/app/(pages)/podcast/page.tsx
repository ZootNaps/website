import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { FaSpotify, FaApple, FaGoogle, FaYoutube } from 'react-icons/fa';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder Facing Podcast | Your Business Name",
  description: "Listen to our podcast where we interview founders and business leaders about their challenges, successes, and lessons learned.",
};

// Placeholder podcast episodes until integrated with a real API
const podcastEpisodes = [
  {
    id: 1,
    title: "Building a SaaS Business from Scratch",
    slug: "building-saas-business",
    guest: "Sarah Johnson",
    guestTitle: "CEO of CloudTech",
    description: "Sarah shares her journey of building a successful SaaS company, discussing challenges, fundraising, and scaling strategies.",
    publishDate: "2023-06-10",
    duration: "45 min",
  },
  {
    id: 2,
    title: "Pivoting During Uncertain Times",
    slug: "pivoting-uncertain-times",
    guest: "Michael Chen",
    guestTitle: "Founder of FlexiWork",
    description: "Michael discusses how his company successfully pivoted during economic downturns and emerged stronger than before.",
    publishDate: "2023-05-18",
    duration: "38 min",
  },
  {
    id: 3,
    title: "The Art of Bootstrapping",
    slug: "art-of-bootstrapping",
    guest: "Amanda Rodriguez",
    guestTitle: "Founder of GrowFast",
    description: "Amanda shares insights on growing a business without external funding and achieving profitability from day one.",
    publishDate: "2023-04-22",
    duration: "52 min",
  },
  {
    id: 4,
    title: "Building a Strong Company Culture",
    slug: "building-company-culture",
    guest: "David Park",
    guestTitle: "Co-founder of TeamFirst",
    description: "David explains how creating an engaging company culture led to better retention, productivity, and overall success.",
    publishDate: "2023-03-15",
    duration: "41 min",
  },
  {
    id: 5,
    title: "From Corporate to Entrepreneur",
    slug: "corporate-to-entrepreneur",
    guest: "Lisa Williams",
    guestTitle: "Founder of NewLeaf Ventures",
    description: "Lisa shares her journey transitioning from a corporate executive to a successful entrepreneur and the lessons learned.",
    publishDate: "2023-02-28",
    duration: "47 min",
  },
];

export default function PodcastPage() {
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
                href="#" 
                className="flex items-center bg-black text-white py-2 px-4 rounded-full"
              >
                <FaSpotify className="mr-2" /> Spotify
              </a>
              <a 
                href="#" 
                className="flex items-center bg-purple-600 text-white py-2 px-4 rounded-full"
              >
                <FaApple className="mr-2" /> Apple Podcasts
              </a>
              <a 
                href="#" 
                className="flex items-center bg-green-600 text-white py-2 px-4 rounded-full"
              >
                <FaGoogle className="mr-2" /> Google Podcasts
              </a>
              <a 
                href="#" 
                className="flex items-center bg-red-600 text-white py-2 px-4 rounded-full"
              >
                <FaYoutube className="mr-2" /> YouTube
              </a>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Latest Episodes</h2>
            
            <div className="space-y-6">
              {podcastEpisodes.map((episode) => (
                <div key={episode.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
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
                        <button className="text-gray-500 hover:text-gray-700">
                          Play Episode
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          Download
                        </button>
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