import { createClient } from 'contentful';

// Initialize Contentful client with environment variables
export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Initialize Contentful preview client for draft content
export const contentfulPreviewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || '',
  host: 'preview.contentful.com',
});

// Get the client based on preview mode
export function getClient(preview: boolean = false) {
  return preview ? contentfulPreviewClient : contentfulClient;
}

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
  };
  author: {
    name: string;
    bio: string;
    picture: {
      url: string;
    };
  };
}

// Helper function to fetch blog posts from Contentful
export async function getBlogPosts(
  limit: number = 10,
  skip: number = 0,
  preview: boolean = false
): Promise<BlogPost[]> {
  try {
    const client = getClient(preview);
    
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
      limit,
      skip,
    });
    
    if (!response.items) {
      console.error('Error fetching blog posts from Contentful');
      return [];
    }
    
    return response.items.map(item => {
      const { fields } = item;
      
      return {
        title: fields.title,
        slug: fields.slug,
        excerpt: fields.excerpt,
        content: fields.content,
        publishDate: fields.publishDate,
        featuredImage: fields.featuredImage?.fields
          ? {
              url: `https:${fields.featuredImage.fields.file.url}`,
              title: fields.featuredImage.fields.title,
              description: fields.featuredImage.fields.description,
              width: fields.featuredImage.fields.file.details.image.width,
              height: fields.featuredImage.fields.file.details.image.height,
            }
          : null,
        author: fields.author?.fields
          ? {
              name: fields.author.fields.name,
              bio: fields.author.fields.bio,
              picture: fields.author.fields.picture?.fields
                ? {
                    url: `https:${fields.author.fields.picture.fields.file.url}`,
                  }
                : null,
            }
          : null,
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Helper function to fetch a single blog post by slug
export async function getBlogPostBySlug(
  slug: string,
  preview: boolean = false
): Promise<BlogPost | null> {
  try {
    const client = getClient(preview);
    
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    
    if (!response.items || response.items.length === 0) {
      return null;
    }
    
    const { fields } = response.items[0];
    
    return {
      title: fields.title,
      slug: fields.slug,
      excerpt: fields.excerpt,
      content: fields.content,
      publishDate: fields.publishDate,
      featuredImage: fields.featuredImage?.fields
        ? {
            url: `https:${fields.featuredImage.fields.file.url}`,
            title: fields.featuredImage.fields.title,
            description: fields.featuredImage.fields.description,
            width: fields.featuredImage.fields.file.details.image.width,
            height: fields.featuredImage.fields.file.details.image.height,
          }
        : null,
      author: fields.author?.fields
        ? {
            name: fields.author.fields.name,
            bio: fields.author.fields.bio,
            picture: fields.author.fields.picture?.fields
              ? {
                  url: `https:${fields.author.fields.picture.fields.file.url}`,
                }
              : null,
          }
        : null,
    };
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
} 