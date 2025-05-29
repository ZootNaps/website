import { createClient } from 'contentful';

// This is a temporary file that disables Contentful integration until it's properly set up

// Types for Contentful blog post entries
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text content
  publishDate: string;
  featuredImage: {
    url: string;
    title: string;
    description: string;
    width: number;
    height: number;
  } | null;
  author: {
    name: string;
    bio: string;
    picture: {
      url: string;
    } | null;
  } | null;
  // SEO Fields
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  tags?: string[];
  status: string; // Now always populated from Contentful's built-in status
  // New fields
  isFeatured?: boolean;
  category?: string;
  readingTimeMinutes?: number;
}

// Types for Contentful podcast episode entries
export interface PodcastEpisode {
  title: string;
  slug: string;
  description: string;
  summary: string;
  keyTopics: string[];
  publishDate: string;
  duration: string;
  guest: string;
  guestTitle: string;
  episodeNumber: string;
  spotifyEmbedUrl: string;
  fullTranscript: any; // Rich text content
  pullQuotes: PullQuote[];
  resourcesMentioned: Resource[];
  transcriptSections?: TranscriptSection[];
  coverArt?: {
    url: string;
    title: string;
    description?: string;
    width: number;
    height: number;
  };
}

interface PullQuote {
  quote: string;
  attribution: string;
}

interface Resource {
  title: string;
  url: string;
  description?: string;
}

// Interface for transcript sections
interface TranscriptSection {
  title: string;
  content: string;
  id: string;
}

// Client configuration
export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const contentfulPreviewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: 'preview.contentful.com',
});

export function getClient(preview = false) {
  return preview ? contentfulPreviewClient : contentfulClient;
}

