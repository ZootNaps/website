import { notFound } from 'next/navigation';
import { getPodcastEpisodeBySlug } from '@/lib/contentful/client';
import MainLayout from '@/components/layout/MainLayout';
import PodcastStructuredData from '@/components/seo/PodcastStructuredData';
import { Metadata } from 'next';

interface PodcastPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PodcastPageProps): Promise<Metadata> {
  const episode = await getPodcastEpisodeBySlug(params.slug);
  
  if (!episode) {
    return {
      title: 'Episode Not Found',
      description: 'The requested podcast episode could not be found.',
    };
  }
  
  return {
    title: `${episode.title} | Founder Facing Podcast`,
    description: episode.description,
    openGraph: {
      title: `${episode.title} | Founder Facing Podcast`,
      description: episode.description,
      url: `https://southlamarstudios.com/podcast/${episode.slug}`,
      type: 'article',
      publishedTime: episode.publishDate,
    },
  };
}

export default async function PodcastEpisodePage({ params }: PodcastPageProps) {
  const episode = await getPodcastEpisodeBySlug(params.slug);
  
  if (!episode) {
    notFound();
  }
  
  // Function to convert the transcript to HTML
  const renderTranscript = () => {
    if (!episode.fullTranscript) {
      return <p>Transcript not available for this episode.</p>;
    }
    
    // This logic would need to be adjusted based on how your transcript is stored in Contentful
    // For now, assuming it's stored as a Rich Text field that gets converted to HTML
    return <div dangerouslySetInnerHTML={{ __html: episode.fullTranscript }} />;
  };
  
  return (
    <MainLayout>
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Episode Summary Section */}
          <div className="bg-[#f8f3ed] p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-bold text-[#2a3d45] mt-0">Episode Summary</h2>
            <p className="text-lg leading-relaxed">{episode.summary}</p>
            
            <h3 className="text-xl font-semibold text-[#2a3d45] mt-6">Key Topics</h3>
            <ul className="list-disc pl-6">
              {episode.keyTopics.map((topic, index) => (
                <li key={index} className="mb-2">{topic}</li>
              ))}
            </ul>
          </div>
          
          {/* Player Section */}
          <div className="border border-gray-200 rounded-xl p-6 my-8 bg-white shadow-md">
            <h3 className="text-xl font-semibold text-[#e76f51] mt-0 uppercase tracking-wider">Listen to the Episode</h3>
            <div className="my-4">
              <iframe 
                style={{ borderRadius: '12px' }}
                src={episode.spotifyEmbedUrl}
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
          
          {/* Listen On Section */}
          <div className="my-8 text-center">
            <h3 className="text-xl font-semibold text-[#2a3d45] mb-5">Listen & Subscribe</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              <a 
                href="https://open.spotify.com/show/3SX391bJvOrBhqP9DC8FLa" 
                className="inline-block px-6 py-3 bg-[#1DB954] text-white rounded-full font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spotify
              </a>
              <a 
                href="https://podcasts.apple.com/us/podcast/founder-facing/id1778559614" 
                className="inline-block px-6 py-3 bg-[#A030FF] text-white rounded-full font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Podcasts
              </a>
              <a 
                href="https://anchor.fm/s/fd2ba0f4/podcast/rss" 
                className="inline-block px-6 py-3 bg-[#e76f51] text-white rounded-full font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                RSS Feed
              </a>
            </div>
          </div>
          
          {/* Full Transcript Section */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h2 id="full-transcript" className="text-2xl font-bold text-[#2a3d45]">Full Transcript</h2>
            
            {/* Table of Contents */}
            {episode.fullTranscript && (
              <div className="bg-[#f8f3ed] p-5 rounded-lg mb-8">
                <h4 className="text-lg font-semibold text-[#2a3d45] mt-0">Jump to Section:</h4>
                <ul className="columns-2 gap-10">
                  <li><a href="#introduction" className="text-[#e76f51] no-underline">Introduction</a></li>
                  <li><a href="#co-founder-relationship" className="text-[#e76f51] no-underline">Co-Founder Relationship</a></li>
                  <li><a href="#roles-responsibilities" className="text-[#e76f51] no-underline">Roles & Responsibilities</a></li>
                  <li><a href="#first-customer" className="text-[#e76f51] no-underline">Landing the First Customer</a></li>
                  <li><a href="#sales-marketing" className="text-[#e76f51] no-underline">Sales & Marketing Approach</a></li>
                  <li><a href="#conclusion" className="text-[#e76f51] no-underline">Conclusion</a></li>
                </ul>
              </div>
            )}
            
            {/* Pull Quotes */}
            {episode.pullQuotes.length > 0 && episode.pullQuotes.map((quote, index) => (
              <div key={index} className="my-10 py-8 px-6 border-l-4 border-[#e76f51] bg-[#f8f3ed]">
                <p className="text-2xl italic text-[#2a3d45] leading-relaxed">{quote.quote}</p>
                <p className="mt-4 text-[#e76f51] font-semibold">– {quote.attribution}</p>
              </div>
            ))}
            
            {/* Transcript Content */}
            <div className="transcript-content my-6">
              {renderTranscript()}
            </div>
            
            {/* Resources Section */}
            {episode.resourcesMentioned.length > 0 && (
              <div className="bg-[#f8f3ed] p-6 rounded-xl my-8">
                <h3 className="text-xl font-semibold text-[#2a3d45] mt-0">Resources Mentioned</h3>
                <ul className="pl-6">
                  {episode.resourcesMentioned.map((resource, index) => (
                    <li key={index} className="mb-3">
                      <a href={resource.url} className="text-[#e76f51] no-underline" target="_blank" rel="noopener noreferrer">
                        {resource.title}
                      </a>
                      {resource.description && ` - ${resource.description}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Structured Data for SEO */}
      <PodcastStructuredData
        title={episode.title}
        description={episode.description}
        publishDate={episode.publishDate}
        duration={episode.duration}
        guest={episode.guest}
        guestTitle={episode.guestTitle}
        episodeUrl={`https://southlamarstudios.com/podcast/${episode.slug}`}
      />
    </MainLayout>
  );
} 