// Blog post functions
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const entries = await getClient().getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
    });
    
    return entries.items.map(item => {
      const fields = item.fields as any;
      const sys = item.sys as any;
      // Use Contentful's built-in publication status
      const isPublished = !!sys.publishedVersion;
      
      return {
        title: fields.title,
        slug: fields.slug,
        excerpt: fields.excerpt,
        content: fields.content,
        publishDate: fields.publishDate,
        featuredImage: fields.featuredImage ? {
          url: fields.featuredImage.fields.file.url,
          title: fields.featuredImage.fields.title,
          description: fields.featuredImage.fields.description,
          width: fields.featuredImage.fields.file.details.image.width,
          height: fields.featuredImage.fields.file.details.image.height,
        } : null,
        author: fields.author ? {
          name: fields.author.fields.name,
          bio: fields.author.fields.bio,
          picture: fields.author.fields.picture ? {
            url: fields.author.fields.picture.fields.file.url,
          } : null,
        } : null,
        // SEO Fields
        metaTitle: fields.metaTitle || null,
        metaDescription: fields.metaDescription || null,
        focusKeyword: fields.focusKeyword || null,
        tags: fields.tags || [],
        status: isPublished ? 'Published' : 'Draft',
        // New fields
        isFeatured: fields.isFeatured || false,
        category: fields.category || null,
        readingTimeMinutes: fields.readingTimeMinutes || null,
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const entries = await getClient().getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    
    if (entries.items.length === 0) {
      return null;
    }
    
    const fields = entries.items[0].fields as any;
    const sys = entries.items[0].sys as any;
    // Use Contentful's built-in publication status
    const isPublished = !!sys.publishedVersion;
    
    return {
      title: fields.title,
      slug: fields.slug,
      excerpt: fields.excerpt,
      content: fields.content,
      publishDate: fields.publishDate,
      featuredImage: fields.featuredImage ? {
        url: fields.featuredImage.fields.file.url,
        title: fields.featuredImage.fields.title,
        description: fields.featuredImage.fields.description,
        width: fields.featuredImage.fields.file.details.image.width,
        height: fields.featuredImage.fields.file.details.image.height,
      } : null,
      author: fields.author ? {
        name: fields.author.fields.name,
        bio: fields.author.fields.bio,
        picture: fields.author.fields.picture ? {
          url: fields.author.fields.picture.fields.file.url,
        } : null,
      } : null,
      // SEO Fields
      metaTitle: fields.metaTitle || null,
      metaDescription: fields.metaDescription || null,
      focusKeyword: fields.focusKeyword || null,
      tags: fields.tags || [],
      status: isPublished ? 'Published' : 'Draft',
      // New fields
      isFeatured: fields.isFeatured || false,
      category: fields.category || null,
      readingTimeMinutes: fields.readingTimeMinutes || null,
    };
  } catch (error) {
    console.error('Error fetching blog post from Contentful:', error);
    return null;
  }
}

// Podcast episode functions
export async function getPodcastEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const entries = await getClient().getEntries({
      content_type: 'podcastEpisode',
      order: ['-fields.publishDate'],
    });
    
    return entries.items.map(item => {
      const fields = item.fields as any;
      return {
        title: fields.title,
        slug: fields.slug,
        description: fields.description,
        summary: fields.summary,
        keyTopics: fields.keyTopics,
        publishDate: fields.publishDate,
        duration: fields.duration,
        guest: fields.guest,
        guestTitle: fields.guestTitle,
        episodeNumber: fields.episodeNumber,
        spotifyEmbedUrl: fields.spotifyEmbedUrl,
        fullTranscript: fields.fullTranscript,
        pullQuotes: fields.pullQuotes?.map((quote: any) => ({
          quote: quote.fields.quote,
          attribution: quote.fields.attribution,
        })) || [],
        resourcesMentioned: fields.resourcesMentioned?.map((resource: any) => ({
          title: resource.fields.title,
          url: resource.fields.url,
          description: resource.fields.description,
        })) || [],
        transcriptSections: fields.transcriptSections || [],
        coverArt: fields.coverArt ? {
          url: fields.coverArt.fields.file.url,
          title: fields.coverArt.fields.title,
          description: fields.coverArt.fields.description,
          width: fields.coverArt.fields.file.details.image.width,
          height: fields.coverArt.fields.file.details.image.height,
        } : undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching podcast episodes from Contentful:', error);
    return [];
  }
}

export async function getPodcastEpisodeBySlug(slug: string): Promise<PodcastEpisode | null> {
  try {
    const entries = await getClient().getEntries({
      content_type: 'podcastEpisode',
      'fields.slug': slug,
      limit: 1,
    });
    
    if (entries.items.length === 0) {
      return null;
    }
    
    const fields = entries.items[0].fields as any;
    return {
      title: fields.title,
      slug: fields.slug,
      description: fields.description,
      summary: fields.summary,
      keyTopics: fields.keyTopics,
      publishDate: fields.publishDate,
      duration: fields.duration,
      guest: fields.guest,
      guestTitle: fields.guestTitle,
      episodeNumber: fields.episodeNumber,
      spotifyEmbedUrl: fields.spotifyEmbedUrl,
      fullTranscript: fields.fullTranscript,
      pullQuotes: fields.pullQuotes?.map((quote: any) => ({
        quote: quote.fields.quote,
        attribution: quote.fields.attribution,
      })) || [],
      resourcesMentioned: fields.resourcesMentioned?.map((resource: any) => ({
        title: resource.fields.title,
        url: resource.fields.url,
        description: resource.fields.description,
      })) || [],
      transcriptSections: fields.transcriptSections || [],
      coverArt: fields.coverArt ? {
        url: fields.coverArt.fields.file.url,
        title: fields.coverArt.fields.title,
        description: fields.coverArt.fields.description,
        width: fields.coverArt.fields.file.details.image.width,
        height: fields.coverArt.fields.file.details.image.height,
      } : undefined,
    };
  } catch (error) {
    console.error('Error fetching podcast episode from Contentful:', error);
    return null;
  }
} 